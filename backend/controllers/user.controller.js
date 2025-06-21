import BlacklistToken from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import {validationResult} from 'express-validator'

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullname,email,password} = req.body;
    const isuserExist = await userModel.findOne({email})
    if(isuserExist){
      return res.status(400).json({message:"user already exist"});
    }
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token,user});
}

const loginUser = async(req,res) => {
     const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { email , password } = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }
  
    const token = user.generateAuthToken();
    res.cookie('token',token);

    res.status(200).json({token,user});

}


const getUserProfile = async (req,res) => {
  res.status(200).json(req.user);
}

const logoutUser = async (req, res) => {
   
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1]; 
     if (!token) {
        return res.status(400).json({ message: 'No token found' });
    }

    // Save token to blacklist
    await BlacklistToken.create({ token });

    // Clear token cookie
    res.clearCookie('token');

    return res.status(200).json({ message: 'Logged out' });
}

export  {registerUser , loginUser , getUserProfile,logoutUser};