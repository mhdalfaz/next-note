import React from "react";

const Footer = () => {
  const year = new Date();
  const item = { name: "Note", href: "/", current: false };
  return (
    <div className="bottom-0 bg-gray-800">
      <div className=" text-gray-300 rounded-md px-3 py-2 text-sm font-medium">
        © {year.getFullYear()}{" "}
        <a
          href="https://github.com/alfaz86"
          target="blink"
          className="hover:underline underline-offset-1 hover:text-blue-600"
        >
          alfaz86
        </a>
      </div>
    </div>
  );
};

export default Footer;
