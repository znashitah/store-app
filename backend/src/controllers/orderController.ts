import { Request, Response } from 'express';
import { createOrder, getUserOrders, getOrderById } from '../models/orderModel';
import { ApiResponse, CartItem } from '../types';

export const checkout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { items, totalPrice } = req.body;
    const userId = req.user!.id;

    if (!items || items.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Cart is empty',
      } as ApiResponse<null>);
      return;
    }

    const order = await createOrder(userId, items as CartItem[], totalPrice);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: String(error),
    } as ApiResponse<null>);
  }
};

export const getOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const orders = await getUserOrders(userId);

    res.json({
      success: true,
      message: 'Orders retrieved',
      data: orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: String(error),
    } as ApiResponse<null>);
  }
};

export const getSingleOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const order = await getOrderById(Number(id), userId);
    if (!order) {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      } as ApiResponse<null>);
      return;
    }

    res.json({
      success: true,
      message: 'Order retrieved',
      data: order,
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: String(error),
    } as ApiResponse<null>);
  }
};