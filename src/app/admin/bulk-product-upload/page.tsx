"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Upload, ChevronRight, FileSpreadsheet, Download, CheckCircle2, X } from "lucide-react";

export default function BulkProductUploadPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setToastMessage("File berhasil diunggah! 24 produk berhasil diimpor ke sistem.");
    }, 1200);
  };

  return (
    <div className="space-y-4 font-sans text-gray-800 max-w-4xl">
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
            <Upload className="w-5 h-5 text-blue-600" />
            Bulk Product Upload
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Impor produk massal menggunakan template format file CSV atau Excel (.xlsx)
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Products</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Bulk Product Upload</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1: Download Template */}
        <div className="bg-white p-5 rounded border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Unduh Template CSV</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Gunakan struktur kolom standar Modesy untuk menghindari kegagalan pemrosesan data.
            </p>
          </div>
          <button
            onClick={() => setToastMessage("Template Modesy_Product_Import_Template.csv telah diunduh.")}
            className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Unduh Template (.CSV)
          </button>
        </div>

        {/* Step 2: Upload File */}
        <div className="bg-white p-5 rounded border border-gray-200 shadow-xs md:col-span-2">
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-sm mb-3">
            2
          </div>
          <h3 className="font-semibold text-gray-800 text-sm mb-1">Unggah Berkas Produk</h3>
          <p className="text-xs text-gray-500 mb-4">
            Pilih berkas CSV yang telah Anda isi dengan daftar produk.
          </p>

          <form onSubmit={handleUpload} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 p-8 rounded text-center hover:border-emerald-500 transition-colors">
              <FileSpreadsheet className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-gray-700">Pilih berkas CSV atau seret ke sini</p>
              <p className="text-[11px] text-gray-400 mt-1">Ukuran maksimal file: 10MB</p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded shadow-xs transition-colors disabled:opacity-50"
              >
                {uploading ? "Mengimpor Data..." : "Mulai Impor Produk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
