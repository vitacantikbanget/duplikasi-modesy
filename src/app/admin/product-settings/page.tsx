"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function ProductSettingsPage() {
  const [physicalProducts, setPhysicalProducts] = useState(true);
  const [digitalProducts, setDigitalProducts] = useState(true);
  const [marketplaceSystem, setMarketplaceSystem] = useState(true);
  const [classifiedAds, setClassifiedAds] = useState(true);
  const [biddingSystem, setBiddingSystem] = useState(true);
  const [maxImages, setMaxImages] = useState("10");
  const [maxFileSizeMB, setMaxFileSizeMB] = useState("20");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Product settings updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Product Settings <small className="text-[14px] text-gray-500 font-light">Settings</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Settings</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Product Settings</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Main Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 max-w-4xl">
        <div className="px-5 py-3 border-b border-[#f4f4f4]">
          <h3 className="text-[#333333] text-[16px] font-semibold">Product Settings</h3>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-5">
          {/* Marketplace System */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Marketplace Selling System
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="marketplaceSystem"
                  checked={marketplaceSystem}
                  onChange={() => setMarketplaceSystem(true)}
                  className="mr-2 text-[#3c8dbc]"
                />
                Enable
              </label>
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="marketplaceSystem"
                  checked={!marketplaceSystem}
                  onChange={() => setMarketplaceSystem(false)}
                  className="mr-2 text-[#3c8dbc]"
                />
                Disable
              </label>
            </div>
          </div>

          {/* Classified Ads */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Classified Ads (Direct Contact Between Buyers & Sellers)
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="classifiedAds"
                  checked={classifiedAds}
                  onChange={() => setClassifiedAds(true)}
                  className="mr-2 text-[#3c8dbc]"
                />
                Enable
              </label>
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="classifiedAds"
                  checked={!classifiedAds}
                  onChange={() => setClassifiedAds(false)}
                  className="mr-2 text-[#3c8dbc]"
                />
                Disable
              </label>
            </div>
          </div>

          {/* Bidding System */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Bidding System (Request Quote)
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="biddingSystem"
                  checked={biddingSystem}
                  onChange={() => setBiddingSystem(true)}
                  className="mr-2 text-[#3c8dbc]"
                />
                Enable
              </label>
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="biddingSystem"
                  checked={!biddingSystem}
                  onChange={() => setBiddingSystem(false)}
                  className="mr-2 text-[#3c8dbc]"
                />
                Disable
              </label>
            </div>
          </div>

          {/* Physical & Digital Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#f4f4f4]">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                Physical Products
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="physicalProducts"
                    checked={physicalProducts}
                    onChange={() => setPhysicalProducts(true)}
                    className="mr-2 text-[#3c8dbc]"
                  />
                  Enable
                </label>
                <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="physicalProducts"
                    checked={!physicalProducts}
                    onChange={() => setPhysicalProducts(false)}
                    className="mr-2 text-[#3c8dbc]"
                  />
                  Disable
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                Digital Products
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="digitalProducts"
                    checked={digitalProducts}
                    onChange={() => setDigitalProducts(true)}
                    className="mr-2 text-[#3c8dbc]"
                  />
                  Enable
                </label>
                <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="digitalProducts"
                    checked={!digitalProducts}
                    onChange={() => setDigitalProducts(false)}
                    className="mr-2 text-[#3c8dbc]"
                  />
                  Disable
                </label>
              </div>
            </div>
          </div>

          {/* Upload Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#f4f4f4]">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Max Images per Product
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={maxImages}
                onChange={(e) => setMaxImages(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Max Digital File Size (MB)
              </label>
              <input
                type="number"
                min={1}
                value={maxFileSizeMB}
                onChange={(e) => setMaxFileSizeMB(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
          </div>

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
