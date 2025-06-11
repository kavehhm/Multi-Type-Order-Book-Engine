#include "order_book.hpp"
#include <iostream>

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