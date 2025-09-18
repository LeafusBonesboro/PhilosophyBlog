"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to My Philosophy Blog</h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Weekly deep dives into quotes, ideas, and niche takes. 
        Join me in exploring philosophy with a fresh perspective.
      </p>

      {/* Quick Navigation */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/blog" className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          Read the Blog
        </Link>
        <Link href="/tags" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          Browse by Tags
        </Link>
        <Link href="/concepts" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          Explore Concepts
        </Link>
        <Link href="/philosophers" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          Meet the Philosophers
        </Link>
      </div>
    </main>
  );
}
