"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FileText, X, Printer, CheckCircle2 } from "lucide-react";

export interface MembershipPaymentItem {
  id: number;
  paymentId: string;
  paymentMethod: string;
  membershipPlan: string;
  paymentAmount: string;
  paymentStatus: string;
  date: string;
}

export interface PromotionPaymentItem {
  id: number;
  paymentId: string;
  paymentMethod: string;
  productId: number;
  paymentAmount: string;
  paymentStatus: string;
  purchasedPlan: string;
  date: string;
}

export const MEMBERSHIP_PAYMENTS: MembershipPaymentItem[] = [
  {
    id: 3,
    paymentId: "WLT-HMKBXC78KP-C2OT79NU",
    paymentMethod: "Wallet Balance",
    membershipPlan: "Professional (Number of Ads: Unlimited, Number of Days: Unlimited)",
    paymentAmount: "$30.45 (USD)",
    paymentStatus: "Succeeded",
    date: "2026-09-23 / 17:22",
  },
  {
    id: 1,
    paymentId: "pi_3SIuYHBHW47ba9xU0s6wR7dv",
    paymentMethod: "Stripe",
    membershipPlan: "Professional (Number of Ads: Unlimited, Number of Days: Unlimited)",
    paymentAmount: "$30.45 (USD)",
    paymentStatus: "paid",
    date: "2026-07-30 / 21:35",
  },
];

export const PROMOTION_PAYMENTS: PromotionPaymentItem[] = [
  {
    id: 15,
    paymentId: "80R99643X06310109",
    paymentMethod: "PayPal",
    productId: 41,
    paymentAmount: "9.45 (USD)",
    paymentStatus: "COMPLETED",
    purchasedPlan: "Monthly Plan (270 Days)",
    date: "2026-08-04 / 10:34",
  },
  {
    id: 12,
    paymentId: "20T479709E951411J",
    paymentMethod: "PayPal",
    productId: 17,
    paymentAmount: "31.50 (USD)",
    paymentStatus: "COMPLETED",
    purchasedPlan: "Daily Plan (300 Days)",
    date: "2026-08-04 / 10:30",
  },
  {
    id: 11,
    paymentId: "TST2524702337417",
    paymentMethod: "PayTabs",
    productId: 30,
    paymentAmount: "8.40 (USD)",
    paymentStatus: "Authorised",
    purchasedPlan: "Monthly Plan (240 Days)",
    date: "2026-08-04 / 10:27",
  },
  {
    id: 6,
    paymentId: "9614491",
    paymentMethod: "Flutterwave",
    productId: 33,
    paymentAmount: "7.35 (USD)",
    paymentStatus: "Successful",
    purchasedPlan: "Monthly Plan (210 Days)",
    date: "2026-08-04 / 10:11",
  },
  {
    id: 5,
    paymentId: "pay_RDSAEwAnicw9nb",
    paymentMethod: "Razorpay",
    productId: 15,
    paymentAmount: "555.24 (INR)",
    paymentStatus: "captured",
    purchasedPlan: "Monthly Plan (180 Days)",
    date: "2026-08-04 / 10:09",
  },
  {
    id: 4,
    paymentId: "7MY93294KM779043W",
    paymentMethod: "PayPal",
    productId: 13,
    paymentAmount: "31.50 (USD)",
    paymentStatus: "COMPLETED",
    purchasedPlan: "Daily Plan (300 Days)",
    date: "2026-08-04 / 10:06",
  },
  {
    id: 2,
    paymentId: "pi_3S3MzFBHW47ba9xU0aSzZS56",
    paymentMethod: "Stripe",
    productId: 11,
    paymentAmount: "8.40 (USD)",
    paymentStatus: "paid",
    purchasedPlan: "Monthly Plan (240 Days)",
    date: "2026-08-03 / 22:09",
  },
];

type InvoiceItem = {
  type: "membership" | "promotion";
  id: number;
  paymentId: string;
  paymentMethod: string;
  plan: string;
  amount: string;
  status: string;
  date: string;
  productId?: number;
};

