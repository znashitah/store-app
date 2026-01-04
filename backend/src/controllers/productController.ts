import { Request, Response } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
} from '../models/productModel';
import { ApiResponse, PaginatedResponse } from '../types';

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category, subcategory, search, page = 1, limit = 10 } = req.query;

    const offset = ((Number(page) || 1) - 1) * (Number(limit) || 10);

    const { products, total } = await getAllProducts({
      category: category as string,
      subcategory: subcategory as string,
      search: search as string,
      limit: Number(limit),
      offset,
    });

    res.json({
      success: true,
      data: products,
      total,
      page: Number(page),
      limit: Number(limit),
    } as PaginatedResponse<any>);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: String(error),
    } as ApiResponse<null>);
  }
};

export const getProductDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await getProductById(Number(id));

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      } as ApiResponse<null>);
      return;
    }

    res.json({
      success: true,
      message: 'Product retrieved',
      data: product,
    });
  } catch (error) {
    console.error('Get product detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: String(error),
    } as ApiResponse<null>);
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: String(error),
    } as ApiResponse<null>);
  }
};