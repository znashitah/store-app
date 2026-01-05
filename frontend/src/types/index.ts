// User/Auth
export interface User {
    id: number;
    email: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
      id: number;
      email: string;
      token: string;
    };
    error?: string;
  }
  
  // Product
  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    subcategory: string;
    image: string;
    createdAt: string;
  }
  
  export interface ProductsResponse {
    success: boolean;
    data: Product[];
    total: number;
    page: number;
    limit: number;
  }
  
  // Cart
  export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
    title: string;
    image?: string;
  }
  
  // Order
  export interface Order {
    id: number;
    userId: number;
    items: CartItem[];
    totalPrice: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: string;
  }
  
  export interface OrdersResponse {
    success: boolean;
    message: string;
    data: Order[];
  }
  
  // API Response
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }