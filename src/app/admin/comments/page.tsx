"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Search,
  CheckCircle2,
  X,
  ChevronRight,
  User,
  Clock,
  Check,
  Flag,
  RotateCw,
  EyeOff,
  Trash2,
} from "lucide-react";
import {
  AdminCommentItem,
  ModerationContentStatus,
  fetchModeratedComments,
  updateCommentStatusAction,
} from "@/lib/moderation";
import { useAppContext } from "@/contexts/AppContext";

export default function ProductCommentsPage() {
  const { role } = useAppContext();
  const [comments, setComments] = useState<AdminCommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadComments = async () => {
    setLoading(true);
    const data = await fetchModeratedComments();
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
    const handleUpdate = () => loadComments();
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

  const filteredComments = comments.filter((c) => {
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      c.productTitle.toLowerCase().includes(q) ||
      c.userName.toLowerCase().includes(q) ||
      c.comment.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const totalCount = comments.length;
  const approvedCount = comments.filter((c) => c.status === "approved").length;
  const pendingCount = comments.filter((c) => c.status === "pending").length;
  const flaggedCount = comments.filter((c) => c.status === "flagged" || c.status === "hidden").length;

  const handleUpdateStatus = async (
    commentId: number,
    newStatus: ModerationContentStatus
  ) => {
    await updateCommentStatusAction(commentId, newStatus);
    showToast(`Status komentar #${commentId} diubah menjadi "${newStatus.toUpperCase()}".`);
    loadComments();
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
            <MessageCircle className="w-6 h-6 text-[#00a99d]" />
            Product Comments
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {pendingCount} Pending
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Moderasi diskusi dan komentar tanya-jawab pengunjung pada produk marketplace
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Management Tools</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Comments</span>
        </nav>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Total Komentar
          </span>
          <p className="text-xl font-bold text-gray-900 mt-0.5">{totalCount}</p>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            Tayang (Approved)
          </span>
          <p className="text-xl font-bold text-emerald-900 mt-0.5">{approvedCount}</p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
            Menunggu (Pending)
          </span>
          <p className="text-xl font-bold text-amber-900 mt-0.5">{pendingCount}</p>
        </div>

        <div className="bg-rose-50/60 border border-rose-200 rounded p-3 shadow-xs">
          <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
            Ditandai / Disembunyikan
          </span>
          <p className="text-xl font-bold text-rose-900 mt-0.5">{flaggedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari produk, nama, isi komentar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-9 pr-3 py-1.5 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded p-0.5 text-xs">
            {["All", "approved", "pending", "flagged", "hidden"].map((st) => (
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
            onClick={loadComments}
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
                <th className="py-3 px-4">Pengguna</th>
                <th className="py-3 px-4">Isi Komentar</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4 text-center w-36">Aksi Moderasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    Memuat komentar dari Supabase...
                  </td>
                </tr>
              ) : filteredComments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    Tidak ada komentar yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredComments.map((com) => (
                  <tr key={com.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* ID */}
                    <td className="py-3 px-4 text-center font-bold text-gray-500">
                      #{com.id}
                    </td>

                    {/* Produk */}
                    <td className="py-3 px-4 font-semibold text-gray-800 max-w-[200px]">
                      <span className="line-clamp-2">{com.productTitle}</span>
                    </td>

                    {/* Pengguna */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={com.userAvatar || "https://i.pravatar.cc/150?u=user"}
                          alt={com.userName}
                          className="w-6 h-6 rounded-full object-cover border border-gray-200"
                        />
                        <span className="font-semibold text-gray-900">{com.userName}</span>
                      </div>
                    </td>

                    {/* Isi Komentar */}
                    <td className="py-3 px-4 max-w-sm">
                      <p className="text-gray-700 text-[11.5px] leading-relaxed">
                        "{com.comment}"
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">{getStatusBadge(com.status)}</td>

                    {/* Waktu */}
                    <td className="py-3 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{com.createdAt}</span>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {com.status !== "approved" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(com.id, "approved")}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-1.5 rounded border border-emerald-200 transition-colors"
                            title="Setujui Komentar"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {com.status !== "flagged" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(com.id, "flagged")}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-1.5 rounded border border-rose-200 transition-colors"
                            title="Tandai Komentar"
                          >
                            <Flag className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {com.status !== "hidden" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(com.id, "hidden")}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded border border-gray-200 transition-colors"
                            title="Sembunyikan Komentar"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
