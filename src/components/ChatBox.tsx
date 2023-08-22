import React, { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";

interface ChatBoxProps {
  id: string;
}

const ChatBox: FC<ChatBoxProps> = ({ id }) => {
  return (
    <Link href={`chat/${id}`}>
      <div className="flex w-full h-18 gap-x-4 items-center m-2">
        <Avatar className="h-14 w-14">
          <AvatarFallback className=" text-sm text-white font-bold bg-pink-700">
            CN
          </AvatarFallback>
        </Avatar>
        <div className="pt-1">
          <p className="font-bold text-sm">User Name</p>
          <p className="py-1 text-xs overflow-hidden overflow-ellipsis max-h-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            corporis repudiandae exercitationem sed placeat quae expedita nisi
            velit quos iste quisquam adipisci, voluptate veniam iusto
            voluptatem! Ipsa quisquam obcaecati dolor!
          </p>
        </div>
      </div>
      <hr />
    </Link>
  );
};

export default ChatBox;
