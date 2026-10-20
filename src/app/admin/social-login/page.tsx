"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function SocialLoginPage() {
  const [googleEnabled, setGoogleEnabled] = useState(true);
  const [googleClientId, setGoogleClientId] = useState("1029384756-sample.apps.googleusercontent.com");
  const [googleClientSecret, setGoogleClientSecret] = useState("GOCSPX-sampleSecret123");

  const [facebookEnabled, setFacebookEnabled] = useState(false);
  const [facebookAppId, setFacebookAppId] = useState("");
  const [facebookAppSecret, setFacebookAppSecret] = useState("");

  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Social login settings updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Social Login <small className="text-[14px] text-gray-500 font-light">Settings</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Settings</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Social Login</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
        {/* Google Login Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
          <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
            <h3 className="text-[#333333] text-[16px] font-semibold">Google Login</h3>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={googleEnabled}
                onChange={(e) => setGoogleEnabled(e.target.checked)}
                className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
              />
              <span className="ml-2 text-[13px] font-medium text-gray-700">Enable</span>
            </label>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Client ID
              </label>
              <input
                type="text"
                value={googleClientId}
                onChange={(e) => setGoogleClientId(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Client Secret
              </label>
              <input
                type="password"
                value={googleClientSecret}
                onChange={(e) => setGoogleClientSecret(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
          </div>
        </div>

        {/* Facebook Login Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
          <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
            <h3 className="text-[#333333] text-[16px] font-semibold">Facebook Login</h3>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={facebookEnabled}
                onChange={(e) => setFacebookEnabled(e.target.checked)}
                className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
              />
              <span className="ml-2 text-[13px] font-medium text-gray-700">Enable</span>
            </label>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                App ID
              </label>
              <input
                type="text"
                value={facebookAppId}
                onChange={(e) => setFacebookAppId(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                App Secret
              </label>
              <input
                type="password"
                value={facebookAppSecret}
                onChange={(e) => setFacebookAppSecret(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[12px] font-mono text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-5 py-2 rounded-[3px] text-[13px] font-medium shadow-2xs transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
