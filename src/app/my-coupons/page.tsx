"use client";

/**
 * ============================================================================
 * HALAMAN KUPON DISKON SAYA (My Coupons)
 * ============================================================================
 * Halaman ini tempat pembeli melihat voucher atau kupon diskon yang mereka punya.
 * Di sini pembeli bisa melihat:
 * 1. Berapa persen diskon yang didapat (contoh: 15% diskon).
 * 2. Toko mana yang ngasih voucher (contoh: Trendshop).
 * 3. Kapan kupon ini habis masa berlakunya.
 * 4. Tombol "COPY CODE" buat langsung nyalin kode kupon ke clipboard HP/laptop,
 *    supaya pembeli tinggal tempel (paste) waktu mau bayar (checkout).
 */

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Check } from "lucide-react";

/**
 * Format data untuk setiap kartu kupon:
 * - id: nomor unik kupon
 * - vendorName: nama toko yang ngeluarin kupon
 * - title: tulisan besar diskonnya (misal: "15% Coupon")
 * - validTill: tanggal terakhir kupon bisa dipakai
 * - code: kode rahasia kuponnya (misal: "41GNOLDX")
 * - avatar: gambar foto profil tokonya
 * - targetLink: link toko/produk biar pembeli bisa langsung belanja
 */
interface CouponCardItem {
  id: string;
  vendorName: string;
  title: string;
  validTill: string;
  code: string;
  avatar: string;
  targetLink: string;
}

// Data kupon yang saat ini dimiliki pembeli
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
  // State untuk menyimpan kode kupon yang barusan disalin pembeli (biar tombol berubah jadi 'COPIED')
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  /**
   * Fungsi ini otomatis jalan pas tombol 'COPY CODE' diklik pembeli:
   * 1. Nyalin kode kupon ke clipboard komputer/HP.
   * 2. Nampilin teks 'COPIED' dan centang selama 2,5 detik biar pembeli tahu kodenya sudah kesalin.
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
      {/* Petunjuk jalan / Breadcrumb (Home / My Coupons) */}
      <div className="max-w-[1320px] mx-auto px-4 pt-5 pb-2">
        <nav className="flex items-center text-[12px] text-[#868e96] gap-1.5">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#495057]">My Coupons</span>
        </nav>
      </div>

      {/* Bagian utama daftar kupon */}
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        {/* Judul Halaman */}
        <h1 className="text-[20px] font-bold text-[#2c333e] mb-6">
          My Coupons
        </h1>

        {/* Deretan kartu-kartu kupon diskon */}
        <div className="flex flex-wrap gap-6">
          {MY_COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;

            return (
              <div
                key={coupon.id}
                className="w-full sm:w-[360px] border border-dashed border-[#dee2e6] rounded-[2px] p-4 bg-white transition-all hover:border-[#00ab97] shadow-2xs"
              >
                {/* Bagian atas: Foto profil toko, nama toko, besar diskon, dan masa berlaku */}
                <div className="flex items-start gap-3.5 mb-4">
                  {/* Foto bulat toko */}
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={coupon.avatar}
                      alt={coupon.vendorName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Keterangan kupon */}
                  <div className="flex-1 min-w-0">
                    {/* Nama Toko */}
                    <span className="text-[11px] font-bold text-[#2c333e] uppercase tracking-wide block">
                      {coupon.vendorName}
                    </span>
                    {/* Persen Kupon */}
                    <h2 className="text-[15px] font-bold text-[#2c333e] leading-snug mt-0.5">
                      {coupon.title}
                    </h2>
                    {/* Masa Berlaku Kupon */}
                    <div className="flex items-center gap-1 text-[11px] text-[#28a745] font-normal mt-1">
                      <Clock className="w-3 h-3 stroke-[2.5]" />
                      <span>Valid till: {coupon.validTill}</span>
                    </div>
                    {/* Tombol Lihat Produk */}
                    <Link
                      href={coupon.targetLink}
                      className="inline-flex items-center gap-1 text-[11px] text-[#6c757d] hover:text-[#00ab97] transition-colors mt-1.5"
                    >
                      <span>See Products</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Bagian bawah: Kotak kode kupon dan tombol salin (COPY CODE) */}
                <div className="flex items-stretch pt-2 border-t border-dashed border-[#dee2e6]">
                  {/* Tulisan kode voucher */}
                  <div className="flex-1 bg-white border border-dashed border-[#dee2e6] border-r-0 px-3 py-1.5 text-xs font-mono font-medium text-[#495057] tracking-wider flex items-center select-all">
                    {coupon.code}
                  </div>
                  {/* Tombol hijau untuk nyalin kode */}
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
