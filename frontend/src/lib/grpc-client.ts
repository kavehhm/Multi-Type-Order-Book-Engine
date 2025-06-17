import { OrderBookServiceClient } from '../proto/orderbook_grpc_web_pb';
import { 
  AddOrderRequest, 
  CancelOrderRequest, 
  GetOrderBookRequest 
} from '../proto/orderbook_pb';

const client = new OrderBookServiceClient('http://localhost:8080', null, {});

export async function addOrder(
  orderId: number,
  side: string,
  price: number,
  quantity: number,
  orderType: string
) {
  const request = new AddOrderRequest();
  request.setOrderId(orderId);
  request.setSide(side);
  request.setPrice(price);
  request.setQuantity(quantity);
  request.setOrderType(orderType);

  return new Promise((resolve, reject) => {
    client.addOrder(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

export async function cancelOrder(orderId: number) {
  const request = new CancelOrderRequest();
  request.setOrderId(orderId);

  return new Promise((resolve, reject) => {
    client.cancelOrder(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

export async function getOrderBook() {
  const request = new GetOrderBookRequest();

  return new Promise((resolve, reject) => {
    client.getOrderBook(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
} 