"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, BookOpen, Trash2, Edit2, Eye, CheckCircle, Folder } from "lucide-react";

interface KnowledgeArticle {
  id: number;
  title: string;
  slug: string;
  category: string;
  order: number;
  views: number;
  date: string;
}

const INITIAL_ARTICLES: KnowledgeArticle[] = [
  { id: 1, title: "How to open a store and become a vendor", slug: "how-to-become-a-vendor", category: "Vendor Guidelines", order: 1, views: 1420, date: "2026-02-10" },
  { id: 2, title: "Understanding payout schedules and fees", slug: "payout-schedules-and-fees", category: "Payments & Payouts", order: 2, views: 890, date: "2026-02-15" },
  { id: 3, title: "How to request a refund for a damaged item", slug: "refund-policy-and-steps", category: "Orders & Shipping", order: 3, views: 2310, date: "2026-03-01" },
  { id: 4, title: "Setting up two-factor authentication (2FA)", slug: "setting-up-2fa", category: "Account Security", order: 4, views: 640, date: "2026-03-12" },
];

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<KnowledgeArticle[]>(INITIAL_ARTICLES);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Vendor Guidelines");
  const [newOrder, setNewOrder] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newArticle: KnowledgeArticle = {
      id: Date.now(),
      title: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/\s+/g, "-"),
      category: newCategory,
      order: Number(newOrder) || 1,
      views: 0,
      date: new Date().toISOString().split("T")[0],
    };

    setArticles([newArticle, ...articles]);
    setShowAddModal(false);
    setNewTitle("");
    setNotification("Knowledge Base article published successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: number) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setNotification("Article removed from Knowledge Base.");
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Knowledge Base</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage help center articles, vendor FAQs, and troubleshooting guides</p>
        </div>
        <div className="text-xs text-gray-500 mt-2 sm:mt-0">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline">Home</Link> / Help Center / Knowledge Base
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-[3px] shadow-xs border border-gray-200/80">
        <div className="p-3.5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="font-semibold text-gray-800 text-[14px]">Articles ({filtered.length})</h2>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#3c8dbc] w-48"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="bg-[#00c0ef] hover:bg-[#00acd6] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Article
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-semibold">
                <th className="px-3.5 py-2.5 w-12">ID</th>
                <th className="px-3.5 py-2.5">Title</th>
                <th className="px-3.5 py-2.5">Category</th>
                <th className="px-3.5 py-2.5">Order</th>
                <th className="px-3.5 py-2.5">Views</th>
                <th className="px-3.5 py-2.5">Date</th>
                <th className="px-3.5 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    No articles found
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-3.5 py-3 font-semibold text-gray-600">#{item.id}</td>
                    <td className="px-3.5 py-3 font-medium text-gray-800 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#3c8dbc] shrink-0" />
                      <span>{item.title}</span>
                    </td>
                    <td className="px-3.5 py-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-[2px] text-[10.5px] font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-gray-600">{item.order}</td>
                    <td className="px-3.5 py-3 text-gray-500">{item.views}</td>
                    <td className="px-3.5 py-3 text-gray-500">{item.date}</td>
                    <td className="px-3.5 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Article Modal */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[4px] p-5 max-w-lg w-full shadow-2xl relative"
          >
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#3c8dbc]" />
              Add Knowledge Base Article
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to connect custom domain"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2.5 py-2 focus:outline-none focus:border-[#3c8dbc] bg-white text-gray-700"
                  >
                    <option value="Vendor Guidelines">Vendor Guidelines</option>
                    <option value="Payments & Payouts">Payments & Payouts</option>
                    <option value="Orders & Shipping">Orders & Shipping</option>
                    <option value="Account Security">Account Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Order</label>
                  <input
                    type="number"
                    min={1}
                    value={newOrder}
                    onChange={(e) => setNewOrder(Number(e.target.value))}
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded text-xs font-semibold"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
