declare namespace proto.orderbook {
  class AddOrderRequest {
    setOrderId(value: number): void;
    setSide(value: string): void;
    setPrice(value: number): void;
    setQuantity(value: number): void;
    setOrderType(value: string): void;
  }

  class CancelOrderRequest {
    setOrderId(value: number): void;
  }

  class GetOrderBookRequest {}

  class OrderResponse {
    getMessage(): string;
    setSuccess(value: boolean): void;
    setMessage(value: string): void;
  }

  class OrderBookResponse {
    addBids(): PriceLevel;
    addAsks(): PriceLevel;
  }

  class PriceLevel {
    setPrice(value: number): void;
    setQuantity(value: number): void;
  }
} 