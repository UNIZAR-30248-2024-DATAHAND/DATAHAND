import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <div className="flex gap-4">
        <Link href="/about">
          <button className="bg-yellow-500 text-white p-2 rounded">About</button>
        </Link>
        <Link href="/">
          <button className="bg-blue-500 text-white p-2 rounded">Login</button>
        </Link>
      </div>
    </div>
  );
}
