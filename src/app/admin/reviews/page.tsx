"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Search,
  CheckCircle2,
  X,
  ChevronRight,
  User,
  Clock,
  Check,
  Ban,
  Flag,
  RotateCw,
  EyeOff,
  Eye,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import {
  AdminReviewItem,
  ModerationContentStatus,
  fetchModeratedReviews,
  updateReviewStatusAction,
} from "@/lib/moderation";
import { useAppContext } from "@/contexts/AppContext";

export default function ReviewsModerationPage() {
  const { role } = useAppContext();
  const [reviews, setReviews] = useState<AdminReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Note Modal State
  const [editingReview, setEditingReview] = useState<AdminReviewItem | null>(null);
  const [noteText, setNoteText] = useState("");
  const [modalStatus, setModalStatus] = useState<ModerationContentStatus>("approved");

  const loadReviews = async () => {
    setLoading(true);
    const data = await fetchModeratedReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
    const handleUpdate = () => loadReviews();
    if (typeof window !== "undefined") {
      window.addEventListener("modesy-moderation-updated", handleUpdate);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("modesy-moderation-updated", handleUpdate);
      }
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredReviews = reviews.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      r.productTitle.toLowerCase().includes(q) ||
      r.userName.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const totalCount = reviews.length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const flaggedCount = reviews.filter((r) => r.status === "flagged").length;
  const hiddenCount = reviews.filter((r) => r.status === "hidden").length;

  const handleUpdateStatus = async (
    reviewId: number,
    newStatus: ModerationContentStatus,
    note?: string
  ) => {
    await updateReviewStatusAction(reviewId, newStatus, note);
    showToast(`Status ulasan #${reviewId} diubah menjadi "${newStatus.toUpperCase()}".`);
    loadReviews();
  };

  const handleOpenNoteModal = (review: AdminReviewItem) => {
    setEditingReview(review);
    setNoteText(review.moderationNote || "");
    setModalStatus(review.status);
  };

  const handleSaveModalNote = async () => {
    if (!editingReview) return;
    await updateReviewStatusAction(editingReview.id, modalStatus, noteText.trim() ? noteText.trim() : undefined);
    showToast(`Catatan moderasi untuk ulasan #${editingReview.id} berhasil disimpan.`);
    setEditingReview(null);
    loadReviews();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= rating
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: ModerationContentStatus) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Approved
          </span>
        );
      case "flagged":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            Flagged
          </span>
        );
      case "hidden":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            Hidden
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Pending
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

      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Reviews Moderation
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {flaggedCount} Flagged
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Tinjau ulasan bintang produk dari pembeli dan bersihkan ulasan yang mengandung kontak eksternal atau spam
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Management Tools</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Reviews</span>
        </nav>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Total Ulasan
          </span>
          <p className="text-xl font-bold text-gray-900 mt-0.5">{totalCount}</p>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            Disetujui (Approved)
          </span>
          <p className="text-xl font-bold text-emerald-900 mt-0.5">{approvedCount}</p>
        </div>

        <div className="bg-rose-50/60 border border-rose-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
            Ditandai (Flagged)
          </span>
          <p className="text-xl font-bold text-rose-900 mt-0.5">{flaggedCount}</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
            Disembunyikan (Hidden)
          </span>
          <p className="text-xl font-bold text-gray-900 mt-0.5">{hiddenCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari produk, pembeli, ulasan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-9 pr-3 py-1.5 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded p-0.5 text-xs">
            {["All", "approved", "flagged", "hidden"].map((st) => (
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
            onClick={loadReviews}
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
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4">Pembeli</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Isi Ulasan & Catatan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4 text-center w-36">Aksi Moderasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    Memuat ulasan dari Supabase...
                  </td>
                </tr>
              ) : filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    Tidak ada ulasan yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* ID */}
                    <td className="py-3 px-4 text-center font-bold text-gray-500">
                      #{rev.id}
                    </td>

                    {/* Produk */}
                    <td className="py-3 px-4 font-semibold text-gray-800 max-w-[200px]">
                      <span className="line-clamp-2">{rev.productTitle}</span>
                    </td>

                    {/* Pembeli */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.userAvatar || "https://i.pravatar.cc/150?u=user"}
                          alt={rev.userName}
                          className="w-6 h-6 rounded-full object-cover border border-gray-200"
                        />
                        <span className="font-semibold text-gray-900">{rev.userName}</span>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-3 px-4">
                      {renderStars(rev.rating)}
                    </td>

                    {/* Isi Ulasan */}
                    <td className="py-3 px-4 max-w-sm">
                      <div>
                        <p className="text-gray-700 text-[11.5px] leading-relaxed">
                          "{rev.comment}"
                        </p>
                        {rev.moderationNote && (
                          <p className="text-[11px] text-[#00a99d] bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5 mt-1 italic inline-block">
                            Catatan: {rev.moderationNote}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">{getStatusBadge(rev.status)}</td>

                    {/* Tanggal */}
                    <td className="py-3 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{rev.createdAt}</span>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {rev.status !== "approved" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(rev.id, "approved")}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-1.5 rounded border border-emerald-200 transition-colors"
                            title="Setujui Ulasan"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {rev.status !== "flagged" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(rev.id, "flagged")}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-1.5 rounded border border-rose-200 transition-colors"
                            title="Tandai Pelanggaran"
                          >
                            <Flag className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {rev.status !== "hidden" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(rev.id, "hidden")}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded border border-gray-200 transition-colors"
                            title="Sembunyikan Ulasan"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenNoteModal(rev)}
                          className="bg-teal-50 hover:bg-teal-100 text-[#00a99d] p-1.5 rounded border border-teal-200 transition-colors"
                          title="Beri Catatan Moderasi"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
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

      {/* Modal Edit Catatan Moderasi */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200 overflow-hidden text-xs">
            <div className="px-5 py-3.5 bg-gray-800 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">
                Moderasi Ulasan #{editingReview.id}
              </h3>
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="font-bold text-gray-800">{editingReview.productTitle}</p>
                <div className="my-1">{renderStars(editingReview.rating)}</div>
                <p className="text-gray-600 italic">"{editingReview.comment}"</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Status Moderasi:
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value as ModerationContentStatus)}
                  className="w-full text-xs p-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
                >
                  <option value="approved">Approved (Disetujui)</option>
                  <option value="flagged">Flagged (Ditandai Melanggar)</option>
                  <option value="hidden">Hidden (Disembunyikan)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Catatan Moderasi:
                </label>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Contoh: Terindikasi spam / Promosi link luar..."
                  className="w-full text-xs p-2.5 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
                />
              </div>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium rounded transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveModalNote}
                className="px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded shadow-xs transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
