import React, { useEffect, useState } from "react";
import List from "@/components/note/List";
import Link from "next/link";
import Filter from "@/components/note/Filter";
import Search from "@/components/note/Search";
import fetchNotes from "@/lib/fetchNotes";

export default function Index() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await fetchNotes();
      const orderingNotes = notes.sort((a, b) => b.id - a.id);
      setNotes(orderingNotes);
      if (searchQuery === "") setFilteredResults(notes);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const handleOrderAsc = () => {
    const orderingNotes = [...notes].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setFilteredResults(orderingNotes);
  };

  const handleOrderDesc = () => {
    const orderingNotes = [...notes].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setFilteredResults(orderingNotes);
  };

  const handleSearch = (query: string, tag: boolean = false) => {
    const filteredData = notes.filter((item) => {
      if (tag) {
        return item.tags.includes(query);
      }
      return item.title.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredResults(filteredData);
  };

  const handleTag = (tag: string) => {
    const searchTag = `#${tag}`;
    setSearchQuery(searchTag);
    handleSearch(tag, true);
  };

  return (
    <>
      <div className="mb-3 px-3 gap-x-3 items-center grid grid-cols-[70px,auto,40px]">
        <Link
          href="/note/create"
          className="bg-primary text-gray-300 hover:text-white font-bold py-2 px-4 rounded text-center"
        >
          Add
        </Link>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <Filter onChangeAsc={handleOrderAsc} onChangeDesc={handleOrderDesc} />
      </div>
      <List notes={filteredResults} onHandleTag={handleTag} />
    </>
  );
}
