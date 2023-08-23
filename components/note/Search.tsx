import React from "react";

type Params = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  performSearch: (value: string) => void;
};

const Search = ({ searchQuery, setSearchQuery, performSearch }: Params) => {
  return (
    <input
      type="search"
      className="py-1 bg-none border-none outline-none input-search font-bold"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        performSearch(e.target.value);
      }}
    />
  );
};

export default Search;
