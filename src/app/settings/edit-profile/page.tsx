"use client";

import { useState, useRef } from "react";
import { Camera, Trash2, Check } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export default function EditProfilePage() {
  const { userProfile } = useAppContext();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(
    userProfile?.avatar ||
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=300&q=80"
  );
  const [coverUrl, setCoverUrl] = useState(
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80"
  );
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    email: userProfile?.email || "trendshop@codingest.net",
    slug: "daniel-jones",
    firstName: "Daniel",
    lastName: "Jones",
    phone: "+ 49 123 45 67 89",
    taxNumber: "",
    coverType: "full-width" as "full-width" | "boxed",
    emailOnMessage: false,
    showEmail: true,
    showPhone: true,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverUrl(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  return (
    <div>
      {/* Success Alert Banner */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-[#e8f8f5] border border-[#a3e4d7] text-[#0e6251] rounded-[3px] text-[13.5px] flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#00ab97] stroke-[3]" />
            <span>Your profile has been successfully updated!</span>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-[#0e6251] hover:text-black text-[12px] font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Cover & Avatar Banner Card */}
      <div className="relative mb-3">
        {/* Hidden inputs for file upload */}
        <input
          type="file"
          ref={avatarInputRef}
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        <input
          type="file"
          ref={coverInputRef}
          accept="image/*"
          onChange={handleCoverChange}
          className="hidden"
        />

        {/* Cover Photo */}
        <div
          className={`relative w-full h-[220px] md:h-[240px] rounded-[3px] overflow-hidden bg-gray-100 ${
            formData.coverType === "boxed" ? "max-w-[700px]" : ""
          }`}
        >
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />

          {/* Action buttons on top right of cover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="w-8 h-8 rounded-full bg-[#00ab97] hover:bg-[#009684] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              title="Change Cover Image"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCoverUrl(
                  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80"
                )
              }
              className="w-8 h-8 rounded-full bg-[#00ab97] hover:bg-[#009684] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              title="Delete Cover Image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Circular Avatar overlapping the cover */}
        <div className="relative -mt-16 md:-mt-20 ml-6 md:ml-8 inline-block z-20">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-sm overflow-hidden bg-white">
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Camera icon button on avatar */}
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#00ab97] hover:bg-[#009684] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title="Upload Avatar"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Image notice */}
        <p className="text-[11.5px] text-gray-500 mt-2 ml-6 md:ml-8">
          *Click on the save changes button after selecting your image
        </p>
      </div>

      {/* Form Fields matching Screenshot 1 & 2 */}
      <form onSubmit={handleSave} className="space-y-4 pt-3">
        {/* Email Address */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            Phone Number
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
          />
        </div>

        {/* Tax Registration Number */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            Tax Registration Number
          </label>
          <input
            type="text"
            placeholder="Tax Registration Number"
            value={formData.taxNumber}
            onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Cover Image Type */}
        <div className="pt-2">
          <label className="block text-[13px] font-semibold text-[#222] mb-2.5">
            Cover Image Type
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#333]">
              <input
                type="radio"
                name="coverType"
                value="full-width"
                checked={formData.coverType === "full-width"}
                onChange={() => setFormData({ ...formData, coverType: "full-width" })}
                className="accent-[#00ab97] w-4 h-4 cursor-pointer"
              />
              <span>Full Width</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#333]">
              <input
                type="radio"
                name="coverType"
                value="boxed"
                checked={formData.coverType === "boxed"}
                onChange={() => setFormData({ ...formData, coverType: "boxed" })}
                className="accent-[#00ab97] w-4 h-4 cursor-pointer"
              />
              <span>Boxed</span>
            </label>
          </div>
        </div>

        {/* Checkbox Preferences */}
        <div className="pt-2 space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#333]">
            <input
              type="checkbox"
              checked={formData.emailOnMessage}
              onChange={(e) =>
                setFormData({ ...formData, emailOnMessage: e.target.checked })
              }
              className="w-4 h-4 rounded-[2px] accent-[#00ab97] cursor-pointer"
            />
            <span>Send me an email when someone send me a message</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#333]">
            <input
              type="checkbox"
              checked={formData.showEmail}
              onChange={(e) =>
                setFormData({ ...formData, showEmail: e.target.checked })
              }
              className="w-4 h-4 rounded-[2px] accent-[#00ab97] cursor-pointer"
            />
            <span>Show my email address</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#333]">
            <input
              type="checkbox"
              checked={formData.showPhone}
              onChange={(e) =>
                setFormData({ ...formData, showPhone: e.target.checked })
              }
              className="w-4 h-4 rounded-[2px] accent-[#00ab97] cursor-pointer"
            />
            <span>Show my phone number</span>
          </label>
        </div>

        {/* Save Changes Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] text-[13.5px] font-medium transition-colors shadow-2xs cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
