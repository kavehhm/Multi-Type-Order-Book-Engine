#pragma once
#include <vector>
#include <cstdint>

// Order types supported by the order book
enum class OrderType {
    GoodTillCancel,  // Order stays in the book until filled or cancelled
    FillAndKill,     // Order must be filled immediately or cancelled
    FillOrKill, // If not filled, cancel it
    GoodForDay, // If not filled by end of day, cancel it
    Market, // Give me whatever price I can, I just want to be filled
};

// Side of the order (Buy/Sell)
// Other sides exist, such as no side, but we don't need it for now
enum class Side {
    Buy,
    Sell
};

// Type aliases for better readability and maintainability
using Price = std::int32_t;
using Quantity = std::uint32_t;
using OrderId = std::uint64_t;
using OrderIds = std::vector<OrderId>;

// Represents a price level in the order book with its total quantity
struct LevelInfo 
{
    Price price_;
    Quantity quantity_;
};

using LevelInfos = std::vector<LevelInfo>;

// Container for bid and ask level information
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