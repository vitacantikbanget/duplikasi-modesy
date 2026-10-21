"use client";

/**
 * ============================================================================
 * HALAMAN DOMPET PENGGUNA (Customer / Member Wallet Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Menampilkan saldo dompet pengguna, navigasi riwayat komisi transaksi (Earnings),
 * riwayat isi saldo manual (Deposits), pengeluaran (Expenses), penarikan dana
 * (Payouts), serta konfigurasi akun bank/PayPal penarikan (Set Payout Account).
 * 
 * FITUR:
 * 1. Kartu Saldo Dompet (Wallet Balance Card) dengan tombol Add Funds.
 * 2. Navigasi Tab Pills (Earnings, Deposits, Expenses, Payouts, Set Payout Account).
 * 3. Tabel Riwayat Pendapatan / Earnings (Total, PPN, Rincian Komisi & Diskon, Ongkir, Pendapatan Bersih).
 * 4. Modal Isi Saldo / Add Funds ke dompet via Bank Transfer atau Kartu.
 * 5. Konfigurasi rekening bank pencairan dana.
 */

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  X,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

/**
 * Tipe data untuk baris transaksi pendapatan (Earnings item)
 */
export interface EarningItem {
  id: string;                   // ID unik baris data
  orderNumber: string;          // Nomor pesanan (e.g. #10051)
  total: string;                // Total nilai transaksi (e.g. $240 (USD))
  vat: string;                  // Nilai PPN / VAT
  commission: string;           // Nilai komisi platform
  referrerCommission: string;   // Nilai komisi afiliasi
  referralDiscount: string;     // Nilai diskon referral
  discountCoupon: string;       // Nilai kupon potongan harga
  shippingCost: string;         // Ongkos kirim
  earnedAmount: string;         // Pendapatan bersih penjual / penerima
  date: string;                 // Tanggal transaksi
}

/**
 * Data transaksi riwayat pendapatan toko
 */
const EARNINGS_DATA: EarningItem[] = [
  {
    id: "1",
    orderNumber: "#10051",
    total: "$240 (USD)",
    vat: "$0",
    commission: "$12 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$5",
    earnedAmount: "$255 (USD)",
    date: "2026-10-17 / 21:39",
  },
  {
    id: "2",
    orderNumber: "#10033",
    total: "$80 (USD)",
    vat: "$0",
    commission: "$12 (15%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$68 (USD)",
    date: "2026-10-04 / 20:20",
  },
  {
    id: "3",
    orderNumber: "#10033",
    total: "$15 (USD)",
    vat: "$0",
    commission: "$0.75 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$14.25 (USD)",
    date: "2026-09-23 / 17:23",
  },
  {
    id: "4",
    orderNumber: "#10010",
    total: "$59 (USD)",
    vat: "$0",
    commission: "$5.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$53.10 (USD)",
    date: "2026-09-16 / 10:12",
  },
  {
    id: "5",
    orderNumber: "#10011",
    total: "$49 (USD)",
    vat: "$0",
    commission: "$2.45 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$46.55 (USD)",
    date: "2026-09-16 / 10:12",
  },
  {
    id: "6",
    orderNumber: "#10010",
    total: "$19 (USD)",
    vat: "$0",
    commission: "$0.95 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$18.05 (USD)",
    date: "2026-08-31 / 17:37",
  },
  {
    id: "7",
    orderNumber: "#10009",
    total: "$100 (USD)",
    vat: "$0",
    commission: "$5 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$10",
    earnedAmount: "$105 (USD)",
    date: "2026-08-05 / 14:38",
  },
  {
    id: "8",
    orderNumber: "#10006",
    total: "$160 (USD)",
    vat: "$0",
    commission: "$24 (15%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$10",
    earnedAmount: "$146 (USD)",
    date: "2026-08-05 / 12:48",
  },
  {
    id: "9",
    orderNumber: "#10005",
    total: "$49 (USD)",
    vat: "$0",
    commission: "$2.45 (5%)",
    referrerCommission: "$2.45 (5%)",
    referralDiscount: "$2.45 (5%)",
    discountCoupon: "$0",
    shippingCost: "$10",
    earnedAmount: "$51.65 (USD)",
    date: "2026-08-05 / 12:46",
  },
  {
    id: "10",
    orderNumber: "#10004",
    total: "$150 (USD)",
    vat: "$0",
    commission: "$22.50 (15%)",
    referrerCommission: "$7.50 (5%)",
    referralDiscount: "$7.50 (5%)",
    discountCoupon: "$0",
    shippingCost: "$10",
    earnedAmount: "$122.50 (USD)",
    date: "2026-08-05 / 12:21",
  },
];

