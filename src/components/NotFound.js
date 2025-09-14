import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Go Home
      </Link>
    </div>
  );
}
