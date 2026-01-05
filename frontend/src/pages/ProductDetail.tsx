import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { Product } from '../types';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getById(Number(id));
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addToCart({
      productId: product.id,
      quantity,
      price: parseFloat(product.price.toString()),
      title: product.title,
      image: product.image,
    }));

    alert('Added to cart!');
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">Product not found</p>;

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded shadow-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.category} / {product.subcategory}</p>
          <p className="text-3xl font-bold text-blue-600 mb-6">
            ${parseFloat(product.price.toString()).toFixed(2)}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex gap-4 items-center mb-6">
            <div className="flex items-center gap-2">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-16 input-field text-center"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1"
            >
              Add to Cart
            </button>
          </div>

          {!isAuthenticated && (
            <p className="bg-yellow-100 text-yellow-800 p-3 rounded">
              Please <a href="/login" className="text-blue-600">login</a> to purchase
            </p>
          )}
        </div>
      </div>
    </div>
  );
}