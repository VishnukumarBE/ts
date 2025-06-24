// middlewares/validate.ts
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

type ValidateOptions = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export const validate = (schemas: ValidateOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({ type: 'body', errors: result.error.errors });
        }
        req.body = result.data;
      }

      if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success) {
          return res.status(400).json({ type: 'query', errors: result.error.errors });
        }
        req.query = result.data;
      }

      if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success) {
          return res.status(400).json({ type: 'params', errors: result.error.errors });
        }
        req.params = result.data;
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Validation middleware error', error: err });
    }
  };
};
