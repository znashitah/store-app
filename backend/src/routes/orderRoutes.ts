import { Router } from 'express';
import {
  checkout,
  getOrders,
  getSingleOrder,
} from '../controllers/orderController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/checkout', authenticateToken, checkout);
router.get('/', authenticateToken, getOrders);
router.get('/:id', authenticateToken, getSingleOrder);

export default router;