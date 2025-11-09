"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";

const items: { href: Route; label: string }[] = [
  { label: "Products", href: "/admin/products" },
  { label: "Enquiries", href: "/admin/enquiries" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/admin/products" className="font-semibold text-lg text-gray-700">
          🛍️ Admin Panel
        </Link>

        <nav className="flex gap-3">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname.startsWith(i.href)
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <form action="/api/logout" method="post">
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}