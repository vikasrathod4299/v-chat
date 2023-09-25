"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LocalStorage } from "@/lib/utils";
type authContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};
const authContext = createContext<authContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedUser = LocalStorage.get("user");
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    LocalStorage.set("user", user);
  }, [user]);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = (): authContextType => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
