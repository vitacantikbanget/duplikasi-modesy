"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Edit, Trash2, CheckCircle, Check, X } from "lucide-react";

interface CurrencyItem {
  id: number;
  name: string;
  code: string;
  symbol: string;
  format: string;
  symbolPosition: "left" | "right";
  space: boolean;
  isDefault: boolean;
}

const INITIAL_CURRENCIES: CurrencyItem[] = [
  { id: 1, name: "US Dollar", code: "USD", symbol: "$", format: "1,234.56", symbolPosition: "left", space: false, isDefault: true },
  { id: 2, name: "Euro", code: "EUR", symbol: "€", format: "1.234,56", symbolPosition: "left", space: true, isDefault: false },
  { id: 3, name: "British Pound", code: "GBP", symbol: "£", format: "1,234.56", symbolPosition: "left", space: false, isDefault: false },
  { id: 4, name: "Indonesian Rupiah", code: "IDR", symbol: "Rp", format: "1.234", symbolPosition: "left", space: true, isDefault: false },
  { id: 5, name: "Australian Dollar", code: "AUD", symbol: "A$", format: "1,234.56", symbolPosition: "left", space: false, isDefault: false },
  { id: 6, name: "Canadian Dollar", code: "CAD", symbol: "C$", format: "1,234.56", symbolPosition: "left", space: false, isDefault: false },
];

