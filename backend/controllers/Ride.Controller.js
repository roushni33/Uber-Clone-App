import { getAddressCordinates, getDistanceTime } from '../services/maps.service.js';
import { createRide, endRide, getFare, startRide } from '../services/ride.service.js';
import { validationResult } from 'express-validator';
import { getCaptainsInTheRadius } from '../services/maps.service.js';
import { sendMessageToSocketId } from '../socket.js'
import rideModel from '../models/ride.model.js';
import userModel from '../models/user.model.js';


export const createRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        res.status(201).json({ ride });

        const pickupCoordinates = await getAddressCordinates(pickup);
        console.log(pickupCoordinates);
        const CaptainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 1000)
        console.log(CaptainsInRadius)
        ride.otp = ""
        const rideWithUser = await rideModel.findById(ride._id).populate('user')
        CaptainsInRadius.map(captain => {
            console.log("sending to captain", captain.socketId)
            sendMessageToSocketId(captain.socketId,
                'new-ride',
                rideWithUser
            )
        })


    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const getFareController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await getFare(pickup, destination);
        const distanceTime = await getDistanceTime(pickup, destination);
        return res.status(200).json({
            fare,
            distance: distanceTime.distance,
            duration: distanceTime.duration
        });
    } catch (error) {
        console.error('Error fetching fare:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const confirmRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, captainId } = req.body;
    if (!rideId || !captainId) {
        return res.status(400).json({ error: 'Ride id and captain id are required' });
    }

    try {
        await rideModel.findOneAndUpdate(
            { _id: rideId },
            {
                status: 'accepted',
                captain: captainId
            }
        );
        const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, 'ride-confirmed', ride);
        }

        return res.status(200).json(ride);
    } catch (error) {
        console.error('Error confirming ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const startRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRide({ rideId, otp, captain: req.captain });
        console.log('Emitting ride-started to user socketId:', ride.user.socketId);

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const endRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }

    const { rideId } = req.body;
    try {

        const ride = await endRide({ rideId, captain: req.captain })
        
        sendMessageToSocketId(ride.user.socketId, 'ride-ended', ride);


        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
}