export default function WalletPage() {
  // State tab dompet aktif
  const [activeTab, setActiveTab] = useState<
    "earnings" | "deposits" | "expenses" | "payouts" | "set-payout"
  >("earnings");

  // State untuk modal tambah saldo (Add Funds)
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [fundsAmount, setFundsAmount] = useState("500000");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper menampilkan notifikasi toast sementara
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handler pengajuan penambahan dana
  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddFundsOpen(false);
    showToast(`Funds of Rp${Number(fundsAmount).toLocaleString()} added successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-16 font-sans text-[#495057]">
      {/* Toast Notifikasi Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00ab97] text-white px-5 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-[13.5px] animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-5">
        {/* Breadcrumb Navigasi */}
        <nav className="text-[12px] text-[#868e96] mb-3">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="mx-1.5 text-gray-400">/</span>
          <span className="text-[#495057]">Wallet</span>
        </nav>

        {/* Judul Halaman */}
        <h1 className="text-[20px] font-bold text-[#2c333e] mb-6 font-sans">
          Wallet
        </h1>

        {/* 1. KARTU SALDO DOMPET (Wallet Balance Card) */}
        <div className="max-w-[580px] mx-auto bg-white rounded-[2px] border border-[#dee2e6] p-7 relative text-center mb-6 shadow-2xs">
          {/* Tombol Tambah Saldo di Pojok Kanan Atas */}
          <div className="absolute right-4 top-4">
            <button
              type="button"
              onClick={() => setAddFundsOpen(true)}
              className="px-2.5 py-1 bg-[#f8f9fa] hover:bg-[#e9ecef] text-[#495057] border border-[#dee2e6] rounded-[2px] text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-gray-500" />
              <span>Add Funds</span>
            </button>
          </div>

          {/* Ikon Dompet Teal */}
          <div className="w-12 h-12 mx-auto mb-2 text-[#00ab97] flex items-center justify-center">
            <svg 
              className="w-10 h-10 fill-[#00ab97]" 
              viewBox="0 0 24 24"
            >
              <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"/>
              <circle cx="16" cy="12" r="1.5" fill="#ffffff" />
            </svg>
          </div>

          <div className="text-[12px] text-[#868e96] font-normal mb-1">
            Wallet Balance
          </div>

          {/* Nilai Saldo Pengguna */}
          <div className="text-[28px] sm:text-[32px] font-bold text-[#2c333e] tracking-tight font-sans">
            Rp20,540,352.76
          </div>
        </div>

        {/* 2. TAB PILLS NAVIGASI DOMPET */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("earnings")}
            className={`px-4 py-1.5 rounded-[2px] text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "earnings"
                ? "bg-[#00ab97] text-white"
                : "bg-white border border-[#dee2e6] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Earnings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("deposits")}
            className={`px-4 py-1.5 rounded-[2px] text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "deposits"
                ? "bg-[#00ab97] text-white"
                : "bg-white border border-[#dee2e6] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Deposits
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("expenses")}
            className={`px-4 py-1.5 rounded-[2px] text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "expenses"
                ? "bg-[#00ab97] text-white"
                : "bg-white border border-[#dee2e6] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Expenses
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payouts")}
            className={`px-4 py-1.5 rounded-[2px] text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "payouts"
                ? "bg-[#00ab97] text-white"
                : "bg-white border border-[#dee2e6] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Payouts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("set-payout")}
            className={`px-4 py-1.5 rounded-[2px] text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "set-payout"
                ? "bg-[#00ab97] text-white"
                : "bg-white border border-[#dee2e6] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Set Payout Account
          </button>
        </div>

        {/* 3. KONTEN TAB UTAMA */}

        {/* TAB 1: RIWAYAT PENDAPATAN / EARNINGS */}
        {activeTab === "earnings" && (
          <div className="bg-white rounded-[2px] border border-[#dee2e6] p-4 lg:p-6 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px] border-collapse min-w-[950px]">
                <thead>
                  <tr className="text-[#2c333e] font-semibold text-[12px] border-b border-[#dee2e6]">
                    <th className="pb-3 pr-4 pl-1 font-semibold w-[90px]">Order</th>
                    <th className="pb-3 pr-4 font-semibold w-[130px]">Total</th>
                    <th className="pb-3 pr-4 font-semibold w-[90px]">VAT</th>
                    <th className="pb-3 pr-6 font-semibold min-w-[260px]">
                      Commissions & Discounts
                    </th>
                    <th className="pb-3 pr-4 font-semibold w-[120px]">Shipping Cost</th>
                    <th className="pb-3 pr-4 font-semibold w-[160px]">Earned Amount</th>
                    <th className="pb-3 pr-1 font-semibold w-[160px]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e9ecef]">
                  {EARNINGS_DATA.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                      {/* Nomor Order */}
                      <td className="py-3.5 pr-4 pl-1 text-[#2c333e] align-top font-normal">
                        {item.orderNumber}
                      </td>

                      {/* Total Kotor */}
                      <td className="py-3.5 pr-4 text-[#2c333e] align-top font-normal">
                        {item.total}
                      </td>

                      {/* Pajak PPN */}
                      <td className="py-3.5 pr-4 text-[#2c333e] align-top font-normal">
                        {item.vat}
                      </td>

                      {/* Rincian Komisi & Diskon */}
                      <td className="py-3.5 pr-6 text-[#495057] align-top leading-relaxed text-[11.5px]">
                        <div>
                          Commission:{" "}
                          <span className="text-[#e74c3c] font-normal">
                            {item.commission}
                          </span>
                        </div>
                        <div>
                          Referrer Commission:{" "}
                          <span className="text-[#e74c3c] font-normal">
                            {item.referrerCommission}
                          </span>
                        </div>
                        <div>
                          Referral Discount:{" "}
                          <span className="text-[#e74c3c] font-normal">
                            {item.referralDiscount}
                          </span>
                        </div>
                        <div>
                          Discount Coupon:{" "}
                          <span className="text-[#e74c3c] font-normal">
                            {item.discountCoupon}
                          </span>
                        </div>
                      </td>

                      {/* Biaya Kirim */}
                      <td className="py-3.5 pr-4 text-[#2c333e] align-top font-normal">
                        {item.shippingCost}
                      </td>

                      {/* Pendapatan Bersih (Teks Tebal Hijau) */}
                      <td className="py-3.5 pr-4 text-[#28a745] font-semibold align-top whitespace-nowrap">
                        {item.earnedAmount}
                      </td>

                      {/* Tanggal */}
                      <td className="py-3.5 pr-1 text-[#6c757d] align-top whitespace-nowrap font-normal">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: RIWAYAT DEPOSIT (DEPOSITS) */}
        {activeTab === "deposits" && (
          <div className="bg-white rounded-[2px] border border-[#dee2e6] p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowDownLeft className="w-6 h-6" />
            </div>
            <h3 className="text-[15px] font-bold text-[#2c333e] mb-1">Deposit History</h3>
            <p className="text-[12px] text-gray-500 mb-6">
              You haven't made any manual deposit transactions yet.
            </p>
            <button
              onClick={() => setAddFundsOpen(true)}
              className="px-4 py-1.5 bg-[#00ab97] hover:bg-[#009684] text-white text-[12px] font-medium rounded-[2px] transition-colors"
            >
              Deposit Funds Now
            </button>
          </div>
        )}

        {/* TAB 3: PENGELUARAN (EXPENSES) */}
        {activeTab === "expenses" && (
          <div className="bg-white rounded-[2px] border border-[#dee2e6] p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <h3 className="text-[15px] font-bold text-[#2c333e] mb-1">Expenses History</h3>
            <p className="text-[12px] text-gray-500">
              No store expenses recorded for this billing cycle.
            </p>
          </div>
        )}

        {/* TAB 4: PENARIKAN DANA (PAYOUTS) */}
        {activeTab === "payouts" && (
          <div className="bg-white rounded-[2px] border border-[#dee2e6] p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-[15px] font-bold text-[#2c333e] mb-1">Payout History</h3>
            <p className="text-[12px] text-gray-500 mb-6">
              Your available balance is eligible for withdrawal once minimum payout threshold is reached.
            </p>
            <button
              onClick={() => showToast("Payout request submitted for review!")}
              className="px-4 py-1.5 bg-[#00ab97] hover:bg-[#009684] text-white text-[12px] font-medium rounded-[2px] transition-colors"
            >
              Request Payout
            </button>
          </div>
        )}

        {/* TAB 5: PENGATURAN REKENING PENARIKAN (SET PAYOUT ACCOUNT) */}
        {activeTab === "set-payout" && (
          <div className="bg-white rounded-[2px] border border-[#dee2e6] p-6 lg:p-8 max-w-xl mx-auto">
            <h3 className="text-[15px] font-bold text-[#2c333e] mb-6">
              Set Payout Account
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast("Payout account settings saved successfully!");
              }}
              className="space-y-4 text-[12px]"
            >
              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Bank Name
                </label>
                <input
                  type="text"
                  defaultValue="BCA (Bank Central Asia)"
                  className="w-full px-3 py-1.5 border border-[#dee2e6] rounded-[2px] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Account Number / IBAN
                </label>
                <input
                  type="text"
                  defaultValue="882019482103"
                  className="w-full px-3 py-1.5 border border-[#dee2e6] rounded-[2px] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  defaultValue="Admin Official"
                  className="w-full px-3 py-1.5 border border-[#dee2e6] rounded-[2px] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  PayPal Email (Optional)
                </label>
                <input
                  type="email"
                  defaultValue="admin@example.com"
                  className="w-full px-3 py-1.5 border border-[#dee2e6] rounded-[2px] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[2px] font-medium transition-colors"
                >
                  Save Payout Account
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* 4. MODAL ISI SALDO / TAMBAH DANA (ADD FUNDS MODAL) */}
      {addFundsOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[2px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#dee2e6] flex items-center justify-between bg-[#fbfcfd]">
              <h3 className="text-[15px] font-bold text-[#2c333e]">
                Add Funds to Wallet
              </h3>
              <button
                type="button"
                onClick={() => setAddFundsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="p-6 space-y-4 text-[12px]">
              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Deposit Amount (IDR)
                </label>
                <input
                  type="number"
                  min="10000"
                  step="1000"
                  required
                  value={fundsAmount}
                  onChange={(e) => setFundsAmount(e.target.value)}
                  className="w-full px-3 py-1.5 border border-[#dee2e6] rounded-[2px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 border border-[#dee2e6] rounded-[2px] cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="method" defaultChecked className="text-[#00ab97]" />
                    <span className="text-[#2c333e] font-medium">Bank Transfer / Virtual Account</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 border border-[#dee2e6] rounded-[2px] cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="method" className="text-[#00ab97]" />
                    <span className="text-[#2c333e] font-medium">Credit / Debit Card (Stripe)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 border border-[#dee2e6] rounded-[2px] cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="method" className="text-[#00ab97]" />
                    <span className="text-[#2c333e] font-medium">PayPal</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#dee2e6]">
                <button
                  type="button"
                  onClick={() => setAddFundsOpen(false)}
                  className="px-4 py-1.5 border border-gray-300 rounded-[2px] text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[2px] font-medium transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
