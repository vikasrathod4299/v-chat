import ChatBox from "@/components/Chatbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:container">
      <div className="flex bg-white-300/10 px-6 py-4 justify-between items-center shadow-sm backdrop-blur-md border border-white/20">
        <Link href={"profile"}>
          <Avatar>
            <AvatarFallback className="bg-green-500 text-white">
              CN
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="underline text-xl font-bold">LOGO</div>
        <div>
          <Search />
        </div>
      </div>
      <ChatBox />
    </main>
  );
}
