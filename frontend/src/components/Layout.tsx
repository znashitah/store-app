import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const { items } = useAppSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            StoreName
          </Link>

          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-sm">Welcome, {user?.email}</span>
                <Link to="/orders" className="hover:text-gray-200">
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-200">
                  Register
                </Link>
              </>
            )}
            <Link
              to="/cart"
              className="relative hover:text-gray-200"
            >
              Cart ({items.length})
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Store App. All rights reserved.</p>
      </footer>
    </div>
  );
}