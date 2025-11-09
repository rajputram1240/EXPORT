'use client';
import { useState } from 'react';
export default function EnquiryPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setOk(null);
    try {
      const res = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, message }) });
      if (!res.ok) throw new Error(await res.text());
      setOk('Thanks! Your enquiry has been submitted.'); setName(''); setEmail(''); setPhone(''); setMessage('');
    } catch { setOk('Failed to submit. Please try again.'); } finally { setLoading(false); }
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <header><h1 className="text-2xl font-semibold">Enquiry</h1><p className="text-gray-500">Tell us what you need and we’ll get back to you.</p></header>
      <form onSubmit={submit} className="grid gap-4 rounded-2xl border p-4 bg-white shadow-sm">
        <div className="grid gap-1"><label className="text-sm text-gray-600">Name *</label><input className="input" value={name} onChange={(e)=>setName(e.target.value)} required /></div>
        <div className="grid gap-1"><label className="text-sm text-gray-600">Email</label><input type="email" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
        <div className="grid gap-1"><label className="text-sm text-gray-600">Phone</label><input className="input" value={phone} onChange={(e)=>setPhone(e.target.value)} /></div>
        <div className="grid gap-1"><label className="text-sm text-gray-600">Message *</label><textarea className="input min-h-[120px]" value={message} onChange={(e)=>setMessage(e.target.value)} required /></div>
        <div className="flex gap-2"><button disabled={loading} className="btn-primary">{loading ? 'Submitting…' : 'Submit'}</button><a href="/products" className="btn-ghost">View Products</a></div>
        {ok && <p className="text-sm text-gray-600">{ok}</p>}
      </form>
    </main>
  );
}
