"use client";
import ChatList from "@/components/ChatList";
import SearchBar from "@/components/SearchBar";
import { searchUsers } from "@/lib/apiCalls";
import React, { useState } from "react";
import { useQuery } from "react-query";

const Search = () => {
  const [input, setInput] = useState<string>("");

  const { data: users } = useQuery(["searchUsers", input], searchUsers, {
    enabled: !!input,
  });

  return (
    <div className="min-h-screen">
      <SearchBar input={input} setInput={setInput} />
      <div className="min-h-full overflow-y-auto">
        <ChatList users={users?.data} />
      </div>
    </div>
  );
};

export default Search;
