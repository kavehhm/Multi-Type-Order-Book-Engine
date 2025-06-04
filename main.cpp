#include <cmath>
#include <iostream>
#include <list>
#include <numeric>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <memory>
#include <variant>
#include <optional>
#include <tuple>
#include <format> 
#include <map>
#include <version>  // For C++20 features


enum class OrderType {
    GoodTillCancel,
    FillAndKill
};


// Other side's exist, such as no side, but we don't need it for now
enum class Side {
    Buy,
    Sell
};

using Price = std::int32_t;
using Quantity = std::uint32_t;
using OrderId = std::uint64_t;

struct LevelInfo 
{
    Price price_;
    Quantity quantity_;
};

using LevelInfos = std::vector<LevelInfo>;

class OrderBookLevelInfos
{
    public:
        OrderBookLevelInfos(const LevelInfos& bids, const LevelInfos& asks)
        : bids_{bids}, asks_{asks}
        { }

        const LevelInfos& GetBids() const { return bids_; }
        const LevelInfos& GetAsks() const { return asks_; }

    private:
        LevelInfos bids_;
        LevelInfos asks_;
};

// Key elements of the order book are complete. Now we need to create the order itself
class Order {
    public: 
        Order(OrderType orderType, OrderId orderId, Side side, Price price, Quantity quantity)
        : orderType_{orderType}, orderId_{orderId}, side_{side}, price_{price}, initialQuantity_{quantity}, remainingQuantity_{quantity}
        { }
        OrderId GetOrderId() const { return orderId_; }
        Side GetSide() const { return side_; }
        Price GetPrice() const { return price_; }
        OrderType GetOrderType() const { return orderType_; }
        Quantity GetInitialQuantity() const { return initialQuantity_; }
        Quantity GetRemainingQuantity() const { return remainingQuantity_; }
        Quantity GetFilledQuantity() const { return initialQuantity_ - remainingQuantity_; }

        bool IsFilled() const { return GetRemainingQuantity() == 0; }
        void Fill(Quantity quantity)
        {
            if (quantity > GetRemainingQuantity())
            {
                throw std::logic_error("Cannot fill more than the remaining quantity for order " + std::to_string(GetOrderId()));
            }
            remainingQuantity_ -= quantity;
        }

    private:
        OrderType orderType_;
        OrderId orderId_;
        Side side_;
        Price price_;
        Quantity initialQuantity_;
        Quantity remainingQuantity_;

};

// We will be storing a single order in multiple data structures in our order book.
// Order can be stored in both an order's dictionary and in a Bid/Ask based dictionary.
using OrderPointer = std::shared_ptr<Order>;

// Using list for simplicity
using OrderPointers = std::list<OrderPointer>;

/* We need an abstraction for an order that is to be modified
To cancel, you need an order id. For add, all you need is the order. 
To modify, we need a more lightweight representation of the order. & can be converted to a new order.
Modify is simply cancel and replace. Cancel needs order id, replace needs price, quantity, and maybe side.
Being able to modify the side is sometimes looked down upon, but it is a feature that will be implemented. */


class OrderModify
{
    public:
        OrderModify(OrderId orderId, Side side, Price price, Quantity quantity )
        : orderId_ {orderId}, price_ {price}, side_ {side}, quantity_ {quantity}
        {}
        OrderId GetOrderId() const { return orderId_; }
        Price GetPrice() const { return price_; }
        Side GetSide() const { return side_; }
        Quantity GetQuantity() const { return quantity_; }

       // Transforming an existing order with this OrderModify
        OrderPointer ToOrderPointer(OrderType type) const {
            return std::make_shared<Order>(type, GetOrderId(), GetSide(), GetPrice(), GetQuantity());
        }

    private:
        OrderId orderId_;
        Price price_;
        Side side_;
        Quantity quantity_;

};

// This is what happens when an order is matched. We need represenation of a matched order.
// We need a Trade object, which is an aggregation of two Trade Info objects: one for bid one for ask

struct TradeInfo
{
    OrderId orderId_;
    Price price_;
    Quantity quantity_;
};

class Trade 
{
    public:
        Trade(const TradeInfo& bidTrade, const TradeInfo& askTrade)
        : bidTrade_ { bidTrade }, askTrade_ { askTrade }
        {}

        const TradeInfo& getBidTrade() const { return bidTrade_; }
        const TradeInfo& geAskTrade() const { return askTrade_; }
    
    private:
        TradeInfo bidTrade_;
        TradeInfo askTrade_;
};

using Trades = std::vector<Trade>;

class OrderBook
{
    private:
        struct OrderEntry {
            OrderPointer order_ { nullptr };
            OrderPointers::iterator location_;
        };

        // mapping (asks_) a price (askprice) to a list of orders at the price (asks)
        std::map<Price, OrderPointers, std::greater<Price>> bids_;
        std::map<Price, OrderPointers, std::less<Price>> asks_;
        std::unordered_map<OrderId, OrderEntry> orders_; 


        bool CanMatch(Side side, Price price) const{
            // For fill or kill, we need the price to be greater than or equal to
            // the best ask (lowest price sellers are selling at) to fill the whole
            // order or kill it completely
            if (side == Side::Buy) {
                if (asks_.empty()) return false;

                // map is sorted so the beginning ask will be the lowest one
                const auto& bestAsk = asks_.begin()->first;

                return price >= bestAsk;
            }
            // Same logic for selling, must look for highest price buyers are
            // bidding at. this map is sorted in the opposite direction so
            // the beginning element is the largest 
            else {
                if (bids_.empty()) return false;
                const auto& bestBid = bids_.begin()->first;
                return price <= bestBid;

            }
        }

