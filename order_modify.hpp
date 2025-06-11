#pragma once
#include "types.hpp"
#include "order.hpp"

/* 
 * Represents a modification to an existing order.
 * To cancel, you need an order id. For add, all you need is the order. 
 * To modify, we need a more lightweight representation of the order.
 * Modify is simply cancel and replace. Cancel needs order id, replace needs price, quantity, and maybe side.
 * Being able to modify the side is sometimes looked down upon, but it is a feature that will be implemented.
 */
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
        OrderId orderId_;    // ID of the order to modify
        Price price_;       // New price for the order
        Side side_;         // New side for the order
        Quantity quantity_; // New quantity for the order
}; 