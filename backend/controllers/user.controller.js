import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import {validationResult} from 'express-validator'

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullname,email,password} = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.firstname,
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

    res.status(200).json({token,user});

}


export default {registerUser , loginUser};