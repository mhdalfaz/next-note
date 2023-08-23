import React from "react";
import Note from "./Note";

export default function List({ notes }: { notes: Note[] }) {
  const content = (
    <div className="grid grid-cols-1 gap-1">
      {notes.map((note: Note) => (
        <Note {...note} key={note.id} />
      ))}
    </div>
  );

  return content;
}
