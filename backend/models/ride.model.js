import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
        
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
     },

     duration:{
        type: Number,
    },

    distance:{
        type: Number,

    },
     
    paymentID:{
        type: String,
    },

    orderedId : {
        type: String,
    },

    signature:{
        type: String,
    },


    otp:{
        type: String,
        select: false,
        required:true,
    }
})

const rideModel = mongoose.model("ride", rideSchema);
export default rideModel;