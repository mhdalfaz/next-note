import React, { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { currentDate } from "@/utils/helpers";
import CreatableSelect from 'react-select/creatable';

const initState: Partial<Note> = {
  title: "",
  description: "",
  date: currentDate(),
};

const Add = () => {
  const json_server_url = process.env.NEXT_PUBLIC_JSON_SERVER_URL;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(initState);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const options: Option[] = [];
  const isMutating = isFetching || isPending;

  const handleChangeSelect = (newValue: any) => {
    setSelectedOptions(newValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, date } = data;

    setIsFetching(true);

    const res = await fetch(`${json_server_url}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    await res.json();

    setIsFetching(false);

    setData((prevData) => ({
      ...prevData,
      title: "",
      description: "",
    }));

    startTransition(() => {
      if (pathname === "/note/create") {
        router.push("/");
      } else {
        // Refresh the current route and fetch new data
        // from the server without losing
        // client-side browser or React state.
        router.refresh();
      }
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const content = (
    <div className="mx-3 my-2">
      <form onSubmit={handleSubmit} style={{ opacity: !isMutating ? 1 : 0.7 }}>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Title"
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            cols={30}
            rows={10}
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={data.date && data.date.toString()}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="date"
          >
            Tags
          </label>
          <CreatableSelect
            isMulti
            id="tags"
            name="tags"
            options={options}
            value={selectedOptions}
            onChange={handleChangeSelect}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-gray-300 hover:text-white font-bold py-2 px-4 rounded my-2"
        >
          Submit
        </button>
      </form>
    </div>
  );

  return content;
};

export default Add;