        Trades MatchOrders()
        {
            Trades trades;
            trades.reserve(orders_.size());

            while (true) {
                if (bids_.empty() || asks_.empty()) break;
                const auto& bidPrice = bids_.begin()->first;
                auto& bids = bids_.begin()->second;

                const auto& askPrice = asks_.begin()->first;
                auto& asks = asks_.begin()->second;

                if (bidPrice < askPrice) break;

                // while buys and sells exist, match them
                while (bids.size() && asks.size())
                {
                    // get highest bid and lowest ask
                    auto& bid = bids.front();
                    auto& ask = asks.front();

                    // the lower amount takes prescedent. if we have less buyers, only
                    // the amount of buyers will buy from sellers. same vice versa
                    Quantity quantity = std::min(bid->GetRemainingQuantity(), ask->GetRemainingQuantity());
                    bid->Fill(quantity);
                    ask->Fill(quantity);

                    // if the bid and or the ask are filled, remove the order and remove it from list of bids/asks
                    if (bid->IsFilled())
                    {
                        bids.pop_front();
                        orders_.erase(bid->GetOrderId());
                    }

                    if (ask->IsFilled())
                    {
                        asks.pop_front();
                        orders_.erase(ask->GetOrderId());
                    }

                    // if there are no more orders at that price (bids_), remove the Key of the price as a whole from the map (bids)
                    if (bids.empty()) bids_.erase(bidPrice);

                    if (asks.empty()) asks_.erase(askPrice);

                    trades.push_back(Trade{
                        TradeInfo{bid->GetOrderId(), bid->GetPrice(), quantity}, 
                        TradeInfo{ask->GetOrderId(), ask->GetPrice(), quantity}
                        });

                }

            }


            // Whatever order could not be filled and removed from the list of orders, is cancelled because of FOK

            if (!bids_.empty())
            {
                const auto& bidPrice = bids_.begin()->first;
                auto& bids = bids_.begin()->second;
                
                // top order at the top price
                auto order = bids.front();

                if (order->GetOrderType() == OrderType::FillAndKill)
                    CancelOrder(order->GetOrderId());
            }
            
            if (!asks_.empty())
            {
                const auto& askPrice = asks_.begin()->first;
                auto& asks = asks_.begin()->second;
                
                // top order at the top price
                auto order = asks.front();

                if (order->GetOrderType() == OrderType::FillAndKill)
                    CancelOrder(order->GetOrderId());
            }

            return trades;

        
        }

    public:
        Trades AddOrder(OrderPointer order)
        {
            if (orders_.find(order->GetOrderId()) != orders_.end())
                return { };

            if (order->GetOrderType() == OrderType::FillAndKill && !CanMatch(
                order->GetSide(), order->GetPrice()))
                return { };

            OrderPointers::iterator iterator;

            if (order->GetSide() == Side::Buy)
            {
                // get reference to the list of orders at this price
                auto& orders = bids_[order->GetPrice()];
                orders.push_back(order);
                iterator = std::prev(orders.end());
            }
            else if (order->GetSide() == Side::Sell)
            {
                // get reference to the list of orders at this price
                auto& orders = asks_[order->GetPrice()];
                orders.push_back(order);
                iterator = std::prev(orders.end());
            }

            orders_.insert({order->GetOrderId(), OrderEntry{order, iterator}});
            return MatchOrders();
        }

        void CancelOrder(OrderId orderId) {
            auto it = orders_.find(orderId);
            if (it == orders_.end())
                return;

            const auto& orderEntry = it->second;
            const auto& order = orderEntry.order_;
            const auto& orderIterator = orderEntry.location_;

            if (order->GetSide() == Side::Sell)
            {
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

        Trades Match(OrderModify order)
        {
            if (!orders_.contains(order.GetOrderId()))
                return {};

            const auto& [existingOrder, _] = orders_.at(order.GetOrderId());
            CancelOrder(order.GetOrderId());
            return AddOrder(order.ToOrderPointer(existingOrder->GetOrderType()));


        }

        std::size_t Size() const { return orders_.size(); }

        OrderBookLevelInfos GetOrderInfos() const {
            LevelInfos bidInfos, askInfos;
            bidInfos.reserve(orders_.size());
            askInfos.reserve(orders_.size());

            auto CreateLevelInfos = [](Price price, const OrderPointers& orders)
            {
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


};


int main() 
{
    OrderBook orderbook;
    const OrderId orderId = 1;
    const OrderId orderId2 = 2;
    orderbook.AddOrder(std::make_shared<Order>(OrderType::GoodTillCancel, orderId, Side::Buy, 100, 10));
    orderbook.AddOrder(std::make_shared<Order>(OrderType::GoodTillCancel, orderId2, Side::Buy, 100, 10));

    std::cout << orderbook.Size() << std::endl;
    orderbook.CancelOrder(orderId);
    std::cout << orderbook.Size() << std::endl;
    orderbook.CancelOrder(orderId2);
    std::cout << orderbook.Size() << std::endl;




    return 0;
}