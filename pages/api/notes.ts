export default async function handler(req: any, res: any) {
  const json_server_url = process.env.NEXT_PUBLIC_DB_SERVER_HOST;
  const response = await fetch(`${json_server_url}/notes`)
  const notes: Note[] = await response.json()

  res.status(200).json(notes);
}