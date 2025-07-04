import { get } from 'mongoose';
import rideModel from '../models/ride.model.js';
import { getDistanceTime} from './maps.service.js'
import crypto from 'crypto';
import { sendMessageToSocketId } from '../socket.js';


export const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await getDistanceTime(pickup, destination);

  const baseFares = {
    auto: 15,
    car: 25,
    moto: 10
  };

  const perKmRates = {
    auto: 5,
    car: 7,
    moto: 4
  };

  const perMinRates = {
    auto: 1,
    car: 1.5,
    moto: 0.75
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
};


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

export const confirmRide = async (rideId) => {
  if(!rideId){
    throw new Error('Ride id is required');
  }
   
  await rideModel.findOneAndUpdate({
    id:rideId,
    captain
  },{
    status:'accepted',
    captain: captain._id
  })
  const ride = await rideModel.findOne({
    _id: rideId
  }).populate('user').populate('captain').select('+otp')
  if(!ride){
    throw new Error('Ride not found')
  }
  return ride;
}

export const startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) {
    throw new Error('Ride id, otp, and captain are required');
  }

  // Find the ride
  const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
  if (!ride) {
    throw new Error('Ride not found');
  }

  // Check if the ride is accepted and the captain matches
  if (ride.status !== 'accepted' || String(ride.captain._id) !== String(captain._id)) {
    throw new Error('Ride is not accepted or captain mismatch');
  }

  // Check OTP
  if (ride.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  // Update ride status to ongoing
 await rideModel.findOneAndUpdate({
  _id:rideId
 },{
  status:'ongoing'
 })

 sendMessageToSocketId(ride.user.socketId,
  'ride-started',
  ride
 )

 return ride;
} 

export const endRide = async ({rideId,captain}) => {
   if(!rideId){
    throw new Error('Ride id is required');
  }

  const ride = await rideModel.findOne({
    _id: rideId,
    captain: captain._id
  }).populate('user').populate('captain').select('+otp');

  if(!ride){
    throw new Error('Ride not found');
  }

  if(ride.status !== 'ongoing'){
    throw new Error('Ride not ongoing');
  }

  await rideModel.findOneAndUpdate({
    _id:rideId
  },{
    status: 'completed'
  })

  return ride;
}