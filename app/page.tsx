// app/page.tsx
import Link from "next/link";

async function getProducts() {
  // show a few products on the homepage (falls back gracefully if none)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`, {
    cache: "no-store",
  });
  try { return await res.json(); } catch { return []; }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="relative overflow-hidden">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-[36rem] rounded-full blur-3xl bg-gradient-to-br from-blue-200 to-purple-200 opacity-50" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 size-[32rem] rounded-full blur-3xl bg-gradient-to-tr from-pink-200 to-yellow-200 opacity-40" />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-10 md:pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-white/80 backdrop-blur text-sm shadow-sm">
          <span className="inline-block size-2 rounded-full bg-green-500" />
          In-stock products with retail & wholesale pricing
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Beautiful eco-friendly products, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ready to ship</span>
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl">
              Discover sustainable packaging and daily-use items with transparent
              Retail & Wholesale MRP. Enquire in one click—no hassle.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">Browse Products</Link>
              <Link href="/enquiry" className="btn-ghost">Send Enquiry</Link>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">500+</span> happy orders
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">HSN</span> compliant
              </div>
              <div className="flex items-center gap-2">
                Fast response to enquiries
              </div>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="rounded-3xl border bg-white shadow-xl p-6 md:p-8">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 grid place-items-center overflow-hidden">
                <span className="text-7xl">🏪</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Simple admin for your catalog</p>
                <div className="mt-2 flex items-center gap-2 text-gray-700">
                  <span className="inline-block size-2 rounded-full bg-blue-500" /> Add products
                  <span className="inline-block size-2 rounded-full bg-purple-500 ml-3" /> Upload images
                  <span className="inline-block size-2 rounded-full bg-emerald-500 ml-3" /> Manage pricing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        {[
          { title: "Transparent Pricing", desc: "Retail & Wholesale MRP side-by-side for clarity.", icon: "💱" },
          { title: "Fast Enquiries", desc: "Share requirements; we reply quickly with availability.", icon: "⚡" },
          { title: "Admin Control", desc: "Add, edit, delete products with images & HSN.", icon: "🛠️" },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-3 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Popular products</h2>
            <p className="text-gray-500">A quick peek at what’s available right now.</p>
          </div>
          <Link href="/products" className="btn-ghost">View all</Link>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(products) && products.slice(0, 6).map((p: any) => (
            <article key={p._id} className="group rounded-2xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition">
              {p.imageBase64 ? (
                <img src={p.imageBase64} alt={p.name} className="h-40 w-full object-cover group-hover:scale-[1.02] transition" />
              ) : (
                <div className="h-40 w-full grid place-items-center text-sm text-gray-400 bg-gray-50">No image</div>
              )}
              <div className="p-4">
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-xs text-gray-500">HSN: {p.hsn}</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>Retail: <strong>₹{Number(p.retailMrp).toFixed(2)}</strong></span>
                  <span>Wholesale: <strong>₹{Number(p.wholesaleMrp).toFixed(2)}</strong></span>
                </div>
              </div>
            </article>
          ))}
          {(!products || products.length === 0) && (
            <div className="col-span-full rounded-2xl border bg-white p-6 text-gray-600">
              No products yet. <Link href="/admin/products" className="btn-link">Add your first product</Link>.
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl border bg-white px-6 py-8 grid md:grid-cols-3 gap-6 text-center shadow-sm">
          {[
            { n: "500+", l: "Orders fulfilled" },
            { n: "100%", l: "HSN compliant" },
            { n: "< 24h", l: "Average enquiry response" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-extrabold">{s.n}</div>
              <div className="text-gray-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <h2 className="text-2xl font-semibold">What customers say</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { q: "Great quality & fast response!", a: "Owner, Café Hilltop" },
            { q: "Transparent wholesale pricing saved us time.", a: "Ops Lead, GreenMart" },
            { q: "Super simple to manage the catalog.", a: "Founder, LocalCo" },
          ].map((t) => (
            <figure key={t.q} className="rounded-2xl border bg-white p-6 shadow-sm">
              <blockquote className="text-gray-800">“{t.q}”</blockquote>
              <figcaption className="mt-3 text-sm text-gray-500">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-3xl border bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Ready to get a quote?</h3>
            <p className="text-gray-600">Tell us your requirement—we’ll reply quickly.</p>
          </div>
        <div className="flex gap-3">
            <Link href="/enquiry" className="btn-primary">Send Enquiry</Link>
            <Link href="/contact" className="btn-ghost">Contact</Link>
          </div>
        </div>
      </section>
    </main>
  );
}