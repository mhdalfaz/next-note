import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

type Params = {
  note: Note;
  onShowAlertChange: () => void;
}

function classNames(...classes: any[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ note, onShowAlertChange }: Params) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/note/${note.id}/edit`);
  };

  const handleShowAlert = () => {
    // Toggle the parent state
    onShowAlertChange();
  };

  const options = [
    { label: "Edit", action: handleEdit },
    { label: "Delete", action: handleShowAlert },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative flex rounded-full text-sm p-1">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={option.action}
                  >
                    {option.label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
