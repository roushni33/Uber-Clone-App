import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
let io = null;

export function initialiseSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            if (userType === 'user') {
                console.log("User connected")
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                console.log("Captain connected")
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                // console.log(`Updated captain ${userId} with socketId ${socket.id}`);
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' })
            }
            await captainModel.findByIdAndUpdate(userId,
                {
                    location: {
                        type: 'Point',
                        coordinates: [location.lng, location.ltd] 
                    }
                }
            );


        });
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
}

export function sendMessageToSocketId(socketId, event, message) {
    if (io) {
        io.to(socketId).emit(event, message);
    } else {
        console.log("Socket.io not initialized");
    }
}