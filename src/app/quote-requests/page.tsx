"use client";

/**
 * ============================================================================
 * HALAMAN PERMINTAAN PENAWARAN HARGA (Quote Requests Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Rute dedicated untuk menampilkan daftar penawaran harga khusus pelanggan,
 * menggunakan komponen terpadu CustomerOrdersPage dengan tab 'quotes'.
 */

import CustomerOrdersPage from "../orders/page";

export default function QuoteRequestsPage() {
  return <CustomerOrdersPage initialTab="quotes" />;
}
