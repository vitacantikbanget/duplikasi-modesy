"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, Check, X, AlertCircle, CheckCircle } from "lucide-react";

interface RefundRequestItem {
  id: number;
  orderNumber: string;
  orderId: string;
  productTitle: string;
  productSlug?: string;
  total: string;
  commissionRate: string;
  earnedAmount: string;
  buyer: string;
  buyerSlug?: string;
  seller: string;
  sellerSlug?: string;
  status: "Processing" | "Refund Approved" | "Declined";
  updated: string;
  date: string;
  reason?: string;
  explanation?: string;
}

const INITIAL_REFUND_REQUESTS: RefundRequestItem[] = [
  {
    id: 1,
    orderNumber: "#10029",
    orderId: "10029",
    productTitle: "Women kipling bailey saddle handbag",
    productSlug: "women-kipling-bailey-saddle-handbag-40",
    total: "$59",
    commissionRate: "5%",
    earnedAmount: "Not Added to Vendor Balance",
    buyer: "Admin",
    buyerSlug: "admin",
    seller: "Admin",
    sellerSlug: "admin",
    status: "Processing",
    updated: "5 days ago",
    date: "2026-10-13 / 17:50",
    reason: "Item arrived damaged or defective",
    explanation: "The strap metal hook was broken upon unboxing. Buyer requested a refund as the item cannot be used as intended.",
  },
  {
    id: 2,
    orderNumber: "#10007",
    orderId: "10007",
    productTitle: "Animal colorful digital prints",
    productSlug: "animal-colorful-digital-prints-39",
    total: "$31.90",
    commissionRate: "10%",
    earnedAmount: "$24.65",
    buyer: "Peter Jone",
    buyerSlug: "peter-jones",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    status: "Processing",
    updated: "1 month ago",
    date: "2026-09-09 / 11:12",
    reason: "Downloaded file corrupted",
    explanation: "The zip file cannot be extracted on macOS and Windows with archive utility error. Customer requested a full refund.",
  },
  {
    id: 3,
    orderNumber: "#10018",
    orderId: "10018",
    productTitle: "Navy polka dot dress",
    productSlug: "navy-polka-dot-dress-45",
    total: "$143",
    commissionRate: "15%",
    earnedAmount: "Not Added to Vendor Balance",
    buyer: "Trendshop",
    buyerSlug: "trendshop",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    status: "Processing",
    updated: "1 month ago",
    date: "2026-09-09 / 06:01",
    reason: "Wrong size delivered",
    explanation: "Ordered size Large but received Small according to the tag. Buyer submitted photo proof for refund processing.",
  },
  {
    id: 4,
    orderNumber: "#10011",
    orderId: "10011",
    productTitle: "Floral women sundress",
    productSlug: "floral-women-sundress-38",
    total: "$80",
    commissionRate: "15%",
    earnedAmount: "Not Added to Vendor Balance",
    buyer: "Admin",
    buyerSlug: "admin",
    seller: "Admin",
    sellerSlug: "admin",
    status: "Processing",
    updated: "5 days ago",
    date: "2026-09-04 / 08:36",
    reason: "Order canceled prior to shipment",
    explanation: "Customer canceled order before dispatch. Vendor did not ship yet, requesting balance adjustment.",
  },
];

