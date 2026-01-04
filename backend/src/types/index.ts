// User Types
export interface User {
    id: number;
    email: string;
    password?: string;
    createdAt: Date;
  }
  
  export interface AuthPayload {
    id: number;
    email: string;
  }
  
  export interface JwtPayload {
    id: number;
    email: string;
    iat: number;
    exp: number;
  }
  
  // Product Types
  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    subcategory: string;
    image: string;
    createdAt: Date;
  }
  
  export interface ProductQuery {
    category?: string;
    subcategory?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }
  
  // Cart Types
  export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
    title: string;
  }
  
  // Order Types
  export interface Order {
    id: number;
    userId: number;
    items: CartItem[];
    totalPrice: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }
  
  export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    total: number;
    page: number;
    limit: number;
  }