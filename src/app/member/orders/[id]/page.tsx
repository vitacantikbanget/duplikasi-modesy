"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, CheckCircle, Clock, MapPin, CreditCard } from "lucide-react";

export default function MemberOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id || "10044";

  return (
    <div className="space-y-6 font-sans">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <Link
          href="/member/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#00a99d] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-[2px] border border-gray-300 transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-gray-500" />
          <span>Print Invoice</span>
        </button>
      </div>

      {/* Main Order Card */}
      <div className="bg-white border border-[#ebebeb] rounded-sm p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-[20px] font-bold text-gray-900">
              Order: #{orderId}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <span>Date: 2026-10-14 20:42</span>
            </div>
          </div>

          <div>
            <span className="inline-block px-3 py-1 text-xs rounded-[3px] font-medium bg-[#f1f3f5] text-gray-700">
              Pending Payment
            </span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-gray-100 text-xs">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-800 text-[13px] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#00a99d]" />
              <span>Shipping Address</span>
            </h3>
            <div className="text-gray-600 leading-relaxed pl-5">
              <p className="font-semibold text-gray-900">Peter Jone</p>
              <p>742 Evergreen Terrace</p>
              <p>Springfield, Oregon, United States</p>
              <p>Phone: +1 555-0199</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-800 text-[13px] flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#00a99d]" />
              <span>Payment Details</span>
            </h3>
            <div className="text-gray-600 leading-relaxed pl-5">
              <p>Payment Method: <span className="font-medium text-gray-900">Bank Transfer</span></p>
              <p>Payment Status: <span className="text-[#007bff] font-medium">Pending</span></p>
              <p>Currency: <span className="font-medium text-gray-900">USD ($)</span></p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="pt-6">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Ordered Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#ebebeb] text-gray-700 font-bold">
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Unit Price</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="py-3 px-3">
                    <div className="font-medium text-gray-900">Modern grey couch and pillows</div>
                    <div className="text-gray-400 text-[11px]">Seller: Trendshop</div>
                  </td>
                  <td className="py-3 px-3">$140.00</td>
                  <td className="py-3 px-3">1</td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-900">$140.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200">
                  <td colSpan={3} className="py-2.5 px-3 text-right font-medium text-gray-600">Subtotal:</td>
                  <td className="py-2.5 px-3 text-right font-semibold text-gray-900">$140.00</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2.5 px-3 text-right font-medium text-gray-600">Shipping:</td>
                  <td className="py-2.5 px-3 text-right font-semibold text-gray-900">$14.00</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td colSpan={3} className="py-3 px-3 text-right font-bold text-gray-900 text-sm">Grand Total:</td>
                  <td className="py-3 px-3 text-right font-bold text-[#00a99d] text-base">$154.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
