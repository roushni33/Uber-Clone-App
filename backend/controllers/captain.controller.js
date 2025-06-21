import BlacklistToken from "../models/blacklistToken.model.js";
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

const loginCaptain = async(req,res) => {
     const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { email , password } = req.body;

    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }
  
    const token = captain.generateAuthToken();
    res.cookie('token',token);

    res.status(200).json({token,captain});

}

const getCaptainProfile = async (req,res) => {
  res.status(200).json(req.captain);
}

const logoutCaptain = async (req,res) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1]; 
     if (!token) {
        return res.status(400).json({ message: 'No token found' });
    }

    
    await BlacklistToken.create({ token });

    
    res.clearCookie('token');

    return res.status(200).json({ message: 'Logged out' });
}

export {registerCaptain , loginCaptain , getCaptainProfile , logoutCaptain}