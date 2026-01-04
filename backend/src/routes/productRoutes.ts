import { Router } from 'express';
import {
  getProducts,
  getProductDetail,
  addProduct,
} from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductDetail);
router.post('/', addProduct); // Can add authentication if needed

export default router;