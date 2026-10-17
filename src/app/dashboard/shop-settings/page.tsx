"use client";

import { useState } from "react";
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
  CheckCircle2,
} from "lucide-react";

export default function ShopSettingsPage() {
  // Left Column: Shop Settings Form State
  const [shopName, setShopName] = useState("Trendshop");
  const [shopDescription, setShopDescription] = useState(
    "Welcome to our store! We offer a wide range of high-quality products to meet all your needs, from the latest electronics and gadgets to stylish clothing and accessories."
  );
  const [showWhatsApp, setShowWhatsApp] = useState<"yes" | "no">("yes");
  const [whatsAppNumber, setWhatsAppNumber] = useState("123");
  const [rssFeeds, setRssFeeds] = useState<"enable" | "disable">("enable");

  // Left Column: VAT Form State
  const [fixedVatRate, setFixedVatRate] = useState(true);
  const [taxRate, setTaxRate] = useState("10");

  // Right Column: Vacation Mode State
  const [vacationStatus, setVacationStatus] = useState<"enable" | "disable">("disable");
  const [vacationMessage, setVacationMessage] = useState("");

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">
          
          {/* CARD 1: Shop Settings */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
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
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]">
                    <div
                      onClick={() => setShowWhatsApp("yes")}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        showWhatsApp === "yes"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {showWhatsApp === "yes" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>Yes</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]">
                    <div
                      onClick={() => setShowWhatsApp("no")}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        showWhatsApp === "no"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {showWhatsApp === "no" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
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
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]">
                    <div
                      onClick={() => setRssFeeds("enable")}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        rssFeeds === "enable"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {rssFeeds === "enable" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>Enable</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]">
                    <div
                      onClick={() => setRssFeeds("disable")}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        rssFeeds === "disable"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {rssFeeds === "disable" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
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
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h2 className="text-[18px] font-bold text-[#2c333e] font-sans">
              VAT (Value-Added Tax)
            </h2>
            <p className="text-[12px] text-[#8c98a4] mb-6 mt-0.5">
              Define VAT values for your products based on countries
            </p>

            <form onSubmit={handleSaveVat} className="space-y-5">
              {/* Checkbox: Set Fixed VAT Rate for All Countries */}
              <div>
                <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e] font-medium">
                  <div
                    onClick={() => setFixedVatRate(!fixedVatRate)}
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

              {/* Tax Rate(%) */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  Tax Rate(%)
                </label>
                <input
                  type="text"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full max-w-[130px] px-3.5 py-2 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Save Changes Button */}
              <div className="pt-1 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium px-5 py-2 rounded-[3px] transition-colors shadow-2xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

              {/* Warning Alert Box */}
              <div className="mt-4 p-4 rounded-[4px] bg-[#d7f3f0] border border-[#b2ebe5] text-[13px] leading-relaxed text-[#006b61]">
                <strong className="font-bold text-[#005a52]">Warning! </strong>
                The VAT rate you set for a country will apply to all states within that country.
                However, if you want a state to have its own unique tax rate, you can specify a
                different VAT rate for that state.
              </div>
            </form>
          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">

          {/* CARD 1: Membership Plan */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h2 className="text-[18px] font-bold text-[#2c333e] mb-6 font-sans">
              Membership Plan
            </h2>

            <div className="space-y-5">
              {/* Current Plan */}
              <div>
                <div className="text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
                  Current Plan
                </div>
                <div>
                  <span className="inline-block bg-[#00ab97] text-white text-[12.5px] font-medium px-3.5 py-1 rounded-[3px] shadow-2xs leading-snug">
                    Professional (Number of Ads: Unlimited, Number of Days: Unlimited)
                  </span>
                </div>
              </div>

              {/* Plan Expiration Date */}
              <div>
                <div className="text-[13px] font-semibold text-[#2c333e] mb-1 font-sans">
                  Plan Expiration Date
                </div>
                <div className="text-[13px] text-[#00ab97] font-medium">
                  Unlimited
                </div>
              </div>

              {/* Number of Remaining Ads */}
              <div>
                <div className="text-[13px] font-semibold text-[#2c333e] mb-1 font-sans">
                  Number of Remaining Ads
                </div>
                <div className="text-[13px] text-[#00ab97] font-medium">
                  Unlimited
                </div>
              </div>

              {/* Renew Your Plan Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => showNotification("Redirecting to membership plans renewal...")}
                  className="w-full bg-[#5b73e8] hover:bg-[#4d66eb] text-white text-[13.5px] font-medium py-2.5 rounded-[3px] transition-colors shadow-2xs cursor-pointer text-center"
                >
                  Renew Your Plan
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2: Vacation Mode */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
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
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]">
                    <div
                      onClick={() => setVacationStatus("enable")}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        vacationStatus === "enable"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {vacationStatus === "enable" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>Enable</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]">
                    <div
                      onClick={() => setVacationStatus("disable")}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        vacationStatus === "disable"
                          ? "bg-[#00ab97] text-white"
                          : "border border-[#c2c7ce] bg-white"
                      }`}
                    >
                      {vacationStatus === "disable" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span>Disable</span>
                  </label>
                </div>
              </div>

              {/* Vacation Message (Rich Text Editor Mockup) */}
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
                    rows={8}
                    value={vacationMessage}
                    onChange={(e) => setVacationMessage(e.target.value)}
                    placeholder="Write your vacation message for customers..."
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
