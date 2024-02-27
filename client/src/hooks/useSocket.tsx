"use client";
import { LocalStorage } from "@/lib/utils";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import socketio from "socket.io-client";

const socketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({ socket: null });

export const useSocket = () => {
  return useContext(socketContext);
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );

  useEffect(() => {
    const user = LocalStorage.get("user");
    if (user) {
      const socket = socketio("http://localhost:3001", {
        withCredentials: true,
        auth: {
          access_token: user.access_token,
        },
      });
      setSocket(socket);
    }
  }, []);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
