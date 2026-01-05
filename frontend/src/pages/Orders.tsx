import { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import { Order } from '../types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600">No orders yet</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
              <div>
                <p className="text-gray-600 text-sm">Order ID</p>
                <p className="font-semibold">#{order.id}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date</p>
                <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="font-semibold">${order.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className={`font-semibold ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.status.toUpperCase()}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Items:</h3>
              <div className="space-y-2">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.title} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}