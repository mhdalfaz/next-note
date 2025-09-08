import React, { MouseEvent, useState, useTransition } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter as routerNavigation } from "next/navigation";
import { useRouter } from "next/router";

type Params = {
  noteId: Note["id"];
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

function AlertModal({ noteId, isOpen, onClose, message }: Params) {
  const json_server_url = process.env.NEXT_PUBLIC_DB_SERVER_HOST;
  const router = useRouter();
  const routerNav = routerNavigation();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true);

    const res = await fetch(`${json_server_url}/json/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: noteId,
      }),
    });

    await res.json();

    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data
      // from the server without losing
      // client-side browser or React state.

      if (router.pathname !== "/") {
        router.push("/");
      } else {
        routerNav.refresh();
      }
    });
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white p-6 rounded shadow-md z-20 alert-content mx-3">
            <Dialog.Title className="text-lg font-medium">Delete</Dialog.Title>
            <p className="mt-2">{message}</p>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={handleDelete}
                aria-disabled={isMutating}
              >
                Delete
              </button>
              <button
                onClick={onClose}
                aria-disabled={isMutating}
                className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800 focus:outline-none ml-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AlertModal;
