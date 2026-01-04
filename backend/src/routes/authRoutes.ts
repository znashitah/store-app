import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest, authSchema } from '../middleware/validation';

const router = Router();

router.post(
  '/register',
  validateRequest(authSchema.register),
  register
);

router.post(
  '/login',
  validateRequest(authSchema.login),
  login
);

router.get(
  '/profile',
  authenticateToken,
  getProfile
);

export default router;