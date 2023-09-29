"use client";
import React, { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { User } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import { fetchChatByUserId } from "@/lib/apiCalls";

interface ChatBoxProps {
  id?: number;
  userId?: number;
  userDetails: User;
}

const ChatBox: FC<ChatBoxProps> = ({ id, userId, userDetails }) => {
  const router = useRouter();

  const { refetch } = useQuery(
    ["chats", userId?.toString() || ""],
    fetchChatByUserId,
    {
      onSuccess: (data) => {
        router.push(`chat/${data.data.id}`);
      },
      enabled: false,
    }
  );

  const handleClick = async () => {
    if (id) {
      router.push(`chat/${id}`);
    } else if (userId) {
      refetch();
    } else {
      console.log("User Id is not provided");
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <div className="flex w-full h-18 gap-x-4 items-center m-2">
        <UserAvatar userDetails={userDetails} />
        <div className="pt-1">
          <p className="font-bold text-sm">{userDetails.username}</p>
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
