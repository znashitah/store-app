import axios, { type  AxiosInstance } from 'axios';
import  type { AuthResponse, ProductsResponse, OrdersResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', {
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Product Services
export const productService = {
  getAll: async (params: {
    page?: number;
    limit?: number;
    category?: string;
    subcategory?: string;
    search?: string;
  }): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>('/products', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

// Order Services
export const orderService = {
  checkout: async (items: any[], totalPrice: number): Promise<OrdersResponse> => {
    const response = await api.post<OrdersResponse>('/orders/checkout', {
      items,
      totalPrice,
    });
    return response.data;
  },

  getOrders: async (): Promise<OrdersResponse> => {
    const response = await api.get<OrdersResponse>('/orders');
    return response.data;
  },

  getOrderById: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export default api