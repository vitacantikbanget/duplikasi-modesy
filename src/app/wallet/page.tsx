"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  X,
  CheckCircle2,
  Wallet as WalletIcon,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export interface EarningItem {
  id: string;
  orderNumber: string;
  total: string;
  vat: string;
  commission: string;
  referrerCommission: string;
  referralDiscount: string;
  discountCoupon: string;
  shippingCost: string;
  earnedAmount: string;
  date: string;
}

const EARNINGS_DATA: EarningItem[] = [
  {
    id: "1",
    orderNumber: "#10033",
    total: "$69 (USD)",
    vat: "$6.90 (10%)",
    commission: "$6.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$2",
    earnedAmount: "$71 (USD)",
    date: "2026-10-04 / 20:20",
  },
  {
    id: "2",
    orderNumber: "#10010",
    total: "$40 (USD)",
    vat: "$4 (10%)",
    commission: "$6 (15%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$39.67 (USD)",
    date: "2026-09-25 / 14:03",
  },
  {
    id: "3",
    orderNumber: "#10010",
    total: "$69 (USD)",
    vat: "$6.90 (10%)",
    commission: "$6.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$70.67 (USD)",
    date: "2026-09-25 / 14:03",
  },
  {
    id: "4",
    orderNumber: "#10029",
    total: "$29 (USD)",
    vat: "$2.90 (10%)",
    commission: "$2.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$2.50",
    earnedAmount: "$31.50 (USD)",
    date: "2026-09-22 / 06:40",
  },
  {
    id: "5",
    orderNumber: "#10025",
    total: "₦43,737.51 (NGN)",
    vat: "₦4,373.75 (10%)",
    commission: "₦4,373.75 (10%)",
    referrerCommission: "₦0 (0%)",
    referralDiscount: "₦0 (0%)",
    discountCoupon: "₦0",
    shippingCost: "₦0",
    earnedAmount: "₦43,737.51 (NGN) (29.00 USD)",
    date: "2026-09-16 / 10:38",
  },
  {
    id: "6",
    orderNumber: "#10015",
    total: "$36 (USD)",
    vat: "$3.60 (10%)",
    commission: "$3.60 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$36 (USD)",
    date: "2026-09-06 / 02:14",
  },
  {
    id: "7",
    orderNumber: "#10011",
    total: "$10 (USD)",
    vat: "$1 (10%)",
    commission: "$1 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$10 (USD)",
    date: "2026-08-31 / 18:56",
  },
  {
    id: "8",
    orderNumber: "#10010",
    total: "$29 (USD)",
    vat: "$2.90 (10%)",
    commission: "$2.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$30.67 (USD)",
    date: "2026-08-31 / 17:37",
  },
  {
    id: "9",
    orderNumber: "#10008",
    total: "$25 (USD)",
    vat: "$2.50 (10%)",
    commission: "$2.50 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$25 (USD)",
    date: "2026-08-05 / 13:57",
  },
  {
    id: "10",
    orderNumber: "#10007",
    total: "$29 (USD)",
    vat: "$2.90 (10%)",
    commission: "$2.90 (10%)",
    referrerCommission: "$2.90 (10%)",
    referralDiscount: "$1.45 (5%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$24.65 (USD)",
    date: "2026-08-05 / 13:50",
  },
  {
    id: "11",
    orderNumber: "#10003",
    total: "$108 (USD)",
    vat: "$10.80 (10%)",
    commission: "$16.20 (15%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$16.20 (41GNOLDX)",
    shippingCost: "$5",
    earnedAmount: "$91.40 (USD)",
    date: "2026-08-05 / 13:02",
  },
  {
    id: "12",
    orderNumber: "#10002",
    total: "$48 (USD)",
    vat: "$4.80 (10%)",
    commission: "$4.80 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$49.67 (USD)",
    date: "2026-08-04 / 15:16",
  },
  {
    id: "13",
    orderNumber: "#10002",
    total: "$65 (USD)",
    vat: "$6.50 (10%)",
    commission: "$6.50 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$66.67 (USD)",
    date: "2026-08-04 / 15:16",
  },
  {
    id: "14",
    orderNumber: "#10001",
    total: "$65 (USD)",
    vat: "$6.50 (10%)",
    commission: "$3.25 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$5",
    earnedAmount: "$73.25 (USD)",
    date: "2026-08-04 / 12:14",
  },
];

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<
    "earnings" | "deposits" | "expenses" | "payouts" | "set-payout"
  >("earnings");

  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [fundsAmount, setFundsAmount] = useState("500000");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddFundsOpen(false);
    showToast(`Funds of Rp${Number(fundsAmount).toLocaleString()} added successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00ab97] text-white px-5 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-[13.5px] animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        {/* Breadcrumb */}
        <nav className="text-[12.5px] text-[#6c757d] mb-4">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-[#2c333e] font-medium">Wallet</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[22px] font-bold text-[#2c333e] mb-6 font-sans">
          Wallet
        </h1>

        {/* Center Wallet Balance Card */}
        <div className="max-w-[620px] mx-auto bg-white rounded-[4px] border border-[#e9ecef] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)] relative text-center mb-8">
          {/* Add Funds Button */}
          <div className="absolute right-5 top-5">
            <button
              type="button"
              onClick={() => setAddFundsOpen(true)}
              className="px-3.5 py-1.5 bg-[#f4f6f9] hover:bg-[#e9ecef] text-[#495057] border border-[#dee2e6] rounded-[3px] text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-gray-500" />
              <span>Add Funds</span>
            </button>
          </div>

          {/* Wallet Icon */}
          <div className="w-16 h-16 mx-auto mb-3 rounded-[8px] bg-[#e0f7f5] flex items-center justify-center">
            <WalletIcon className="w-9 h-9 text-[#00ab97] stroke-[1.8]" />
          </div>

          {/* Wallet Balance Label */}
          <div className="text-[13px] text-[#6c757d] font-normal mb-1">
            Wallet Balance
          </div>

          {/* Amount */}
          <div className="text-[32px] sm:text-[36px] font-bold text-[#2c333e] tracking-tight font-sans">
            Rp13,079,629.84
          </div>
        </div>

        {/* Navigation Tabs / Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("earnings")}
            className={`px-5 py-2 rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === "earnings"
                ? "bg-[#00ab97] text-white shadow-2xs"
                : "bg-white border border-[#e9ecef] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Earnings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("deposits")}
            className={`px-5 py-2 rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === "deposits"
                ? "bg-[#00ab97] text-white shadow-2xs"
                : "bg-white border border-[#e9ecef] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Deposits
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("expenses")}
            className={`px-5 py-2 rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === "expenses"
                ? "bg-[#00ab97] text-white shadow-2xs"
                : "bg-white border border-[#e9ecef] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Expenses
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payouts")}
            className={`px-5 py-2 rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === "payouts"
                ? "bg-[#00ab97] text-white shadow-2xs"
                : "bg-white border border-[#e9ecef] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Payouts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("set-payout")}
            className={`px-5 py-2 rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === "set-payout"
                ? "bg-[#00ab97] text-white shadow-2xs"
                : "bg-white border border-[#e9ecef] text-[#495057] hover:text-[#00ab97]"
            }`}
          >
            Set Payout Account
          </button>
        </div>

        {/* ================= TAB CONTENT ================= */}

        {/* 1. EARNINGS TAB */}
        {activeTab === "earnings" && (
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse min-w-[950px]">
                <thead>
                  <tr className="text-[#2c333e] font-semibold text-[13px] border-b border-[#f1f3f5]">
                    <th className="pb-3.5 pr-4 pl-1 font-semibold w-[90px]">Order</th>
                    <th className="pb-3.5 pr-4 font-semibold w-[140px]">Total</th>
                    <th className="pb-3.5 pr-4 font-semibold w-[140px]">VAT</th>
                    <th className="pb-3.5 pr-6 font-semibold min-w-[260px]">
                      Commissions & Discounts
                    </th>
                    <th className="pb-3.5 pr-4 font-semibold w-[120px]">Shipping Cost</th>
                    <th className="pb-3.5 pr-4 font-semibold w-[180px]">Earned Amount</th>
                    <th className="pb-3.5 pr-1 font-semibold w-[160px]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f8f9fa]">
                  {EARNINGS_DATA.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                      {/* Order Number */}
                      <td className="py-4 pr-4 pl-1 text-[#2c333e] align-top font-normal">
                        {item.orderNumber}
                      </td>

                      {/* Total */}
                      <td className="py-4 pr-4 text-[#2c333e] align-top font-normal">
                        {item.total}
                      </td>

                      {/* VAT */}
                      <td className="py-4 pr-4 text-[#2c333e] align-top font-normal">
                        {item.vat}
                      </td>

                      {/* Commissions & Discounts */}
                      <td className="py-4 pr-6 text-[#2c333e] align-top leading-relaxed text-[12.5px]">
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

                      {/* Shipping Cost */}
                      <td className="py-4 pr-4 text-[#2c333e] align-top font-normal">
                        {item.shippingCost}
                      </td>

                      {/* Earned Amount */}
                      <td className="py-4 pr-4 text-[#28a745] font-semibold align-top whitespace-nowrap">
                        {item.earnedAmount}
                      </td>

                      {/* Date */}
                      <td className="py-4 pr-1 text-[#2c333e] align-top whitespace-nowrap font-normal">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. DEPOSITS TAB */}
        {activeTab === "deposits" && (
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowDownLeft className="w-6 h-6" />
            </div>
            <h3 className="text-[16px] font-bold text-[#2c333e] mb-1">Deposit History</h3>
            <p className="text-[13px] text-gray-500 mb-6">
              You haven't made any manual deposit transactions yet.
            </p>
            <button
              onClick={() => setAddFundsOpen(true)}
              className="px-5 py-2 bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium rounded-[3px] transition-colors"
            >
              Deposit Funds Now
            </button>
          </div>
        )}

        {/* 3. EXPENSES TAB */}
        {activeTab === "expenses" && (
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <h3 className="text-[16px] font-bold text-[#2c333e] mb-1">Expenses History</h3>
            <p className="text-[13px] text-gray-500">
              No store expenses recorded for this billing cycle.
            </p>
          </div>
        )}

        {/* 4. PAYOUTS TAB */}
        {activeTab === "payouts" && (
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-[16px] font-bold text-[#2c333e] mb-1">Payout History</h3>
            <p className="text-[13px] text-gray-500 mb-6">
              Your available balance is eligible for withdrawal once minimum payout threshold is reached.
            </p>
            <button
              onClick={() => showToast("Payout request submitted for review!")}
              className="px-5 py-2 bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium rounded-[3px] transition-colors"
            >
              Request Payout
            </button>
          </div>
        )}

        {/* 5. SET PAYOUT ACCOUNT TAB */}
        {activeTab === "set-payout" && (
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)] max-w-xl mx-auto">
            <h3 className="text-[17px] font-bold text-[#2c333e] mb-6">
              Set Payout Account
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast("Payout account settings saved successfully!");
              }}
              className="space-y-4 text-[13px]"
            >
              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Bank Name
                </label>
                <input
                  type="text"
                  defaultValue="BCA (Bank Central Asia)"
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Account Number / IBAN
                </label>
                <input
                  type="text"
                  defaultValue="882019482103"
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  defaultValue="Trendshop Official"
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  PayPal Email (Optional)
                </label>
                <input
                  type="email"
                  defaultValue="billing@trendshop.com"
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] font-medium transition-colors"
                >
                  Save Payout Account
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ================= MODAL: ADD FUNDS ================= */}
      {addFundsOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#e9ecef] flex items-center justify-between bg-[#fbfcfd]">
              <h3 className="text-[16px] font-bold text-[#2c333e]">
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

            <form onSubmit={handleDepositSubmit} className="p-6 space-y-4 text-[13px]">
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
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 border border-[#dee2e6] rounded-[3px] cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="method" defaultChecked className="text-[#00ab97]" />
                    <span className="text-[#2c333e] font-medium">Bank Transfer / Virtual Account</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 border border-[#dee2e6] rounded-[3px] cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="method" className="text-[#00ab97]" />
                    <span className="text-[#2c333e] font-medium">Credit / Debit Card (Stripe)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 border border-[#dee2e6] rounded-[3px] cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="method" className="text-[#00ab97]" />
                    <span className="text-[#2c333e] font-medium">PayPal</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#f1f3f5]">
                <button
                  type="button"
                  onClick={() => setAddFundsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-[3px] text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] font-medium transition-colors"
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
