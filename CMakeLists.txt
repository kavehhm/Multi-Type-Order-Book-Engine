cmake_minimum_required(VERSION 4.0)
project(OrderBookEngine)

# Set C++17 standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(Protobuf CONFIG REQUIRED)
find_package(gRPC CONFIG REQUIRED)
find_package(GTest REQUIRED)

# Main executable
add_executable(order_book_engine
    main.cpp
    order_book.cpp
    generated/orderbook.pb.cc
    generated/orderbook.grpc.pb.cc
)

# Server executable
add_executable(order_book_server
    server.cpp
    order_book.cpp
    generated/orderbook.pb.cc
    generated/orderbook.grpc.pb.cc
)

# Test executable
add_executable(order_book_test
    order_book_test.cpp
    order_book.cpp
)

# Set include directories for each target
target_include_directories(order_book_engine PRIVATE
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_SOURCE_DIR}
    ${CMAKE_SOURCE_DIR}/generated
)

target_include_directories(order_book_server PRIVATE
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_SOURCE_DIR}
    ${CMAKE_SOURCE_DIR}/generated
)

target_include_directories(order_book_test PRIVATE
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_SOURCE_DIR}
    ${CMAKE_SOURCE_DIR}/generated
    ${GTEST_INCLUDE_DIRS}
)

# Link test executable with GTest
target_link_libraries(order_book_test PRIVATE
    GTest::GTest
    GTest::Main
    pthread
)

# Link main executable with gRPC and Protobuf
target_link_libraries(order_book_engine PRIVATE
    gRPC::grpc++
    gRPC::grpc++_reflection
    protobuf::libprotobuf
)

# Link server executable with gRPC and Protobuf
target_link_libraries(order_book_server PRIVATE
    gRPC::grpc++
    gRPC::grpc++_reflection
    protobuf::libprotobuf
)