import { get } from 'mongoose';
import rideModel from '../models/ride.model.js';
import { getDistanceTime} from './maps.service.js'
import crypto from 'crypto';


async function  getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required ');
    }
    const distanceTime = await getDistanceTime(pickup, destination);
    const baseFares = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRates = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinRates = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

       const { distance, duration } = distanceTime; 
    const distanceInKm = distance.value / 1000;
    const durationInMin = duration.value / 60;

     const fares = {};
    
    for (const type of Object.keys(baseFares)) {
        fares[type] =
            baseFares[type] +
            perKmRates[type] * distanceInKm +
            perMinRates[type] * durationInMin;
    }

    return fares;
    
}

function  getOtp(num){
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < num; i++) {
        const idx = crypto.randomInt(0, digits.length);
        otp += digits[idx];
    }
    return otp;
}

export const createRide = async  ({ 
    user, 
    pickup, 
    destination, 

    vehicleType 
}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    })
    return ride;
 }


