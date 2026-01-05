import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector(state => state.cart);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.productId} className="card flex gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}

                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity - 1,
                      }))}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity + 1,
                      }))}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.productId))}
                    className="text-red-600 hover:text-red-800 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="card h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(totalPrice + 10).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="btn-primary w-full"
          >
            Checkout
          </button>

          <button
            onClick={() => navigate('/')}
            className="btn-secondary w-full mt-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}