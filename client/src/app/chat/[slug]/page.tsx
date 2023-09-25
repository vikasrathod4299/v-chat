"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, VideoIcon } from "lucide-react";
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
    <div className="min-h-screen ">
      <div className="fixed z-50 w-full flex bg-white/10 px-6 py-4 justify-between items-center shadow-sm backdrop-blur-md border border-white/20">
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
      <div className="min-h-full p-2 overflow-y-auto">
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
      <div className="flex fixed bottom-0 items-center w-full px-2 py-4 gap-2">
        <Input
          type="text"
          className="bg-white/20 h-12 backdrop-blur-md px-4 rounded-full placeholder:text-white"
          placeholder="Say Hi...✋"
        />
        <Button className="rounded-full h-12">
          <SendHorizonal className="" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
