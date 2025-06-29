import { createRide } from '../services/ride.service.js';
import { validationResult } from 'express-validator';

export const createRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {user, pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRide({
            user: req.user._id, 
            pickup,
            destination,
            vehicleType
        });
        return res.status(201).json({ ride });
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
