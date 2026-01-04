import pool from '../config/database';

export const createUsersTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('✓ Users table ready');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  return result.rows[0];
};

export const createUser = async (email: string, hashedPassword: string) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
    [email, hashedPassword]
  );
  return result.rows[0];
};

export const findUserById = async (id: number) => {
  const result = await pool.query('SELECT id, email, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0];
};