"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, RotateCcw } from "lucide-react";

interface EmptyProductListPageProps {
  title: string;
  listKey: string;
}

/**
 * Komponen tampilan daftar produk kosong / list khusus di panel admin
 * Digunakan untuk: Drafts, Pending, Hidden, Expired, Sold, Deleted Products
 */
export default function EmptyProductListPage({ title, listKey }: EmptyProductListPageProps) {
  const [showCount, setShowCount] = useState<number>(15);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="p-5 bg-[#f4f6f9] min-h-screen text-[#333]">
      {/* Header Halaman & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-200 mb-5 gap-2">
        <h1 className="text-xl font-medium text-gray-800">{title}</h1>
        <div className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/admin" className="hover:text-[#3c8dbc]">
            Home
          </Link>
          <span>/</span>
          <Link href="/admin/products" className="hover:text-[#3c8dbc]">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-semibold">{title}</span>
        </div>
      </div>

      {/* Box Filter & Pencarian */}
      <div className="bg-white rounded border border-gray-200 shadow-xs mb-5">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              aria-label="Jumlah item per halaman"
              className="border border-gray-300 rounded px-2.5 py-1 text-xs bg-white text-gray-700 focus:outline-hidden focus:border-[#3c8dbc]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-hidden focus:border-[#3c8dbc]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              title="Reset Filter"
              className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Tabel Data (Status Kosong / No records found) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                <th className="p-3 w-12 text-center">Id</th>
                <th className="p-3">Product</th>
                <th className="p-3">Product Type</th>
                <th className="p-3">Category</th>
                <th className="p-3">User</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-400 italic bg-white">
                  No records found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer info entri */}
        <div className="p-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div>Showing 0 to 0 of 0 entries</div>
          <div className="flex gap-1">
            <button
              disabled
              className="px-2.5 py-1 border border-gray-200 rounded text-gray-300 cursor-not-allowed bg-gray-50"
            >
              Previous
            </button>
            <button
              disabled
              className="px-2.5 py-1 border border-gray-200 rounded text-gray-300 cursor-not-allowed bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
