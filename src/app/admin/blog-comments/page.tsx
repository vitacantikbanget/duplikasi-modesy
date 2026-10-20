"use client";

import React, { useState } from "react";
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
import { ModerationContentStatus } from "@/lib/moderation";

interface BlogCommentItem {
  id: number;
  postTitle: string;
  userName: string;
  userEmail: string;
  comment: string;
  status: ModerationContentStatus;
  createdAt: string;
}

const INITIAL_BLOG_COMMENTS: BlogCommentItem[] = [
  {
    id: 1,
    postTitle: "10 Tren Fashion Musim Panas Paling Populer Tahun Ini",
    userName: "Nadia Maharani",
    userEmail: "nadia@gmail.com",
    comment: "Artikelnya sangat informatif! Saya sangat menyukai rekomendasi perpaduan warna earthy tone.",
    status: "approved",
    createdAt: "2026-10-18 15:20",
  },
  {
    id: 2,
    postTitle: "Panduan Memulai Bisnis Thrift & Fashion Vintage Online",
    userName: "SpamBot99",
    userEmail: "spambot@anonymous.org",
    comment: "Dapatkan pinjaman modal tanpa agunan bunga 0% klik http://dana-cepat-palsu.xyz",
    status: "flagged",
    createdAt: "2026-10-19 12:05",
  },
];

export default function BlogCommentsPage() {
  const [comments, setComments] = useState<BlogCommentItem[]>(INITIAL_BLOG_COMMENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredComments = comments.filter((c) => {
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const q = searchTerm.toLowerCase();
    return (
      matchStatus &&
      (c.postTitle.toLowerCase().includes(q) ||
        c.userName.toLowerCase().includes(q) ||
        c.comment.toLowerCase().includes(q))
    );
  });

  const handleUpdateStatus = (id: number, newStatus: ModerationContentStatus) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    showToast(`Status komentar blog #${id} diubah menjadi "${newStatus.toUpperCase()}".`);
  };

  const handleDelete = (id: number) => {
    if (confirm(`Hapus komentar blog #${id}?`)) {
      setComments((prev) => prev.filter((c) => c.id !== id));
      showToast(`Komentar blog #${id} dihapus.`);
    }
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
            Blog Comments
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Moderasi diskusi dan komentar pembaca pada artikel Blog Modesy
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Management Tools</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Blog Comments</span>
        </nav>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari artikel, nama, komentar..."
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
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-200 text-gray-600 uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3 px-4 w-12 text-center">ID</th>
                <th className="py-3 px-4">Artikel Blog</th>
                <th className="py-3 px-4">Komentator</th>
                <th className="py-3 px-4">Isi Komentar</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4 text-center w-32">Aksi Moderasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredComments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    Tidak ada komentar blog yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredComments.map((com) => (
                  <tr key={com.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-gray-500">
                      #{com.id}
                    </td>

                    <td className="py-3 px-4 font-semibold text-gray-800 max-w-[200px]">
                      <span className="line-clamp-2">{com.postTitle}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{com.userName}</p>
                        <p className="text-[10px] text-gray-400">{com.userEmail}</p>
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-sm">
                      <p className="text-gray-700 text-[11.5px] leading-relaxed">
                        "{com.comment}"
                      </p>
                    </td>

                    <td className="py-3 px-4">{getStatusBadge(com.status)}</td>

                    <td className="py-3 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{com.createdAt}</span>
                      </div>
                    </td>

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
                            title="Tandai Pelanggaran"
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

                        <button
                          type="button"
                          onClick={() => handleDelete(com.id)}
                          className="bg-gray-100 hover:bg-rose-50 text-gray-500 hover:text-rose-600 p-1.5 rounded border border-gray-200 transition-colors"
                          title="Hapus"
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
    </div>
  );
}
