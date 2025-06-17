'use client';

import { useState, useEffect } from 'react';
import { addOrder, cancelOrder, getOrderBook } from '../lib/grpc-client';

interface PriceLevel {
  price: number;
  quantity: number;
}

export default function Home() {
  const [orderId, setOrderId] = useState<number>(1);
  const [side, setSide] = useState<string>('Buy');
  const [price, setPrice] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(50);
  const [orderType, setOrderType] = useState<string>('GoodTillCancel');
  const [message, setMessage] = useState<string>('');
  const [bids, setBids] = useState<PriceLevel[]>([]);
  const [asks, setAsks] = useState<PriceLevel[]>([]);

  const fetchOrderBook = async () => {
    try {
      const response = await getOrderBook();
      const bidsList = response.getBidsList();
      const asksList = response.getAsksList();
      
      setBids(bidsList.map(bid => ({
        price: bid.getPrice(),
        quantity: bid.getQuantity()
      })));
      
      setAsks(asksList.map(ask => ({
        price: ask.getPrice(),
        quantity: ask.getQuantity()
      })));
    } catch (error) {
      console.error('Error fetching order book:', error);
    }
  };

  useEffect(() => {
    fetchOrderBook();
    // Refresh order book every 5 seconds
    const interval = setInterval(fetchOrderBook, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddOrder = async () => {
    try {
      const response = await addOrder(orderId, side, price, quantity, orderType);
      setMessage(`Order added: ${response.getMessage()}`);
      setOrderId(prev => prev + 1);
      
      // Immediately refresh the order book to show the updated state
      await fetchOrderBook();
    } catch (error) {
      setMessage(`Error adding order: ${error}`);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const response = await cancelOrder(orderId - 1);
      setMessage(`Order cancelled: ${response.getMessage()}`);
      fetchOrderBook(); // Refresh order book after canceling an order
    } catch (error) {
      setMessage(`Error cancelling order: ${error}`);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Order Book</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Place Order</h2>
          <div>
            <label className="block mb-2">Side</label>
            <select 
              value={side} 
              onChange={(e) => setSide(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Price</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Quantity</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Order Type</label>
            <select 
              value={orderType} 
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="GoodTillCancel">Good Till Cancel</option>
              <option value="FillOrKill">Fill or Kill</option>
              <option value="FillAndKill">Fill and Kill</option>
              <option value="GoodForDay">Good for Day</option>
              <option value="Market">Market</option>
            </select>
          </div>

          <div className="space-x-4">
            <button 
              onClick={handleAddOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Order
            </button>
            <button 
              onClick={handleCancelOrder}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel Last Order
            </button>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-gray-100 text-black rounded">
              {message}
            </div>
          )}
        </div>

        {/* Order Book Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Book</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Bids */}
            <div>
              <h3 className="text-lg font-medium mb-2">Bids</h3>
              <div className="border rounded overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bids.map((bid, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 text-green-600">${bid.price.toFixed(2)}</td>
                        <td className="px-4 py-2">{bid.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Asks */}
            <div>
              <h3 className="text-lg font-medium mb-2">Asks</h3>
              <div className="border rounded overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asks.map((ask, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 text-red-600">${ask.price.toFixed(2)}</td>
                        <td className="px-4 py-2">{ask.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
