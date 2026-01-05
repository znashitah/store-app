import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useAppDispatch } from '../store/hooks';
import { loginSuccess, setError, setLoading } from '../store/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorState] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await authService.login(email, password);
      if (response.success && response.data) {
        dispatch(loginSuccess(response.data));
        navigate('/');
      } else {
        setErrorState(response.message);
        dispatch(setError(response.message));
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setErrorState(errorMsg);
      dispatch(setError(errorMsg));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
}