// Komponen Kupon Diskon Belanja (Member Coupons).
// Berfungsi untuk menampilkan voucher atau kode promo diskon yang dimiliki pengguna,
// lengkap dengan nama toko penerbit, batas masa berlaku voucher, dan tombol salin kode kupon.

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Check } from "lucide-react";

// Struktur data satu item voucher diskon
interface CouponItem {
  id: string;         // ID kupon
  vendorName: string; // Nama toko yang memberi kupon (misal: Admin atau Trendshop)
  title: string;      // Judul kupon (contoh: 10% Coupon)
  validTill: string;  // Tanggal kedaluwarsa kupon
  code: string;       // Kode voucher unik yang dimasukkan saat checkout
  avatar: string;     // Foto logo toko penerbit kupon
  link: string;       // Tautan ke produk atau toko yang bisa memakai kupon ini
}

const COUPONS_DATA: CouponItem[] = [
  {
    id: "c1",
    vendorName: "ADMIN",
    title: "10% Coupon",
    validTill: "16 April 2027",
    code: "P6PG5GLS",
    avatar: "/assets/img/admin-avatar.jpg",
    link: "/member/category/clothing",
  },
  {
    id: "c2",
    vendorName: "TRENDSHOP",
    title: "15% Coupon",
    validTill: "31 March 2027",
    code: "41GNOLDX",
    avatar: "/images/products/trendshop-coupon.jpg",
    link: "/member/category/clothing",
  },
];

export default function MemberCoupons() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">My Coupons</span>
        </nav>

        {/* Title */}
        <h1 className="text-[24px] sm:text-[26px] font-bold text-[#222] tracking-tight mb-8">
          My Coupons
        </h1>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px]">
          {COUPONS_DATA.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white border border-dashed border-gray-300 rounded-[3px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] relative flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-[82px] h-[82px] sm:w-[88px] sm:h-[88px] rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-xs bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coupon.avatar}
                    alt={coupon.vendorName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-gray-800 uppercase tracking-wide">
                    {coupon.vendorName}
                  </div>
                  <div className="text-[20px] sm:text-[22px] font-bold text-gray-900 leading-tight mt-0.5">
                    {coupon.title}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-normal mt-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Valid till: {coupon.validTill}</span>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={coupon.link}
                      className="text-xs text-gray-500 hover:text-[#00a99d] transition-colors inline-flex items-center gap-1 font-normal"
                    >
                      <span>See Products</span>
                      <span className="text-[13px] leading-none">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Code Box */}
              <div className="mt-5 border border-dashed border-gray-300 rounded-[2px] flex items-center justify-between overflow-hidden bg-white">
                <span className="px-4 text-xs font-mono font-medium text-gray-700 tracking-wider select-all">
                  {coupon.code}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer border-0 shrink-0 bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center gap-1.5"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <span>COPY CODE</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
