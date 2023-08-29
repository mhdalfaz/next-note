import React from "react";

type Params = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: (value: string) => void;
};

const Search = ({ searchQuery, setSearchQuery, handleSearch }: Params) => {
  return (
    <input
      type="search"
      className="py-1 bg-none border-none outline-none input-search font-bold min-w-0"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
};

export default Search;
