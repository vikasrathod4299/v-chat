"use client";
import React, { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Search, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface navbarProps {
  list: boolean;
}

const Navbar: FC<navbarProps> = ({ list }) => {
  const router = useRouter();
  return (
    <div className="px-4 pb-2 w-full shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarFallback className="bg-green-700 text-white">
              CN
            </AvatarFallback>
          </Avatar>
          {!list && <p className="font-bold">User Name</p>}
        </div>
        {list && <div className="text-xl tracking-widest">CHATS</div>}
        <div>
          {list ? (
            <Search
              onClick={() => router.push("/search")}
              className="font-extralight"
            />
          ) : (
            <VideoIcon />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
