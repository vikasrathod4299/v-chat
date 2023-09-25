"use client";

import { AvatarFallback } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { VideoIcon } from "lucide-react";
import React, { FC } from "react";

interface ChatPageProps {}

const messages = [
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
  {
    senderInitials: "CN",
    senderName: "Vikas Rathod",
    text: "Hello there how are you!",
  },
];

const Chat: FC<ChatPageProps> = ({}) => {
  return (
    <div className="min-h-screen">
      <div className="flex bg-white-300/10 px-6 py-4 justify-between items-center shadow-sm backdrop-blur-md border border-white/20">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-green-500 text-white">
              CN
            </AvatarFallback>
          </Avatar>

          <p className="font-bold text-lg">Jhon Doe</p>
        </div>

        <div>
          <VideoIcon className="h-8 w-8" />
        </div>
      </div>
      <div className="min-h-full">
        {messages.map((item, index) => {
          return (
            <div
              key={index}
              className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"}`}
            >
              <div className="chat-header">
                <time className="text-xs opacity-50 mx-2">12:45</time>
              </div>
              <div
                className={`chat-bubble ${index % 2 == 0 && "bg-indigo-500"}`}
              >
                You were the Chosen One!
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
