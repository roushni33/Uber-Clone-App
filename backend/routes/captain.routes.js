import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { registerCaptain } from '../controllers/captain.controller.js';
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid'),
],
    registerCaptain
)



export default router;