#include "order_book.hpp"
#include "types.hpp"
#include <atomic>
#include <chrono>
#include <condition_variable>
#include <ctime>
#include <mutex>
#include <numeric>



void OrderBook::PruneGoodForDayOrder() {
    using namespace std::chrono;
    const auto end = hours(16);

    while(true) {
        const auto now = system_clock::now();
        const auto now_c = system_clock::to_time_t(now);
        std::tm now_parts;
        localtime_r(&now_c, &now_parts);

        // if past 4 pm, go to next day
        if(now_parts.tm_hour >= end.count()) 
            now_parts.tm_mday += 1;

        now_parts.tm_hour = end.count();
        now_parts.tm_min = 0;
        now_parts.tm_sec = 0;


        // how far are we until 4 pm
        auto next = system_clock::from_time_t(mktime(&now_parts));
        auto till = next - now +milliseconds(100);

        {
            std::unique_lock ordersLock{ ordersMutex_};
            if (shutdown_.load(std::memory_order_acquire) ||
            shutdownConditionVariable_.wait_for(ordersLock, till) == std::cv_status::no_timeout)
                return;
        }

        OrderIds orderIds;
        {
            std::scoped_lock ordersLock {ordersMutex_};
            for (const auto& [orderId, entry] : orders_) {
                const auto& [order, _] = entry;

                if (order->GetOrderType() != OrderType::GoodForDay)
                    continue;

                orderIds.push_back(order->GetOrderId());
            }
        };

        
        CancelOrders(orderIds);

    } 
    }


void OrderBook::CancelOrders(OrderIds orderIds) {
    std::scoped_lock ordersLock{ordersMutex_};  // Lock once for all cancellations
    
    for(const auto& orderId : orderIds) {
        // Use CancelOrderInternal because we already have the lock
        CancelOrderInternal(orderId);
    }
}  // Lock is released here


// this version is to ensure thread safety
void OrderBook::CancelOrderInternal(OrderId orderId) {
    // if the orderid does not even exist we dont run anything
    if (!orders_.contains(orderId))
        return;

    const auto [order, iterator] = orders_.at(orderId);
    orders_.erase(orderId);


    // This is to ensure the order is removed from the orderbooks;
    if (order->GetSide() == Side::Sell) {
        auto price=  order->GetPrice();
        auto& orders = asks_.at(price);
        orders.erase(iterator);
        if (orders.empty())
            asks_.erase(price);
    }
    else {
        auto price = order->GetPrice();
        auto& orders = bids_.at(price);
        orders.erase(iterator);
        if (orders.empty()) 
            bids_.erase(price);
    }

    OnOrderCancelled(order);

}



void OrderBook::OnOrderCancelled(OrderPointer order) {
    // When an order is cancelled, we need to remove exactly what's still in the order book. 
    // The remaining quantity represents the unfilled portion of the order that is still active in the book
    // We can only cancel whats remaining from the order. cant cancel what was already filled
    UpdateLevelData(order->GetPrice(), order->GetRemainingQuantity(), LevelData::Action::Remove);
}

void OrderBook::OnOrderAdded(OrderPointer order) {
    UpdateLevelData(order->GetPrice(), order->GetInitialQuantity(), LevelData::Action::Add);
}


void OrderBook::OnOrderMatched(Price price, Quantity quantity, bool isFullyFilled) {
    // If the order was fully filled then we remove that count from our structure
    // Otherwise we dont touch the count property
    UpdateLevelData(price, quantity, isFullyFilled ? LevelData::Action::Remove : LevelData::Action::Match);

}

void OrderBook::UpdateLevelData(Price price, Quantity quantity, LevelData::Action action) {
    auto& data = data_[price];
    
    // If the action is to remove from our books, we reduce the number of orders on the book. same logic for add
    if (action == LevelData::Action::Remove) {
        data.count_ -= 1;
    } else if (action == LevelData::Action::Add) {
        data.count_ += 1;
    }

    // If we removed or matched, reduce the quantity by the amount we removed or matched by
    if (action == LevelData::Action::Remove || action == LevelData::Action::Match) {
        data.quantity_ -= quantity;
    }
    // Same logic for add
    else {
        data.quantity_ += quantity;
    }

    // If there's no data at that price, remove it
    if (data.count_ == 0)
        data_.erase(price);
}

bool OrderBook::CanFullyFill(Side side, Price price, Quantity quantity) const {
    // If we can match, then when we call asks or bid . begin() we know that won't be undefined behavior
    if (!CanMatch(side, price))
        return false;

    // The best price we can get for FOK
    std::optional<Price> threshold;

    if (side== Side::Buy) {
        const auto [askPrice, _] = *asks_.begin();
        threshold = askPrice;
    }

    else {
        const auto [bidPrice, _] = *bids_.begin();
        threshold = bidPrice;
    }

    // Lets say the worst ask is at 110 and the best ask is at 90. The FOK order would be 
    // somewhere in between (100). We need to find how many orders exist between best ask and FOK price
    for (const auto& [levelPrice, levelData]: data_) {
        // Filtering for at or below FOK price. We are filtering out the ones that we don't need for readability
        if (threshold.has_value() && 
            (side == Side::Buy && threshold.value() > levelPrice) ||
            (side == Side::Sell && threshold.value() < levelPrice))
            continue;
        

        if ((side == Side::Buy && levelPrice > price) ||
            (side == Side::Sell && levelPrice < price))
                continue;

        // If quantity gets to a number that is less than the quantity we want to match at, then we know we can fully fill
        
        if (quantity <= levelData.quantity_)
            return true;

        // If we have a desired price, subtract our quantity from the quantity at that level
        quantity -= levelData.quantity_;

    }


    return false;
    
}

