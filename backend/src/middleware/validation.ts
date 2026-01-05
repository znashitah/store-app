import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Validation schemas
export const authSchema = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const productSchema = {
  create: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    image: Joi.string().uri().required(),
  }),
};

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail: Joi.ValidationErrorItem) => detail.message);
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