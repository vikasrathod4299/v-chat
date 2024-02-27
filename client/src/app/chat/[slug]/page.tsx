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
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface ChatPageProps {
  params: {
    slug: string;
  };
}

const Chat: FC<ChatPageProps> = ({ params }) => {
  const { slug } = params;
  const router = useRouter();
  const { user } = useAuth();
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string>("");

  const messageListRef = useRef<HTMLDivElement | null>(null);

  const { data: receiver } = useQuery(["userByChatId", slug], getUserByChatId, {
    onSuccess: () => {
      socket?.emit("JoinChat", slug);
    },
  });

  const scrollToBottem = () => {
    if (messageListRef.current) {
      // messageListRef.current?.scrollIntoView({
      //   behavior: "smooth",
      //   block: "start",
      // });
      // console.log("scrolling");
      window.scrollTo(0, 0);
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const { data: messages } = useQuery(["messages", slug], getAllMessagess, {
    enabled: !!slug && !!user,
  });

  useEffect(() => {
    scrollToBottem();
  }, [messages]);

  const { mutate: sendMessageMutation } = useMutation(sendMessages);

  const onMessageReceived = useCallback(
    (data: any) => {
      if (messages?.data) {
        queryClient.setQueryData(["messages", slug], {
          ...messages,
          data: [data, ...messages?.data],
        });
      }
    },
    [queryClient, slug, messages]
  );

  useEffect(() => {
    socket?.emit("JoinChat", slug);
    socket?.on("MessageReceived", onMessageReceived);
  }, [socket, slug, onMessageReceived]);

  if (!user) {
    router.push("/");
    return;
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessageMutation({ data: message, chatId: slug });
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple- to-indigo-400">
      {receiver?.data ? (
        <Navbar isMe={false} userDetails={receiver?.data.participants[0]} />
      ) : null}

      <div className="h-screen flex flex-col-reverse w-full p-2 overflow-y-auto">
        {messages?.data ? <MessageList messages={messages.data} /> : null}
        <div ref={messageListRef} />
      </div>

      <form
        className="sticky bottom-0 flex items-center w-full px-2 py-4  max-h-[400px] gap-2"
        onSubmit={handleSendMessage}
      >
        <Input
          type="text"
          value={message}
          className="bg-white/20 h-12 backdrop-blur-md px-4 rounded-full placeholder:text-white"
          placeholder="Say Hi...✋"
          onChange={handleChangeInput}
        />
        <Button type="submit" className="rounded-full h-12">
          <SendHorizonal />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
