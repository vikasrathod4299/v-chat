"use client";
import { createContext, useContext, useMemo } from "react";
import { SocketOptions, io } from "socket.io-client";
const SocketContext = createContext<SocketOptions | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => io("localhost:3001"), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export default SocketProvider;
