import React from "react";

const about = () => {
  return (
    <pre className="mx-5 border-2 bg-slate-200 p-3">
      <div className="font-bold mb-3">About the Project</div>
      <div className="flex items-center">
        <img
          src="https://www.svgrepo.com/show/354113/nextjs-icon.svg"
          width={18}
          title="Next.js"
          className="inline mr-1"
        />
        <span>Next.js (version 8.19.2)</span>
      </div>
      <div className="flex items-center">
        <img
          src="https://edent.github.io/SuperTinyIcons/images/svg/typescript.svg"
          width={18}
          title="Typescript"
          className="inline mr-1"
        />
        <span>Typescript</span>
      </div>
      <div className="flex items-center">
        <img
          src="https://badgewind.vercel.app/api/-?icon=simple-icons:tailwindcss"
          width={18}
          title="Tailwind CSS"
          className="inline mr-1"
        />
        <span>Tailwind CSS</span>
      </div>
    </pre>
  );
};

export default about;
