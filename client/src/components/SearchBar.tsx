import React, { useState } from "react";

interface SearchBarInterface {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ setInput }: SearchBarInterface) => {
  return (
    <div className="p-4">
      <input
        className="bg-black/20 h-12 backdrop-blur-md w-full px-4 rounded-full placeholder:text-white"
        placeholder="Search with username 👤 🔍"
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
