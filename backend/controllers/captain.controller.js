import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import {validationResult} from 'express-validator'
 
const registerCaptain = async (req,res) => {
 const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullname,email,password,vehicle} = req.body;
    const isCaptainAlreadtExist = await captainModel.findOne({email});
    if(isCaptainAlreadtExist){
        return res.status(400).json({message: "captain already exist"})
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,

    });

    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});
}

export {registerCaptain}