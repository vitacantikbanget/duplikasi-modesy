"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Trash2, Send, CheckCircle } from "lucide-react";

interface SubscriberItem {
  id: number;
  email: string;
  date: string;
}

const INITIAL_SUBSCRIBERS: SubscriberItem[] = [
  { id: 25, email: "james@codingest.net", date: "2026-10-18 / 11:20" },
  { id: 24, email: "linda@codingest.net", date: "2026-10-17 / 15:40" },
  { id: 23, email: "alex@codingest.net", date: "2026-10-15 / 09:10" },
  { id: 22, email: "sarah@codingest.net", date: "2026-10-12 / 14:05" },
  { id: 21, email: "john@codingest.net", date: "2026-10-08 / 18:30" },
];

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>(INITIAL_SUBSCRIBERS);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) return;

    setNotification(`Newsletter email sent to ${subscribers.length} subscribers!`);
    setSubject("");
    setContent("");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this subscriber?")) {
      setSubscribers(subscribers.filter((s) => s.id !== id));
      setActiveMenuId(null);
      setNotification("Subscriber removed!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Newsletter <small className="text-[14px] text-gray-500 font-light">Management Tools</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Management Tools</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Newsletter</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Send Newsletter Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 h-fit">
          <div className="px-5 py-3 border-b border-[#f4f4f4]">
            <h3 className="text-[#333333] text-[16px] font-semibold">Send Email to Subscribers</h3>
          </div>
          <form onSubmit={handleSend} className="p-5 space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Subject *</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Content *</label>
              <textarea
                rows={6}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Email content..."
                className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div className="pt-3 border-t border-[#f4f4f4] flex justify-end">
              <button
                type="submit"
                className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-5 py-2 rounded-[3px] text-[13px] font-medium shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Send Email
              </button>
            </div>
          </form>
        </div>

        {/* Right: Subscribers Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#333333] text-[16px] font-semibold">Subscribers ({subscribers.length})</h3>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc] w-52"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-[#333333] border border-[#f4f4f4] border-collapse">
              <thead>
                <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                  <th className="px-4 py-2.5 w-12 text-center">Id</th>
                  <th className="px-4 py-2.5">Email</th>
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5 text-right w-24">Options</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                    <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{item.email}</td>
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
        </div>
      </div>
    </div>
  );
}
