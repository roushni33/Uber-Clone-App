import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
     fare: {
        type:Number,
        required: true,
     },

     status:{
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending'
     }
})

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;