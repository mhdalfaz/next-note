import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

type Params = {
  onChangeAsc: () => void;
  onChangeDesc: () => void;
};

function classNames(...classes: any[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Filter({ onChangeAsc, onChangeDesc }: Params) {
  const options = [
    {
      label: "A - Z",
      action: onChangeAsc,
    },
    {
      label: "Z - A",
      action: onChangeDesc,
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-right max-w-[40px]">
      <div>
        <Menu.Button className="relative flex rounded-full text-sm p-1">
          <AdjustmentsHorizontalIcon className="h-7 w-7" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={option.action}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm w-full text-start"
                    )}
                  >
                    <div className="inline-flex gap-x-1">{option.label}</div>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
