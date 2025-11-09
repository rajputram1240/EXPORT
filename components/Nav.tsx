'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/enquiry', label: 'Enquiry' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin/products', label: 'Admin' },
];
export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        <span className="font-semibold mr-4">🏪 Practivoo Shop</span>
        <ul className="flex items-center gap-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link className={`px-3 py-1.5 rounded-xl hover:bg-gray-100 ${pathname===l.href ? 'bg-gray-100 font-medium' : ''}`} href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
