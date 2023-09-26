"use client";
import React, { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { useAuth } from "@/hooks/useAuth";
import axios, { AxiosResponse } from "axios";

interface ChatBoxProps {
  id?: number;
  userId?: number;
}

const ChatBox: FC<ChatBoxProps> = ({ id, userId }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { refetch } = useQuery(
    ["chats", userId, user?.id],
    async () => {
      return await axios.get(`http://localhost:3001/api/chat/${userId}`, {
        headers: { authorization: user?.access_token },
      });
    },
    {
      onSuccess: (data: AxiosResponse) => {
        console.log(data.data);
        router.push(`chat/${data.data.id}`);
      },
      enabled: false,
    }
  );

  const handleClick = async () => {
    if (id) {
      router.push(`chat/${id}`);
    } else {
      refetch();
    }
  };
  return (
    <div onClick={handleClick}>
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
