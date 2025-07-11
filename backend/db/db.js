import mongoose from "mongoose";

async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to the database");
    }).catch(err => console.log(err));
}

export default connectToDb;