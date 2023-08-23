import { useRouter } from "next/router";
import React from "react";

export default function EditNote() {
  const router = useRouter();
  const noteId = router.query.noteId;
  // console.log(note);

  return <div>Note ID : {noteId}</div>;
}
