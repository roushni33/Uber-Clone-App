import captainModel from "../models/captain.model.js";

const createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            plate,
            color,
            capacity,
            vehicleType
        }
    });

    return captain;
}

export default { createCaptain }