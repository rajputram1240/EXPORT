'use client';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Route } from "next";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const search = useSearchParams();
  const router = useRouter();
  const redirect = search.get('redirect') || '/admin/products';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid username or password');
      router.push(redirect as Route);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="grid gap-1">
          <label className="text-sm text-gray-600">Username</label>
          <input className="input" value={username} onChange={e=>setUsername(e.target.value)} required />
        </div>
        <div className="grid gap-1">
          <label className="text-sm text-gray-600">Password</label>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button disabled={loading} className="btn-primary">{loading ? 'Signing in…' : 'Login'}</button>
        {err && <p className="text-sm text-red-600">{err}</p>}
      </form>
      <p className="text-xs text-gray-500 mt-3">Default: admin / admin123 (set in .env.local)</p>
    </main>
  );
}
