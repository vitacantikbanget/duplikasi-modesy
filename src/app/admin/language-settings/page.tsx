"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Edit, Trash2, CheckCircle, Check, Globe, X, Search, FileText } from "lucide-react";

interface LanguageItem {
  id: number;
  name: string;
  shortForm: string;
  code: string;
  order: number;
  textDirection: "ltr" | "rtl";
  status: "Active" | "Inactive";
  isDefault: boolean;
}

const INITIAL_LANGUAGES: LanguageItem[] = [
  { id: 1, name: "English", shortForm: "en", code: "en-US", order: 1, textDirection: "ltr", status: "Active", isDefault: true },
  { id: 2, name: "Arabic", shortForm: "ar", code: "ar-SA", order: 2, textDirection: "rtl", status: "Active", isDefault: false },
  { id: 3, name: "French", shortForm: "fr", code: "fr-FR", order: 3, textDirection: "ltr", status: "Active", isDefault: false },
  { id: 4, name: "German", shortForm: "de", code: "de-DE", order: 4, textDirection: "ltr", status: "Active", isDefault: false },
  { id: 5, name: "Indonesian", shortForm: "id", code: "id-ID", order: 5, textDirection: "ltr", status: "Active", isDefault: false },
  { id: 6, name: "Spanish", shortForm: "es", code: "es-ES", order: 6, textDirection: "ltr", status: "Active", isDefault: false },
  { id: 7, name: "Turkish", shortForm: "tr", code: "tr-TR", order: 7, textDirection: "ltr", status: "Active", isDefault: false },
];

interface TranslationPhrase {
  key: string;
  value: string;
}

const SAMPLE_TRANSLATIONS: TranslationPhrase[] = [
  { key: "site_title", value: "Modesy Marketplace" },
  { key: "home", value: "Home" },
  { key: "categories", value: "Categories" },
  { key: "cart", value: "Shopping Cart" },
  { key: "wishlist", value: "Wishlist" },
  { key: "login", value: "Sign In" },
  { key: "register", value: "Register" },
  { key: "search_products", value: "Search products, brands and categories..." },
  { key: "all_categories", value: "All Categories" },
  { key: "order_summary", value: "Order Summary" },
  { key: "checkout", value: "Proceed to Checkout" },
  { key: "subtotal", value: "Subtotal" },
  { key: "shipping", value: "Shipping" },
  { key: "total", value: "Total" },
  { key: "apply_coupon", value: "Apply Coupon" },
];

