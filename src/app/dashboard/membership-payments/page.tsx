"use client";

import { useState } from "react";
import { FileText, X, Printer, CheckCircle2 } from "lucide-react";
import { MEMBERSHIP_PAYMENTS, MembershipPaymentItem } from "@/app/dashboard/payments/page";

export default function MembershipPaymentsPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<MembershipPaymentItem | null>(null);

  return (
    <div className="w-full">
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Page Title */}
        <h1 className="text-[19px] font-bold text-[#2c333e] mb-7 font-sans">
          Membership Payments
        </h1>

        {/* Membership Payments Table */}
        <div className="overflow-x-auto">
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
              {MEMBERSHIP_PAYMENTS.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#6c757d] text-[13.5px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                MEMBERSHIP_PAYMENTS.map((item) => (
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
                        onClick={() => setSelectedInvoice(item)}
                        className="bg-[#00a2b8] hover:bg-[#008ea2] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-white" />
                        <span>View Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Number of Entries (Hidden when empty) */}
        {MEMBERSHIP_PAYMENTS.length > 0 && (
          <div className="mt-8 pt-4 text-[#2c333e] select-none text-[13px] border-t border-[#f1f3f5]">
            <span>Number of Entries: </span>
            <span className="font-bold">{MEMBERSHIP_PAYMENTS.length}</span>
          </div>
        )}
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
                    {selectedInvoice.paymentStatus}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <span className="text-gray-500 block text-xs mb-1">Membership Plan</span>
                  <span className="font-medium text-[#2c333e] text-[13px]">{selectedInvoice.membershipPlan}</span>
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
                      <td className="py-3 px-4 text-[#2c333e]">{selectedInvoice.membershipPlan}</td>
                      <td className="py-3 px-4 text-right font-medium text-[#2c333e]">{selectedInvoice.paymentAmount}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-[#f8fafc] border-t border-[#e9ecef] font-semibold text-[#2c333e]">
                    <tr>
                      <td className="py-3 px-4">Total Paid</td>
                      <td className="py-3 px-4 text-right text-[15px] font-bold text-[#00a2b8]">
                        {selectedInvoice.paymentAmount}
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
