'use client';
import { useEffect, useState } from 'react';
import type { ProductType } from '@/models/Product';
export default function ProductForm({ onSaved, editing }: { onSaved: () => void; editing?: ProductType | null }) {
  const [name, setName] = useState('');
  const [hsn, setHsn] = useState('');
  const [retailMrp, setRetailMrp] = useState<number | string>('');
  const [wholesaleMrp, setWholesaleMrp] = useState<number | string>('');
  const [imageBase64, setImageBase64] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (editing) {
      setName(editing.name); setHsn(editing.hsn);
      setRetailMrp(editing.retailMrp ?? ''); setWholesaleMrp(editing.wholesaleMrp ?? '');
      setImageBase64(editing.imageBase64 || '');
    } else { setName(''); setHsn(''); setRetailMrp(''); setWholesaleMrp(''); setImageBase64(''); }
  }, [editing]);

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e)=> setImageBase64(String(e.target?.result || ''));
    reader.readAsDataURL(file);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name, hsn, retailMrp: Number(retailMrp), wholesaleMrp: Number(wholesaleMrp), imageBase64 };
      const res = await fetch(editing?._id ? `/api/products/${editing._id}` : '/api/products', {
        method: editing?._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      onSaved();
    } catch(e) { alert('Failed to save product'); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border p-4 bg-white shadow-sm">
      <div className="grid gap-1"><label className="text-sm text-gray-600">Name *</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} required /></div>
      <div className="grid gap-1"><label className="text-sm text-gray-600">HSN *</label>
        <input className="input" value={hsn} onChange={e=>setHsn(e.target.value)} required /></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1"><label className="text-sm text-gray-600">Retail MRP *</label>
          <input type="number" className="input" min={0} value={retailMrp} onChange={e=>setRetailMrp(e.target.value)} required /></div>
        <div className="grid gap-1"><label className="text-sm text-gray-600">Wholesale MRP *</label>
          <input type="number" className="input" min={0} value={wholesaleMrp} onChange={e=>setWholesaleMrp(e.target.value)} required /></div>
      </div>
      <div className="grid gap-1"><label className="text-sm text-gray-600">Image</label>
        <input type="file" accept="image/*" onChange={e=>onFile(e.target.files?.[0])} />
        {imageBase64 && <img src={imageBase64} className="h-24 w-24 rounded-xl object-cover border" alt="preview" />}
      </div>
      <div className="flex gap-2">
        <button disabled={loading} className="btn-primary">{editing?._id ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={()=>onSaved()} className="btn-ghost">Cancel</button>}
      </div>
    </form>
  );
}
