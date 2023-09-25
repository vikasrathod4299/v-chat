"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import { LocalStorage } from "@/lib/utils";

// Function to establish a socket connection with authorization token
const getSocket = () => {
  const { access_token } = LocalStorage.get("user"); // Retrieve jwt token from local storage or cookie
  if (!access_token) {
    return null;
  }
  // Create a socket connection with the provided URI and authentication
  return socketio("localhost:3001", {
    withCredentials: true,
    auth: { access_token },
  });
};

// Create a context to hold the socket instance
const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

// Custom hook to access the socket instance from the context
const useSocket = () => useContext(SocketContext);

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to store the socket instance
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );

  // Set up the socket connection when the component mounts
  useEffect(() => {
    setSocket(getSocket());
  }, []);

  return (
    // Provide the socket instance through context to its children
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket };
