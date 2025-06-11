#pragma once
#include "types.hpp"
#include <memory>
#include <stdexcept>
#include <string>
#include <list>

// Represents a single order in the order book
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
        OrderType orderType_;      // Type of the order (GTC or FOK)
        OrderId orderId_;          // Unique identifier for the order
        Side side_;               // Buy or Sell side
        Price price_;             // Price at which the order is placed
        Quantity initialQuantity_; // Original quantity of the order
        Quantity remainingQuantity_; // Remaining quantity to be filled
};

// Smart pointer type for Order objects
using OrderPointer = std::shared_ptr<Order>;
// List of order pointers for maintaining order sequence at each price level
using OrderPointers = std::list<OrderPointer>; 