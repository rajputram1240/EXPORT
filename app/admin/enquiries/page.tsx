async function fetchEnquiries() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/enquiries`, { cache: "no-store" });
  return res.json();
}
import LogoutButton from '@/components/LogoutButton';

export default async function AdminEnquiriesPage() {
  const enquiries = await fetchEnquiries();
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">Enquiries</h1><LogoutButton /></div>
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Message</th><th className="px-4 py-3">Date</th></tr>
          </thead>
          <tbody>
            {enquiries.map((e: any) => (
              <tr key={e._id} className="border-t align-top">
                <td className="px-4 py-3 font-medium">{e.name}</td>
                <td className="px-4 py-3">{e.email || '-'}</td>
                <td className="px-4 py-3">{e.phone || '-'}</td>
                <td className="px-4 py-3">{e.message}</td>
                <td className="px-4 py-3">{new Date(e.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {enquiries.length === 0 && <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={5}>No enquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  );
}
