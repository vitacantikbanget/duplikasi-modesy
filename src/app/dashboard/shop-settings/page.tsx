"use client";

import { useState, useMemo } from "react";
import {
  Check,
  Maximize2,
  Code,
  Eye,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  MoreHorizontal,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react";

const initialVatLocations = [
  { id: "1", name: "Afghanistan", rate: "0" },
  { id: "2", name: "Afghanistan/Badakhshan", rate: "0" },
  { id: "3", name: "Afghanistan/Badghis", rate: "0" },
  { id: "4", name: "Afghanistan/Baghlan", rate: "0" },
  { id: "5", name: "Afghanistan/Balkh", rate: "0" },
  { id: "6", name: "Afghanistan/Bamyan", rate: "0" },
  { id: "7", name: "Afghanistan/Daykundi", rate: "0" },
  { id: "8", name: "Afghanistan/Farah", rate: "0" },
  { id: "9", name: "Afghanistan/Faryab", rate: "0" },
  { id: "10", name: "Afghanistan/Ghazni", rate: "0" },
  { id: "11", name: "Afghanistan/Ghor", rate: "0" },
  { id: "12", name: "Afghanistan/Helmand", rate: "0" },
  { id: "13", name: "Afghanistan/Herat", rate: "0" },
  { id: "14", name: "Albania", rate: "0" },
  { id: "15", name: "Algeria", rate: "0" },
  { id: "16", name: "Andorra", rate: "0" },
];

const defaultVacationMessage = `Dear Customers,

This vendor is currently on vacation and is not available to process orders or respond to messages. They will return on [return date]. We apologize for any inconvenience this may cause and appreciate your understanding.

Thank you for your patience and continued support.

Best regards,`;

export default function ShopSettingsPage() {
  // Left Column: Shop Settings Form State
  const [shopName, setShopName] = useState("Admin");
  const [shopDescription, setShopDescription] = useState(
    "We offer a wide variety of products ranging from everyday essentials to specialty items, all carefully selected to meet your needs and exceed your expectations."
  );
  const [showWhatsApp, setShowWhatsApp] = useState<"yes" | "no">("yes");
  const [whatsAppNumber, setWhatsAppNumber] = useState("123");
  const [rssFeeds, setRssFeeds] = useState<"enable" | "disable">("enable");

  // Left Column: VAT Form State
  const [fixedVatRate, setFixedVatRate] = useState(false);
  const [vatSearch, setVatSearch] = useState("");
  const [vatLocations, setVatLocations] = useState(initialVatLocations);

  // Right Column: Vacation Mode State
  const [vacationStatus, setVacationStatus] = useState<"enable" | "disable">("disable");
  const [vacationMessage, setVacationMessage] = useState(defaultVacationMessage);

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveShopSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Shop settings have been saved successfully!");
  };

  const handleSaveVat = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("VAT settings have been updated successfully!");
  };

  const handleSaveVacation = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Vacation mode settings updated successfully!");
  };

  const handleRateChange = (id: string, newRate: string) => {
    setVatLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, rate: newRate } : loc))
    );
  };

  const filteredVatLocations = useMemo(() => {
    if (!vatSearch.trim()) return vatLocations;
    return vatLocations.filter((loc) =>
      loc.name.toLowerCase().includes(vatSearch.toLowerCase())
    );
  }, [vatLocations, vatSearch]);

  return (
    <div className="w-full relative">
      {/* Success Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00ab97] text-white px-5 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-[13.5px] animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CARD 1: Shop Settings */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-7 shadow-xs">
            <h2 className="text-[18px] font-bold text-[#2c333e] mb-6 font-sans">
              Shop Settings
            </h2>

            <form onSubmit={handleSaveShopSettings} className="space-y-5">
              {/* Shop Name */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Shop Description */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  Shop Description
                </label>
                <textarea
                  rows={4}
                  value={shopDescription}
                  onChange={(e) => setShopDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden transition-colors resize-y leading-relaxed"
                />
              </div>

              {/* Show WhatsApp Button */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  Show WhatsApp Button
                </label>
                <div className="flex items-center gap-12 mt-1">
                  <label
                    onClick={() => setShowWhatsApp("yes")}
                    className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                        showWhatsApp === "yes"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {showWhatsApp === "yes" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>Yes</span>
                  </label>

                  <label
                    onClick={() => setShowWhatsApp("no")}
                    className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                        showWhatsApp === "no"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {showWhatsApp === "no" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden transition-colors"
                />
              </div>

              {/* RSS Feeds */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  RSS Feeds
                </label>
                <div className="flex items-center gap-12 mt-1">
                  <label
                    onClick={() => setRssFeeds("enable")}
                    className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                        rssFeeds === "enable"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {rssFeeds === "enable" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>Enable</span>
                  </label>

                  <label
                    onClick={() => setRssFeeds("disable")}
                    className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                        rssFeeds === "disable"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {rssFeeds === "disable" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>Disable</span>
                  </label>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium px-5 py-2 rounded-[3px] transition-colors shadow-2xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* CARD 2: VAT (Value-Added Tax) */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-7 shadow-xs">
            <h2 className="text-[18px] font-bold text-[#2c333e] font-sans">
              VAT (Value-Added Tax)
            </h2>
            <p className="text-[12px] text-[#8c98a4] mb-6 mt-0.5">
              Define VAT values for your products based on countries
            </p>

            <form onSubmit={handleSaveVat} className="space-y-4">
              {/* Checkbox: Set Fixed VAT Rate for All Countries */}
              <div>
                <label
                  onClick={() => setFixedVatRate(!fixedVatRate)}
                  className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e] font-normal"
                >
                  <div
                    className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition-colors ${
                      fixedVatRate
                        ? "bg-[#00ab97] text-white"
                        : "border border-[#c2c7ce] bg-white"
                    }`}
                  >
                    {fixedVatRate && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>Set Fixed VAT Rate for All Countries</span>
                </label>
              </div>

              {/* Search input */}
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  value={vatSearch}
                  onChange={(e) => setVatSearch(e.target.value)}
                  className="w-full max-w-[280px] h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              {/* Table of VAT locations */}
              <div className="border border-[#e9ecef] rounded-[3px] overflow-hidden">
                <div className="max-h-[360px] overflow-y-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#fbfcfd] sticky top-0 z-10 border-b border-[#dee2e6]">
                      <tr className="text-[#2c333e] font-semibold text-[13px]">
                        <th className="py-2.5 px-4 font-semibold">Location</th>
                        <th className="py-2.5 px-4 font-semibold w-[120px] text-right">
                          <span className="inline-flex items-center gap-1">
                            Tax Rate(%)
                            <ArrowUpDown className="w-3 h-3 text-gray-400" />
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f3f5]">
                      {filteredVatLocations.map((item) => (
                        <tr key={item.id} className="hover:bg-[#fafbfc]">
                          <td className="py-2.5 px-4 text-[#2c333e]">
                            {item.name}
                          </td>
                          <td className="py-2 px-4 text-right">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.rate}
                              onChange={(e) => handleRateChange(item.id, e.target.value)}
                              className="w-[70px] h-[30px] border border-[#d2d6de] rounded-[3px] px-2.5 text-center text-[13px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium px-5 py-2 rounded-[3px] transition-colors shadow-2xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Warning Alert Box below VAT card */}
          <div className="p-4 rounded-[4px] bg-[#d1ecf1] border border-[#bee5eb] text-[13px] leading-relaxed text-[#0c5460]">
            <strong className="font-bold">Warning! </strong>
            The VAT rate you set for a country will apply to all states within that country.
            However, if you want a state to have its own unique tax rate, you can specify a
            different VAT rate for that state.
          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-5 space-y-6">

          {/* CARD 1: Membership Plan */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-7 shadow-xs">
            <h2 className="text-[18px] font-bold text-[#2c333e] mb-5 font-sans">
              Membership Plan
            </h2>

            {/* Cyan alert message */}
            <div className="p-4 rounded-[4px] bg-[#d1ecf1] border border-[#bee5eb] text-[13px] leading-relaxed text-[#0c5460]">
              Admin role does not require a membership plan.
            </div>
          </div>

          {/* CARD 2: Vacation Mode */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-7 shadow-xs">
            <h2 className="text-[18px] font-bold text-[#2c333e] font-sans">
              Vacation Mode
            </h2>
            <p className="text-[12px] text-[#8c98a4] mb-6 mt-0.5">
              Vacation mode allows you to pause your store for a certain period of time
            </p>

            <form onSubmit={handleSaveVacation} className="space-y-5">
              {/* Status Radio */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  Status
                </label>
                <div className="flex items-center gap-12 mt-1">
                  <label
                    onClick={() => setVacationStatus("enable")}
                    className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                        vacationStatus === "enable"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {vacationStatus === "enable" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>Enable</span>
                  </label>

                  <label
                    onClick={() => setVacationStatus("disable")}
                    className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                        vacationStatus === "disable"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {vacationStatus === "disable" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>Disable</span>
                  </label>
                </div>
              </div>

              {/* Vacation Message (TinyMCE editor style) */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  Vacation Message
                </label>
                
                <div className="border border-[#d2d6de] rounded-[4px] overflow-hidden bg-white">
                  {/* Editor Toolbar */}
                  <div className="border-b border-[#e9ecef] bg-[#fbfcfd] p-2 flex flex-wrap items-center gap-2 text-gray-600">
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Fullscreen">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Source code">
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Preview">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-[1px] h-4 bg-gray-300 mx-0.5" />
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Undo">
                      <Undo2 className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Redo">
                      <Redo2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-[1px] h-4 bg-gray-300 mx-0.5" />
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Bold">
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Italic">
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Underline">
                      <Underline className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Strikethrough">
                      <Strikethrough className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="More">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Editor Content Area */}
                  <textarea
                    rows={9}
                    value={vacationMessage}
                    onChange={(e) => setVacationMessage(e.target.value)}
                    className="w-full p-3.5 text-[13px] text-[#2c333e] focus:outline-hidden resize-none font-sans leading-relaxed"
                  />

                  {/* TinyMCE-style Status Footer */}
                  <div className="border-t border-[#f1f3f5] bg-[#fafbfc] px-3 py-1 flex items-center justify-between text-[11px] text-gray-400 select-none">
                    <span>p</span>
                    <span className="font-semibold text-gray-500 flex items-center gap-1">
                      ⚡ tiny
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium px-5 py-2 rounded-[3px] transition-colors shadow-2xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
