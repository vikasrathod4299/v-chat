"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Provider;
