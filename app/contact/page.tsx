export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <header><h1 className="text-2xl font-semibold">Contact</h1><p className="text-gray-500">We’d love to hear from you.</p></header>
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-2">
          <h3 className="font-semibold">Reach us</h3>
          <p className="text-sm text-gray-600">Email: hello@practivoo.local</p>
          <p className="text-sm text-gray-600">Phone: +91-90000 00000</p>
          <p className="text-sm text-gray-600">Address: Rishikesh, Uttarakhand, India</p>
          <a className="btn-primary mt-2 inline-flex" href="/enquiry">Send an Enquiry</a>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Map</h3>
          <div className="rounded-xl overflow-hidden">
            <iframe title="map" src="https://maps.google.com/maps?q=Rishikesh%20Uttarakhand&t=&z=12&ie=UTF8&iwloc=&output=embed" className="w-full h-64 border-0" loading="lazy" />
          </div>
        </div>
      </section>
    </main>
  );
}
