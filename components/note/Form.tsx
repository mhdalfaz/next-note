import React, { ChangeEvent } from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Params = {
  data: Partial<Note>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChangeSelect: (newValue: MultiValue<Option>) => void;
  options: Option[];
  selectedOptions: Option[];
};

const Form = ({
  data,
  handleChange,
  handleChangeSelect,
  options,
  selectedOptions,
}: Params) => {
  return (
    <div>
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
          required
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
          placeholder="Description"
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
          value={data.date}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          placeholder="Create tags"
        />
      </div>
    </div>
  );
};

export default Form;
