import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-yellow-500 flex justify-center items-center shadow-md">
      <div className="bg-white/20 backdrop-blur-md border border-white/40 p-8 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default layout;
