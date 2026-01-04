import pool from '../config/database';
import { Order, CartItem } from '../types';

export const createOrdersTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      items JSONB NOT NULL,
      total_price DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      title VARCHAR(255) NOT NULL
    );
  `;
  try {
    await pool.query(query);
    console.log('✓ Orders table ready');
  } catch (error) {
    console.error('Error creating orders table:', error);
  }
};

export const createOrder = async (userId: number, items: CartItem[], totalPrice: number): Promise<Order> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, items, total_price, status)
       VALUES ($1, $2, $3, 'pending')
       RETURNING *`,
      [userId, JSON.stringify(items), totalPrice]
    );

    const order = orderResult.rows[0];

    // Insert individual order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price, title)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.productId, item.quantity, item.price, item.title]
      );
    }

    await client.query('COMMIT');
    return order;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getUserOrders = async (userId: number): Promise<Order[]> => {
  const result = await pool.query(
    `SELECT o.*, 
            json_agg(json_build_object(
              'productId', oi.product_id,
              'quantity', oi.quantity,
              'price', oi.price,
              'title', oi.title
            )) as items
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     WHERE o.user_id = $1
     GROUP BY o.id
     ORDER BY o.created_at DESC`,
    [userId]
  );
  return result.rows;
};

export const getOrderById = async (orderId: number, userId: number): Promise<Order | null> => {
  const result = await pool.query(
    `SELECT o.*, 
            json_agg(json_build_object(
              'productId', oi.product_id,
              'quantity', oi.quantity,
              'price', oi.price,
              'title', oi.title
            )) as items
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     WHERE o.id = $1 AND o.user_id = $2
     GROUP BY o.id`,
    [orderId, userId]
  );
  return result.rows[0] || null;
};