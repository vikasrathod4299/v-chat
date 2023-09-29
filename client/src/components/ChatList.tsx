import React, { FC } from "react";
import ChatBox from "./Chatbox";
import { User } from "@/lib/types";

interface ChatListProps {
  chats?: Array<{ id: number; participants: Array<User> }>;
  users?: Array<User>;
}

const ChatList: FC<ChatListProps> = ({ chats = null, users = null }) => {
  return (
    <>
      {chats && !users
        ? chats?.map((item: { id: number; participants: Array<User> }) => {
            return (
              <ChatBox
                key={item.id}
                id={item.id}
                userDetails={item.participants[0]}
              />
            );
          })
        : users?.map((item: User) => {
            return (
              <ChatBox key={item.id} userId={item.id} userDetails={item} />
            );
          })}
    </>
  );
};

export default ChatList;
