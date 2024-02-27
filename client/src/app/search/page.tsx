"use client";
import ChatList from "@/components/ChatList";
import SearchBar from "@/components/SearchBar";
import ChatBoxSkeleton from "@/components/loaders/ChatBoxSkeleton";
import SkeletonLoader from "@/components/loaders/SkeletonLoader";
import { searchUsers } from "@/lib/apiCalls";
import React, { useState } from "react";
import { useQuery } from "react-query";

const Search = () => {
  const [input, setInput] = useState<string>("");

  const { data: users, isLoading } = useQuery(
    ["searchUsers", input],
    searchUsers,
    {
      enabled: !!input,
    }
  );

  return (
    <div className="min-h-screen">
      <SearchBar input={input} setInput={setInput} />
      <div className="min-h-full overflow-y-auto">
        {users ? (
          <ChatList users={users.data} />
        ) : (
          isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
            return (
              <SkeletonLoader key={item}>
                <ChatBoxSkeleton />
              </SkeletonLoader>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Search;
