"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tag, Search, ChevronRight, CheckCircle2, X, Plus } from "lucide-react";

export default function TagsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");

  const [tags, setTags] = useState([
    { id: 1, name: "vintage", count: 18 },
    { id: 2, name: "handmade", count: 24 },
    { id: 3, name: "denim", count: 9 },
    { id: 4, name: "organic", count: 14 },
    { id: 5, name: "cotton", count: 31 },
    { id: 6, name: "leather", count: 22 },
    { id: 7, name: "ceramic", count: 8 },
  ]);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    setTags((prev) => [...prev, { id: Date.now(), name: newTag.toLowerCase().trim(), count: 0 }]);
    setToastMessage(`Tag "#${newTag.trim()}" berhasil dibuat.`);
    setNewTag("");
  };

  const filtered = tags.filter((t) => t.name.includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-4 font-sans text-gray-800">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80 p-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-700" />
            Tags
            <span className="text-xs bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded-full">
              {tags.length} Tag
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Kelola kata kunci dan tag pencarian produk pada marketplace
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Tags</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Add Tag */}
        <div className="bg-white p-5 rounded border border-gray-200 shadow-xs h-fit">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Tambah Tag Baru</h3>
          <form onSubmit={handleAddTag} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nama Tag
              </label>
              <input
                type="text"
                required
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Contoh: streetwear"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <Plus className="w-4 h-4" />
              Simpan Tag
            </button>
          </form>
        </div>

        {/* Tag List */}
        <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden md:col-span-2">
          <div className="p-3 border-b border-gray-200">
            <div className="relative max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#f8f9fa] text-gray-600 uppercase font-semibold text-[11px] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-16 text-center">Id</th>
                <th className="px-4 py-3">Nama Tag</th>
                <th className="px-4 py-3">Jumlah Produk</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3 text-center text-gray-400">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">#{t.name}</td>
                  <td className="px-4 py-3 text-gray-600">{t.count} produk</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setTags((prev) => prev.filter((item) => item.id !== t.id));
                        setToastMessage(`Tag #${t.name} dihapus.`);
                      }}
                      className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
