import React from 'react'

export default function Note (note: Note) {
  return (
    <div className="rounded overflow-hidden shadow-md bg-white mx-3 my-2">
      <div className="px-4 py-4">
        <div className="font-bold text-xl mb-2">{note.title}</div>
        <p className="text-gray-700 text-base">
          {note.description}
        </p>
        <p className='date-note'>{note.date && note.date.toString()}</p>
      </div>
      <hr />
      <div className="px-4 pt-4 pb-2">
        {note.tags && note.tags.map((tag: string, i: number) => (
          <span className="inline-block bg-gray-200 rounded-xl px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={note.id*i}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}