"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  Search,
  CheckCircle2,
  X,
  ChevronRight,
  User,
  Clock,
  Trash2,
  Mail,
  MailCheck,
  RotateCw,
} from "lucide-react";

interface ContactMessageItem {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "read" | "unread";
}

const INITIAL_CONTACT_MESSAGES: ContactMessageItem[] = [
  {
    id: 1,
    name: "Ahmad Rizky",
    email: "ahmad.rizky@gmail.com",
    message: "Halo tim Modesy, saya tertarik membuka toko resmi (vendor) kategori pakaian handmade. Apakah ada panduan persyaratan izin usaha yang diperlukan?",
    createdAt: "2026-10-18 16:30",
    status: "unread",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@yahoo.com",
    message: "Permisi, saya ingin menanyakan mengenai integrasi kurir pengiriman internasional apakah saat ini sudah didukung untuk pengiriman ke Australia?",
    createdAt: "2026-10-17 11:15",
    status: "read",
  },
];

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageItem[]>(INITIAL_CONTACT_MESSAGES);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [replyMessageItem, setReplyMessageItem] = useState<ContactMessageItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredMessages = messages.filter((m) => {
    const q = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  const handleDelete = (id: number) => {
    if (confirm(`Hapus pesan kontak #${id}?`)) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showToast(`Pesan kontak #${id} berhasil dihapus.`);
    }
  };

  const handleToggleRead = (id: number) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === "read" ? "unread" : "read" } : m
      )
    );
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
            <Send className="w-6 h-6 text-[#00a99d]" />
            Contact Messages
            <span className="text-xs bg-teal-100 text-[#00a99d] font-bold px-2 py-0.5 rounded-full">
              {messages.filter((m) => m.status === "unread").length} Unread
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar formulir pesan dan pertanyaan pengunjung publik yang masuk melalui form Kontak Modesy
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Management Tools</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Contact Messages</span>
        </nav>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded p-3.5 shadow-xs flex items-center justify-between">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, email, pesan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs pl-9 pr-3 py-1.5 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none w-72"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-200 text-gray-600 uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3 px-4 w-12 text-center">ID</th>
                <th className="py-3 px-4">Pengirim</th>
                <th className="py-3 px-4">Isi Pesan</th>
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    Tidak ada pesan kontak yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-gray-500">
                      #{msg.id}
                    </td>

                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{msg.name}</p>
                        <p className="text-[11px] text-gray-400">{msg.email}</p>
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-md">
                      <p className="text-gray-700 leading-relaxed text-[11.5px]">
                        {msg.message}
                      </p>
                    </td>

                    <td className="py-3 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{msg.createdAt}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleRead(msg.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors ${
                          msg.status === "unread"
                            ? "bg-teal-50 text-[#00a99d] border-teal-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {msg.status === "unread" ? "Baru (Unread)" : "Dibaca (Read)"}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <a
                          href={`mailto:${msg.email}?subject=Balasan Kontak Modesy`}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-1.5 rounded border border-blue-200 transition-colors"
                          title="Balas via Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(msg.id)}
                          className="bg-gray-100 hover:bg-rose-50 text-gray-500 hover:text-rose-600 p-1.5 rounded border border-gray-200 transition-colors"
                          title="Hapus Pesan"
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
