import express from "express"

import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

const app = express();


app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello Roushni Devi" })
})

export default app