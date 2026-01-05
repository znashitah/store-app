import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import { Product } from '../types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll({
        category: category || undefined,
        search: search || undefined,
        limit: 12,
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="card hover:shadow-lg transition">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <p className="text-blue-600 font-bold">${parseFloat(product.price.toString()).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 && !loading && (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
}