// Komponen Halaman Profil Pengguna / Member Modesy.
// Menampilkan banner profil, avatar, nama, jumlah pengikut (followers), yang diikuti (following),
// serta tab ulasan/review produk yang pernah ditulis oleh pengguna dengan fitur hapus review.

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

// Struktur data ulasan/komentar produk dari pengguna
interface MemberReview {
  id: string;          // ID unik ulasan
  productTitle: string;// Nama produk yang diulas
  productHref: string; // Tautan ke halaman produk
  userName: string;    // Nama pengguna yang mengulas
  userAvatar: string;  // Foto profil
  rating: number;      // Bintang penilaian (1 sampai 5)
  comment: string;     // Isi tulisan ulasan/komentar
  date: string;        // Waktu ulasan diberikan
}

export default function MemberProfile() {
  const { userProfile } = useAppContext();
  // Tab aktif yang sedang dilihat (Followers, Following, atau Reviews)
  const [activeTab, setActiveTab] = useState<"followers" | "following" | "reviews">("followers");

  const name = userProfile?.name || "Peter Jone";
  const avatar = userProfile?.avatar || "/images/peter-jone-avatar.jpg";

  const [reviews, setReviews] = useState<MemberReview[]>([
    {
      id: "rev-1",
      productTitle: "Animal colorful digital prints",
      productHref: "/guest/category/clothing",
      userName: name,
      userAvatar: avatar,
      rating: 5,
      comment: "Test 1",
      date: "1 month ago",
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showDeleteModal) {
        setShowDeleteModal(false);
        setSelectedReviewId(null);
      }
    };
    if (showDeleteModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDeleteModal]);

  const openDeleteModal = (id: string) => {
    setSelectedReviewId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedReviewId) {
      setReviews((prev) => prev.filter((r) => r.id !== selectedReviewId));
    }
    setShowDeleteModal(false);
    setSelectedReviewId(null);
  };

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case "followers":
      default:
        return "Followers";
      case "following":
        return "Following";
      case "reviews":
        return "My Reviews";
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-6">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Modesy Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-6 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 capitalize">
            {getBreadcrumbTitle()}
          </span>
        </nav>

        {/* Profile Card Container */}
        <div className="bg-white border border-[#ebebeb] rounded-sm p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {/* Profile Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-[125px] h-[125px] sm:w-[135px] sm:h-[135px] rounded-[4px] overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80";
                }}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-[24px] sm:text-[26px] font-bold text-[#222] tracking-tight leading-tight">
                {name}
              </h1>
              <div className="flex items-center gap-2 mt-1.5 text-[13px] text-gray-500 font-normal">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#3ecf8e]"></span>
                <span>Last seen: Just Now</span>
              </div>
              <div className="text-[13px] text-gray-500 font-normal mt-3">
                Member since August 2026
              </div>
            </div>
          </div>

          {/* Profile Tabs Navigation */}
          <div className="border-b border-[#ebebeb] mt-8 flex items-center gap-8 text-[14px]">
            <button
              type="button"
              onClick={() => setActiveTab("followers")}
              className={`pb-3 transition-colors cursor-pointer relative ${
                activeTab === "followers"
                  ? "text-[#222] font-semibold border-b-2 border-[#222] -mb-[1px]"
                  : "text-gray-500 hover:text-gray-800 font-normal"
              }`}
            >
              Followers (0)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("following")}
              className={`pb-3 transition-colors cursor-pointer relative ${
                activeTab === "following"
                  ? "text-[#222] font-semibold border-b-2 border-[#222] -mb-[1px]"
                  : "text-gray-500 hover:text-gray-800 font-normal"
              }`}
            >
              Following (0)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 transition-colors cursor-pointer relative ${
                activeTab === "reviews"
                  ? "text-[#222] font-semibold border-b-2 border-[#222] -mb-[1px]"
                  : "text-gray-500 hover:text-gray-800 font-normal"
              }`}
            >
              My Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-6 pb-2">
            {activeTab === "followers" && (
              <div className="py-20 text-center text-gray-400 text-[14px] font-normal">
                No records found!
              </div>
            )}

            {activeTab === "following" && (
              <div className="py-20 text-center text-gray-400 text-[14px] font-normal">
                No records found!
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-[14px] sm:text-[15px] font-semibold text-[#222] mb-5">
                  My Reviews ({reviews.length})
                </h2>

                {reviews.length === 0 ? (
                  <div className="py-20 text-center text-gray-400 text-[14px] font-normal">
                    No records found!
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={rev.userAvatar}
                              alt={rev.userName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-[13px] text-gray-800 mb-1">
                              <span className="font-semibold text-gray-900">Product: </span>
                              <Link
                                href={rev.productHref}
                                className="text-gray-800 hover:text-[#00a99d] transition-colors"
                              >
                                {rev.productTitle}
                              </Link>
                            </div>
                            <div className="flex items-center gap-0.5 my-1">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3.5 h-3.5 fill-[#fbb400] text-[#fbb400]"
                                />
                              ))}
                            </div>
                            <p className="text-[13px] font-semibold text-gray-800 mt-1">
                              {rev.userName}
                            </p>
                            <p className="text-[13px] text-gray-600 mt-0.5 font-normal">
                              {rev.comment}
                            </p>
                            <p className="text-[12px] text-gray-400 mt-1">
                              {rev.date}
                            </p>
                          </div>
                        </div>

                        <div className="sm:self-start pt-1">
                          <button
                            type="button"
                            onClick={() => openDeleteModal(rev.id)}
                            className="text-[13px] text-gray-500 hover:text-red-500 underline cursor-pointer bg-transparent border-0 p-0"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SweetAlert style Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[1px] animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
              setSelectedReviewId(null);
            }
          }}
        >
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[460px] p-8 sm:p-10 text-center flex flex-col items-center animate-in zoom-in-95 duration-150">
            <div className="w-[82px] h-[82px] rounded-full border-[3px] border-[#f8bb86] flex items-center justify-center mb-6 select-none">
              <svg
                width="32"
                height="48"
                viewBox="0 0 32 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="16"
                  y1="8"
                  x2="16"
                  y2="28"
                  stroke="#f8bb86"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="38" r="2.2" fill="#f8bb86" />
              </svg>
            </div>
            <p className="text-[16px] sm:text-[17px] text-[#545454] font-normal leading-normal mb-7">
              Are you sure you want to delete this review?
            </p>
            <div className="flex items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-8 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0 outline-none focus:ring-2 focus:ring-[#00a99d]/30"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
