"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function SocialMediaSettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [socialData, setSocialData] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    tiktok: "",
    whatsapp: "",
    youtube: "",
    discord: "",
    telegram: "",
    pinterest: "",
    linkedin: "",
    twitch: "",
    vk: "",
    website: "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  const fields = [
    { key: "facebook", label: "Facebook URL", placeholder: "Facebook URL" },
    { key: "twitter", label: "X (Twitter) URL", placeholder: "X (Twitter) URL" },
    { key: "instagram", label: "Instagram URL", placeholder: "Instagram URL" },
    { key: "tiktok", label: "TikTok URL", placeholder: "TikTok URL" },
    { key: "whatsapp", label: "WhatsApp URL", placeholder: "WhatsApp URL" },
    { key: "youtube", label: "Youtube URL", placeholder: "Youtube URL" },
    { key: "discord", label: "Discord Url", placeholder: "Discord Url" },
    { key: "telegram", label: "Telegram URL", placeholder: "Telegram URL" },
    { key: "pinterest", label: "Pinterest URL", placeholder: "Pinterest URL" },
    { key: "linkedin", label: "Linkedin URL", placeholder: "Linkedin URL" },
    { key: "twitch", label: "Twitch Url", placeholder: "Twitch Url" },
    { key: "vk", label: "VK URL", placeholder: "VK URL" },
    { key: "website", label: "Personal Website URL", placeholder: "Personal Website URL" },
  ];

  return (
    <div>
      {/* Success Alert Banner */}
      {saveSuccess && (
        <div className="mb-5 p-4 bg-[#e8f8f5] border border-[#a3e4d7] text-[#0e6251] rounded-[3px] text-[13.5px] flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#00ab97] stroke-[3]" />
            <span>Your social media links have been successfully saved!</span>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-[#0e6251] hover:text-black text-[12px] font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Social Media Fields Form matching Screenshot 4 & 5 */}
      <form onSubmit={handleSave} className="space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
              {f.label}
            </label>
            <input
              type="text"
              placeholder={f.placeholder}
              value={socialData[f.key as keyof typeof socialData]}
              onChange={(e) =>
                setSocialData({
                  ...socialData,
                  [f.key]: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
            />
          </div>
        ))}

        {/* Save Changes Button */}
        <div className="pt-2">
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
