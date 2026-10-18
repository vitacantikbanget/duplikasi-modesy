"use client";

import Link from "next/link";
import { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const initialSellers = [
  {
    id: "seller-1",
    name: "Trendshop",
    slug: "trendshop",
    profileUrl: "/vendor/trendshop",
    avatar: "/images/profiles/avatar-1.webp",
    productsCount: 24,
    isAffiliate: false,
  },
  {
    id: "seller-2",
    name: "Admin",
    slug: "admin",
    profileUrl: "/vendor/admin",
    avatar: "/images/profiles/avatar-2.webp",
    productsCount: 24,
    isAffiliate: false,
  },
];

export default function ShopsPage() {
  const { t } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [affiliateFilter, setAffiliateFilter] = useState("");
  const [following, setFollowing] = useState<{ [key: string]: boolean }>({});

  const filteredSellers = initialSellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAffiliate = affiliateFilter === "1" ? seller.isAffiliate : true;
    return matchesSearch && matchesAffiliate;
  });

  const toggleFollow = (id: string) => {
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#fcfcfc] min-h-[70vh] py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            {t("home")}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{t("shops", "Shops")}</span>
        </nav>

        {/* Page Header & Filter Form */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("shops", "Shops")}</h1>

          <div className="flex items-center gap-3">
            <select
              value={affiliateFilter}
              onChange={(e) => setAffiliateFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-[4px] bg-white focus:outline-none focus:border-brand-primary text-gray-700 min-w-[140px]"
            >
              <option value="">{t("all_sellers", "All Sellers")}</option>
              <option value="1">{t("only_affiliate_sellers", "Only Affiliate Sellers")}</option>
            </select>

            <div className="relative flex-1 md:w-60">
              <input
                type="text"
                placeholder={t("search_placeholder", "Search...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-9 py-2 text-sm border border-gray-300 rounded-[4px] focus:outline-none focus:border-brand-primary"
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white border border-gray-200 rounded-[4px] p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              {/* Left: Avatar */}
              <Link href={seller.profileUrl} className="relative shrink-0 block w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback avatar
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(seller.name)}&background=00a99d&color=fff&size=160`;
                  }}
                />
              </Link>

              {/* Right: Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={seller.profileUrl}
                  className="block font-semibold text-gray-900 text-[15px] hover:text-brand-primary truncate transition-colors"
                >
                  {seller.name}
                </Link>
                <p className="text-xs text-gray-500 mb-3">
                  {t("products_count", "Products")}: {seller.productsCount}
                </p>
                <button
                  type="button"
                  onClick={() => toggleFollow(seller.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[4px] border transition-colors ${
                    following[seller.id]
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "border-gray-300 text-gray-700 hover:border-brand-primary hover:text-brand-primary bg-white"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  {following[seller.id] ? t("following", "Following") : t("follow", "Follow")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-md">
            <p className="text-gray-500">{t("no_results_found", "No Results Found!")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