export default function LanguageSettingsPage() {
  const [languages, setLanguages] = useState<LanguageItem[]>(INITIAL_LANGUAGES);
  const [defaultLangId, setDefaultLangId] = useState<number>(1);
  
  // Add Language state
  const [name, setName] = useState("");
  const [shortForm, setShortForm] = useState("");
  const [code, setCode] = useState("");
  const [order, setOrder] = useState("1");
  const [textDirection, setTextDirection] = useState<"ltr" | "rtl">("ltr");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const [showCount, setShowCount] = useState(15);
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Translation Modal State
  const [translatingLang, setTranslatingLang] = useState<LanguageItem | null>(null);
  const [translationPhrases, setTranslationPhrases] = useState<TranslationPhrase[]>(SAMPLE_TRANSLATIONS);
  const [phraseSearch, setPhraseSearch] = useState("");

  // Edit Language Modal
  const [editingLang, setEditingLang] = useState<LanguageItem | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newLang: LanguageItem = {
      id: Date.now(),
      name: name.trim(),
      shortForm: shortForm.trim().toLowerCase() || name.slice(0, 2).toLowerCase(),
      code: code.trim() || `${name.slice(0, 2).toLowerCase()}-${name.slice(0, 2).toUpperCase()}`,
      order: Number(order) || languages.length + 1,
      textDirection,
      status,
      isDefault: false,
    };

    setLanguages([...languages, newLang]);
    setName("");
    setShortForm("");
    setCode("");
    setNotification("Language added successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveDefault = (e: React.FormEvent) => {
    e.preventDefault();
    setLanguages(languages.map((l) => ({ ...l, isDefault: l.id === defaultLangId })));
    setNotification("Default language updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSetDefault = (id: number) => {
    setDefaultLangId(id);
    setLanguages(languages.map((l) => ({ ...l, isDefault: l.id === id })));
    setActiveMenuId(null);
    setNotification("Default language updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this language?")) {
      setLanguages(languages.filter((l) => l.id !== id));
      setActiveMenuId(null);
      setNotification("Language deleted!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLang) return;
    setLanguages(languages.map((l) => (l.id === editingLang.id ? editingLang : l)));
    setEditingLang(null);
    setNotification("Language updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveTranslations = (e: React.FormEvent) => {
    e.preventDefault();
    setTranslatingLang(null);
    setNotification("Translations saved successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.shortForm.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPhrases = translationPhrases.filter(
    (p) =>
      p.key.toLowerCase().includes(phraseSearch.toLowerCase()) ||
      p.value.toLowerCase().includes(phraseSearch.toLowerCase())
  );

  return (
    <div className="text-[13px] text-gray-700">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-[24px] text-gray-700 font-normal leading-tight">Language Settings</h1>
        </div>
        <div className="text-[12px] text-[#777] flex items-center gap-1.5">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span>Settings</span>
          <span>/</span>
          <span className="text-gray-500">Language Settings</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] rounded-[3px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Default Language Box */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Default Language</h3>
            </div>
            <form onSubmit={handleSaveDefault}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Default Language</label>
                  <select
                    value={defaultLangId}
                    onChange={(e) => setDefaultLangId(Number(e.target.value))}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  >
                    {languages.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Add Language Box */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Add Language</h3>
            </div>
            <form onSubmit={handleAdd}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Language Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="English"
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">e.g. English, Español, Deutsch</p>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Short Form</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={shortForm}
                    onChange={(e) => setShortForm(e.target.value)}
                    placeholder="en"
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white lowercase focus:outline-none focus:border-[#3c8dbc]"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">e.g. en, es, de</p>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Language Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="en-US"
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">e.g. en-US, es-ES, de-DE</p>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Order</label>
                  <input
                    type="number"
                    min={1}
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Text Direction</label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="textDirection"
                        checked={textDirection === "ltr"}
                        onChange={() => setTextDirection("ltr")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Left to Right (LTR)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="textDirection"
                        checked={textDirection === "rtl"}
                        onChange={() => setTextDirection("rtl")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Right to Left (RTL)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Status</label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={status === "Active"}
                        onChange={() => setStatus("Active")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Active</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={status === "Inactive"}
                        onChange={() => setStatus("Inactive")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Add Language
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column (7 Cols): Languages Table */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Languages</h3>
            </div>

            <div className="p-5">
              {/* DataTables Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-[13px]">
                  <span>Show</span>
                  <select
                    value={showCount}
                    onChange={(e) => setShowCount(Number(e.target.value))}
                    className="h-[30px] border border-[#d2d6de] rounded-[3px] px-2 text-[13px] bg-white focus:outline-none focus:border-[#3c8dbc]"
                  >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="flex items-center gap-2 text-[13px]">
                  <span>Search:</span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-[30px] w-48 border border-[#d2d6de] rounded-[3px] px-2 text-[13px] bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto min-h-[320px]">
                <table className="table-auto w-full text-left text-[13px] text-gray-700">
                  <thead>
                    <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                      <th className="px-3 py-2.5 w-[50px]">Id</th>
                      <th className="px-3 py-2.5">Language Name</th>
                      <th className="px-3 py-2.5">Default</th>
                      <th className="px-3 py-2.5">Translation</th>
                      <th className="px-3 py-2.5 text-right w-[110px]">Options</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-[#f9f9f9]">
                        <td className="px-3 py-2.5 text-gray-500">{item.id}</td>
                        <td className="px-3 py-2.5 font-medium text-gray-800">
                          {item.name}
                          {item.status === "Inactive" && (
                            <span className="ml-2 text-[11px] text-gray-400 italic">(Inactive)</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5">
                          {item.isDefault ? (
                            <span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[3px] text-[11px] font-semibold">
                              Default
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5">
                          <button
                            type="button"
                            onClick={() => setTranslatingLang(item)}
                            className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-2.5 py-1 rounded-[3px] text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3 h-3" /> Edit Translations
                          </button>
                        </td>
                        <td className="px-3 py-2.5 text-right relative">
                          <button
                            type="button"
                            onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                            className="bg-[#00c0ef] hover:bg-[#00acd6] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-medium inline-flex items-center gap-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.1)] cursor-pointer"
                          >
                            Select an option
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>

                          {activeMenuId === item.id && (
                            <div className="absolute right-3 top-9 z-50 w-40 bg-white border border-[#d2d6de] rounded-[3px] shadow-lg py-1 text-left text-[12px]">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingLang(item);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 hover:bg-[#f4f4f4] text-gray-700 flex items-center gap-2 cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5 text-[#3c8dbc]" /> Edit
                              </button>
                              {!item.isDefault && (
                                <button
                                  type="button"
                                  onClick={() => handleSetDefault(item.id)}
                                  className="w-full px-3 py-1.5 hover:bg-[#f4f4f4] text-gray-700 flex items-center gap-2 cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5 text-[#00a65a]" /> Set as Default
                                </button>
                              )}
                              {!item.isDefault && (
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
                                  className="w-full px-3 py-1.5 hover:bg-[#f4f4f4] text-red-600 flex items-center gap-2 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination info */}
              <div className="flex flex-col sm:flex-row justify-between items-center text-[12px] text-gray-500 pt-3 border-t border-[#f4f4f4] mt-3">
                <div>Showing 1 to {filtered.length} of {languages.length} entries</div>
                <div className="flex items-center gap-1 mt-2 sm:mt-0">
                  <button className="px-2.5 py-1 border border-[#d2d6de] rounded-[3px] bg-[#fafafa] text-gray-400 cursor-not-allowed">Previous</button>
                  <button className="px-3 py-1 border border-[#3c8dbc] bg-[#3c8dbc] text-white rounded-[3px]">1</button>
                  <button className="px-2.5 py-1 border border-[#d2d6de] rounded-[3px] bg-[#fafafa] text-gray-400 cursor-not-allowed">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Translations Modal */}
      {translatingLang && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center bg-gray-50">
              <h3 className="text-[#333333] text-[16px] font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#3c8dbc]" />
                Translations: {translatingLang.name} ({translatingLang.code})
              </h3>
              <button
                type="button"
                onClick={() => setTranslatingLang(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search phrase key or translation..."
                value={phraseSearch}
                onChange={(e) => setPhraseSearch(e.target.value)}
                className="w-full h-[32px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <form onSubmit={handleSaveTranslations} className="flex-1 overflow-y-auto p-5 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPhrases.map((phrase, idx) => (
                  <div key={phrase.key} className="p-3 bg-gray-50 border border-gray-200 rounded-[3px]">
                    <div className="text-[12px] font-mono text-gray-500 mb-1 font-semibold">{phrase.key}</div>
                    <input
                      type="text"
                      value={phrase.value}
                      onChange={(e) => {
                        const next = [...translationPhrases];
                        const foundIdx = next.findIndex((p) => p.key === phrase.key);
                        if (foundIdx !== -1) {
                          next[foundIdx].value = e.target.value;
                          setTranslationPhrases(next);
                        }
                      }}
                      className="w-full h-[32px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                    />
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-200 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setTranslatingLang(null)}
                  className="px-4 py-[7px] border border-[#d2d6de] rounded-[3px] text-gray-700 hover:bg-gray-50 text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors"
                >
                  Save Translations
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Language Modal */}
      {editingLang && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-xl w-full max-w-md border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
              <h3 className="text-[#333333] text-[16px] font-semibold">Edit Language</h3>
              <button
                type="button"
                onClick={() => setEditingLang(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Language Name</label>
                  <input
                    type="text"
                    required
                    value={editingLang.name}
                    onChange={(e) => setEditingLang({ ...editingLang, name: e.target.value })}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Short Form</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={editingLang.shortForm}
                    onChange={(e) => setEditingLang({ ...editingLang, shortForm: e.target.value.toLowerCase() })}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white lowercase focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Language Code</label>
                  <input
                    type="text"
                    required
                    value={editingLang.code}
                    onChange={(e) => setEditingLang({ ...editingLang, code: e.target.value })}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Order</label>
                  <input
                    type="number"
                    min={1}
                    value={editingLang.order}
                    onChange={(e) => setEditingLang({ ...editingLang, order: Number(e.target.value) })}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLang(null)}
                  className="px-4 py-[7px] border border-[#d2d6de] rounded-[3px] text-gray-700 hover:bg-gray-50 text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
