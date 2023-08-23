import React, { useEffect, useState } from "react";
import fetchNotes from "@/lib/fetchNotes";
import Note from "./Note";

export default function List() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await fetchNotes();
      const orderingNotes = notes.sort((a, b) => b.id - a.id);
      setNotes(orderingNotes);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const content = (
    <div className="grid grid-cols-1 gap-1">
      {notes.map((note: Note) => (
        <Note {...note} key={note.id} />
      ))}
    </div>
  );

  return content;
}