export default function AdminRefundRequestsPage() {
  const [refundRequests, setRefundRequests] = useState<RefundRequestItem[]>(INITIAL_REFUND_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<RefundRequestItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleApproveRefund = (item: RefundRequestItem) => {
    const confirmed = confirm(
      `Are you sure you want to approve the refund for order ${item.orderNumber}?\n\nThe system will change the order status to "Refund Approved" and deduct the order amount from the seller's balance.`
    );

    if (confirmed) {
      setRefundRequests((prev) =>
        prev.map((r) =>
          r.id === item.id ? { ...r, status: "Refund Approved", updated: "Just now" } : r
        )
      );
      setNotification(`Refund for order ${item.orderNumber} has been approved successfully.`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleDeclineRefund = (item: RefundRequestItem) => {
    const confirmed = confirm(
      `Are you sure you want to decline the refund request for order ${item.orderNumber}?`
    );

    if (confirmed) {
      setRefundRequests((prev) =>
        prev.map((r) =>
          r.id === item.id ? { ...r, status: "Declined", updated: "Just now" } : r
        )
      );
      if (selectedRequest?.id === item.id) {
        setSelectedRequest(null);
      }
      setNotification(`Refund request for order ${item.orderNumber} was declined.`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Refund Requests</h1>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content Box (AdminLTE White Box) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
        {/* Table Container */}
        <div className="overflow-x-auto min-h-[220px]">
          <table className="w-full text-left text-[13.5px] border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left">Product</th>
                <th className="py-2.5 px-3 text-left">Total</th>
                <th className="py-2.5 px-3 text-left">Commission Rate</th>
                <th className="py-2.5 px-3 text-left">Earned Amount</th>
                <th className="py-2.5 px-3 text-left">Buyer</th>
                <th className="py-2.5 px-3 text-left">Seller</th>
                <th className="py-2.5 px-3 text-left">Status</th>
                <th className="py-2.5 px-3 text-left">Updated</th>
                <th className="py-2.5 px-3 text-left">Date</th>
                <th className="py-2.5 px-3 text-left">Options</th>
              </tr>
            </thead>
            <tbody>
              {refundRequests.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                >
                  {/* Product */}
                  <td className="py-3 px-3">
                    <Link
                      href={`/admin/orders?search=${item.orderId}`}
                      className="text-[#0088cc] hover:text-[#005580] hover:underline font-normal transition-colors"
                    >
                      {item.orderNumber} - {item.productTitle}
                    </Link>
                  </td>

                  {/* Total */}
                  <td className="py-3 px-3 text-gray-700">
                    {item.total}
                  </td>

                  {/* Commission Rate */}
                  <td className="py-3 px-3 text-gray-700">
                    {item.commissionRate}
                  </td>

                  {/* Earned Amount */}
                  <td className="py-3 px-3 text-gray-700">
                    {item.earnedAmount}
                  </td>

                  {/* Buyer */}
                  <td className="py-3 px-3">
                    <Link
                      href={`/admin/users?search=${encodeURIComponent(item.buyer)}`}
                      className="text-[#0088cc] hover:text-[#005580] hover:underline transition-colors"
                    >
                      {item.buyer}
                    </Link>
                  </td>

                  {/* Seller */}
                  <td className="py-3 px-3">
                    <Link
                      href={`/admin/users?search=${encodeURIComponent(item.seller)}`}
                      className="text-[#0088cc] hover:text-[#005580] hover:underline transition-colors"
                    >
                      {item.seller}
                    </Link>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3">
                    {item.status === "Processing" ? (
                      <span className="bg-[#d2d6de] text-[#555] text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                        Processing
                      </span>
                    ) : item.status === "Refund Approved" ? (
                      <span className="bg-[#00a65a] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                        Approved
                      </span>
                    ) : (
                      <span className="bg-[#dd4b39] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                        Declined
                      </span>
                    )}
                  </td>

                  {/* Updated */}
                  <td className="py-3 px-3 text-gray-600">
                    {item.updated}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-3 text-gray-600 text-[12px] whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Options (Details & Approve Refund Buttons matching screenshot) */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {/* Details Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(item)}
                        className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#333] text-[12px] rounded-[3px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Info className="w-3.5 h-3.5 text-gray-500" />
                        <span>Details</span>
                      </button>

                      {/* Approve Refund Button */}
                      {item.status === "Processing" ? (
                        <button
                          type="button"
                          onClick={() => handleApproveRefund(item)}
                          className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#333] hover:text-emerald-700 text-[12px] rounded-[3px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Approve Refund</span>
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic px-2">Completed</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Number of Entries count matching screenshot */}
        <div className="mt-4 pt-3 border-t border-[#f4f4f4] text-[13px] text-gray-700 font-semibold">
          Number of Entries: {refundRequests.length}
        </div>
      </div>

      {/* Warning Alert Box matching Modesy screenshot exactly */}
      <div className="mt-6 bg-[#d9edf7] border border-[#bce8f1] text-[#31708f] px-4 py-3.5 rounded-[3px] text-[13px] leading-relaxed shadow-xs flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#31708f] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Warning!</span> To complete a refund request, you must return the buyer's money. If you click the "Approve Refund" button, the system will change the order status to "Refund Approved" and deduct the order amount from the seller's balance.
        </div>
      </div>

      {/* REFUND DETAILS MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Refund Request #{selectedRequest.id} ({selectedRequest.orderNumber})
              </h3>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-[13.5px]">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Product:</span>
                <span className="font-semibold text-gray-800 text-right max-w-[280px]">
                  {selectedRequest.orderNumber} - {selectedRequest.productTitle}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Order Total:</span>
                <span className="font-bold text-gray-800">{selectedRequest.total}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Commission Rate:</span>
                <span className="text-gray-700">{selectedRequest.commissionRate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Earned Amount:</span>
                <span className="text-gray-700">{selectedRequest.earnedAmount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Buyer:</span>
                <span className="font-medium text-gray-800">{selectedRequest.buyer}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Seller:</span>
                <span className="font-medium text-gray-800">{selectedRequest.seller}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  selectedRequest.status === "Processing"
                    ? "bg-gray-100 text-gray-700"
                    : selectedRequest.status === "Refund Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {selectedRequest.status}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Refund Reason:</span>
                <span className="font-medium text-red-600 text-right">{selectedRequest.reason}</span>
              </div>
              <div className="py-1.5 border-b border-gray-100">
                <span className="text-gray-500 block mb-1">Buyer Explanation:</span>
                <p className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded border border-gray-200">
                  {selectedRequest.explanation}
                </p>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Requested Date:</span>
                <span className="text-gray-700">{selectedRequest.date}</span>
              </div>

              <div className="pt-3 flex justify-between items-center">
                {selectedRequest.status === "Processing" && (
                  <button
                    type="button"
                    onClick={() => handleDeclineRefund(selectedRequest)}
                    className="px-3.5 py-1.5 bg-[#dd4b39] hover:bg-[#c23321] text-white rounded-[3px] text-[13px] font-medium cursor-pointer transition-colors shadow-2xs"
                  >
                    Decline Request
                  </button>
                )}
                <div className="flex gap-2 ml-auto">
                  {selectedRequest.status === "Processing" && (
                    <button
                      type="button"
                      onClick={() => {
                        handleApproveRefund(selectedRequest);
                        setSelectedRequest(null);
                      }}
                      className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded-[3px] text-[13px] font-medium cursor-pointer transition-colors shadow-2xs flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Approve Refund
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedRequest(null)}
                    className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-[3px] text-[13px] font-medium cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
