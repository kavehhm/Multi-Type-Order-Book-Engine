cmake_minimum_required(VERSION 3.10)
project(MultiTypeOrderBookEngine)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(order_book_engine
    main.cpp
    order_book.cpp
) 