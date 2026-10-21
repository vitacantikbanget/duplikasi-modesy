"use client";

/**
 * ============================================================================
 * HALAMAN PESAN & PERCAKAPAN (Messages & Customer Chat Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Pusat perpesanan komunikasi langsung antara pembeli dan penjual/admin.
 * Memungkinkan pengguna untuk melihat daftar kontak percakapan terkini (Recent Chats),
 * mencari riwayat obrolan, membaca pesan masuk dan keluar, serta mengirim balasan
 * pesan secara real-time.
 * 
 * FITUR:
 * 1. Panel Samping (Daftar Percakapan Terkini / Recent Chats) dengan foto profil penjual.
 * 2. Header Status Pengguna Aktif (Admin) dengan indikator online hijau.
 * 3. Kolom Pencarian Percakapan (Search bar).
 * 4. Jendela Pesan (Chat Window) dengan bubble chat interaktif dan tanda centang pengiriman.
 * 5. Input pengiriman pesan rounded dengan ikon kirim.
 */

import { useState } from "react";
import Link from "next/link";
import { Search, Send, CheckCheck, X } from "lucide-react";

// Avatar Admin dandelion
const ADMIN_AVATAR = "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=120&q=80";
// Avatar Toko Trendshop bunga chamomile
const TRENDSHOP_AVATAR = "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=120&q=80";

/**
 * Interface untuk satu butir pesan obrolan
 */
interface MessageItem {
  id: string;               // ID pesan
  sender: "user" | "other"; // Pengirim: 'user' (admin) atau 'other' (mitra bicara)
  text: string;             // Isi teks pesan
  time: string;             // Waktu pengiriman
}

/**
 * Interface untuk sesi obrolan (Thread percakapan)
 */
interface Chat {
  id: string;               // ID sesi obrolan
  user: string;             // Nama mitra bicara
  avatar: string;           // URL avatar mitra
  subject: string;          // Subjek / produk yang dibahas
  time: string;             // Waktu percakapan terakhir
  messages: MessageItem[];  // Riwayat percakapan
}

