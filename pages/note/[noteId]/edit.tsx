import Edit from "@/components/note/Edit";
import fetchNote from "@/lib/fetchNote";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function EditNote() {
  const router = useRouter();
  const noteId = router.query.noteId;
  const [note, setNote] = useState<Note>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const id: number = Number(noteId);
      if (!id) return;

      const note = await fetchNote(id);
      setNote(note);
      setLoading(false);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [noteId]);

  if (isLoading) return "Loading...";
  if (!note) return "No data available";

  return <Edit note={note} />;
}
