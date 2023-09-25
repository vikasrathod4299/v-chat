"use client";
import ChatBox from "@/components/ChatBox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

const SearchPage = () => {
  const { user } = useAuth();
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const { data: users, isLoading } = useQuery(
    ["serachUser", input],
    async () => {
      const { data: users } = await axios.get(
        `http://localhost:3001/api/searchUser/${input}`,
        { headers: { authorization: user.access_token } }
      );
      return users;
    },
    {
      enabled: !!input,
    }
  );

  return (
    <div className="h-screen w-full">
      <div className="flex shadow-sm items-center gap-x-1">
        <ArrowBigLeft onClick={() => router.back()} className="w-12" />
        <Input
          type="text"
          className="me-4"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search user with username"
        />
      </div>
      <div className="text-black text-3xl">
        {users?.data?.length > 0
          ? users.data.map((item: any) => (
              <ChatBox key={item.id} id={item.id} username={item.username} />
            ))
          : null}
      </div>
    </div>
  );
};

export default SearchPage;
