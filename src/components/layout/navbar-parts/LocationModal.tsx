/**
 * ============================================================================
 * LocationModal: Modal Pemilih Lokasi Geografis Pengguna (Location Selector Modal)
 * ============================================================================
 * Mengimplementasikan sistem lokasi bertingkat Modesy (Country -> State/Provinsi):
 * 1. Pemilihan Negara:
 *    - Pilihan "Global" untuk melihat seluruh produk tanpa batasan wilayah.
 *    - Pencarian negara dengan input teks filter.
 * 2. Pemilihan Provinsi / State:
 *    - Menyesuaikan daftar provinsi secara dinamis berdasarkan negara yang dipilih (`countryStates`).
 * 3. Konfirmasi Lokasi:
 *    - Menyimpan lokasi terpilih ke `LocalizationContext` dan menampilkan label di topbar.
 */

"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { countries, countryStates } from "@/constants/countries";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: string) => void;
}

export function LocationModal({
  isOpen,
  onClose,
  onSelectLocation,
}: LocationModalProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const availableStates = selectedCountry
    ? countryStates[selectedCountry] || []
    : [];
  const filteredStates = availableStates.filter((s) =>
    s.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setSelectedState("");
    setLocationDropdownOpen(false);
    if (country === "Global") {
      onSelectLocation("Global");
      onClose();
    }
  };

  const handleConfirmLocation = () => {
    if (selectedCountry === "Global") {
      onSelectLocation("Global");
      onClose();
    } else if (selectedCountry && selectedState) {
      onSelectLocation(`${selectedState}, ${selectedCountry}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded shadow-xl w-full max-w-[500px] flex flex-col relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 pb-4 flex flex-col items-center border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Select Location</h3>
          <p className="text-sm text-gray-500">Filter products by location</p>
        </div>

        <div className="p-6 pt-4">
          {/* Country Dropdown */}
          <div className="relative mb-3">
            <div
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white cursor-pointer flex justify-between items-center hover:border-gray-400 transition-colors"
              onClick={() => {
                setLocationDropdownOpen(!locationDropdownOpen);
                setStateDropdownOpen(false);
              }}
            >
              <span>{selectedCountry || "Country"}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {locationDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded z-20">
                <div className="p-2 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto py-1">
                  {filteredCountries.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectCountry(c)}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {c}
                    </div>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-400 italic">No countries found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* State Dropdown (Only visible/active if a country is selected and not Global) */}
          {selectedCountry && selectedCountry !== "Global" && (
            <div className="relative">
              <div
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white cursor-pointer flex justify-between items-center hover:border-gray-400 transition-colors"
                onClick={() => {
                  setStateDropdownOpen(!stateDropdownOpen);
                  setLocationDropdownOpen(false);
                }}
              >
                <span>{selectedState || "State"}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              {stateDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded z-10">
                  <div className="p-2 border-b border-gray-100">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={stateSearch}
                      onChange={(e) => setStateSearch(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto py-1">
                    {filteredStates.map((s, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedState(s);
                          setStateDropdownOpen(false);
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                          selectedState === s
                            ? "bg-brand-primary/10 text-brand-primary"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {s}
                      </div>
                    ))}
                    {filteredStates.length === 0 && (
                      <div className="px-3 py-2 text-sm text-gray-400 italic">No states found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirmation Button */}
          {selectedCountry && (selectedState || selectedCountry === "Global") && (
            <button
              onClick={handleConfirmLocation}
              className="w-full mt-6 bg-brand-primary text-white font-medium py-3 rounded hover:bg-brand-primary-hover transition-colors shadow-sm cursor-pointer"
            >
              Select Location
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
