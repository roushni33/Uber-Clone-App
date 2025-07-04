import express from 'express';
const router = express.Router();
import { body,query } from 'express-validator';
import {  confirmRideController, createRideController, endRideController, getFareController ,startRideController } from '../controllers/Ride.Controller.js';
import { authCaptain, authUser } from '../middlewares/auth.middleware.js';

router.post(
  '/create',
  authUser,
  [
   

    body('pickup')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Invalid pickup address'),

    body('destination')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Invalid destination address'),

     body('vehicleType')
      .isString()
      .isIn(['auto', 'car', 'moto'])
      .withMessage('Invalid vehicle type'), 
  ],
  createRideController
);


router.get('/get-fare',authUser,
  query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
  query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
  getFareController
)

router.post('/confirm', 
  authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
 
  confirmRideController
)

router.get('/start-ride' ,
  authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride id'),
  query('otp').isString().isLength({ min: 6, max: 6}).withMessage('Invalid otp'),
  startRideController
)

router.post('/end-ride',
  authCaptain,
  body('rideId').isMongoId().withMessage("Invalid ride id"),
  endRideController
)

export {router as ridesRoutes};