"use client";

/**
 * ============================================================================
 * HALAMAN TAUTAN AFILIASI / REFERRAL (Member Affiliate Links Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Menampilkan tautan referral unik pengguna untuk membagikan program afiliasi
 * Modesy dan mendapatkan komisi dari transaksi pembeli atau penjual baru.
 */

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function AffiliateLinksPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://modesy.codingest.net/register?ref=admin";

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-bold text-[#2c333e] mb-1">Affiliate Links & Referral Program</h2>
        <p className="text-xs text-[#6c757d]">
          Share your referral link with new buyers and sellers to earn commission rewards on completed transactions.
        </p>
      </div>

      <div className="p-4 bg-[#f8f9fa] border border-[#dee2e6] rounded-[2px] space-y-3">
        <label className="block text-xs font-semibold text-[#2c333e]">
          Your Unique Referral Link
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-3 py-1.5 border border-[#dee2e6] bg-white rounded-[2px] text-xs font-mono select-all text-[#495057]"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-1.5 bg-[#00ab97] hover:bg-[#009684] text-white text-xs font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
