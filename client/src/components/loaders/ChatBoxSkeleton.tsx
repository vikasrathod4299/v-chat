import React from "react";

const ChatBoxSkeleton = () => {
  return (
    <div className="flex gap-x-4 items-center m-2 mt-6">
      <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex-shrink-0"></div>
      <div className="w-full flex flex-col gap-2">
        <div className="h-5 w-1/2 bg-white/30 backdrop-blur-md border border-white/20 rounded-md"></div>
        <div className="h-5 bg-white/30 backdrop-blur-md border border-white/20 rounded-md"></div>
      </div>
    </div>
  );
};

export default ChatBoxSkeleton;
