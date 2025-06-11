#pragma once
#include "types.hpp"
#include "order.hpp"
#include "order_modify.hpp"
#include "trade.hpp"
#include <condition_variable>
#include <map>
#include <mutex>
#include <thread>
#include <unordered_map>
#include <numeric>

// Main order book implementation that manages orders and matches them
class OrderBook
{
    private:
        // Internal structure to keep track of order location in price level lists
        struct OrderEntry {
            OrderPointer order_ { nullptr };
            OrderPointers::iterator location_;
        };

        // Price-time priority order book implementation
        // Bids are sorted in descending order (highest price first)
        std::map<Price, OrderPointers, std::greater<Price>> bids_;
        // Asks are sorted in ascending order (lowest price first)
        std::map<Price, OrderPointers, std::less<Price>> asks_;
        // Quick lookup of orders by their ID
        std::unordered_map<OrderId, OrderEntry> orders_; 

        mutable std::mutex ordersMutex_;
        std::thread ordersPruneThread_;
        std::condition_variable shutdownConditionVariable_;
        std::atomic<bool> shutdown_ {false};

        void PruneGoodForDayOrder();

        void CancelOrders(OrderIds orderIds);
        void CancelOrderInternal(OrderId orderId);
        // Check if an order can be matched at the given price
        bool CanMatch(Side side, Price price) const;
        // Match orders and generate trades
        Trades MatchOrders();

    public:
        // Add a new order to the book and match it if possible
        Trades AddOrder(OrderPointer order);
        // Cancel an existing order
        void CancelOrder(OrderId orderId);
        // Modify an existing order
        Trades Match(OrderModify order);
        // Get the total number of orders in the book
        std::size_t Size() const;
        // Get the current state of the order book
        OrderBookLevelInfos GetOrderInfos() const;
}; 