export default async function fetchNote(id: number): Promise<Note> {
  const json_server_url = process.env.NEXT_PUBLIC_DB_SERVER_HOST;
  const res = await fetch(`${json_server_url}/notes/${id}`);
  const notes: Note = await res.json();

  return notes;
}
