"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Trash2, Send } from "lucide-react";

interface MessageItem {
  id: string;
  sender: "user" | "admin";
  text: string;
  time: string;
}

interface ChatThread {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  productTitle: string;
  productLink: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  messages: MessageItem[];
}

const INITIAL_THREADS: ChatThread[] = [
  {
    id: "1",
    partnerName: "Admin",
    partnerAvatar: "/assets/img/admin-avatar.jpg",
    productTitle: "Modern grey couch and pillows",
    productLink: "/member/category/home-living",
    lastMessage: "Modern grey couch and pillows",
    time: "4 days ago",
    isOnline: false,
    messages: [
      { id: "m1", sender: "user", text: "Available?", time: "1 month ago" },
      { id: "m2", sender: "admin", text: "Sold out.", time: "1 month ago" },
      { id: "m3", sender: "admin", text: "Ok", time: "5 days ago" },
      { id: "m4", sender: "admin", text: "yee", time: "4 days ago" },
      { id: "m5", sender: "user", text: "tes", time: "4 days ago" },
      { id: "m6", sender: "admin", text: "hh", time: "4 days ago" },
    ],
  },
  {
    id: "2",
    partnerName: "Admin",
    partnerAvatar: "/assets/img/admin-avatar.jpg",
    productTitle: "Adorable animals photo pack",
    productLink: "/member/category/graphics-photos",
    lastMessage: "Adorable animals photo pack",
    time: "21 days ago",
    isOnline: false,
    messages: [
      { id: "m7", sender: "user", text: "Is commercial license included?", time: "21 days ago" },
      { id: "m8", sender: "admin", text: "Yes, standard commercial license is included.", time: "21 days ago" },
    ],
  },
];

export default function MemberMessages() {
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      time: "Just Now",
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );

    setInputText("");
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDeleteConversation = () => {
    setThreads((prev) => prev.filter((t) => t.id !== activeThreadId));
    if (threads.length > 1) {
      setActiveThreadId(threads.find((t) => t.id !== activeThreadId)?.id || "");
    }
    setIsDeleteModalOpen(false);
  };

  const filteredThreads = threads.filter((t) =>
    t.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.productTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-6 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Messages</span>
        </nav>

        {/* Messenger Card */}
        <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-12 min-h-[580px] overflow-hidden">
          {/* Left Column: Peter Jone Header, Search, Recent Chats */}
          <div className="md:col-span-4 lg:col-span-3 border-b md:border-b-0 md:border-r border-[#ebebeb] p-5 flex flex-col bg-white">
            <div className="flex items-center gap-3 pb-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/peter-jone-avatar.jpg"
                    alt="Peter Jone"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80";
                    }}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#3ecf8e] ring-2 ring-white"></span>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">Peter Jone</h3>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative my-3">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-[2px] pl-3.5 pr-9 py-2 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] focus:outline-none transition bg-white"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="text-[12px] text-gray-400 font-medium my-2">Recent Chats</div>

            {/* Threads List */}
            <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[420px]">
              {filteredThreads.map((thread) => {
                const isActive = thread.id === activeThreadId;
                return (
                  <div
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`flex items-start gap-3 p-2.5 rounded-[2px] transition cursor-pointer ${
                      isActive ? "bg-[#f1f3f5]" : "hover:bg-gray-50 bg-white"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 mt-0.5 bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thread.partnerAvatar}
                        alt={thread.partnerName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-gray-900 leading-snug">
                        {thread.partnerName}
                      </div>
                      <div className="text-[12px] text-gray-500 truncate mt-0.5 leading-snug">
                        {thread.productTitle}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{thread.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chat View & Reply */}
          {activeThread ? (
            <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between bg-white">
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#ebebeb] flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeThread.partnerAvatar}
                      alt={activeThread.partnerName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80";
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[14px] font-bold text-gray-900 leading-tight">
                        {activeThread.partnerName}
                      </h2>
                      <span className="flex items-center gap-1 text-[11px] text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
                        {activeThread.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                    <Link
                      href={activeThread.productLink}
                      className="text-xs text-gray-700 underline hover:text-[#00a99d] transition-colors mt-0.5 block"
                    >
                      {activeThread.productTitle}
                    </Link>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="p-2 bg-[#f8f9fa] hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-[2px] transition cursor-pointer border-0"
                  title="Delete conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Message Stream */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[460px] min-h-[380px] bg-white">
                {activeThread.messages.map((msg) => {
                  const isUser = msg.sender === "user";

                  if (isUser) {
                    return (
                      <div key={msg.id} className="flex flex-col items-end">
                        <div className="flex items-end gap-2.5 max-w-[85%] sm:max-w-[70%] flex-row-reverse">
                          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/images/peter-jone-avatar.jpg"
                              alt="Peter Jone"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80";
                              }}
                            />
                          </div>
                          <div className="rounded-[3px] px-3.5 py-2 text-xs font-normal leading-relaxed bg-[#3b82f6] text-white">
                            {msg.text}
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1 pr-9">{msg.time}</div>
                      </div>
                    );
                  }

                  return (
                    <div key={msg.id} className="flex flex-col items-start">
                      <div className="flex items-end gap-2.5 max-w-[85%] sm:max-w-[70%] flex-row">
                        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={activeThread.partnerAvatar}
                            alt={activeThread.partnerName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80";
                            }}
                          />
                        </div>
                        <div className="rounded-[3px] px-3.5 py-2 text-xs font-normal leading-relaxed bg-[#f1f3f5] text-gray-800">
                          {msg.text}
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1 pl-9">{msg.time}</div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Message Input Form */}
              <div className="p-4 border-t border-[#ebebeb] bg-white">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Write a message..."
                    className="w-full bg-[#f8f9fa] border border-gray-200 rounded-[2px] pl-4 pr-12 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] transition"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00a99d] disabled:text-gray-300 transition cursor-pointer bg-transparent border-0 p-1"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="md:col-span-8 lg:col-span-9 flex items-center justify-center p-12 text-gray-400 text-sm">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDeleteModalOpen(false);
          }}
        >
          <div className="bg-white rounded-[4px] shadow-2xl p-7 max-w-[420px] w-full text-center transform transition-all animate-in zoom-in-95 duration-150">
            <div className="w-[72px] h-[72px] rounded-full border-4 border-[#facea8] flex items-center justify-center mx-auto mb-5">
              <svg width="32" height="46" viewBox="0 0 32 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="16" y1="8" x2="16" y2="28" stroke="#f8bb86" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="16" cy="38" r="2.2" fill="#f8bb86" />
              </svg>
            </div>
            <p className="text-[16px] sm:text-[17px] text-[#545454] font-normal leading-normal mb-7">
              Are you sure you want to delete this conversation?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteConversation}
                className="px-8 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0 outline-none focus:ring-2 focus:ring-[#00a99d]/30"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
