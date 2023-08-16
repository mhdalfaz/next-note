export default async function fetchNotes() {
    const json_server_url = process.env.NEXT_PUBLIC_DB_SERVER_HOST;
    const res = await fetch(`${json_server_url}/notes`)
    const notes: Note[] = await res.json()

    return notes
}