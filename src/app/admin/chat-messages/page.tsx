"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Trash2 } from "lucide-react";

interface ChatItem {
  id: number;
  sender: string;
  senderEmail: string;
  receiver: string;
  receiverEmail: string;
  message: string;
  date: string;
}

const INITIAL_CHATS: ChatItem[] = [
  { id: 18, sender: "James Baronie", senderEmail: "james@codingest.net", receiver: "Trendshop", receiverEmail: "trendshop@codingest.net", message: "Hello! Is the colorful women scarf available for wholesale orders?", date: "2026-10-19 / 14:10" },
  { id: 17, sender: "Trendshop", senderEmail: "trendshop@codingest.net", receiver: "James Baronie", receiverEmail: "james@codingest.net", message: "Yes, we have 500 units in stock right now. Delivery takes 3-5 days.", date: "2026-10-19 / 14:15" },
  { id: 16, sender: "Linda Martin", senderEmail: "linda@codingest.net", receiver: "Trendshop", receiverEmail: "trendshop@codingest.net", message: "What are the exact bust and waist measurements for size L on the navy polka dot dress?", date: "2026-10-18 / 09:20" },
  { id: 15, sender: "Alex Miller", senderEmail: "alex@codingest.net", receiver: "admin", receiverEmail: "admin@codingest.net", message: "Hi admin, I just submitted the verification documents for my seller account.", date: "2026-10-16 / 16:45" },
];

export default function ChatMessagesPage() {
  const [chats, setChats] = useState<ChatItem[]>(INITIAL_CHATS);
  const [showCount, setShowCount] = useState(15);
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setChats(chats.filter((c) => c.id !== id));
      setActiveMenuId(null);
    }
  };

  const filtered = chats.filter(
    (c) =>
      search === "" ||
      c.sender.toLowerCase().includes(search.toLowerCase()) ||
      c.receiver.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Chat Messages <small className="text-[14px] text-gray-500 font-light">Management Tools</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Management Tools</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Chat Messages</span>
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

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc] w-full sm:w-56"
            />
            <button className="h-[34px] bg-[#00c0ef] hover:bg-[#00acd6] text-white px-4 rounded-[3px] text-[13px] font-medium shadow-2xs shrink-0 cursor-pointer">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-[13px] text-[#333333] border border-[#f4f4f4] border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                <th className="px-4 py-2.5 w-12 text-center">Id</th>
                <th className="px-4 py-2.5">Sender</th>
                <th className="px-4 py-2.5">Receiver</th>
                <th className="px-4 py-2.5">Message</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5 text-right w-24">Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-[#3c8dbc] hover:underline cursor-pointer">{item.sender}</span>
                    <span className="block text-[11.5px] text-gray-400">{item.senderEmail}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-[#3c8dbc] hover:underline cursor-pointer">{item.receiver}</span>
                    <span className="block text-[11.5px] text-gray-400">{item.receiverEmail}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-md">{item.message}</td>
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
          <div>Showing 1 to {filtered.length} of {chats.length} entries</div>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-[#3c8dbc] bg-[#3c8dbc] text-white text-[12px] rounded-[2px]">1</button>
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
