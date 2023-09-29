"use client";
import MessageList from "@/components/MessageList";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import { getAllMessagess, getUserByChatId, sendMessages } from "@/lib/apiCalls";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

interface ChatPageProps {
  params: {
    slug: string;
  };
}

const Chat: FC<ChatPageProps> = ({ params }) => {
  const router = useRouter();
  const { slug } = params;
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { socket } = useSocket();

  const { data: receiver } = useQuery(["userByChatId", slug], getUserByChatId);

  const { data: messages } = useQuery(["messages", slug], getAllMessagess, {
    enabled: !!slug && !!user && isConnected,
  });

  const { mutate: sendMessageMutation } = useMutation(sendMessages);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onMessageReceived = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    socket?.on("connected", onConnect);
    socket?.on("MessageReceived", onMessageReceived);
  }, [socket]);

  if (!user) {
    router.push("/");
    return;
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessageMutation({ data: message, chatId: slug });
  };

  return (
    <div className="min-h-screen ">
      {receiver?.data ? (
        <Navbar isMe={false} userDetails={receiver?.data.participants[0]} />
      ) : null}

      <div className="min-h-full p-2 overflow-y-auto">
        {messages?.data ? <MessageList messages={messages.data} /> : null}
      </div>

      <div className="flex fixed bottom-0 items-center w-full px-2 py-4 gap-2">
        <Input
          type="text"
          className="bg-white/20 h-12 backdrop-blur-md px-4 rounded-full placeholder:text-white"
          placeholder="Say Hi...✋"
          onChange={handleChangeInput}
        />
        <Button onClick={handleSendMessage} className="rounded-full h-12">
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
