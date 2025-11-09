import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import type { Route } from "next";


export default function Footer() {
  return (
    <footer className="border-t bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
        {/* About */}
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Practivoo Shop</h3>
          <p className="mt-2">
            Eco-friendly and sustainable product catalog with both retail and
            wholesale pricing. Built for transparency and ease of enquiry.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/products" className="hover:text-blue-600">Products</Link></li>
            <li><Link href="/enquiry" className="hover:text-blue-600">Send Enquiry</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>

        {/* Policies & Social */}
        <div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">Legal & Social</h4>
          <ul className="space-y-2 mb-4">
            <li><Link href={"/terms" as Route} className="hover:text-blue-600">Terms & Conditions</Link></li>
            <li><Link href={"/privacy" as Route} className="hover:text-blue-600">Privacy Policy</Link></li>
          </ul>
          <div className="flex gap-3 text-gray-500">
            <Link href="https://facebook.com" target="_blank" className="hover:text-blue-600"><FaFacebookF /></Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-sky-500"><FaTwitter /></Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500"><FaInstagram /></Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-700"><FaLinkedinIn /></Link>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500 bg-gray-50">
        © {new Date().getFullYear()} Practivoo Shop. All rights reserved.
      </div>
    </footer>
  );
}