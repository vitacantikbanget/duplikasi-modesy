"use client";

/**
 * ============================================================================
 * HALAMAN PERMINTAAN PENGEMBALIAN DANA (Customer Refund Requests Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Rute dedicated untuk mengajukan dan memantau status pengembalian dana
 * atau klaim garansi barang rusak/tidak sesuai bagi pelanggan.
 */

import CustomerOrdersPage from "../orders/page";

export default function RefundRequestsPage() {
  return <CustomerOrdersPage initialTab="refunds" />;
}
