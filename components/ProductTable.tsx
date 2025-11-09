'use client';
import { useEffect, useState } from 'react';
import type { ProductType } from '@/models/Product';
export default function ProductTable({ onEdit }: { onEdit: (p: ProductType) => void }) {
  const [rows, setRows] = useState<ProductType[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRows = async ()=>{
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setRows(data); setLoading(false);
  };
  useEffect(()=>{ fetchRows(); }, []);

  const filtered = rows.filter(r => [r.name, r.hsn].join(' ').toLowerCase().includes(q.toLowerCase()));

  async function remove(id?: string) {
    if (!id) return;
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) fetchRows();
  }

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2 p-4">
        <input className="input max-w-sm" placeholder="Search by name or HSN" value={q} onChange={(e)=>setQ(e.target.value)} />
        <button onClick={fetchRows} className="btn-ghost">Refresh</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">HSN</th>
              <th className="px-4 py-3 text-right">Retail MRP</th>
              <th className="px-4 py-3 text-right">Wholesale MRP</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">Loading…</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">No products</td></tr>}
            {filtered.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="px-4 py-3">{r.imageBase64 ? <img src={r.imageBase64} alt={r.name} className="h-12 w-12 rounded-xl object-cover border" /> : <div className="h-12 w-12 rounded-xl border grid place-items-center text-xs text-gray-400">No image</div>}</td>
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3">{r.hsn}</td>
                <td className="px-4 py-3 text-right">₹{(typeof r.retailMrp === 'number' ? r.retailMrp.toFixed(2) : r.retailMrp)}</td>
                <td className="px-4 py-3 text-right">₹{(typeof r.wholesaleMrp === 'number' ? r.wholesaleMrp.toFixed(2) : r.wholesaleMrp)}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={()=>onEdit(r)} className="btn-link">Edit</button>
                  <button onClick={()=>remove(r._id)} className="btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
