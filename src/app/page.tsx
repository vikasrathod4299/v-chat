"use client";
import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) {
    router.push("/sign-in");
    return;
  }
  return (
    <div className="flex flex-col h-screen">
      <Navbar list={true} />
      <div className="overflow-auto flex-grow">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div key={item} className="text-black text-3xl">
            <ChatBox id={item.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
}
