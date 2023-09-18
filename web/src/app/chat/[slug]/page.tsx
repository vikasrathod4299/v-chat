"use client";
import Navbar from "@/components/Navbar";

import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";

import React, { FC } from "react";

interface ChatProps {
  params: {
    slug: string;
  };
}

const Chat: FC<ChatProps> = ({ params }) => {
  const { slug } = params;
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

  return (
    <div className="flex flex-col h-screen">
      <Navbar list={false} />
      <div className="flex-grow overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"}`}
          >
            <div className="chat-header">
              <time className="text-xs opacity-50 mx-2">12:45</time>
            </div>
            <div className={`chat-bubble ${index % 2 == 0 && "bg-indigo-500"}`}>
              You were the Chosen One!
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-x-2 p-2 ">
        <Input className="rounded-full" placeholder="Say 'Hi'👋" />
        <div className="flex justify-center items-center h-10 w-11 bg-black rounded-full shadow-lg">
          <SendHorizonal className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
