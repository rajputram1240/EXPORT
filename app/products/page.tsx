async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`, { cache: "no-store" });
  return res.json();
}
export default async function ProductsPage() {
  const products = await fetchProducts();
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-gray-500">Browse available products</p>
        </div>
      </header>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <article key={p._id} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            {p.imageBase64 ? (<img src={p.imageBase64} alt={p.name} className="h-40 w-full object-cover" />) : (<div className="h-40 w-full grid place-items-center text-sm text-gray-400">No image</div>)}
            <div className="p-4 space-y-1">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-xs text-gray-500">HSN: {p.hsn}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm">Retail: <strong>₹{Number(p.retailMrp).toFixed(2)}</strong></span>
                <span className="text-sm">Wholesale: <strong>₹{Number(p.wholesaleMrp).toFixed(2)}</strong></span>
              </div>
            </div>
          </article>
        ))}
        {products.length === 0 && <p className="text-gray-500">No products found.</p>}
      </div>
    </main>
  );
}
