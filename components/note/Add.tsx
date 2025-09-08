import React, { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentDate, changeFormatDate } from "@/utils/helpers";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";
import Form from "./Form";

const initState: Partial<Note> = {
  title: "",
  description: "",
  date: getCurrentDate(),
  tags: [],
};

const Add = () => {
  const json_server_url = process.env.NEXT_PUBLIC_DB_SERVER_HOST;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(initState);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const options: Option[] = [];
  const isMutating = isFetching || isPending;

  const handleChangeSelect = (newValue: MultiValue<Option>) => {
    let option: Option[] = [];
    let tagValue: string[] = [];

    newValue.forEach((obj, index) => {
      option.push(obj);
      tagValue.push(obj.value);
    });

    setSelectedOptions(option);
    setData((prevData) => ({
      ...prevData,
      tags: tagValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, tags } = data;
    const date = changeFormatDate(data.date, "dd/mm/yyyy");

    setIsFetching(true);

    const res = await fetch(`${json_server_url}/json/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        date,
        tags,
      }),
    });

    await res.json();

    setIsFetching(false);

    setData((prevData) => ({
      ...prevData,
      title: "",
      description: "",
      date: getCurrentDate(),
      tags: [],
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
        <Form
          data={data}
          handleChange={handleChange}
          handleChangeSelect={handleChangeSelect}
          options={options}
          selectedOptions={selectedOptions}
        ></Form>

        <button
          type="submit"
          className="bg-primary text-gray-300 hover:text-white font-bold py-2 px-4 rounded my-2"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800 focus:outline-none font-bold py-2 px-4 rounded ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );

  return content;
};

export default Add;
