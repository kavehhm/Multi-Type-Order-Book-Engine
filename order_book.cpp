#include "order_book.hpp"

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

    if (order->GetOrderType() == OrderType::FillAndKill && !CanMatch(
        order->GetSide(), order->GetPrice()))
        return { };

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
    return MatchOrders();
}

void OrderBook::CancelOrder(OrderId orderId) {
    auto it = orders_.find(orderId);
    if (it == orders_.end())
        return;

    const auto& orderEntry = it->second;
    const auto& order = orderEntry.order_;
    const auto& orderIterator = orderEntry.location_;

    if (order->GetSide() == Side::Sell) {
        auto price = order->GetPrice();
        auto& orders = asks_.at(price);
        orders.erase(orderIterator);
        if (orders.empty())
            asks_.erase(price);
    }
    else {
        auto price = order->GetPrice();
        auto& orders = bids_.at(price);
        orders.erase(orderIterator);
        if (orders.empty())
            bids_.erase(price);
    }
    
    orders_.erase(it);
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