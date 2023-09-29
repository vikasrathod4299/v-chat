import { Message } from "@/lib/types";
import React, { FC, use } from "react";
import moment from "moment";
import { useAuth } from "@/hooks/useAuth";
interface MesssageListProps {
  messages: Array<Message>;
}

const MessageList: FC<MesssageListProps> = ({ messages }) => {
  const { user } = useAuth();
  return (
    <>
      {messages?.map((item: Message) => {
        return (
          <div
            key={item.id}
            className={`chat ${
              user?.id !== item.userId ? "chat-start" : "chat-end"
            }`}
          >
            <div className="chat-header">
              <time className="text-xs opacity-50 mx-2">
                {moment(item.createdAt).fromNow()}
              </time>
            </div>

            <div
              className={`chat-bubble ${
                user?.id !== item.userId && "bg-indigo-500"
              }`}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MessageList;
