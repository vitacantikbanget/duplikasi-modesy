"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { countries } from "@/contexts/AppContext";

export default function LocationSettingsPage() {
  const [country, setCountry] = useState("Albania");
  const [state, setState] = useState("Diber");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const albanianStates = [
    "Berat",
    "Diber",
    "Durres",
    "Elbasan",
    "Fier",
    "Gjirokaster",
    "Korce",
    "Kukes",
    "Lezhe",
    "Shkoder",
    "Tirana",
    "Vlore",
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  return (
    <div>
      {/* Section Title */}
      <h2 className="text-[14px] font-semibold text-[#222] mb-4">Location</h2>

      {/* Success Alert Banner */}
      {saveSuccess && (
        <div className="mb-5 p-4 bg-[#e8f8f5] border border-[#a3e4d7] text-[#0e6251] rounded-[3px] text-[13.5px] flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#00ab97] stroke-[3]" />
            <span>Your location settings have been successfully updated!</span>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-[#0e6251] hover:text-black text-[12px] font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* Row 1: Country & State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors bg-white cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors bg-white cursor-pointer"
            >
              {albanianStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Address & Zip Code */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-[3]">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex-[1]">
            <input
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Checkbox */}
        <div className="pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#333]">
            <input
              type="checkbox"
              checked={showLocation}
              onChange={(e) => setShowLocation(e.target.checked)}
              className="w-4 h-4 rounded-[2px] accent-[#00ab97] cursor-pointer"
            />
            <span>Show my location</span>
          </label>
        </div>

        {/* Row 4: Save Changes Button */}
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
