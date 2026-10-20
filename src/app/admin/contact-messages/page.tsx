"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Trash2, Eye, X } from "lucide-react";

interface ContactMessageItem {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

const INITIAL_MESSAGES: ContactMessageItem[] = [
  { id: 12, name: "Sarah Jenkins", email: "sarah.j@outlook.com", message: "Hello admin, I represent a boutique store and wanted to inquire about bulk wholesale purchasing on the scarves.", date: "2026-10-18 / 16:30" },
  { id: 11, name: "David Wilson", email: "david.wilson@gmail.com", message: "Hi! How do I register as a seller to sell digital artwork and vector packs on Modesy?", date: "2026-10-17 / 11:15" },
  { id: 10, name: "Emily Watson", email: "emily@brandcollab.io", message: "We would like to propose an official brand partnership for the autumn fashion catalog feature.", date: "2026-10-15 / 08:45" },
];

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageItem[]>(INITIAL_MESSAGES);
  const [showCount, setShowCount] = useState(15);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((m) => m.id !== id));
      setActiveMenuId(null);
    }
  };

  const filtered = messages.filter(
    (m) =>
      search === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Contact Messages <small className="text-[14px] text-gray-500 font-light">Management Tools</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Management Tools</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Contact Messages</span>
        </div>
      </div>

      {/* Main Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 p-5">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center space-x-2 text-[13px] text-gray-600">
            <span>Show</span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc] w-56"
            />
            <button className="h-[34px] bg-[#00c0ef] hover:bg-[#00acd6] text-white px-4 rounded-[3px] text-[13px] font-medium shadow-2xs">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#333333] border border-[#f4f4f4] border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                <th className="px-4 py-2.5 w-12 text-center">Id</th>
                <th className="px-4 py-2.5">Name</th>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Message</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5 text-right w-24">Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-[#3c8dbc]">{item.email}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-md truncate">{item.message}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.date}</td>
                  <td className="px-4 py-3 text-right relative">
                    <div className="inline-block text-left">
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                        className="bg-[#00c0ef] hover:bg-[#00acd6] text-white text-[12px] font-medium px-2.5 py-1 rounded-[2px] inline-flex items-center gap-1 shadow-2xs"
                      >
                        Options <ChevronDown className="w-3 h-3" />
                      </button>
                      {activeMenuId === item.id && (
                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-[3px] shadow-lg border border-gray-200 py-1 z-20">
                          <button
                            onClick={() => {
                              setSelectedMessage(item);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#3c8dbc]" /> View
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-full text-left px-3 py-1.5 text-[12px] text-red-600 hover:bg-gray-100 flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-[13px] text-gray-600 gap-2">
          <div>Showing 1 to {filtered.length} of {messages.length} entries</div>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-[#3c8dbc] bg-[#3c8dbc] text-white text-[12px] rounded-[2px]">1</button>
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-gray-300 w-full max-w-lg">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center bg-[#f9f9f9]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Message from {selectedMessage.name}</h3>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <span className="text-[12px] font-semibold text-gray-500 uppercase">Sender:</span>
                <p className="text-[14px] text-gray-800">{selectedMessage.name} &lt;{selectedMessage.email}&gt;</p>
              </div>
              <div>
                <span className="text-[12px] font-semibold text-gray-500 uppercase">Date:</span>
                <p className="text-[13px] text-gray-600">{selectedMessage.date}</p>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <span className="text-[12px] font-semibold text-gray-500 uppercase">Message:</span>
                <p className="text-[13px] text-gray-700 mt-1 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-[#f4f4f4] bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-1.5 bg-[#00c0ef] text-white rounded-[3px] text-[13px] font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
