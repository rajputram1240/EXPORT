// app/admin/layout.tsx
import React from "react";
import AdminNav from "./components/AdminNav";

export const metadata = {
  title: "Admin | Practivoo Shop",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <AdminNav />

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
