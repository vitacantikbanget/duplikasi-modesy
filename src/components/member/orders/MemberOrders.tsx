// Komponen Daftar Riwayat Pesanan (Member Orders).
// Menampilkan kartu daftar belanjaan yang pernah dibeli pengguna,
// beserta nomor pesanan, total biaya, status pembayaran (Pending / Completed),
// dan tautan detail pesanan.

"use client";

import React from "react";
import Link from "next/link";
import { Clock, Info } from "lucide-react";

// Struktur data satu item riwayat pesanan
export interface ModesyOrder {
  id: string;          // ID pesanan
  orderNumber: string; // Nomor pesanan untuk pelacakan (misal: 10044)
  total: string;       // Total harga tagihan
  status: "Pending Payment" | "Completed" | "Processing" | "Cancelled"; // Status pesanan
  date: string;        // Tanggal transaksi
}

// Data simulasi pesanan pembeli
const MODESY_ORDERS: ModesyOrder[] = [
  { id: "10044", orderNumber: "10044", total: "$154", status: "Pending Payment", date: "2026-10-14 / 20:42" },
  { id: "10026", orderNumber: "10026", total: "$121.25", status: "Pending Payment", date: "2026-09-17 / 18:28" },
  { id: "10024", orderNumber: "10024", total: "$67.75", status: "Pending Payment", date: "2026-09-14 / 16:27" },
  { id: "10023", orderNumber: "10023", total: "$71.95", status: "Pending Payment", date: "2026-09-14 / 16:20" },
  { id: "10022", orderNumber: "10022", total: "$244.60", status: "Pending Payment", date: "2026-09-14 / 16:08" },
  { id: "10020", orderNumber: "10020", total: "$271.30", status: "Pending Payment", date: "2026-09-11 / 09:26" },
  { id: "10007", orderNumber: "10007", total: "$32.86", status: "Completed", date: "2026-08-05 / 13:50" },
];

export default function MemberOrders() {
  return (
    <div className="space-y-3 font-sans">
      {MODESY_ORDERS.map((order) => {
        const isCompleted = order.status === "Completed";

        return (
          <div
            key={order.id}
            className="bg-white border border-[#ebebeb] rounded-[3px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-[13px]"
          >
            <div className="sm:w-28 shrink-0">
              <span className="text-gray-500">Order: </span>
              <span className="font-bold text-gray-900">#{order.orderNumber}</span>
            </div>

            <div className="sm:w-28 shrink-0">
              <span className="text-gray-500">Total: </span>
              <span className="font-bold text-gray-900">{order.total}</span>
            </div>

            <div className="sm:w-32 shrink-0">
              <span
                className={`inline-block px-2.5 py-1 text-[11px] rounded-[3px] font-normal ${
                  isCompleted
                    ? "bg-[#e8f8f5] text-[#27ae60]"
                    : "bg-[#f1f3f5] text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-500 text-[12px] sm:w-44 shrink-0">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{order.date}</span>
            </div>

            <div className="shrink-0 sm:text-right">
              <Link
                href={`/member/orders/${order.orderNumber}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f1f3f5] hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-[3px] border border-gray-300 transition cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-gray-500" />
                <span>Details</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
