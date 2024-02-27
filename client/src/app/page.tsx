"use client";
import ChatList from "@/components/ChatList";
import Navbar from "@/components/Navbar";
import ChatBoxSkeleton from "@/components/loaders/ChatBoxSkeleton";
import SkeletonLoader from "@/components/loaders/SkeletonLoader";
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
    socket?.on(" ", newChat);
  }, [socket, newChat]);

  if (!user) {
    router.push("/sign-in");
    return;
  }

  return (
    <main className="min-h-screen overflow-y-auto flex flex-col bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 md:container">
      <Navbar isMe={true} userDetails={user} />
      <div className="h-full mt-20">
        {chats ? (
          <ChatList chats={chats.data} />
        ) : (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
            return (
              <SkeletonLoader key={item}>
                <ChatBoxSkeleton />
              </SkeletonLoader>
            );
          })
        )}
      </div>
    </main>
  );
}
