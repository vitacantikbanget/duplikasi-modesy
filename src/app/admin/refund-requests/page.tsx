"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Search,
  CheckCircle2,
  X,
  ChevronRight,
  ExternalLink,
  Store,
  User,
  Clock,
  Check,
  Ban,
  DollarSign,
  AlertCircle,
  RotateCw,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";
import {
  AdminRefundRequestItem,
  RefundStatus,
  fetchRefundRequests,
  processRefundAction,
} from "@/lib/moderation";
import { useAppContext } from "@/contexts/AppContext";

export default function RefundRequestsPage() {
  const { role } = useAppContext();
  const [requests, setRequests] = useState<AdminRefundRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [activeRequest, setActiveRequest] = useState<AdminRefundRequestItem | null>(null);
  const [decisionStatus, setDecisionStatus] = useState<RefundStatus>("approved");
  const [decisionNotes, setDecisionNotes] = useState("");
  const [autoUpdateOrder, setAutoUpdateOrder] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    const data = await fetchRefundRequests();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredRequests = requests.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      r.orderNumber.toLowerCase().includes(q) ||
      r.buyerName.toLowerCase().includes(q) ||
      r.vendorName.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const declinedCount = requests.filter((r) => r.status === "declined").length;

  const handleOpenModal = (req: AdminRefundRequestItem) => {
    setActiveRequest(req);
    setDecisionStatus(req.status === "pending" ? "approved" : req.status);
    setDecisionNotes(req.moderatorNotes || "");
    setAutoUpdateOrder(true);
  };

  const handleSaveDecision = async () => {
    if (!activeRequest) return;
    setSubmitting(true);

    await processRefundAction(
      activeRequest.id,
      activeRequest.orderId,
      decisionStatus,
      decisionNotes.trim() ? decisionNotes.trim() : undefined,
      autoUpdateOrder
    );

    setSubmitting(false);
    setActiveRequest(null);

    let text = `Permintaan refund #${activeRequest.id} (Pesanan ${activeRequest.orderNumber}) berhasil di-${decisionStatus.toUpperCase()}.`;
    if (decisionStatus === "approved" && autoUpdateOrder) {
      text += " Status pembayaran pesanan diupdate ke 'Refunded'.";
    }
    showToast(text);
    loadRequests();
  };

  const getStatusBadge = (status: RefundStatus) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Pending Review
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Approved
          </span>
        );
      case "declined":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            Declined
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
            <RotateCcw className="w-6 h-6 text-amber-600" />
            Refund Requests
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {pendingCount} Antrean
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Penyelesaian sengketa pengembalian dana antara pembeli dan penjual marketplace Modesy
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Management Tools</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Refund Requests</span>
        </nav>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Total Sengketa
          </span>
          <p className="text-xl font-bold text-gray-900 mt-0.5">{totalCount}</p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
            Perlu Ditinjau
          </span>
          <p className="text-xl font-bold text-amber-900 mt-0.5">{pendingCount}</p>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            Disetujui (Approved)
          </span>
          <p className="text-xl font-bold text-emerald-900 mt-0.5">{approvedCount}</p>
        </div>

        <div className="bg-rose-50/60 border border-rose-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
            Ditolak (Declined)
          </span>
          <p className="text-xl font-bold text-rose-900 mt-0.5">{declinedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari No. Order, Pembeli, Vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-9 pr-3 py-1.5 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded p-0.5 text-xs">
            {["All", "pending", "approved", "declined"].map((st) => (
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
            onClick={loadRequests}
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
                <th className="py-3 px-4">No. Pesanan & Nilai</th>
                <th className="py-3 px-4">Pembeli (Buyer)</th>
                <th className="py-3 px-4">Penjual (Vendor)</th>
                <th className="py-3 px-4">Alasan Sengketa Refund</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Waktu Pengajuan</th>
                <th className="py-3 px-4 text-center w-32">Aksi Putusan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    Memuat data sengketa refund dari Supabase...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    Tidak ada permintaan pengembalian dana yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* ID */}
                    <td className="py-3 px-4 text-center font-bold text-gray-500">
                      #{req.id}
                    </td>

                    {/* Order & Amount */}
                    <td className="py-3 px-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <ShoppingCart className="w-3.5 h-3.5 text-[#00a99d]" />
                          <span className="font-bold text-gray-800">{req.orderNumber}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 font-mono mt-0.5">
                          Total: <strong className="text-gray-900">${Number(req.totalAmount).toFixed(2)}</strong>
                        </p>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded border border-gray-200">
                          {req.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Pembeli */}
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{req.buyerName}</p>
                          <p className="text-[10px] text-gray-400">{req.buyerEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Penjual */}
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Store className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{req.vendorName}</p>
                          <p className="text-[10px] text-gray-400">{req.vendorEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Alasan */}
                    <td className="py-3 px-4 max-w-xs">
                      <div>
                        <p className="text-gray-700 text-[11.5px] leading-relaxed line-clamp-2">
                          "{req.reason}"
                        </p>
                        {req.moderatorNotes && (
                          <p className="text-[11px] text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5 mt-1 italic line-clamp-1">
                            Putusan: {req.moderatorNotes}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">{getStatusBadge(req.status)}</td>

                    {/* Waktu */}
                    <td className="py-3 px-4 text-gray-500 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{req.createdAt}</span>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(req)}
                        className="bg-[#00a99d] hover:bg-[#008f85] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded flex items-center justify-center gap-1 shadow-2xs transition-colors w-full"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Tinjau</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tinjau Keputusan Refund */}
      {activeRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-gray-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-gray-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold">
                  Tinjau Permintaan Refund #{activeRequest.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveRequest(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              {/* Order Info Card */}
              <div className="bg-gray-50 border border-gray-200 rounded p-3 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-bold text-gray-800 flex items-center gap-1.5">
                    <ShoppingCart className="w-4 h-4 text-[#00a99d]" />
                    Pesanan: {activeRequest.orderNumber}
                  </span>
                  <span className="font-mono font-bold text-sm text-[#00a99d]">
                    ${Number(activeRequest.totalAmount).toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400 uppercase font-semibold">Pembeli:</span>
                    <p className="font-semibold text-gray-800">{activeRequest.buyerName}</p>
                    <p className="text-gray-400 text-[10px]">{activeRequest.buyerEmail}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase font-semibold">Penjual:</span>
                    <p className="font-semibold text-gray-800">{activeRequest.vendorName}</p>
                    <p className="text-gray-400 text-[10px]">{activeRequest.vendorEmail}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <span className="text-gray-400 uppercase font-semibold">Alasan Pembeli:</span>
                  <p className="text-gray-700 italic bg-white p-2 rounded border border-gray-200 mt-0.5">
                    "{activeRequest.reason}"
                  </p>
                </div>
              </div>

              {/* Status Decision Buttons */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Putusan Moderator:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDecisionStatus("approved")}
                    className={`py-2.5 px-3 text-xs font-bold rounded border text-center transition-all flex items-center justify-center gap-1.5 ${
                      decisionStatus === "approved"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Setujui Refund (Approve)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecisionStatus("declined")}
                    className={`py-2.5 px-3 text-xs font-bold rounded border text-center transition-all flex items-center justify-center gap-1.5 ${
                      decisionStatus === "declined"
                        ? "bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Ban className="w-4 h-4 text-rose-600" />
                    <span>Tolak Refund (Decline)</span>
                  </button>
                </div>
              </div>

              {/* Auto update order status checkbox */}
              {decisionStatus === "approved" && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoUpdateOrder}
                      onChange={(e) => setAutoUpdateOrder(e.target.checked)}
                      className="mt-0.5 rounded text-[#00a99d] focus:ring-[#00a99d]"
                    />
                    <div>
                      <span className="font-bold text-emerald-950">
                        Otomatis Perbarui Status Pesanan di Supabase
                      </span>
                      <p className="text-emerald-800 text-[11px] mt-0.5">
                        Menyetujui refund ini akan otomatis mengubah `payment_status` menjadi <strong>'refunded'</strong> dan `order_status` menjadi <strong>'cancelled'</strong> pada tabel pesanan {activeRequest.orderNumber}.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Moderator Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Catatan Resmi Putusan Moderator:
                </label>
                <textarea
                  rows={3}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Tuliskan dasar pertimbangan putusan untuk disampaikan kepada pembeli dan toko..."
                  className="w-full text-xs p-2.5 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveRequest(null)}
                className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium rounded transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleSaveDecision}
                className="px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded shadow-xs transition-colors flex items-center gap-1.5"
              >
                {submitting ? "Memproses..." : "Simpan Putusan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
