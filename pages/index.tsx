import React, { useEffect, useState } from "react";
import List from "@/components/note/List";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <div className='mb-3 mx-3'>
        <Link href="/note/create" className="bg-primary text-gray-300 hover:text-white font-bold py-2 px-4 rounded">Add</Link>
      </div>
      <List />
    </>
  );
};