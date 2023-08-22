"use client";
import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";

export default function Home() {
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
