"use client";

/**
 * ============================================================================
 * HALAMAN KUPON BELANJA SAYA (Customer / Member Coupons Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Menampilkan daftar kupon dan voucher diskon yang dimiliki oleh pengguna / pelanggan.
 * Memungkinkan pengguna untuk melihat persentase potongan harga, masa berlaku kupon,
 * toko penerbit kupon, tautan katalog produk yang berlaku, serta menyalin kode kupon
 * ke clipboard secara langsung untuk digunakan pada halaman checkout.
 * 
 * FITUR:
 * 1. Breadcrumb navigasi (Home / My Coupons).
 * 2. Kartu Kupon bergaris putus-putus (*dashed border*) khas kupon diskon fisik.
 * 3. Identitas toko & avatar penjual.
 * 4. Nilai diskon & waktu kedaluwarsa kupon.
 * 5. Fitur klik untuk salin (*Click to Copy*) kode kupon dengan indikator visual 'COPIED'.
 */

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Check } from "lucide-react";

/**
 * Interface data kartu kupon pelanggan
 */
interface CouponCardItem {
  id: string;           // ID unik kupon
  vendorName: string;   // Nama toko penjual
  title: string;        // Judul voucher (e.g. 15% Coupon)
  validTill: string;    // Tanggal batas kedaluwarsa kupon
  code: string;         // Kode unik kupon untuk dimasukkan saat checkout
  avatar: string;       // Foto profil toko
  targetLink: string;   // Tautan menuju katalog produk terkait
}

/**
 * Data mock kupon diskon aktif
 */
const MY_COUPONS: CouponCardItem[] = [
  {
    id: "c1",
    vendorName: "TRENDSHOP",
    title: "15% Coupon",
    validTill: "31 March 2027",
    code: "41GNOLDX",
    avatar: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=200&q=80",
    targetLink: "/profile/admin",
  },
];

export default function MyCouponsPage() {
  // State untuk mencatat kode kupon yang baru saja disalin
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  /**
   * Fungsi untuk menyalin kode kupon ke clipboard sistem dan menampilkan feedback 'COPIED'
   */
  const handleCopyCode = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-[#495057] pb-24">
      {/* 1. Breadcrumb Navigasi */}
      <div className="max-w-[1320px] mx-auto px-4 pt-5 pb-2">
        <nav className="flex items-center text-[12px] text-[#868e96] gap-1.5">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#495057]">My Coupons</span>
        </nav>
      </div>

      {/* 2. Konten Halaman */}
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        {/* Judul Halaman */}
        <h1 className="text-[20px] font-bold text-[#2c333e] mb-6">
          My Coupons
        </h1>

        {/* Daftar Kartu Kupon */}
        <div className="flex flex-wrap gap-6">
          {MY_COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;

            return (
              <div
                key={coupon.id}
                className="w-full sm:w-[360px] border border-dashed border-[#dee2e6] rounded-[2px] p-4 bg-white transition-all hover:border-[#00ab97] shadow-2xs"
              >
                {/* Bagian Atas: Avatar & Detail Potongan Harga */}
                <div className="flex items-start gap-3.5 mb-4">
                  {/* Foto Profil Toko */}
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={coupon.avatar}
                      alt={coupon.vendorName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Informasi Voucher */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-[#2c333e] uppercase tracking-wide block">
                      {coupon.vendorName}
                    </span>
                    <h2 className="text-[15px] font-bold text-[#2c333e] leading-snug mt-0.5">
                      {coupon.title}
                    </h2>
                    <div className="flex items-center gap-1 text-[11px] text-[#28a745] font-normal mt-1">
                      <Clock className="w-3 h-3 stroke-[2.5]" />
                      <span>Valid till: {coupon.validTill}</span>
                    </div>
                    <Link
                      href={coupon.targetLink}
                      className="inline-flex items-center gap-1 text-[11px] text-[#6c757d] hover:text-[#00ab97] transition-colors mt-1.5"
                    >
                      <span>See Products</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Bagian Bawah: Kotak Kode Kupon & Tombol Salin */}
                <div className="flex items-stretch pt-2 border-t border-dashed border-[#dee2e6]">
                  <div className="flex-1 bg-white border border-dashed border-[#dee2e6] border-r-0 px-3 py-1.5 text-xs font-mono font-medium text-[#495057] tracking-wider flex items-center select-all">
                    {coupon.code}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(coupon.code)}
                    className="px-3.5 py-1.5 bg-[#00ab97] hover:bg-[#009684] text-white text-[11px] font-bold uppercase tracking-wider rounded-r-[2px] transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <span>COPY CODE</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
