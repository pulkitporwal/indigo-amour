"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center bg-neutral-100 rounded-md px-4 py-2 w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-grow outline-none bg-transparent text-gray-700 text-sm"
        aria-label="Search input"
      />
      {query && (
        <button
          onClick={handleClear}
          className="text-gray-500 hover:text-gray-700 focus:outline-none mx-2"
          aria-label="Clear search"
        >
          ✖
        </button>
      )}
      <button
        onClick={handleSearch}
        className=" text-white px-1 py-1 rounded-full text-sm focus:outline-none"
        aria-label="Search button"
      >
        <Search size={18} color="#ED6473" />
      </button>
    </div>
  );
};

export default SearchBar;
