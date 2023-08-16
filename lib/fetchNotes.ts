export default async function fetchNotes() {
    const host = process.env.NEXT_PUBLIC_DB_SERVER_HOST || "localhost";
    const port = process.env.NEXT_PUBLIC_DB_SERVER_PORT || "8080";
    const res = await fetch(`${host}:${port}/notes`)
    const notes: Note[] = await res.json()

    return notes
}