"use client";
import React, { useEffect } from "react";
import type { User } from "@/lib/types";
import { createContext, useContext, useState } from "react";
import { LocalStorage } from "@/lib/utils";

type authContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const authContext = createContext<authContextType | null>(null);

export const useAuth = (): authContextType => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  } else {
    return context;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const data = LocalStorage.get("user");
  const [user, setUser] = useState(data);

  useEffect(() => {
    LocalStorage.set("user", user);
  }, [user]);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
