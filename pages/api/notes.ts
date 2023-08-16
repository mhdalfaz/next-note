export default async function handler(req: any, res: any) {
  const host = process.env.NEXT_PUBLIC_DB_SERVER_HOST || "localhost";
  const port = process.env.NEXT_PUBLIC_DB_SERVER_PORT || "8080";
  const response = await fetch(`${host}:${port}/notes`)
  const notes: Note[] = await response.json()

  res.status(200).json(notes);
}