import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"
import connectToDb from "../db/db.js";
import userRoutes from '../routes/user.routes.js'
import captainRoutes from "../routes/captain.routes.js"
import { mapsRoutes } from "../routes/maps.routes.js";
import { ridesRoutes } from "../routes/rides.routes.js";
const app = express();
app.use(cookieParser())
app.use(cors());
connectToDb();
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Backend is Woking Fine" })
})

app.use('/api/users',userRoutes)
app.use('/api/captains',captainRoutes)
app.use('/api/maps', mapsRoutes)
app.use('/api/rides', ridesRoutes);

export default app