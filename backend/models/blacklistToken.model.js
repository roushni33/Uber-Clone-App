import mongoose from "mongoose";
const blacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    blacklistedAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 }
});

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default BlacklistToken;