"use client";
import React, { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ChatBoxProps {
  id?: string;
  username?: string;
  chat?: any;
}

const ChatBox: FC<ChatBoxProps> = ({ id, username, chat }) => {
  return (
    <div>
      <div className="flex w-full h-18 gap-x-4 items-center m-2">
        <Avatar className="h-14 w-14">
          <AvatarFallback className=" text-sm text-white font-bold bg-pink-700">
            CN
          </AvatarFallback>
        </Avatar>
        <div className="pt-1">
          <p className="font-bold text-sm">Jhon Doe</p>
          <p className="py-1 text-xs overflow-hidden overflow-ellipsis max-h-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            corporis repudiandae exercitationem sed placeat quae expedita nisi
            velit quos iste quisquam adipisci, voluptate veniam iusto
            voluptatem! Ipsa quisquam obcaecati dolor!
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ChatBox;