bool OrderBook::CanMatch(Side side, Price price) const {
    if (side == Side::Buy) {
        if (asks_.empty()) return false;
        const auto& bestAsk = asks_.begin()->first;
        return price >= bestAsk;
    }
    else {
        if (bids_.empty()) return false;
        const auto& bestBid = bids_.begin()->first;
        return price <= bestBid;
    }
}

Trades OrderBook::MatchOrders() {
    Trades trades;
    trades.reserve(orders_.size());

    while (true) {
        if (bids_.empty() || asks_.empty()) break;
        const auto& bidPrice = bids_.begin()->first;
        auto& bids = bids_.begin()->second;

        const auto& askPrice = asks_.begin()->first;
        auto& asks = asks_.begin()->second;

        if (bidPrice < askPrice) break;

        while (bids.size() && asks.size()) {
            auto& bid = bids.front();
            auto& ask = asks.front();

            Quantity quantity = std::min(bid->GetRemainingQuantity(), ask->GetRemainingQuantity());
            bid->Fill(quantity);
            ask->Fill(quantity);

            if (bid->IsFilled()) {
                bids.pop_front();
                orders_.erase(bid->GetOrderId());
            }

            if (ask->IsFilled()) {
                asks.pop_front();
                orders_.erase(ask->GetOrderId());
            }

            if (bids.empty()) bids_.erase(bidPrice);
            if (asks.empty()) asks_.erase(askPrice);

            trades.push_back(Trade{
                TradeInfo{bid->GetOrderId(), bid->GetPrice(), quantity}, 
                TradeInfo{ask->GetOrderId(), ask->GetPrice(), quantity}
            });

             // Removes one order from the bid price
            OnOrderMatched(bid->GetPrice(), quantity, bid->IsFilled());
            // Removes one order from the ask price
            OnOrderMatched(ask->GetPrice(), quantity, ask->IsFilled());
        }
    }

    if (!bids_.empty()) {
        const auto& bidPrice = bids_.begin()->first;
        auto& bids = bids_.begin()->second;
        auto order = bids.front();
        if (order->GetOrderType() == OrderType::FillAndKill)
            CancelOrder(order->GetOrderId());
    }
    
    if (!asks_.empty()) {
        const auto& askPrice = asks_.begin()->first;
        auto& asks = asks_.begin()->second;
        auto order = asks.front();
        if (order->GetOrderType() == OrderType::FillAndKill)
            CancelOrder(order->GetOrderId());
    }

    return trades;
}


Trades OrderBook::AddOrder(OrderPointer order) {
    if (orders_.find(order->GetOrderId()) != orders_.end())
        return { };

    if (order->GetOrderType() == OrderType::Market) {
        // If we want to buy and there are sellers, buy at the worst ask price (best buy price)
        if (order->GetSide() == Side::Buy && !asks_.empty()) {
            order->ToGoodTillCancel(asks_.rbegin()->first);
        }
        // If we want to sell and there are buyers, sell at the worst bid price (best sell price)
        else if (order->GetSide() == Side::Sell && !bids_.empty()) {
            order->ToGoodTillCancel(bids_.rbegin()->first);
        }
        else 
            return {};
    }

    if (order->GetOrderType() == OrderType::FillAndKill && !CanMatch(
        order->GetSide(), order->GetPrice()))
        return { };

    // If the order is FOK and we can't fully fill, we do nothing
    if (order->GetOrderType() == OrderType::FillOrKill && !CanFullyFill(order->GetSide(), order->GetPrice(), order->GetInitialQuantity()))
        return {};
    // Otherwise, we fill the order using any other logic we have used

    OrderPointers::iterator iterator;

    if (order->GetSide() == Side::Buy) {
        auto& orders = bids_[order->GetPrice()];
        orders.push_back(order);
        iterator = std::prev(orders.end());
    }
    else if (order->GetSide() == Side::Sell) {
        auto& orders = asks_[order->GetPrice()];
        orders.push_back(order);
        iterator = std::prev(orders.end());
    }

    orders_.insert({order->GetOrderId(), OrderEntry{order, iterator}});

    OnOrderAdded(order);
    return MatchOrders();
}

void OrderBook::CancelOrder(OrderId orderId) {
    std::scoped_lock ordersLock{ordersMutex_};
    CancelOrderInternal(orderId);
}

Trades OrderBook::Match(OrderModify order) {
    if (orders_.find(order.GetOrderId()) == orders_.end())
        return {};

    const auto& [existingOrder, _] = orders_.at(order.GetOrderId());
    CancelOrder(order.GetOrderId());
    return AddOrder(order.ToOrderPointer(existingOrder->GetOrderType()));
}

std::size_t OrderBook::Size() const { 
    return orders_.size(); 
}

OrderBookLevelInfos OrderBook::GetOrderInfos() const {
    LevelInfos bidInfos, askInfos;
    bidInfos.reserve(orders_.size());
    askInfos.reserve(orders_.size());

    auto CreateLevelInfos = [](Price price, const OrderPointers& orders) {
        return LevelInfo{price, std::accumulate(orders.begin(), orders.end(), (Quantity)0,
            [](std::size_t runningSum, const OrderPointer& order) 
            {return runningSum + order->GetRemainingQuantity();}
        )};
    };

    for (const auto& [price, orders] : bids_)
        bidInfos.push_back(CreateLevelInfos(price, orders));

    for (const auto& [price, orders] : asks_)
        askInfos.push_back(CreateLevelInfos(price, orders));

    return OrderBookLevelInfos{bidInfos, askInfos};
} 