"use client";
import React, { FC } from "react";
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
    <div
      className="cursor-pointer border border-t-0 border-l-0 border-r-0 border-slate-500/10"
      onClick={handleClick}
    >
      <div className="flex gap-x-4 items-center m-2">
        <UserAvatar userDetails={userDetails} />
        <div>
          <p className="font-bold text-sm">{userDetails.username}</p>
          <p className="py-1 text-xs overflow-hidden overflow-ellipsis max-h-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            corporis repudiandae exercitationem sed placeat quae expedita nisi
            velit quos iste quisquam adipisci, voluptate veniam iusto
            voluptatem! Ipsa quisquam obcaecati dolor!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
