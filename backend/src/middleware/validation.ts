import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

// Validation schemas
export const authSchema = {
  register: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),
  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

export const productSchema = {
  create: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().positive().required(),
    category: joi.string().required(),
    subcategory: joi.string().required(),
    image: joi.string().uri().required(),
  }),
};

export const validateRequest = (schema: joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: messages,
      });
      return;
    }

    req.body = value;
    next();
  };
};