export default function CurrencySettingsPage() {
  const [currencies, setCurrencies] = useState<CurrencyItem[]>(INITIAL_CURRENCIES);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [symbol, setSymbol] = useState("");
  const [format, setFormat] = useState("1,234.56");
  const [symbolPosition, setSymbolPosition] = useState<"left" | "right">("left");
  const [space, setSpace] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState("1");
  const [apiKey, setApiKey] = useState("api_conv_live_9482947192847291");
  
  const [showCount, setShowCount] = useState(15);
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingCurrency, setEditingCurrency] = useState<CurrencyItem | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    const newCurr: CurrencyItem = {
      id: Date.now(),
      name: name.trim(),
      code: code.trim().toUpperCase(),
      symbol: symbol.trim() || "$",
      format,
      symbolPosition,
      space,
      isDefault: false,
    };

    setCurrencies([...currencies, newCurr]);
    setName("");
    setCode("");
    setSymbol("");
    setNotification("Currency added successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveConverter = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Currency converter settings saved successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSetDefault = (id: number) => {
    setCurrencies(currencies.map((c) => ({ ...c, isDefault: c.id === id })));
    setActiveMenuId(null);
    setNotification("Default currency updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this currency?")) {
      setCurrencies(currencies.filter((c) => c.id !== id));
      setActiveMenuId(null);
      setNotification("Currency deleted!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCurrency) return;
    setCurrencies(currencies.map((c) => (c.id === editingCurrency.id ? editingCurrency : c)));
    setEditingCurrency(null);
    setNotification("Currency updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = currencies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-[13px] text-gray-700">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-[24px] text-gray-700 font-normal leading-tight">Currency Settings</h1>
        </div>
        <div className="text-[12px] text-[#777] flex items-center gap-1.5">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span>Settings</span>
          <span>/</span>
          <span className="text-gray-500">Currency Settings</span>
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
          {/* Add Currency Box */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Add Currency</h3>
            </div>
            <form onSubmit={handleAdd}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="US Dollar"
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Code</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="USD"
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white uppercase focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    required
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="$"
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Format (Thousands & Decimal)</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="1,234.56">1,234.56 (Comma separator, dot decimal)</option>
                    <option value="1.234,56">1.234,56 (Dot separator, comma decimal)</option>
                    <option value="1234.56">1234.56 (No thousands separator)</option>
                    <option value="1.234">1.234 (Dot thousands separator, no decimal)</option>
                    <option value="1,234">1,234 (Comma thousands separator, no decimal)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Symbol Position</label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="symbolPos"
                        checked={symbolPosition === "left"}
                        onChange={() => setSymbolPosition("left")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Left ($100)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="symbolPos"
                        checked={symbolPosition === "right"}
                        onChange={() => setSymbolPosition("right")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Right (100$)</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Space Between Amount and Symbol</label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="spaceOpt"
                        checked={!space}
                        onChange={() => setSpace(false)}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>No ($100)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="spaceOpt"
                        checked={space}
                        onChange={() => setSpace(true)}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Yes ($ 100)</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Add Currency
                </button>
              </div>
            </form>
          </div>

          {/* Currency Converter Box */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Currency Converter (Exchange Rates)</h3>
            </div>
            <form onSubmit={handleSaveConverter}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Auto Update Exchange Rates</label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="autoUpdate"
                        checked={autoUpdate === "1"}
                        onChange={() => setAutoUpdate("1")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Enable</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="autoUpdate"
                        checked={autoUpdate === "0"}
                        onChange={() => setAutoUpdate("0")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Disable</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Converter API Key</label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">Get your free API key from currencyconverterapi.com or openexchangerates.org</p>
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
        </div>

        {/* Right Column: Currencies Table (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Currencies</h3>
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
              <div className="overflow-x-auto min-h-[300px]">
                <table className="table-auto w-full text-left text-[13px] text-gray-700">
                  <thead>
                    <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                      <th className="px-3 py-2.5 w-[50px]">Id</th>
                      <th className="px-3 py-2.5">Currency</th>
                      <th className="px-3 py-2.5">Code</th>
                      <th className="px-3 py-2.5">Symbol</th>
                      <th className="px-3 py-2.5">Format</th>
                      <th className="px-3 py-2.5">Position</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5 text-right w-[110px]">Options</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f4f4]">
                    {filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-[#f9f9f9]">
                        <td className="px-3 py-2.5 text-gray-500">{item.id}</td>
                        <td className="px-3 py-2.5 font-medium text-gray-800">{item.name}</td>
                        <td className="px-3 py-2.5 font-mono font-bold text-gray-700">{item.code}</td>
                        <td className="px-3 py-2.5 font-semibold text-gray-800">{item.symbol}</td>
                        <td className="px-3 py-2.5 text-gray-600 font-mono text-[12px]">{item.format}</td>
                        <td className="px-3 py-2.5 capitalize text-gray-600">{item.symbolPosition}</td>
                        <td className="px-3 py-2.5">
                          {item.isDefault ? (
                            <span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[3px] text-[11px] font-semibold">
                              Default
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
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
                                  setEditingCurrency(item);
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
                <div>Showing 1 to {filtered.length} of {currencies.length} entries</div>
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

      {/* Edit Currency Modal */}
      {editingCurrency && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-xl w-full max-w-md border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
              <h3 className="text-[#333333] text-[16px] font-semibold">Edit Currency</h3>
              <button
                type="button"
                onClick={() => setEditingCurrency(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Name</label>
                  <input
                    type="text"
                    required
                    value={editingCurrency.name}
                    onChange={(e) => setEditingCurrency({ ...editingCurrency, name: e.target.value })}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Code</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={editingCurrency.code}
                    onChange={(e) => setEditingCurrency({ ...editingCurrency, code: e.target.value.toUpperCase() })}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white uppercase focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    required
                    value={editingCurrency.symbol}
                    onChange={(e) => setEditingCurrency({ ...editingCurrency, symbol: e.target.value })}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Currency Format</label>
                  <select
                    value={editingCurrency.format}
                    onChange={(e) => setEditingCurrency({ ...editingCurrency, format: e.target.value })}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="1,234.56">1,234.56</option>
                    <option value="1.234,56">1.234,56</option>
                    <option value="1234.56">1234.56</option>
                    <option value="1.234">1.234</option>
                    <option value="1,234">1,234</option>
                  </select>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCurrency(null)}
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
