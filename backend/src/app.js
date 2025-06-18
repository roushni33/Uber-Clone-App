import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import express from "express"
import cors from "cors";
import connectToDb from "../db/db.js";
import userRoutes from '../routes/user.routes.js'
const app = express();
app.use(cors());
connectToDb();
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello Roushni Devi" })
})

app.use('/users',userRoutes)

export default app