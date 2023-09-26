"use client";
import ChatBox from "@/components/Chatbox";
import SearchBar from "@/components/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const Search = () => {
  const [input, setInput] = useState<string>("");
  const { data: users } = useQuery(
    ["searchUsers", input],
    async () => {
      return await axios.get(
        `http://localhost:3001/api/user/searchUser/${input}`
      );
    },
    {
      enabled: !!input,
    }
  );

  return (
    <div className="min-h-screen">
      <SearchBar input={input} setInput={setInput} />
      <div className="min-h-full">
        {users?.data.data?.map((item: any, index: number) => {
          return <ChatBox key={index} userId={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Search;