export default function MessagesPage() {
  // State untuk ID obrolan yang sedang dibuka
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  // State untuk filter pencarian obrolan
  const [searchQuery, setSearchQuery] = useState("");
  // State untuk input teks pesan baru
  const [inputText, setInputText] = useState("");

  // Data mock riwayat obrolan
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      user: "Trendshop",
      avatar: TRENDSHOP_AVATAR,
      subject: "Black fashion women backpack",
      time: "19 days ago",
      messages: [
        {
          id: "m1",
          sender: "other",
          text: "Hi Admin, could you please confirm the delivery schedule for Black fashion women backpack?",
          time: "19 days ago",
        },
      ],
    },
    {
      id: "2",
      user: "Trendshop",
      avatar: TRENDSHOP_AVATAR,
      subject: "Sun hat for women protection cap",
      time: "29 days ago",
      messages: [
        {
          id: "m2",
          sender: "other",
          text: "Hello! Is this protection cap available in bulk quantity?",
          time: "29 days ago",
        },
      ],
    },
    {
      id: "3",
      user: "Trendshop",
      avatar: TRENDSHOP_AVATAR,
      subject: "Videokonferenz am Donnerstag 17...",
      time: "1 month ago",
      messages: [
        {
          id: "m3",
          sender: "other",
          text: "Hallo, kurze Bestätigung für die Besprechung am Donnerstag.",
          time: "1 month ago",
        },
      ],
    },
    {
      id: "4",
      user: "Trendshop",
      avatar: TRENDSHOP_AVATAR,
      subject: "Black midi skirt with white flowers",
      time: "1 month ago",
      messages: [
        {
          id: "m4",
          sender: "other",
          text: "Hi, do you have size S available for this skirt?",
          time: "1 month ago",
        },
      ],
    },
    {
      id: "5",
      user: "Trendshop",
      avatar: TRENDSHOP_AVATAR,
      subject: "Sun hat for women protection cap",
      time: "1 month ago",
      messages: [
        {
          id: "m5",
          sender: "other",
          text: "Inquiry about product specifications.",
          time: "1 month ago",
        },
      ],
    },
    {
      id: "6",
      user: "Trendshop",
      avatar: TRENDSHOP_AVATAR,
      subject: "Sun hat for women protection cap",
      time: "1 month ago",
      messages: [
        {
          id: "m6",
          sender: "other",
          text: "Follow up on order shipment.",
          time: "1 month ago",
        },
      ],
    },
  ]);

  /**
   * Filter daftar obrolan berdasarkan nama mitra atau subjek produk
   */
  const filteredChats = chats.filter(
    (c) =>
      c.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChat = chats.find((c) => c.id === activeChatId);

  /**
   * Handler mengirimkan pesan balasan baru ke obrolan aktif
   */
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const targetChatId = activeChatId || chats[0]?.id;
    if (!targetChatId) return;

    const newMessage: MessageItem = {
      id: `m_${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      time: "Just now",
    };

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === targetChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );

    if (!activeChatId) {
      setActiveChatId(targetChatId);
    }

    setInputText("");
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-[#495057] pb-16">
      {/* 1. Breadcrumb Navigasi */}
      <div className="max-w-[1320px] mx-auto px-4 pt-5 pb-2">
        <nav className="flex items-center text-[12px] text-[#868e96] gap-1.5">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#495057]">Messages</span>
        </nav>
      </div>

      {/* 2. Container Panel Obrolan */}
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <div className="bg-white border border-[#dee2e6] rounded-[2px] flex flex-col md:flex-row min-h-[580px] overflow-hidden shadow-2xs">
          
          {/* PANEL KIRI: DAFTAR PERCAKAPAN TERKINI (RECENT CHATS) */}
          <div className="w-full md:w-[280px] border-r border-[#dee2e6] flex flex-col shrink-0">
            
            {/* Header Profil Pengguna Aktif */}
            <div className="p-4 flex items-center gap-3">
              <div className="relative w-11 h-11 shrink-0">
                <img
                  src={ADMIN_AVATAR}
                  alt="Admin"
                  className="w-11 h-11 rounded-full object-cover border border-gray-200"
                />
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#28a745] border-2 border-white rounded-full"
                  title="Online"
                />
              </div>
              <div className="font-bold text-[14px] text-[#2c333e]">
                Admin
              </div>
            </div>

            {/* Kolom Pencarian Obrolan */}
            <div className="px-4 pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-8 py-1.5 border border-[#dee2e6] focus:border-[#00ab97] rounded-[2px] text-[12px] text-[#495057] placeholder:text-gray-400 focus:outline-none transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Label Judul Bagian */}
            <div className="px-4 py-2">
              <span className="text-[12px] font-semibold text-[#6c757d]">Recent Chats</span>
            </div>

            {/* Daftar Thread Percakapan */}
            <div className="flex-1 overflow-y-auto max-h-[480px] divide-y divide-[#f1f3f5]">
              {filteredChats.map((chat) => {
                const isActive = activeChatId === chat.id;
                return (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`px-4 py-2.5 flex items-center gap-3 cursor-pointer transition-colors ${
                      isActive ? "bg-[#f1f3f5]" : "hover:bg-[#fafbfc]"
                    }`}
                  >
                    <img
                      src={chat.avatar}
                      alt={chat.user}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-semibold text-[#2c333e] truncate">
                        {chat.user}
                      </div>
                      <p className="text-[11.5px] text-[#6c757d] truncate leading-tight">
                        {chat.subject}
                      </p>
                      <span className="text-[10px] text-[#adb5bd] block mt-0.5">
                        {chat.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredChats.length === 0 && (
                <div className="p-6 text-center text-xs text-gray-400">
                  No conversations found.
                </div>
              )}
            </div>
          </div>

          {/* PANEL KANAN: JENDELA PESAN / CHAT WINDOW */}
          <div className="flex-1 flex flex-col justify-between bg-white min-h-[580px]">
            {activeChat ? (
              <>
                {/* Header Percakapan Aktif */}
                <div className="p-3 px-5 border-b border-[#dee2e6] flex items-center justify-between bg-[#fbfcfd]">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.user}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-200"
                    />
                    <div>
                      <h3 className="text-[13px] font-bold text-[#2c333e]">
                        {activeChat.user}
                      </h3>
                      <p className="text-[11px] text-[#6c757d] truncate max-w-[450px]">
                        {activeChat.subject}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveChatId(null)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    title="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Area Bubble Pesan */}
                <div className="flex-1 p-6 space-y-3.5 overflow-y-auto max-h-[460px] bg-white">
                  {activeChat.messages.map((msg) => {
                    const isUser = msg.sender === "user";
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2.5 max-w-[78%] ${
                          isUser ? "ml-auto flex-row-reverse" : ""
                        }`}
                      >
                        {!isUser && (
                          <img
                            src={activeChat.avatar}
                            alt={activeChat.user}
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                        )}
                        <div>
                          <div
                            className={`p-3 rounded-[4px] text-[12.5px] leading-relaxed ${
                              isUser
                                ? "bg-[#00ab97] text-white"
                                : "bg-[#f1f3f5] text-[#2c333e] border border-[#e9ecef]"
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div
                            className={`text-[10px] text-gray-400 mt-0.5 flex items-center gap-1 ${
                              isUser ? "justify-end" : ""
                            }`}
                          >
                            <span>{msg.time}</span>
                            {isUser && <CheckCheck className="w-3 h-3 text-[#00ab97]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Tampilan Kosong Saat Belum Ada Chat yang Dipilih */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="bg-[#f1f3f5] text-[#6c757d] text-[13px] font-normal px-6 py-2.5 rounded-full select-none">
                  Select a chat to start messaging
                </div>
              </div>
            )}

            {/* Kolom Input Kirim Pesan di Bagian Bawah */}
            <div className="p-4 border-t border-[#dee2e6] bg-white">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-white border border-[#dee2e6] focus:border-[#00ab97] rounded-full pl-5 pr-12 py-2 text-[12.5px] text-[#495057] placeholder:text-gray-400 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-3.5 p-1 text-gray-400 hover:text-[#00ab97] disabled:opacity-40 transition-colors cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
