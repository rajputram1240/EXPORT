'use client';
import { useState } from 'react';
import ProductForm from '@/components/ProductForm';
import ProductTable from '@/components/ProductTable';
import type { ProductType } from '@/models/Product';

import LogoutButton from '@/components/LogoutButton';

export default function AdminProductsPage() {
  const [editing, setEditing] = useState<ProductType | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const onSaved = ()=>{ setEditing(null); setRefreshKey(k=>k+1); };
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="flex items-end justify-between"><LogoutButton /><div><h1 className="text-2xl font-semibold">Products Admin</h1><p className="text-gray-500">Create, update and delete products</p></div></header>
      <section className="grid md:grid-cols-2 gap-6">
        <ProductForm onSaved={onSaved} editing={editing} />
        <div className="rounded-2xl border p-4 bg-white shadow-sm"><h2 className="font-medium mb-2">Tips</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Use a clear product name and valid HSN.</li><li>Enter prices in INR (₹).</li><li>Images are stored inline (base64) for demo simplicity.</li>
          </ul></div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between"><h2 className="text-lg font-medium">All Products</h2></div>
        <div key={refreshKey}><ProductTable onEdit={setEditing} /></div>
        {editing && (
          <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
            <div className="max-w-xl w-full"><div className="rounded-2xl bg-white p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Edit Product</h3><button onClick={()=>setEditing(null)} className="btn-ghost">Close</button></div>
              <ProductForm editing={editing} onSaved={onSaved} />
            </div></div></div>
        )}
      </section>
    </main>
  );
}
