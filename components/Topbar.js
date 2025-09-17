"use client";

import Link from "next/link";

export default function Topbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        {/* Logo / Title */}
        <Link href="/" className="text-xl font-bold">
          Philosophy Blog
        </Link>

        {/* Navigation */}
        <div className="flex gap-6">
          <Link href="/blog" className="hover:text-orange-400 transition">
            Blog
          </Link>
          <Link href="/about" className="hover:text-orange-400 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-orange-400 transition">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
