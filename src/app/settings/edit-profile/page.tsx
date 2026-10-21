"use client";

/**
 * ============================================================================
 * HALAMAN PENGATURAN PROFIL / EDIT PROFIL (Member Profile Settings Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Memfasilitasi pengguna untuk memperbarui informasi data profil pribadi,
 * mengunggah foto profil (avatar) dan foto sampul (cover banner), mengatur slug profil,
 * nomor telepon, nomor pajak, tipe tampilan cover (Full Width / Boxed), serta
 * preferensi privasi kontak (tampilkan email / nomor telepon ke publik).
 * 
 * FITUR:
 * 1. Unggah & Pratinjau Foto Sampul (Cover Banner) dengan tombol kamera dan hapus sampul.
 * 2. Unggah & Pratinjau Avatar Lingkaran (Profile Photo) dengan tombol kamera.
 * 3. Formulir Informasi Dasar: Email, Slug, First Name, Last Name, Phone Number, Tax ID.
 * 4. Pilihan Format Banner Sampul (Full Width / Boxed).
 * 5. Pengaturan Notifikasi Email & Visibilitas Publik (Show Email & Phone).
 * 6. Tombol Simpan Perubahan (Save Changes) dengan notifikasi alert sukses.
 */

import { useState, useRef } from "react";
import { Camera, Trash2, Check } from "lucide-react";

export default function EditProfilePage() {
  // State untuk indikator keberhasilan penyimpanan data
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Avatar profil aktif
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=300&q=80"
  );
  // Banner cover toko aktif
  const [coverUrl, setCoverUrl] = useState(
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1400&q=80"
  );

  // Ref input file tersembunyi
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // State data formulir profil
  const [formData, setFormData] = useState({
    email: "admin@codingest.net",
    slug: "admin",
    firstName: "John",
    lastName: "Doe",
    phone: "+1-202-555-0190",
    taxNumber: "3455353456",
    coverType: "full-width" as "full-width" | "boxed",
    emailOnMessage: false,
    showEmail: true,
    showPhone: true,
  });

  // Handler pergantian foto avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  // Handler pergantian foto sampul banner
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverUrl(url);
    }
  };

  // Handler pengiriman simpan formulir
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  return (
    <div>
      {/* Banner Notifikasi Sukses Simpan */}
      {saveSuccess && (
        <div className="mb-6 p-3.5 bg-[#e8f8f5] border border-[#a3e4d7] text-[#0e6251] rounded-[2px] text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#00ab97] stroke-[3]" />
            <span>Your profile has been successfully updated!</span>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-[#0e6251] hover:text-black text-xs font-semibold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. BAGIAN FOTO SAMPUL & AVATAR PROFIL */}
      <div className="relative mb-6">
        {/* Input file upload tersembunyi */}
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

        {/* Banner Sampul */}
        <div
          className={`relative w-full h-[200px] sm:h-[220px] rounded-[2px] overflow-hidden bg-gray-100 ${
            formData.coverType === "boxed" ? "max-w-[700px]" : ""
          }`}
        >
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover object-center"
          />

          {/* Tombol Aksi Sampul (Ganti Foto & Hapus Foto) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="w-7 h-7 rounded-full bg-[#00ab97] hover:bg-[#009684] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              title="Change Cover Image"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCoverUrl(
                  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1400&q=80"
                )
              }
              className="w-7 h-7 rounded-full bg-[#00ab97] hover:bg-[#009684] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              title="Delete Cover Image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Foto Profil Melingkar Menumpuk di Atas Sampul */}
        <div className="relative -mt-16 sm:-mt-20 ml-6 sm:ml-8 inline-block z-20">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-sm overflow-hidden bg-white">
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Tombol Kamera Unggah Avatar */}
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#00ab97] hover:bg-[#009684] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title="Upload Avatar"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-[#868e96] mt-2">
          *Click on the save changes button after selecting your image
        </p>
      </div>

      {/* 2. FORMULIR PENGISIAN DATA PROFIL */}
      <form onSubmit={handleSave} className="space-y-4">
        {/* Alamat Email */}
        <div>
          <label className="block text-[12px] font-semibold text-[#2c333e] mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-[#dee2e6] focus:border-[#00ab97] rounded-[2px] text-xs text-[#495057] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Slug URL Profil */}
        <div>
          <label className="block text-[12px] font-semibold text-[#2c333e] mb-1.5">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border border-[#dee2e6] focus:border-[#00ab97] rounded-[2px] text-xs text-[#495057] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Nama Depan */}
        <div>
          <label className="block text-[12px] font-semibold text-[#2c333e] mb-1.5">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-3 py-2 border border-[#dee2e6] focus:border-[#00ab97] rounded-[2px] text-xs text-[#495057] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Nama Belakang */}
        <div>
          <label className="block text-[12px] font-semibold text-[#2c333e] mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-3 py-2 border border-[#dee2e6] focus:border-[#00ab97] rounded-[2px] text-xs text-[#495057] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Nomor Telepon */}
        <div>
          <label className="block text-[12px] font-semibold text-[#2c333e] mb-1.5">
            Phone Number
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-[#dee2e6] focus:border-[#00ab97] rounded-[2px] text-xs text-[#495057] focus:outline-none transition-colors"
          />
        </div>

        {/* Nomor Pokok Wajib Pajak (Tax Registration Number) */}
        <div>
          <label className="block text-[12px] font-semibold text-[#2c333e] mb-1.5">
            Tax Registration Number
          </label>
          <input
            type="text"
            value={formData.taxNumber}
            onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
            className="w-full px-3 py-2 border border-[#dee2e6] focus:border-[#00ab97] rounded-[2px] text-xs text-[#495057] focus:outline-none transition-colors"
          />
        </div>

        {/* Pilihan Gaya Tampilan Banner Sampul (Full Width / Boxed) */}
        <div className="pt-1">
          <label className="block text-[12px] font-semibold text-[#2c333e] mb-2">
            Cover Image Type
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#495057]">
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
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#495057]">
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

        {/* Preferensi Notifikasi & Privasi */}
        <div className="pt-2 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#495057]">
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

          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#495057]">
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

          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#495057]">
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

        {/* Tombol Simpan Perubahan */}
        <div className="pt-3">
          <button
            type="submit"
            className="px-5 py-2 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[2px] text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
