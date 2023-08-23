import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import fetchNote from "@/lib/fetchNote";
import AlertModal from "./AlertModal";

const Detail = () => {
  const router = useRouter();
  const noteId = router.query.noteId;
  const deleteMessage = "Are you sure you want to delete?";
  const [note, setNote] = useState<Note>();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id: number = Number(noteId);
      if (!id) return;

      const note = await fetchNote(id);
      setNote(note);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [noteId]);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (!note) return "no data available";

  return (
    <div>
      <div className="mx-3 my-2 relative">
        <div className="absolute top-0 right-0 p-1">
          <Dropdown note={note} onShowAlertChange={handleShowAlert}></Dropdown>
        </div>

        <div className="font-bold text-xl">{note.title}</div>
        <p className="date-note mb-5">{note.date && note.date.toString()}</p>
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
        <p className="text-gray-700 text-base">{note.description}</p>
      </div>
      <AlertModal
        noteId={note.id}
        isOpen={showAlert}
        onClose={handleCloseAlert}
        message={deleteMessage}
      ></AlertModal>
    </div>
  );
};

export default Detail;
