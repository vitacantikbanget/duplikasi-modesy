// Komponen Bagian Bawah Halaman (Footer) Modesy.
// Menampilkan informasi tentang marketplace, formulir langganan newsletter (email promo),
// tautan cepat (Quick Links: Bantuan, Syarat & Ketentuan, Blog, Toko),
// ikon media sosial, metode pembayaran yang diterima, dan hak cipta copyright.

"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ChevronUp, 
  Rss, 
  Send,
  MessageCircle,
  Share2,
  CheckCircle2
} from "lucide-react";

export default function Footer() {
  // State untuk input email formulir berlangganan newsletter
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsletterStatus("idle");
      }, 5000);
    }, 400);
  };
  return (
    <footer className="bg-white border-t border-[#f1f3f5] pt-16 pb-8 font-sans text-[#495057]">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* 4 Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info & Social Icons */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Modesy"
                width={160}
                height={60}
                className="w-[150px] h-auto object-contain"
              />
            </Link>

            <p className="text-xs text-[#6c757d] leading-relaxed max-w-sm">
              Modesy is a modern e-commerce marketplace where buyers and sellers connect with ease. Whether you are looking to shop for unique items or grow your business by selling online, Modesy is here to help you every step of the way.
            </p>

            {/* Social Icons (Two Rows matching screenshot exactly) */}
            <div className="space-y-2 pt-2">
              {/* Row 1: Facebook, X, Instagram, TikTok, WhatsApp, YouTube, Discord, Telegram */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-xs font-serif font-bold"
                >
                  f
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  title="X (Twitter)"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-xs font-bold"
                >
                  X
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  title="TikTok"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 6.34 6.32 6.34 6.34 0 0 0 6.32-6.32V8.67a8.28 8.28 0 0 0 4.93 1.63v-3.61a4.84 4.84 0 0 1-1-.0z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Discord */}
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Discord"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noreferrer"
                  title="Telegram"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <Send className="w-3.5 h-3.5 -ml-0.5" />
                </a>
              </div>

              {/* Row 2: Pinterest, LinkedIn, Twitch, VK, RSS */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Pinterest"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-xs font-serif font-bold"
                >
                  P
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-xs font-bold"
                >
                  in
                </a>

                {/* Twitch */}
                <a
                  href="https://twitch.tv"
                  target="_blank"
                  rel="noreferrer"
                  title="Twitch"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                  </svg>
                </a>

                {/* VK */}
                <a
                  href="https://vk.com"
                  target="_blank"
                  rel="noreferrer"
                  title="VK"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-[10px] font-bold"
                >
                  VK
                </a>

                {/* RSS */}
                <a
                  href="/rss"
                  title="RSS"
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <Rss className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: CATEGORIES */}
          <div>
            <h3 className="text-[#2c333e] font-bold text-xs uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-xs text-[#6c757d]">
              <li>
                <Link href="/products?category=clothing" className="hover:text-[#00ab97] transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/products?category=shoes" className="hover:text-[#00ab97] transition-colors">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/products?category=home-living" className="hover:text-[#00ab97] transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/products?category=jewelry-accessories" className="hover:text-[#00ab97] transition-colors">
                  Jewelry & Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=toys-entertainment" className="hover:text-[#00ab97] transition-colors">
                  Toys & Entertainment
                </Link>
              </li>
              <li>
                <Link href="/products?category=graphics-photos" className="hover:text-[#00ab97] transition-colors">
                  Graphics & Photos
                </Link>
              </li>
              <li>
                <Link href="/products?category=video-audio" className="hover:text-[#00ab97] transition-colors">
                  Video & Audio
                </Link>
              </li>
              <li>
                <Link href="/products?category=web-templates-code" className="hover:text-[#00ab97] transition-colors">
                  Web Templates & Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: QUICK LINKS & INFORMATION */}
          <div>
            <h3 className="text-[#2c333e] font-bold text-xs uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-[#6c757d] mb-6">
              <li>
                <Link href="/" className="hover:text-[#00ab97] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#00ab97] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/shops" className="hover:text-[#00ab97] transition-colors">
                  Shops
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-[#00ab97] transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>

            <h3 className="text-[#2c333e] font-bold text-xs uppercase tracking-wider mb-4">
              Information
            </h3>
            <ul className="space-y-2.5 text-xs text-[#6c757d]">
              <li>
                <Link href="/terms-conditions" className="hover:text-[#00ab97] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#00ab97] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: NEWSLETTER & PAYMENTS */}
          <div>
            <h3 className="text-[#2c333e] font-bold text-xs uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-xs text-[#6c757d] mb-3 leading-relaxed">
              Join our subscribers list to get the latest news, updates and special offers directly in your inbox
            </p>

            {newsletterStatus === "success" ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[2px] text-emerald-800 text-xs flex items-start gap-2 mb-6 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-tight">You have successfully subscribed to our newsletter!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5 mb-6">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-[2px] outline-none focus:border-[#00ab97] bg-white transition-colors"
                  required
                  disabled={newsletterStatus === "loading"}
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="w-full py-2.5 bg-[#00ab97] hover:bg-[#009684] text-white text-xs font-semibold rounded-[2px] transition-colors cursor-pointer shadow-2xs disabled:opacity-60"
                >
                  {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}

            {/* Official Payment Logos matching Screenshot 2 */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {/* VISA */}
              <div className="h-6 px-2 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center shadow-2xs">
                <span className="text-blue-900 font-extrabold italic text-[11px] tracking-tighter">
                  VISA
                </span>
              </div>

              {/* Mastercard */}
              <div className="h-6 px-2 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center gap-0.5 shadow-2xs">
                <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] -ml-2 opacity-90" />
                <span className="text-[8px] font-semibold text-gray-700 ml-1">mastercard</span>
              </div>

              {/* Maestro */}
              <div className="h-6 px-2 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center gap-0.5 shadow-2xs">
                <div className="w-3.5 h-3.5 rounded-full bg-[#0061a8]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b] -ml-2 opacity-90" />
                <span className="text-[8px] font-semibold text-gray-700 ml-1">Maestro</span>
              </div>

              {/* American Express */}
              <div className="h-6 px-1.5 bg-[#007cc3] text-white rounded-[2px] flex items-center justify-center font-bold text-[8px] tracking-tight shadow-2xs">
                AMERICAN EXPRESS
              </div>

              {/* Discover */}
              <div className="h-6 px-2 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center gap-1 shadow-2xs">
                <span className="text-[8px] font-bold text-gray-800 tracking-tight">DISCOVER</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff6000]" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="border-t border-[#f1f3f5] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6c757d]">
          <p>
            Copyright 2025 Modesy - All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-[#00a99d] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#00a99d] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Official Modesy Scroll to Top Button matching Screenshot 2 */}
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="fixed bottom-6 right-6 z-40 w-9 h-9 bg-[#222] hover:bg-black text-white rounded-[2px] flex items-center justify-center shadow-md transition-colors cursor-pointer"
        title="Scroll to Top"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </footer>
  );
}
