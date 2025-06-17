#include <gtest/gtest.h>
#include "order_book.hpp"
#include "order.hpp"
#include <memory>

class OrderBookTest : public ::testing::Test {
protected:
    void SetUp() override {
        orderBook = std::make_unique<OrderBook>();
    }

    std::unique_ptr<OrderBook> orderBook;
};

// Test CanFullyFill for Buy orders
TEST_F(OrderBookTest, CanFullyFillBuyOrder) {
    // Add some sell orders at different price levels
    auto sellOrder1 = std::make_shared<Order>(OrderType::GoodTillCancel, 1, Side::Sell, 100, 50);
    auto sellOrder2 = std::make_shared<Order>(OrderType::GoodTillCancel, 2, Side::Sell, 105, 30);
    auto sellOrder3 = std::make_shared<Order>(OrderType::GoodTillCancel, 3, Side::Sell, 110, 20);
    
    orderBook->AddOrder(sellOrder1);
    orderBook->AddOrder(sellOrder2);
    orderBook->AddOrder(sellOrder3);

    // Test cases for buy orders
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 110, 50));  // Can fill at best price
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 110, 80));  // Can fill across two levels
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 110, 100)); // Can fill all levels
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Buy, 110, 101)); // Too much quantity
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Buy, 95, 50));   // Price too low
}

// Test CanFullyFill for Sell orders
TEST_F(OrderBookTest, CanFullyFillSellOrder) {
    // Add some buy orders at different price levels
    auto buyOrder1 = std::make_shared<Order>(OrderType::GoodTillCancel, 1, Side::Buy, 110, 50);
    auto buyOrder2 = std::make_shared<Order>(OrderType::GoodTillCancel, 2, Side::Buy, 105, 30);
    auto buyOrder3 = std::make_shared<Order>(OrderType::GoodTillCancel, 3, Side::Buy, 100, 20);
    
    orderBook->AddOrder(buyOrder1);
    orderBook->AddOrder(buyOrder2);
    orderBook->AddOrder(buyOrder3);

    // Test cases for sell orders
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Sell, 100, 50));  // Can fill at best price
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Sell, 100, 80));  // Can fill across two levels
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Sell, 100, 100)); // Can fill all levels
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Sell, 100, 101)); // Too much quantity
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Sell, 115, 50));  // Price too high
}

// Test price level threshold logic
TEST_F(OrderBookTest, PriceLevelThresholdLogic) {
    // Add orders at specific price levels to test threshold logic
    auto sellOrder1 = std::make_shared<Order>(OrderType::GoodTillCancel, 1, Side::Sell, 100, 50);
    auto sellOrder2 = std::make_shared<Order>(OrderType::GoodTillCancel, 2, Side::Sell, 105, 30);
    auto sellOrder3 = std::make_shared<Order>(OrderType::GoodTillCancel, 3, Side::Sell, 110, 20);
    
    orderBook->AddOrder(sellOrder1);
    orderBook->AddOrder(sellOrder2);
    orderBook->AddOrder(sellOrder3);

    // Test threshold logic for buy orders
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 100, 50));   // Exact threshold match
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 105, 80));   // Above threshold
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Buy, 95, 50));   // Below threshold
}

// Test edge cases
TEST_F(OrderBookTest, EdgeCases) {
    // Test empty book
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Buy, 100, 50));
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Sell, 100, 50));

    // Test zero quantity
    auto sellOrder = std::make_shared<Order>(OrderType::GoodTillCancel, 1, Side::Sell, 100, 50);
    orderBook->AddOrder(sellOrder);
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 100, 0));    // Zero quantity should be valid

    // Test exact quantity match
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 100, 50));   // Exact quantity match
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Buy, 100, 51));  // One more than available
}

// Test partial fills
TEST_F(OrderBookTest, PartialFills) {
    // Add orders with specific quantities
    auto sellOrder1 = std::make_shared<Order>(OrderType::GoodTillCancel, 1, Side::Sell, 100, 50);
    auto sellOrder2 = std::make_shared<Order>(OrderType::GoodTillCancel, 2, Side::Sell, 100, 50);
    
    orderBook->AddOrder(sellOrder1);
    orderBook->AddOrder(sellOrder2);

    // Test partial fills at same price level
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 100, 75));   // Partial fill across two orders
    EXPECT_TRUE(orderBook->CanFullyFill(Side::Buy, 100, 100));  // Exact fill of both orders
    EXPECT_FALSE(orderBook->CanFullyFill(Side::Buy, 100, 101)); // One more than available
}

int main(int argc, char **argv) {
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
} 