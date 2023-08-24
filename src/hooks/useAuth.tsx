"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type authContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};
const authContext = createContext<authContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedUser = localStorage.getItem("user");
  const initailUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState(initailUser);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

export default AuthProvider;
