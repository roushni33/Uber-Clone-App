import { createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { UserDataContext } from "./UserContext";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

const SocketProvider = ({ children }) => {
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      if (user && user._id) {
        socket.emit("join", { userType: "user", userId: user._id });
      }
    };
    socket.on("connect", handleConnect);
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Emit join immediately if already connected (for hot reloads or fast refresh)
    if (socket.connected && user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect");
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;