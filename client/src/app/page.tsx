"use client";
import ChatBox from "@/components/Chatbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import axios from "axios";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function Home() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const router = useRouter();

  const { data: chats } = useQuery(
    ["chats"],
    async () => {
      return await axios.get("http://localhost:3001/api/chat", {
        headers: { authorization: user?.access_token },
      });
    },
    {
      enabled: !!user,
    }
  );

  useEffect(() => {
    socket?.on("connected", (data) => {
      console.log(`Hey ${data}, you are conneted to v-chat`);
    });
  }, [socket]);

  if (!user) {
    router.push("/sign-in");
    return;
  }

  return (
    <main className="flex h-screen flex-col md:container">
      <div className="fixed z-50 w-full flex bg-white-300/10 px-6 py-4 justify-between items-center shadow-sm backdrop-blur-md border border-white/20">
        <Link href={"profile"}>
          <Avatar>
            <AvatarFallback className="bg-green-500 text-white">
              {user.first_name[0].toUpperCase()}
              {user.last_name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="underline text-xl font-bold">LOGO</div>
        <div className="cursor-pointer" onClick={() => router.push("search")}>
          <Search />
        </div>
      </div>
      <div className="min-h-full overflow-y-auto">
        {chats?.data?.map((item: any) => {
          return <ChatBox key={item} id={item.id} />;
        })}
      </div>
    </main>
  );
}
