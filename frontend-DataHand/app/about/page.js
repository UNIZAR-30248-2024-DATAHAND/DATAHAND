import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">About Page</h1>
      <div className="flex gap-4">
        <Link href="/home">
          <button className="bg-green-500 text-white p-2 rounded">Home</button>
        </Link>
        <Link href="/">
          <button className="bg-blue-500 text-white p-2 rounded">Login</button>
        </Link>
      </div>
    </div>
  );
}
