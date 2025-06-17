#include <iostream>
#include <memory>
#include <string>
#include <algorithm>
#include <mutex>

#include <grpcpp/grpcpp.h>
#include <grpcpp/health_check_service_interface.h>
#include <grpcpp/ext/proto_server_reflection_plugin.h>

#include "order_book.hpp"
#include "orderbook.grpc.pb.h"

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;
using orderbook::OrderBookService;
using orderbook::AddOrderRequest;
using orderbook::CancelOrderRequest;
using orderbook::GetOrderBookRequest;
using orderbook::OrderResponse;
using orderbook::OrderBookResponse;
using orderbook::PriceLevel;

class OrderBookServiceImpl final : public OrderBookService::Service {
private:
    static OrderBook& GetOrderBook() {
        static OrderBook orderBook;
        return orderBook;
    }

public:
    Status AddOrder(ServerContext* context, const AddOrderRequest* request, OrderResponse* response) override {
        try {
            OrderType orderType;
            if (request->order_type() == "GoodTillCancel") orderType = OrderType::GoodTillCancel;
            else if (request->order_type() == "FillAndKill") orderType = OrderType::FillAndKill;
            else if (request->order_type() == "FillOrKill") orderType = OrderType::FillOrKill;
            else if (request->order_type() == "GoodForDay") orderType = OrderType::GoodForDay;
            else if (request->order_type() == "Market") orderType = OrderType::Market;
            else throw std::invalid_argument("Invalid order type");

            Side side;
            std::string sideStr = request->side();
            std::transform(sideStr.begin(), sideStr.end(), sideStr.begin(), ::tolower);
            if (sideStr == "buy") side = Side::Buy;
            else if (sideStr == "sell") side = Side::Sell;
            else throw std::invalid_argument("Invalid side");

            auto order = std::make_shared<Order>(
                orderType,
                request->order_id(),
                side,
                static_cast<Price>(request->price() * 100), // Convert to integer cents
                request->quantity()
            );
            
            Trades trades = GetOrderBook().AddOrder(order);
            
            if (!trades.empty()) {
                response->set_success(true);
                response->set_message("Order matched and executed");
            } else {
                response->set_success(true);
                response->set_message("Order added successfully");
            }
            
            return Status::OK;
        } catch (const std::exception& e) {
            response->set_success(false);
            response->set_message(std::string("Error adding order: ") + e.what());
            return Status::OK;
        }
    }

    Status CancelOrder(ServerContext* context, const CancelOrderRequest* request, OrderResponse* response) override {
        try {
            GetOrderBook().CancelOrder(request->order_id());
            response->set_success(true);
            response->set_message("Order cancelled successfully");
            return Status::OK;
        } catch (const std::exception& e) {
            response->set_success(false);
            response->set_message(std::string("Error cancelling order: ") + e.what());
            return Status::OK;
        }
    }

    Status GetOrderBook(ServerContext* context, const GetOrderBookRequest* request, OrderBookResponse* response) override {
        try {
            auto levelInfos = GetOrderBook().GetOrderInfos();
            auto bids = levelInfos.GetBids();
            auto asks = levelInfos.GetAsks();

            for (const auto& [price, quantity] : bids) {
                auto* priceLevel = response->add_bids();
                priceLevel->set_price(price);
                priceLevel->set_quantity(quantity);
            }

            for (const auto& [price, quantity] : asks) {
                auto* priceLevel = response->add_asks();
                priceLevel->set_price(price);
                priceLevel->set_quantity(quantity);
            }

            return Status::OK;
        } catch (const std::exception& e) {
            return Status(grpc::StatusCode::INTERNAL, e.what());
        }
    }
};

void RunServer() {
    std::string server_address("0.0.0.0:50051");
    OrderBookServiceImpl service;

    grpc::EnableDefaultHealthCheckService(true);
    grpc::reflection::InitProtoReflectionServerBuilderPlugin();
    ServerBuilder builder;
    
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    builder.RegisterService(&service);
    
    std::unique_ptr<Server> server(builder.BuildAndStart());
    std::cout << "Server listening on " << server_address << std::endl;
    server->Wait();
}

int main(int argc, char** argv) {
    RunServer();
    return 0;
} 