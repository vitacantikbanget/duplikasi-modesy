"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Plus, Edit, Trash2, X, CheckCircle } from "lucide-react";

interface PageItem {
  id: number;
  title: string;
  slug: string;
  order: number;
  location: string;
  visibility: boolean;
  date: string;
}

const INITIAL_PAGES: PageItem[] = [
  { id: 1, title: "About Us", slug: "about-us", order: 1, location: "Footer Quick Links", visibility: true, date: "2026-01-10 / 12:00" },
  { id: 2, title: "Terms & Conditions", slug: "terms-conditions", order: 2, location: "Footer Information", visibility: true, date: "2026-01-10 / 12:00" },
  { id: 3, title: "Privacy Policy", slug: "privacy-policy", order: 3, location: "Footer Information", visibility: true, date: "2026-01-10 / 12:00" },
  { id: 4, title: "Cookie Policy", slug: "cookie-policy", order: 4, location: "Footer Information", visibility: true, date: "2026-01-10 / 12:00" },
  { id: 5, title: "Help & FAQ", slug: "help-faq", order: 5, location: "Footer Quick Links", visibility: true, date: "2026-02-15 / 10:30" },
  { id: 6, title: "Contact Us", slug: "contact", order: 6, location: "Top Menu & Footer", visibility: true, date: "2026-02-20 / 14:15" },
];

export default function AdminPagesManager() {
  const [pages, setPages] = useState<PageItem[]>(INITIAL_PAGES);
  const [showCount, setShowCount] = useState(15);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [location, setLocation] = useState("Footer Information");
  const [order, setOrder] = useState(1);
  const [content, setContent] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingPage(null);
    setTitle("");
    setSlug("");
    setLocation("Footer Information");
    setOrder(pages.length + 1);
    setContent("");
    setShowModal(true);
  };

  const handleOpenEdit = (p: PageItem) => {
    setEditingPage(p);
    setTitle(p.title);
    setSlug(p.slug);
    setLocation(p.location);
    setOrder(p.order);
    setShowModal(true);
    setActiveMenuId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingPage) {
      setPages(
        pages.map((p) =>
          p.id === editingPage.id
            ? { ...p, title, slug: slug || title.toLowerCase().replace(/\s+/g, "-"), location, order }
            : p
        )
      );
      setNotification("Page updated successfully!");
    } else {
      const newPage: PageItem = {
        id: Date.now(),
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        order,
        location,
        visibility: true,
        date: "2026-10-19 / 12:00",
      };
      setPages([newPage, ...pages]);
      setNotification("Page created successfully!");
    }
    setShowModal(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this page?")) {
      setPages(pages.filter((p) => p.id !== id));
      setActiveMenuId(null);
      setNotification("Page deleted successfully!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filtered = pages.filter(
    (p) =>
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Pages <small className="text-[14px] text-gray-500 font-light">Custom Pages</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Content</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Pages</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Main Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 p-5">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-3">
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

            <button
              type="button"
              onClick={handleOpenAdd}
              className="h-[34px] bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 rounded-[3px] text-[13px] font-medium flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add Page
            </button>
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
          <table className="w-full min-w-[700px] text-left text-[13px] text-[#333333] border border-[#f4f4f4] border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                <th className="px-4 py-2.5 w-12 text-center">Id</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Location</th>
                <th className="px-4 py-2.5 text-center">Visibility</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5 text-right w-24">Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-[#3c8dbc] hover:underline cursor-pointer">
                    {item.title}
                  </td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[2px] text-[11px] font-semibold tracking-wide">
                      Visible
                    </span>
                  </td>
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
                            onClick={() => handleOpenEdit(item)}
                            className="w-full text-left px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                          >
                            <Edit className="w-3.5 h-3.5 text-[#3c8dbc]" /> Edit
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
          <div>Showing 1 to {filtered.length} of {pages.length} entries</div>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-[#3c8dbc] bg-[#3c8dbc] text-white text-[12px] rounded-[2px]">1</button>
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-gray-300 w-full max-w-xl">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center bg-[#f9f9f9]">
              <h3 className="text-[#333333] text-[16px] font-semibold">
                {editingPage ? "Edit Page" : "Add Page"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Slug (Optional)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="leave empty to generate automatically"
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                >
                  <option value="Footer Information">Footer Information</option>
                  <option value="Footer Quick Links">Footer Quick Links</option>
                  <option value="Top Menu & Footer">Top Menu & Footer</option>
                  <option value="Do Not Show">Do Not Show</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Content</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Page content or HTML..."
                  className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div className="pt-3 border-t border-[#f4f4f4] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-[#d2d6de] bg-white text-gray-700 rounded-[3px] text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded-[3px] text-[13px] font-medium"
                >
                  Save Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
