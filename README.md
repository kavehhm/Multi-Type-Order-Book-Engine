# Multi-Type Order Book Engine

A high-performance order book engine supporting multiple order types (GoodTillCancel, FillAndKill, FillOrKill, GoodForDay, Market) with gRPC server implementation.

## Prerequisites

- CMake (version 3.10 or higher)
- C++17 compatible compiler (g++ or clang++)
- gRPC and Protobuf
- vcpkg (for dependency management)

## Building the Project

1. Clone the repository:
```bash
git clone <repository-url>
cd Multi-Type-Order-Book-Engine
```

2. Create and enter the build directory:
```bash
mkdir build
cd build
```

3. Generate build files:
```bash
cmake ..
```

4. Build the project:
```bash
make
```

This will create three executables:
- `order_book_server`: The gRPC server implementation
- `order_book_engine`: The core order book engine
- `order_book_test`: Unit tests

## Running the Server

To start the order book server:
```bash
./order_book_server
```

The server will listen on `0.0.0.0:50051` for incoming gRPC requests.

## Running Tests

To run the unit tests:
```bash
./order_book_test
```

## Project Structure

- `server.cpp`: gRPC server implementation
- `order_book.cpp/hpp`: Core order book engine implementation
- `order.hpp`: Order type definitions
- `types.hpp`: Common type definitions
- `trade.hpp`: Trade handling
- `order_modify.hpp`: Order modification functionality
- `protos/`: Protocol buffer definitions
- `generated/`: Generated gRPC and protobuf files
- `frontend/`: Frontend implementation

## Supported Order Types

- GoodTillCancel (GTC)
- FillAndKill (FAK)
- FillOrKill (FOK)
- GoodForDay (GFD)
- Market
