import Link from "next/link";

export default function Custom404() {
  return (
    <div className="h-screen text-center">
      <h1>
        <b>404 - Page Not Found</b>
      </h1>
      <h5 className="underline underline-offset-1 hover:underline-offset-2 hover:text-blue-600">
        <Link href="/">back to home</Link>
      </h5>
    </div>
  );
}
