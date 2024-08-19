"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useCurrentUser } from "@/hooks/use-current-user";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const currentUser = useCurrentUser();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    // Create a new Socket.IO instance
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
      transports: ["websocket"],
    });

    // Set the socket instance to state
    setSocket(socketInstance);

    // Log a message when the socket connection is established
    socketInstance.on("connect", () => {
      console.log("Connected to Web Socket Server");
    });

    socketInstance.emit("userConnect", {
      userId: currentUser.id,
    });

  

    // Log a message if there's an error connecting
    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Clean up on component unmount
    return () => {
      socketInstance.disconnect();
      socketInstance.off("connect");
      socketInstance.off("connect_error");
      socketInstance.off("disconnect");
      socketInstance.off("userConnect");
      socketInstance.off("changeOrderStatusToProcessing");
      console.log("Disconnected from Web Socket Server");
    };
  }, [currentUser.id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
