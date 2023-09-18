"use client";
import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const userId: string | null = user?.id;

  const { data: chats } = useQuery(
    ["allChats", userId],
    async () => {
      const { data } = await axios.get("http://localhost:3001/api/chats", {
        headers: { authorization: user.access_token },
      });
      return data;
    },
    {
      enabled: !!user,
    }
  );

  if (!user) {
    router.push("/sign-in");
    return;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar list={true} />
      <div className="overflow-auto flex-grow">
        {chats &&
          chats.map((item: any) => {
            if (item.participants.length > 1) {
              return (
                <div key={item} className="text-black text-3xl">
                  <ChatBox chat={item} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
