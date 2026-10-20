"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Plus, Edit, Trash2, X, CheckCircle } from "lucide-react";

interface BlogPostItem {
  id: number;
  title: string;
  category: string;
  language: string;
  author: string;
  image: string;
  date: string;
}

const INITIAL_POSTS: BlogPostItem[] = [
  {
    id: 5,
    title: "10 Essential Tips for Starting an E-Commerce Business in 2026",
    category: "Business",
    language: "English",
    author: "admin",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=70&fit=crop&q=80",
    date: "2026-10-12 / 14:30",
  },
  {
    id: 4,
    title: "How to Protect Your Marketplace Account from Phishing and Fraud",
    category: "Security",
    language: "English",
    author: "admin",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=70&fit=crop&q=80",
    date: "2026-10-05 / 11:20",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Product Photography for Handmade Items",
    category: "Marketing",
    language: "English",
    author: "admin",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=100&h=70&fit=crop&q=80",
    date: "2026-09-28 / 16:45",
  },
  {
    id: 2,
    title: "Top Autumn & Winter Fashion Trends to Look Out for This Season",
    category: "Fashion",
    language: "English",
    author: "admin",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=70&fit=crop&q=80",
    date: "2026-09-15 / 09:10",
  },
];

export default function BlogPostsAdminPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>(INITIAL_POSTS);
  const [showCount, setShowCount] = useState(15);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Business");
  const [notification, setNotification] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setPosts(posts.filter((p) => p.id !== id));
      setActiveMenuId(null);
      setNotification("Blog post deleted successfully!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newPost: BlogPostItem = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      language: "English",
      author: "admin",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=70&fit=crop&q=80",
      date: "2026-10-19 / 12:00",
    };
    setPosts([newPost, ...posts]);
    setShowAddModal(false);
    setNewTitle("");
    setNotification("Post added successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = posts.filter((p) => {
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Posts <small className="text-[14px] text-gray-500 font-light">Blog</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Blog</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Posts</span>
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

            <div className="flex items-center space-x-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
              >
                <option value="All">Category (All)</option>
                <option value="Business">Business</option>
                <option value="Security">Security</option>
                <option value="Marketing">Marketing</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="h-[34px] bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 rounded-[3px] text-[13px] font-medium flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add Post
            </button>
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
                <th className="px-4 py-2.5">Post</th>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">Language</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5 text-right w-24">Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-10 object-cover rounded-[2px] border border-gray-200 shrink-0"
                      />
                      <div>
                        <span className="font-medium text-[#3c8dbc] hover:underline cursor-pointer line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-[11.5px] text-gray-400">By {item.author}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-[2px] text-[12px] border border-gray-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.language}</td>
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
                              alert("Edit post: " + item.title);
                              setActiveMenuId(null);
                            }}
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
          <div>Showing 1 to {filtered.length} of {posts.length} entries</div>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-[#3c8dbc] bg-[#3c8dbc] text-white text-[12px] rounded-[2px]">1</button>
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-gray-300 w-full max-w-lg">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center bg-[#f9f9f9]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Add Post</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddPost} className="p-5 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Post title"
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                >
                  <option value="Business">Business</option>
                  <option value="Security">Security</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#f4f4f4] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#d2d6de] bg-white text-gray-700 rounded-[3px] text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded-[3px] text-[13px] font-medium"
                >
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
