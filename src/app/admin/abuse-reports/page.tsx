"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Search,
  CheckCircle2,
  X,
  Trash2,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Store,
  User,
  Clock,
  Eye,
  Check,
  Ban,
  FileText,
  RotateCw,
} from "lucide-react";
import {
  AdminAbuseReportItem,
  AbuseReportStatus,
  fetchAbuseReports,
  resolveAbuseReportAction,
  deleteAbuseReportAction,
} from "@/lib/moderation";
import { useAppContext } from "@/contexts/AppContext";

export default function AbuseReportsPage() {
  const { role } = useAppContext();
  const [reports, setReports] = useState<AdminAbuseReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [activeReport, setActiveReport] = useState<AdminAbuseReportItem | null>(null);
  const [modalStatus, setModalStatus] = useState<AbuseReportStatus>("investigating");
  const [modalNotes, setModalNotes] = useState("");
  const [modalAutoHide, setModalAutoHide] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadReports = async () => {
    setLoading(true);
    const data = await fetchAbuseReports();
    setReports(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      r.reporterName.toLowerCase().includes(q) ||
      r.reportReason.toLowerCase().includes(q) ||
      (r.reportedProductTitle && r.reportedProductTitle.toLowerCase().includes(q)) ||
      (r.reportedUserName && r.reportedUserName.toLowerCase().includes(q));
    return matchStatus && matchSearch;
  });

  // Summary counts
  const totalCount = reports.length;
  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const investigatingCount = reports.filter((r) => r.status === "investigating").length;
  const resolvedCount = reports.filter((r) => r.status === "resolved").length;

  // Open modal
  const handleOpenActionModal = (report: AdminAbuseReportItem) => {
    setActiveReport(report);
    setModalStatus(report.status === "pending" ? "investigating" : report.status);
    setModalNotes(report.moderatorNotes || "");
    setModalAutoHide(report.reportedProductIsActive ?? true);
  };

  // Submit modal action
  const handleSaveModalAction = async () => {
    if (!activeReport) return;
    setSubmitting(true);

    const willAutoHide = modalAutoHide && modalStatus === "resolved" && !!activeReport.reportedProductId;

    await resolveAbuseReportAction(
      activeReport.id,
      modalStatus,
      modalNotes.trim() ? modalNotes.trim() : undefined,
      willAutoHide,
      activeReport.reportedProductId
    );

    setSubmitting(false);
    setActiveReport(null);

    let toastText = `Laporan #${activeReport.id} diperbarui menjadi status "${modalStatus.toUpperCase()}".`;
    if (willAutoHide) {
      toastText += " Produk terkait otomatis dinonaktifkan (Hidden).";
    }
    showToast(toastText);
    loadReports();
  };

  // Delete action
  const handleDeleteReport = async (reportId: number) => {
    if (confirm(`Hapus laporan pelanggaran #${reportId} secara permanen?`)) {
      await deleteAbuseReportAction(reportId);
      showToast(`Laporan #${reportId} berhasil dihapus.`);
      loadReports();
    }
  };

  const getStatusBadge = (status: AbuseReportStatus) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Pending Review
          </span>
        );
      case "investigating":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            Investigating
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Resolved
          </span>
        );
      case "dismissed":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            Dismissed
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-80 p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-500" />
            Abuse Reports
            <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
              {pendingCount} Pending
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Pusat moderasi pengaduan pengguna terkait barang palsu, konten tidak layak, spam, dan pelanggaran ketentuan
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Management Tools</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Abuse Reports</span>
        </nav>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Total Laporan
          </span>
          <p className="text-xl font-bold text-gray-900 mt-0.5">{totalCount}</p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
            Perlu Ditinjau
          </span>
          <p className="text-xl font-bold text-amber-900 mt-0.5">{pendingCount}</p>
        </div>

        <div className="bg-blue-50/60 border border-blue-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">
            Sedang Investigasi
          </span>
          <p className="text-xl font-bold text-blue-900 mt-0.5">{investigatingCount}</p>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            Terselesaikan
          </span>
          <p className="text-xl font-bold text-emerald-900 mt-0.5">{resolvedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari pelapor, produk, alasan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-9 pr-3 py-1.5 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded p-0.5 text-xs">
            {["All", "pending", "investigating", "resolved", "dismissed"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded capitalize transition-colors font-medium ${
                  statusFilter === st
                    ? "bg-[#00a99d] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                {st === "All" ? "Semua Status" : st}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            type="button"
            onClick={loadReports}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-200 text-gray-600 uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3 px-4 w-12 text-center">ID</th>
                <th className="py-3 px-4">Pelapor</th>
                <th className="py-3 px-4">Konten / Entitas Terlapor</th>
                <th className="py-3 px-4">Alasan & Rincian Pengaduan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tanggal Laporan</th>
                <th className="py-3 px-4 text-center w-36">Aksi Moderasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    Memuat data laporan pelanggaran dari Supabase...
                  </td>
                </tr>
              ) : filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    Tidak ada laporan pelanggaran yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* ID */}
                    <td className="py-3 px-4 text-center font-bold text-gray-500">
                      #{report.id}
                    </td>

                    {/* Pelapor */}
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0 mt-0.5">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{report.reporterName}</p>
                          <p className="text-[11px] text-gray-400">{report.reporterEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Konten Terlapor */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {report.reportedProductTitle ? (
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-gray-800 line-clamp-1">
                                {report.reportedProductTitle}
                              </span>
                              {report.reportedProductIsActive ? (
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0.2 rounded border border-emerald-200 font-medium shrink-0">
                                  Aktif
                                </span>
                              ) : (
                                <span className="bg-red-50 text-red-600 text-[10px] px-1.5 py-0.2 rounded border border-red-200 font-medium shrink-0">
                                  Hidden
                                </span>
                              )}
                            </div>
                            {report.reportedProductPrice && (
                              <span className="text-[11px] text-gray-500 font-mono">
                                Harga: ${Number(report.reportedProductPrice).toFixed(2)}
                              </span>
                            )}
                          </div>
                        ) : null}

                        {report.reportedUserName && (
                          <div className="flex items-center gap-1 text-[11px] text-gray-500">
                            <Store className="w-3 h-3 text-gray-400" />
                            <span>Penjual: <strong>{report.reportedUserName}</strong></span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Alasan & Rincian */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-medium text-[11px]">
                          {report.reportReason}
                        </span>
                        <p className="text-gray-600 text-[11.5px] line-clamp-2 leading-relaxed">
                          {report.reportDetails}
                        </p>
                        {report.moderatorNotes && (
                          <p className="text-[11px] text-[#00a99d] bg-teal-50/80 border border-teal-200 rounded px-1.5 py-0.5 line-clamp-1 italic">
                            Catatan: {report.moderatorNotes}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">{getStatusBadge(report.status)}</td>

                    {/* Tanggal */}
                    <td className="py-3 px-4 text-gray-500 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{report.createdAt}</span>
                      </div>
                    </td>

                    {/* Aksi Moderasi */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenActionModal(report)}
                          className="bg-[#00a99d] hover:bg-[#008f85] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded flex items-center gap-1 shadow-2xs transition-colors"
                          title="Tindak Lanjuti Laporan"
                        >
                          <ShieldAlert className="w-3 h-3" />
                          <span>Tindak</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteReport(report.id)}
                          className="bg-gray-100 hover:bg-rose-50 text-gray-500 hover:text-rose-600 p-1.5 rounded border border-gray-200 transition-colors"
                          title="Hapus Laporan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tindakan Investigasi / Penyelesaian */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full border border-gray-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-gray-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold">
                  Tindakan Moderasi Laporan #{activeReport.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveReport(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Report Summary Card */}
              <div className="bg-gray-50 border border-gray-200 rounded p-3 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold">Pelapor:</span>
                    <p className="font-semibold text-gray-800">
                      {activeReport.reporterName} ({activeReport.reporterEmail})
                    </p>
                  </div>
                  <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold">
                    {activeReport.reportReason}
                  </span>
                </div>

                {activeReport.reportedProductTitle && (
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold">Produk Terkait:</span>
                    <p className="font-medium text-gray-900">
                      {activeReport.reportedProductTitle}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold">Detail Keluhan:</span>
                  <p className="text-gray-700 italic bg-white p-2 rounded border border-gray-200 mt-0.5">
                    "{activeReport.reportDetails}"
                  </p>
                </div>
              </div>

              {/* Form Input Status */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Pilih Keputusan Status:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setModalStatus("investigating")}
                    className={`py-2 px-3 text-xs font-semibold rounded border text-center transition-all ${
                      modalStatus === "investigating"
                        ? "bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-200"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    🔍 Investigasi
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalStatus("resolved")}
                    className={`py-2 px-3 text-xs font-semibold rounded border text-center transition-all ${
                      modalStatus === "resolved"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-200"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    ✓ Terbukti / Selesai
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalStatus("dismissed")}
                    className={`py-2 px-3 text-xs font-semibold rounded border text-center transition-all ${
                      modalStatus === "dismissed"
                        ? "bg-gray-100 border-gray-400 text-gray-700 ring-2 ring-gray-200"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    ✕ Tolak Laporan
                  </button>
                </div>
              </div>

              {/* Auto Hide Product Checkbox (If report has product and status is resolved) */}
              {activeReport.reportedProductId && (
                <div className="p-3 bg-rose-50/60 border border-rose-200 rounded">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalAutoHide}
                      onChange={(e) => setModalAutoHide(e.target.checked)}
                      className="mt-0.5 rounded text-[#00a99d] focus:ring-[#00a99d]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-gray-800">
                        Otomatis Sembunyikan / Nonaktifkan Produk Terlapor
                      </span>
                      <p className="text-gray-500 text-[11px] mt-0.5">
                        Jika status dipilih "Selesai (Resolved)", produk "{activeReport.reportedProductTitle}" akan otomatis diset status `is_active = false` di katalog Supabase agar pembeli tidak tertipu.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Moderator Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Catatan Resmi Moderator (Internal & Riwayat):
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Tuliskan catatan hasil pemeriksaan bukti, riwayat chat, atau alasan penutupan laporan..."
                  className="w-full text-xs p-2.5 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveReport(null)}
                className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium rounded transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleSaveModalAction}
                className="px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded shadow-xs transition-colors flex items-center gap-1.5"
              >
                {submitting ? "Menyimpan..." : "Simpan Keputusan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
