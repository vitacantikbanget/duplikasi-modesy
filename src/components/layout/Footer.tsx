/**
 * ============================================================================
 * Footer: Bagian Bawah Komprehensif Modesy (Main Storefront Footer)
 * ============================================================================
 * Mengacu pada struktur footer Modesy asli:
 * 1. Kolom 1 (Brand Info & Sosial Media):
 *    - Logo Modesy, deskripsi singkat platform, dan tautan sosial media (Facebook, Instagram, dll).
 * 2. Kolom 2 & 3 (Categories & Quick Links):
 *    - Tautan ke kategori populer dan informasi bantuan / kebijakan situs.
 * 3. Kolom 4 (Newsletter & Pembayaran):
 *    - Formulir berlangganan buletin email berkala dan ikon metode pembayaran resmi.
 * 4. Bilah Hak Cipta (FooterBottom):
 *    - Pernyataan hak cipta tahun berjalan dan tautan syarat & ketentuan.
 */

"use client";

import Link from "next/link";
import {
  FooterSocialLinks,
  FooterLinks,
  FooterNewsletter,
  FooterBottom,
} from "./footer-parts";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#f1f3f5] pt-16 pb-8 font-sans text-[#495057]">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Grid 4 Kolom Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1: Informasi Brand & Ikon Sosial Media */}
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
              Modesy is a modern e-commerce marketplace where buyers and sellers
              connect with ease. Whether you are looking to shop for unique
              items or grow your business by selling online, Modesy is here to
              help you every step of the way.
            </p>

            <FooterSocialLinks />
          </div>

          {/* Kolom 2 & 3: Kategori Populer & Tautan Bantuan / Kebijakan */}
          <FooterLinks />

          {/* Kolom 4: Langganan Newsletter & Ikon Metode Pembayaran */}
          <FooterNewsletter />
        </div>

        {/* Bilah Hak Cipta Bagian Paling Bawah */}
        <FooterBottom />
      </div>
    </footer>
  );
}
