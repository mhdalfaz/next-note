import React from "react";
import Note from "./Note";

type Params = {
  notes: Note[];
  onHandleTag: (tag: string) => void;
};

export default function List({ notes, onHandleTag }: Params) {
  const content = (
    <div className="grid grid-cols-1 gap-1">
      {notes.map((note: Note) => (
        <Note note={note} onHandleTag={onHandleTag} key={note.id} />
      ))}
    </div>
  );

  return content;
}
