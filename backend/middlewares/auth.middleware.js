import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import BlacklistToken from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";


const authUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "unauthorized req" });
    }

    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized req" });

    }
}


const authCaptain = async (req,res,next) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "unauthorized req" });
    }

    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized req" });

    }
}

export  {authUser , authCaptain};