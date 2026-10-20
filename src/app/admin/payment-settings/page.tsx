"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function PaymentSettingsPage() {
  const [activeTab, setActiveTab] = useState<"stripe" | "paypal" | "paystack" | "bank" | "cod">("stripe");

  // Stripe
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [stripeKey, setStripeKey] = useState("pk_test_sample12345");
  const [stripeSecret, setStripeSecret] = useState("sk_test_sample12345");

  // PayPal
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [paypalMode, setPaypalMode] = useState<"sandbox" | "live">("sandbox");
  const [paypalClientId, setPaypalClientId] = useState("sample-client-id");
  const [paypalSecret, setPaypalSecret] = useState("sample-secret");

  // PayStack
  const [paystackEnabled, setPaystackEnabled] = useState(true);
  const [paystackPublicKey, setPaystackPublicKey] = useState("pk_test_sample_paystack");
  const [paystackSecretKey, setPaystackSecretKey] = useState("sk_test_sample_paystack");

  // Bank Transfer
  const [bankEnabled, setBankEnabled] = useState(true);
  const [bankAccounts, setBankAccounts] = useState("Bank of America\nAccount Name: Modesy Marketplace LLC\nAccount Number: 1234567890\nRouting Number: 987654321");

  // Cash on Delivery
  const [codEnabled, setCodEnabled] = useState(true);

  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Payment settings updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Payment Settings <small className="text-[14px] text-gray-500 font-light">Settings</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Settings</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Payment Settings</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Main Box with Tabs */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 max-w-4xl">
        {/* Nav Tabs */}
        <div className="flex border-b border-[#f4f4f4] bg-[#f9f9f9] overflow-x-auto">
          {[
            { id: "stripe", label: "Stripe" },
            { id: "paypal", label: "PayPal" },
            { id: "paystack", label: "PayStack" },
            { id: "bank", label: "Bank Transfer" },
            { id: "cod", label: "Cash on Delivery" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-[13px] font-semibold transition-colors border-t-2 shrink-0 ${
                activeTab === tab.id
                  ? "border-[#3c8dbc] bg-white text-[#3c8dbc]"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 max-w-2xl">
          {activeTab === "stripe" && (
            <div className="space-y-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={stripeEnabled}
                  onChange={(e) => setStripeEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
                />
                <span className="ml-2 text-[13px] font-semibold text-gray-800">Enable Stripe</span>
              </label>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Publishable Key
                </label>
                <input
                  type="text"
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Secret Key
                </label>
                <input
                  type="password"
                  value={stripeSecret}
                  onChange={(e) => setStripeSecret(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>
            </div>
          )}

          {activeTab === "paypal" && (
            <div className="space-y-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paypalEnabled}
                  onChange={(e) => setPaypalEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
                />
                <span className="ml-2 text-[13px] font-semibold text-gray-800">Enable PayPal</span>
              </label>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-2">Mode</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                    <input
                      type="radio"
                      name="paypalMode"
                      checked={paypalMode === "sandbox"}
                      onChange={() => setPaypalMode("sandbox")}
                      className="mr-2 text-[#3c8dbc]"
                    />
                    Sandbox
                  </label>
                  <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                    <input
                      type="radio"
                      name="paypalMode"
                      checked={paypalMode === "live"}
                      onChange={() => setPaypalMode("live")}
                      className="mr-2 text-[#3c8dbc]"
                    />
                    Live
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Client ID
                </label>
                <input
                  type="text"
                  value={paypalClientId}
                  onChange={(e) => setPaypalClientId(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Secret Key
                </label>
                <input
                  type="password"
                  value={paypalSecret}
                  onChange={(e) => setPaypalSecret(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>
            </div>
          )}

          {activeTab === "paystack" && (
            <div className="space-y-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paystackEnabled}
                  onChange={(e) => setPaystackEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
                />
                <span className="ml-2 text-[13px] font-semibold text-gray-800">Enable PayStack</span>
              </label>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Public Key
                </label>
                <input
                  type="text"
                  value={paystackPublicKey}
                  onChange={(e) => setPaystackPublicKey(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Secret Key
                </label>
                <input
                  type="password"
                  value={paystackSecretKey}
                  onChange={(e) => setPaystackSecretKey(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>
            </div>
          )}

          {activeTab === "bank" && (
            <div className="space-y-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={bankEnabled}
                  onChange={(e) => setBankEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
                />
                <span className="ml-2 text-[13px] font-semibold text-gray-800">Enable Bank Transfer</span>
              </label>

              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Bank Account Details
                </label>
                <textarea
                  rows={5}
                  value={bankAccounts}
                  onChange={(e) => setBankAccounts(e.target.value)}
                  className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>
            </div>
          )}

          {activeTab === "cod" && (
            <div className="space-y-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={codEnabled}
                  onChange={(e) => setCodEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
                />
                <span className="ml-2 text-[13px] font-semibold text-gray-800">Enable Cash on Delivery (COD)</span>
              </label>
              <p className="text-[13px] text-gray-500">
                Allows customers to pay for physical items in cash upon receiving the courier delivery.
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-[#f4f4f4] flex justify-end">
            <button
              type="submit"
              className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-5 py-2 rounded-[3px] text-[13px] font-medium shadow-2xs transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
