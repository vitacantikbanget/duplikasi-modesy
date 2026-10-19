"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tag, Search, ChevronRight, CheckCircle2, X } from "lucide-react";

export default function QuoteRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const quotes = [
    {
      id: "QR-1002",
      product: "Custom Embroidered Vintage Denim Jacket (50 Pcs)",
      buyer: "Boutique Atelier",
      vendor: "Trend Shop",
      quantity: 50,
      offeredPrice: "$1,850.00",
      status: "Under Review",
      date: "2026-10-18",
    },
    {
      id: "QR-1001",
      product: "Wholesale Ceramic Artisan Mugs (100 Pcs)",
      buyer: "Roastery Corner Cafe",
      vendor: "EarthCraft",
      quantity: 100,
      offeredPrice: "$1,200.00",
      status: "Accepted",
      date: "2026-10-15",
    },
  ];

  return (
    <div className="space-y-4 font-sans text-gray-800">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80 p-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-600" />
            Quote Requests
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
              {quotes.length} Permintaan
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Pengajuan negosiasi harga dan penawaran kuantitas besar (B2B quotes)
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Quote Requests</span>
        </nav>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#f8f9fa] text-gray-600 uppercase font-semibold text-[11px] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Quote ID</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Pembeli</th>
                <th className="px-4 py-3">Penjual</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Harga Penawaran</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-blue-600">{q.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{q.product}</td>
                  <td className="px-4 py-3 text-gray-600">{q.buyer}</td>
                  <td className="px-4 py-3 text-gray-600">{q.vendor}</td>
                  <td className="px-4 py-3 font-medium">{q.quantity} pcs</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">{q.offeredPrice}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        q.status === "Accepted"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setToastMessage(`Status penawaran ${q.id} diperbarui.`)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      Tinjau
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
