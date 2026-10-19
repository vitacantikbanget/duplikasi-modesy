"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToggleRight, Search, ChevronRight, CheckCircle2, X, Plus } from "lucide-react";

export default function CustomFieldsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [fields, setFields] = useState([
    { id: 1, name: "Material / Fabric", type: "Text Input", category: "Clothing & Apparel", required: true },
    { id: 2, name: "Shoe Size (EU/US)", type: "Dropdown Select", category: "Footwear", required: true },
    { id: 3, name: "Battery Capacity", type: "Number", category: "Electronics & Gadgets", required: false },
    { id: 4, name: "Condition Grade", type: "Radio Button", category: "All Categories", required: true },
  ]);

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
            <ToggleRight className="w-5 h-5 text-gray-700" />
            Custom Fields
            <span className="text-xs bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded-full">
              {fields.length} Bidang Kustom
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Atur atribut spesifikasi dan opsi tambahan untuk setiap kategori produk
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Custom Fields</span>
        </nav>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-3 border-b border-gray-200 flex justify-between items-center gap-3">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari custom field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
          <button
            onClick={() => setToastMessage("Fitur tambah custom field baru dibuka.")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Bidang Kustom
          </button>
        </div>

        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-[#f8f9fa] text-gray-600 uppercase font-semibold text-[11px] border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 w-16 text-center">Id</th>
              <th className="px-4 py-3">Nama Bidang</th>
              <th className="px-4 py-3">Tipe Input</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Wajib Diisi</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-4 py-3 text-center text-gray-400">{f.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{f.name}</td>
                <td className="px-4 py-3 text-gray-600">{f.type}</td>
                <td className="px-4 py-3 text-gray-600">{f.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      f.required
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {f.required ? "Wajib" : "Opsional"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setToastMessage(`Bidang "${f.name}" diperbarui.`)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
