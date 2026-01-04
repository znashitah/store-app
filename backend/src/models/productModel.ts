import pool from '../config/database';
import { Product, ProductQuery } from '../types';

export const createProductsTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      subcategory VARCHAR(100) NOT NULL,
      image VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('✓ Products table ready');
  } catch (error) {
    console.error('Error creating products table:', error);
  }
};

export const getAllProducts = async (
  query: ProductQuery
): Promise<{ products: Product[]; total: number }> => {
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params: (string | number)[] = [];
  let paramCount = 1;

  if (query.category) {
    sql += ` AND category = $${paramCount}`;
    params.push(query.category);
    paramCount++;
  }

  if (query.subcategory) {
    sql += ` AND subcategory = $${paramCount}`;
    params.push(query.subcategory);
    paramCount++;
  }

  if (query.search) {
    sql += ` AND title ILIKE $${paramCount}`;
    params.push(`%${query.search}%`);
    paramCount++;
  }

  const countResult = await pool.query(
    sql.replace('SELECT *', 'SELECT COUNT(*) as count'),
    params
  );
  const total = parseInt(countResult.rows[0].count);

  const limit = query.limit || 10;
  const offset = query.offset || 0;
  sql += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
  params.push(limit, offset);

  const result = await pool.query(sql, params);
  return { products: result.rows, total };
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  const result = await pool.query(
    `INSERT INTO products (title, description, price, category, subcategory, image)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [product.title, product.description, product.price, product.category, product.subcategory, product.image]
  );
  return result.rows[0];
};