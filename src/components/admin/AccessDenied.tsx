"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, PackageCheck, AlertTriangle, RotateCcw } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

interface AccessDeniedProps {
  restrictedPath?: string;
  requiredRole?: string;
}

export default function AccessDenied({
  restrictedPath,
  requiredRole = "Super Admin",
}: AccessDeniedProps) {
  const { role, userProfile } = useAppContext();

  return (
    <div className="max-w-3xl mx-auto my-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header Accent Bar */}
      <div className="h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-red-600" />

      <div className="p-6 md:p-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold tracking-wider uppercase text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                403 Forbidden
              </span>
              <span className="text-xs text-gray-500">
                Hak Akses Terbatas Modesy Panel
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Akses Dibatasi untuk Peran Moderator
            </h1>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Anda saat ini masuk sebagai{" "}
              <strong className="text-gray-900 font-semibold">
                {userProfile?.name || "Moderator"} ({role})
              </strong>
              . Halaman {restrictedPath && <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-xs">{restrictedPath}</code>} merupakan modul konfigurasi sensitif yang secara ketat memerlukan hak akses tingkat{" "}
              <span className="font-semibold text-gray-800">{requiredRole}</span>.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6">
              <h2 className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Ketentuan Hak Akses Modesy Marketplace
              </h2>
              <p className="text-xs text-amber-700 leading-relaxed">
                Moderator memiliki kewenangan penuh atas moderasi produk, penyelesaian laporan sengketa pengguna, peninjauan ulasan, dan verifikasi vendor, namun tidak diizinkan mengubah konfigurasi sistem global, metode pembayaran, manajemen role, atau backup basis data.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Akses Cepat Modul Kerja Moderator:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                <Link
                  href="/admin/pending-products"
                  className="flex items-center gap-2.5 p-2.5 rounded border border-gray-200 hover:border-[#00a99d] hover:bg-[#f0faf9] transition-all text-xs font-medium text-gray-700"
                >
                  <PackageCheck className="w-4 h-4 text-[#00a99d]" />
                  <span>Antrean Pending Products</span>
                </Link>

                <Link
                  href="/admin/abuse-reports"
                  className="flex items-center gap-2.5 p-2.5 rounded border border-gray-200 hover:border-rose-400 hover:bg-rose-50 transition-all text-xs font-medium text-gray-700"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Laporan Pelanggaran (Abuse)</span>
                </Link>

                <Link
                  href="/admin/refund-requests"
                  className="flex items-center gap-2.5 p-2.5 rounded border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all text-xs font-medium text-gray-700"
                >
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Permintaan Pengembalian Dana</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center gap-2.5 p-2.5 rounded border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-xs font-medium text-gray-700"
                >
                  <Home className="w-4 h-4 text-blue-600" />
                  <span>Dashboard Utama Admin</span>
                </Link>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-xs font-medium rounded transition-colors shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Kembali ke Dashboard
                </Link>

                <span className="text-[11px] text-gray-400">
                  Modesy Panel • Role Protection Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
