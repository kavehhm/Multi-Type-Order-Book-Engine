#pragma once
#include "types.hpp"
#include <vector>

// Represents information about a single side of a trade
struct TradeInfo
{
    OrderId orderId_;    // ID of the order involved in the trade
    Price price_;       // Price at which the trade occurred
    Quantity quantity_; // Quantity traded
};

// Represents a complete trade between a buy and sell order
// A Trade object is an aggregation of two TradeInfo objects: one for bid one for ask
class Trade 
{
    public:
        Trade(const TradeInfo& bidTrade, const TradeInfo& askTrade)
        : bidTrade_ { bidTrade }, askTrade_ { askTrade }
        {}

        const TradeInfo& getBidTrade() const { return bidTrade_; }
        const TradeInfo& geAskTrade() const { return askTrade_; }
    
    private:
        TradeInfo bidTrade_; // Information about the buy side of the trade
        TradeInfo askTrade_; // Information about the sell side of the trade
};

// Collection of trades
using Trades = std::vector<Trade>; 