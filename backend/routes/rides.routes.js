import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
router.post(
  '/create',
  [
    body('userId')
      .isString()
      .isLength({ min: 24, max: 24 })
      .withMessage('Invalid user ID'),

    body('pickup')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Invalid pickup address'),

    body('destination')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Invalid destination address'),
  ],
  createRide
);

export {router as ridesRoutes};