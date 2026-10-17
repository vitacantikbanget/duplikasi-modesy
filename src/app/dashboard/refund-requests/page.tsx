"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, X, CheckCircle, XCircle } from "lucide-react";

interface RefundRequestItem {
  id: string;
  orderNumber: string;
  productName: string;
  total: string;
  buyer: string;
  status: "Processing" | "Approved" | "Declined";
  updated: string;
  date: string;
  reason?: string;
}

const initialRefundRequests: RefundRequestItem[] = [
  {
    id: "1",
    orderNumber: "#10007",
    productName: "Animal colorful digital prints",
    total: "$31.90",
    buyer: "Peter Jone",
    status: "Processing",
    updated: "1 month ago",
    date: "2026-09-09 / 11:12",
    reason: "Requested refund due to accidental duplicate purchase of digital files.",
  },
  {
    id: "2",
    orderNumber: "#10018",
    productName: "Navy polka dot dress",
    total: "$143",
    buyer: "Trendshop",
    status: "Processing",
    updated: "1 month ago",
    date: "2026-09-09 / 06:01",
    reason: "Wrong size ordered by mistake, requesting return and refund.",
  },
];

export default function RefundRequestsPage() {
  const [requests, setRequests] = useState<RefundRequestItem[]>(initialRefundRequests);
  const [selectedRequest, setSelectedRequest] = useState<RefundRequestItem | null>(null);

  const handleUpdateStatus = (id: string, newStatus: "Approved" | "Declined") => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: newStatus, updated: "Just now" }
          : r
      )
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({
        ...selectedRequest,
        status: newStatus,
        updated: "Just now",
      });
    }
  };

  return (
    <div className="w-full">
      {/* Main Container Card */}
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 shadow-xs">
        {/* Title */}
        <h1 className="text-[20px] font-bold text-[#2c333e] mb-6 font-sans">
          Refund Requests
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-[#dee2e6] text-[#2c333e] font-semibold text-[13px]">
                <th className="py-3 px-3 min-w-[280px]">Product</th>
                <th className="py-3 px-3 w-[100px]">Total</th>
                <th className="py-3 px-3 w-[140px]">Buyer</th>
                <th className="py-3 px-3 w-[120px]">Status</th>
                <th className="py-3 px-3 w-[130px]">Updated</th>
                <th className="py-3 px-3 w-[160px]">Date</th>
                <th className="py-3 px-3 w-[100px]">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f5]">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#6c757d] text-[13.5px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                requests.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Product (Blue link style) */}
                    <td className="py-3.5 px-3">
                      <span className="text-[#007bff] hover:underline cursor-pointer font-normal">
                        {item.orderNumber} - {item.productName}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-3 text-[#2c333e] font-normal">
                      {item.total}
                    </td>

                    {/* Buyer (Blue bold text) */}
                    <td className="py-3.5 px-3">
                      <span className="text-[#007bff] font-semibold hover:underline cursor-pointer">
                        {item.buyer}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      {item.status === "Approved" ? (
                        <span className="inline-block bg-[#00ab97] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-[2px] leading-tight">
                          Approved
                        </span>
                      ) : item.status === "Declined" ? (
                        <span className="inline-block bg-[#dc2626] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-[2px] leading-tight">
                          Declined
                        </span>
                      ) : (
                        <span className="inline-block bg-[#ced4da] text-[#495057] text-[11px] font-medium px-2.5 py-0.5 rounded-[2px] leading-tight">
                          Processing
                        </span>
                      )}
                    </td>

                    {/* Updated */}
                    <td className="py-3.5 px-3 text-[#495057] text-[12.5px]">
                      {item.updated}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 text-[#495057] text-[12.5px]">
                      {item.date}
                    </td>

                    {/* Options (Details Button) */}
                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e9ecef] hover:bg-[#dee2e6] text-[#495057] text-[12px] font-medium rounded-[3px] transition-colors cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-[#5a6268]" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: Number of Entries */}
        <div className="pt-5 mt-2 border-t border-[#f1f3f5] text-[#495057] select-none">
          <span className="text-[12.5px] font-medium">
            Number of Entries: {requests.length}
          </span>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md border border-[#e9ecef] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f3f5]">
              <h2 className="text-[16px] font-bold text-[#2c333e] font-sans">
                Refund Request Details ({selectedRequest.orderNumber})
              </h2>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-[13px]">
              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Order & Product:</span>
                <span className="font-medium text-[#007bff] text-right">
                  {selectedRequest.orderNumber} - {selectedRequest.productName}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Refund Amount:</span>
                <span className="font-bold text-[#2c333e]">{selectedRequest.total}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Buyer:</span>
                <span className="font-semibold text-[#007bff]">{selectedRequest.buyer}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Status:</span>
                <span>
                  {selectedRequest.status === "Approved" ? (
                    <span className="bg-[#00ab97] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px]">
                      Approved
                    </span>
                  ) : selectedRequest.status === "Declined" ? (
                    <span className="bg-[#dc2626] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px]">
                      Declined
                    </span>
                  ) : (
                    <span className="bg-[#ced4da] text-[#495057] text-[11px] font-medium px-2 py-0.5 rounded-[2px]">
                      Processing
                    </span>
                  )}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-600">{selectedRequest.date}</span>
              </div>

              {selectedRequest.reason && (
                <div className="p-3 bg-[#f8fafc] rounded-[3px] border border-[#e9ecef] text-xs">
                  <span className="font-semibold text-gray-700 block mb-1">Buyer&#39;s Refund Note:</span>
                  <p className="text-gray-600 leading-relaxed">{selectedRequest.reason}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-6 py-3.5 bg-[#f8fafc] border-t border-[#f1f3f5]">
              {selectedRequest.status === "Processing" ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedRequest.id, "Approved")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#00ab97] hover:bg-[#009180] text-white text-xs font-semibold rounded-[3px] transition-colors cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedRequest.id, "Declined")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold rounded-[3px] transition-colors cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              ) : (
                <div className="text-xs text-gray-500 font-medium">
                  Status updated: {selectedRequest.status}
                </div>
              )}

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-1.5 border border-[#d1d5db] text-[#495057] text-xs font-semibold rounded-[3px] hover:bg-gray-100 transition-colors cursor-pointer"
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