function PaymentsContent() {
  const searchParams = useSearchParams();
  const paymentType = searchParams?.get("payment") || "membership";
  const isPromotion = paymentType === "promotion";

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);

  const currentCount = isPromotion ? PROMOTION_PAYMENTS.length : MEMBERSHIP_PAYMENTS.length;

  return (
    <div className="w-full">
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Page Title */}
        <h1 className="text-[19px] font-bold text-[#2c333e] mb-7 font-sans">
          {isPromotion ? "Promotion Payments" : "Membership Payments"}
        </h1>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          {isPromotion ? (
            /* Promotion Payments Table */
            <table className="w-full text-left text-[13px] border-collapse min-w-[950px]">
              <thead>
                <tr className="text-[#2c333e] font-semibold text-[13px] border-b border-[#f1f3f5]">
                  <th className="pb-3.5 pr-4 pl-1 font-semibold w-[50px]">Id</th>
                  <th className="pb-3.5 pr-4 font-semibold">Payment Id</th>
                  <th className="pb-3.5 pr-4 font-semibold">Payment Method</th>
                  <th className="pb-3.5 pr-4 font-semibold w-[80px]">Product Id</th>
                  <th className="pb-3.5 pr-4 font-semibold">Payment Amount</th>
                  <th className="pb-3.5 pr-4 font-semibold">Payment Status</th>
                  <th className="pb-3.5 pr-4 font-semibold">Purchased Plan</th>
                  <th className="pb-3.5 pr-4 font-semibold">Date</th>
                  <th className="pb-3.5 font-semibold text-left">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fa]">
                {PROMOTION_PAYMENTS.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    <td className="py-4 pr-4 pl-1 text-[#2c333e] align-middle">{item.id}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle font-normal">{item.paymentId}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle">{item.paymentMethod}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle">{item.productId}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle">{item.paymentAmount}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle">{item.paymentStatus}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle">{item.purchasedPlan}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle whitespace-nowrap">{item.date}</td>
                    <td className="py-4 align-middle">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedInvoice({
                            type: "promotion",
                            id: item.id,
                            paymentId: item.paymentId,
                            paymentMethod: item.paymentMethod,
                            plan: item.purchasedPlan,
                            amount: item.paymentAmount,
                            status: item.paymentStatus,
                            date: item.date,
                            productId: item.productId,
                          })
                        }
                        className="bg-[#00a2b8] hover:bg-[#008ea2] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-white" />
                        <span>View Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Membership Payments Table */
            <table className="w-full text-left text-[13px] border-collapse min-w-[950px]">
              <thead>
                <tr className="text-[#2c333e] font-semibold text-[13px] border-b border-[#f1f3f5]">
                  <th className="pb-3.5 pr-4 pl-1 font-semibold w-[50px]">Id</th>
                  <th className="pb-3.5 pr-4 font-semibold">Payment Id</th>
                  <th className="pb-3.5 pr-4 font-semibold">Payment Method</th>
                  <th className="pb-3.5 pr-4 font-semibold max-w-[280px]">Membership Plan</th>
                  <th className="pb-3.5 pr-4 font-semibold">Payment Amount</th>
                  <th className="pb-3.5 pr-4 font-semibold">Payment Status</th>
                  <th className="pb-3.5 pr-4 font-semibold">Date</th>
                  <th className="pb-3.5 font-semibold text-left">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fa]">
                {MEMBERSHIP_PAYMENTS.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    <td className="py-4 pr-4 pl-1 text-[#2c333e] align-middle">{item.id}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle font-normal">{item.paymentId}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle">{item.paymentMethod}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle max-w-[280px] leading-relaxed">
                      {item.membershipPlan}
                    </td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle">{item.paymentAmount}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle">{item.paymentStatus}</td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle whitespace-nowrap">{item.date}</td>
                    <td className="py-4 align-middle">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedInvoice({
                            type: "membership",
                            id: item.id,
                            paymentId: item.paymentId,
                            paymentMethod: item.paymentMethod,
                            plan: item.membershipPlan,
                            amount: item.paymentAmount,
                            status: item.paymentStatus,
                            date: item.date,
                          })
                        }
                        className="bg-[#00a2b8] hover:bg-[#008ea2] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-white" />
                        <span>View Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Number of Entries */}
        <div className="mt-8 pt-4 text-[#2c333e] select-none text-[13px]">
          <span>Number of Entries: </span>
          <span className="font-bold">{currentCount}</span>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#e9ecef] flex items-center justify-between bg-[#fbfcfd]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00a2b8]" />
                <h3 className="text-[17px] font-bold text-[#2c333e]">
                  Invoice #{selectedInvoice.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 text-[13.5px]">
              {/* Brand Header */}
              <div className="flex items-start justify-between border-b border-[#f1f3f5] pb-5">
                <div>
                  <span className="text-[26px] font-bold tracking-tight text-[#2c333e] font-sans flex items-center">
                    M<span className="text-[#00ab97]">o</span>desy
                  </span>
                  <p className="text-[12px] text-gray-500 mt-0.5">Official Transaction Invoice</p>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">Date</div>
                  <div className="text-[#2c333e] font-medium">{selectedInvoice.date}</div>
                </div>
              </div>

              {/* Transaction Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#f8fafc] p-4 rounded-[4px] border border-[#e9ecef]">
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Payment ID</span>
                  <span className="font-medium text-[#2c333e] text-[12.5px] break-all">{selectedInvoice.paymentId}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Payment Method</span>
                  <span className="font-semibold text-[#2c333e]">{selectedInvoice.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Payment Status</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    {selectedInvoice.status}
                  </span>
                </div>
                {selectedInvoice.productId !== undefined && (
                  <div>
                    <span className="text-gray-500 block text-xs mb-1">Product ID</span>
                    <span className="font-semibold text-[#2c333e]">#{selectedInvoice.productId}</span>
                  </div>
                )}
                <div className="col-span-2">
                  <span className="text-gray-500 block text-xs mb-1">Plan / Package</span>
                  <span className="font-medium text-[#2c333e] text-[13px]">{selectedInvoice.plan}</span>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="border border-[#e9ecef] rounded-[4px] overflow-hidden">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#f8fafc] border-b border-[#e9ecef] text-gray-600 font-semibold">
                    <tr>
                      <th className="py-2.5 px-4">Description</th>
                      <th className="py-2.5 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f3f5]">
                    <tr>
                      <td className="py-3 px-4 text-[#2c333e]">{selectedInvoice.plan}</td>
                      <td className="py-3 px-4 text-right font-medium text-[#2c333e]">{selectedInvoice.amount}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-[#f8fafc] border-t border-[#e9ecef] font-semibold text-[#2c333e]">
                    <tr>
                      <td className="py-3 px-4">Total Paid</td>
                      <td className="py-3 px-4 text-right text-[15px] font-bold text-[#00a2b8]">
                        {selectedInvoice.amount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#e9ecef] flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-[3px] text-gray-700 text-[13px] font-medium flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
              >
                <Printer className="w-4 h-4 text-gray-500" />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2 bg-[#00a2b8] hover:bg-[#008ea2] text-white rounded-[3px] text-[13px] font-medium cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading payments...</div>}>
      <PaymentsContent />
    </Suspense>
  );
}
