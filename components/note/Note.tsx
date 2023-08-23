import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import AlertModal from "./AlertModal";

export default function Note(note: Note) {
  const router = useRouter();
  const deleteMessage = "Are you sure you want to delete this data?";
  const [showAlert, setShowAlert] = useState(false);

  const handleDetail = () => {
    router.push(`/note/${note.id}`);
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <div className="rounded shadow-md bg-white mx-3 my-2">
        <div className="border rounded p-4 relative">
          {/* Option Menu */}
          <div className="absolute top-0 right-0 p-3">
            <Dropdown
              note={note}
              onShowAlertChange={handleShowAlert}
            ></Dropdown>
          </div>

          {/* Content of the card */}
          <div className="font-bold text-xl mb-2">
            <span
              className="hover:underline underline-offset-1 cursor-pointer"
              onClick={handleDetail}
            >
              {note.title}
            </span>
          </div>
          <p className="text-gray-700 text-base">{note.description}</p>
          <p className="date-note">{note.date && note.date.toString()}</p>

          <hr />
          {note.tags &&
            note.tags.map((tag: string, i: number) => (
              <span
                className="inline-block p-1 text-sm font-semibold text-gray-700 hover:underline underline-offset-1 cursor-pointer"
                key={note.id * i}
              >
                #{tag}
              </span>
            ))}
        </div>
      </div>
      <AlertModal
        noteId={note.id}
        isOpen={showAlert}
        onClose={handleCloseAlert}
        message={deleteMessage}
      ></AlertModal>
    </div>
  );
}
