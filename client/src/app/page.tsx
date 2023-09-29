"use client";
import ChatList from "@/components/ChatList";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import { getAllchats } from "@/lib/apiCalls";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function Home() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: chats } = useQuery(["chats"], getAllchats, {
    enabled: !!user,
  });

  const onConnect = (data: string) => {
    console.log(`Hey ${data}, you are conneted to v-chat`);
  };

  const newChat = useCallback(
    (data: { id: number; participant: Array<User> }) => {
      if (chats?.data) {
        queryClient.setQueryData("chats", {
          ...chats,
          data: [...chats.data, data],
        });
      }
    },
    [queryClient, chats]
  );

  useEffect(() => {
    if (!socket) return;
    socket?.on("connected", onConnect);
    socket?.on("NewChat", newChat);
  }, [socket, newChat]);

  if (!user) {
    router.push("/sign-in");
    return;
  }

  console.log(chats);

  return (
    <main className="flex h-screen flex-col md:container">
      <Navbar isMe={true} userDetails={user} />
      <ChatList chats={chats?.data} />
    </main>
  );
}
