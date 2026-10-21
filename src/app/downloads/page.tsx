"use client";

/**
 * ============================================================================
 * HALAMAN UNDUHAN PRODUK DIGITAL (Digital Downloads Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Rute dedicated untuk menampilkan produk-produk digital yang telah dibeli
 * oleh pelanggan untuk diunduh (file audio, grafis, template, lisensi).
 */

import CustomerOrdersPage from "../orders/page";

export default function DownloadsPage() {
  return <CustomerOrdersPage initialTab="downloads" />;
}
