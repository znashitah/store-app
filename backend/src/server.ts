import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database';
import { createUsersTable } from './models/userModel';
import { createProductsTable } from './models/productModel';
import { createOrdersTable } from './models/orderModel';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Initialize database
const initDatabase = async () => {
  try {
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log('✓ Connected to PostgreSQL');

    // Create tables
    await createUsersTable();
    await createProductsTable();
    await createOrdersTable();

    console.log('✓ All tables initialized');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 API Documentation:`);
      console.log(`   Auth: POST   /api/auth/register`);
      console.log(`   Auth: POST   /api/auth/login`);
      console.log(`   Auth: GET    /api/auth/profile (requires token)`);
      console.log(`   Products: GET    /api/products`);
      console.log(`   Products: GET    /api/products/:id`);
      console.log(`   Orders: POST   /api/orders/checkout (requires token)`);
      console.log(`   Orders: GET    /api/orders (requires token)`);
      console.log(`   Orders: GET    /api/orders/:id (requires token)\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();