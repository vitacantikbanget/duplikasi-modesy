// Komponen Pengaturan Akun Member (Member Settings).
// Berfungsi untuk mengelola semua informasi akun pengguna:
// 1. Edit Profil (nama, username, bio/deskripsi, upload foto profil)
// 2. Lokasi Tempat Tinggal (negara, provinsi, kota, kode pos)
// 3. Alamat Pengiriman Belanja (Shipping Address: tambah, edit, hapus alamat kurir)
// 4. Tautan Afiliasi (Affiliate Links: link referral untuk komisi belanja)
// 5. Media Sosial (tautan Facebook, Twitter, Instagram, dll)
// 6. Ganti Kata Sandi (Change Password: ubah password akun)
// 7. Hapus Akun (Delete Account)

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  MapPin,
  Truck,
  Link as LinkIcon,
  Share2,
  Lock,
  UserX,
  Camera,
  CheckCircle,
  Trash2,
  Edit2,
  Plus,
  Copy,
  X,
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

interface ShippingAddress {
  id: string;
  title: string;
  fullName: string;
  addressLine: string;
  contact: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
}

interface AffiliateLink {
  id: string;
  productName: string;
  link: string;
  date: string;
}

export default function MemberSettings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userProfile } = useAppContext();

  const tabParam = searchParams.get("tab") || "update-profile";
  const [activeTab, setActiveTab] = useState<string>(tabParam);

  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/member/settings?tab=${tab}`, { scroll: false });
  };

  // Profile Form state
  const [avatar, setAvatar] = useState<string>(userProfile?.avatar || "/images/peter-jone-avatar.jpg");
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("member@gmail.com");
  const [slug, setSlug] = useState<string>("peter-jone");
  const [firstName, setFirstName] = useState<string>("Peter");
  const [lastName, setLastName] = useState<string>("Jone");
  const [phone, setPhone] = useState<string>("876 677 897");
  const [taxNumber, setTaxNumber] = useState<string>("");
  const [coverType, setCoverType] = useState<"full" | "fixed">("full");
  const [emailNotification, setEmailNotification] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [showPhone, setShowPhone] = useState<boolean>(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      showToast("Avatar image selected. Click 'Save Changes' to apply.");
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(URL.createObjectURL(file));
      showToast("Cover photo selected. Click 'Save Changes' to apply.");
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile updated successfully!");
  };

  // Location Form state
  const [country, setCountry] = useState<string>("Afghanistan");
  const [state, setState] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [showLocation, setShowLocation] = useState<boolean>(false);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Location updated successfully!");
  };

  // Shipping Addresses state
  const [addresses, setAddresses] = useState<ShippingAddress[]>([
    {
      id: "addr-1",
      title: "Home",
      fullName: "Peter Jone",
      addressLine: "Test Address d4141 Centre/Centre/France",
      contact: "test@gmail.com 876 4766 8978",
      firstName: "Peter",
      lastName: "Jone",
      email: "test@gmail.com",
      phoneNumber: "876 4766 8978",
      country: "France",
      state: "Centre",
      city: "Centre",
      address: "Test Address d4141",
      zipCode: "75001",
    },
  ]);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressFormData, setAddressFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "France",
    state: "",
    city: "",
    address: "",
    zipCode: "",
  });

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressFormData({
      title: "Home",
      firstName: "Peter",
      lastName: "Jone",
      email: "member@gmail.com",
      phoneNumber: "876 677 897",
      country: "France",
      state: "Centre",
      city: "Centre",
      address: "",
      zipCode: "",
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: ShippingAddress) => {
    setEditingAddressId(addr.id);
    setAddressFormData({
      title: addr.title,
      firstName: addr.firstName,
      lastName: addr.lastName,
      email: addr.email,
      phoneNumber: addr.phoneNumber,
      country: addr.country,
      state: addr.state,
      city: addr.city,
      address: addr.address,
      zipCode: addr.zipCode,
    });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressFormData.title || !addressFormData.address) {
      alert("Please fill in the required fields.");
      return;
    }
    const fullName = `${addressFormData.firstName} ${addressFormData.lastName}`.trim();
    const addressLine = `${addressFormData.address} ${addressFormData.city}/${addressFormData.state}/${addressFormData.country}`;
    const contact = `${addressFormData.email} ${addressFormData.phoneNumber}`.trim();

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddressId
            ? { ...a, ...addressFormData, fullName, addressLine, contact }
            : a
        )
      );
      showToast("Address updated successfully!");
    } else {
      const newAddr: ShippingAddress = {
        id: `addr-${Date.now()}`,
        ...addressFormData,
        fullName,
        addressLine,
        contact,
      };
      setAddresses((prev) => [...prev, newAddr]);
      showToast("New shipping address added!");
    }
    setIsAddressModalOpen(false);
  };

  // Affiliate Links state
  const [affiliates, setAffiliates] = useState<AffiliateLink[]>([
    {
      id: "aff-1",
      productName: "Black bag over the shoulder",
      link: "https://modesy.codingest.net/affiliate/8UfkuoI77NkfvO",
      date: "2024-08-04",
    },
    {
      id: "aff-2",
      productName: "Black midi skirt with white flowers",
      link: "https://modesy.codingest.net/affiliate/8UfkuoI7AVRF78",
      date: "2024-08-04",
    },
    {
      id: "aff-3",
      productName: "Floral women sundress",
      link: "https://modesy.codingest.net/affiliate/8UfkuoJbe40SZx",
      date: "2024-08-04",
    },
  ]);

  const handleCopyAffiliate = (linkText: string) => {
    navigator.clipboard.writeText(linkText);
    showToast("Affiliate link copied to clipboard!");
  };

  // Confirmation Delete Modal
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    type: "address" | "affiliate" | "account";
    id: string;
    text: string;
  }>({ open: false, type: "address", id: "", text: "" });

  const handleConfirmAction = () => {
    if (confirmModal.type === "address") {
      setAddresses((prev) => prev.filter((a) => a.id !== confirmModal.id));
      showToast("Shipping address deleted.");
    } else if (confirmModal.type === "affiliate") {
      setAffiliates((prev) => prev.filter((a) => a.id !== confirmModal.id));
      showToast("Affiliate link deleted.");
    } else if (confirmModal.type === "account") {
      setDeletePassword("");
      showToast("Your account deletion request has been submitted for admin approval.");
    }
    setConfirmModal({ open: false, type: "address", id: "", text: "" });
  };

  // Social Media state
  const [socialMedia, setSocialMedia] = useState({
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

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Social media links saved successfully!");
  };

  // Change Password state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      alert("Please fill in password fields.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    showToast("Password updated successfully!");
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  // Delete Account state
  const [deletePassword, setDeletePassword] = useState("");
  const handleDeleteAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletePassword.trim()) {
      alert("Please enter your password to proceed.");
      return;
    }
    setConfirmModal({
      open: true,
      type: "account",
      id: "account",
      text: "Are you sure you want to delete your account? This action requires admin approval.",
    });
  };

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case "update-profile":
        return "Update Profile";
      case "location":
        return "Location";
      case "shipping-address":
        return "Shipping Address";
      case "affiliate-links":
        return "Affiliate Links";
      case "social-media":
        return "Social Media";
      case "change-password":
        return "Change Password";
      case "delete-account":
        return "Delete Account";
      default:
        return "Profile Settings";
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SweetAlert style Delete Confirmation Modal */}
      {confirmModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setConfirmModal({ open: false, type: "address", id: "", text: "" });
            }
          }}
        >
          <div className="bg-white rounded-[4px] shadow-2xl p-7 max-w-[420px] w-full text-center transform transition-all animate-in zoom-in-95 duration-150">
            <div className="w-[72px] h-[72px] rounded-full border-4 border-[#facea8] flex items-center justify-center mx-auto mb-5">
              <svg width="32" height="46" viewBox="0 0 32 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="16" y1="8" x2="16" y2="28" stroke="#f8bb86" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="16" cy="38" r="2.2" fill="#f8bb86" />
              </svg>
            </div>
            <p className="text-[16px] sm:text-[17px] text-[#545454] font-normal leading-normal mb-7">
              {confirmModal.text}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmModal({ open: false, type: "address", id: "", text: "" })}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className="px-8 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0 outline-none focus:ring-2 focus:ring-[#00a99d]/30"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Shipping Address Modal */}
      {isAddressModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddressModalOpen(false);
          }}
        >
          <div className="bg-white rounded-[3px] shadow-2xl p-6 max-w-[540px] w-full transform transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                {editingAddressId ? "Edit Shipping Address" : "Add New Shipping Address"}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer p-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address Title (e.g. Home, Office) *
                </label>
                <input
                  type="text"
                  required
                  value={addressFormData.title}
                  onChange={(e) =>
                    setAddressFormData({ ...addressFormData, title: e.target.value })
                  }
                  placeholder="Home"
                  className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={addressFormData.firstName}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, firstName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={addressFormData.lastName}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, lastName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={addressFormData.email}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={addressFormData.phoneNumber}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, phoneNumber: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Country</label>
                  <input
                    type="text"
                    value={addressFormData.country}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, country: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">State</label>
                  <input
                    type="text"
                    value={addressFormData.state}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, state: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={addressFormData.city}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, city: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={addressFormData.address}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, address: e.target.value })
                    }
                    placeholder="Street, building, suite"
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={addressFormData.zipCode}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, zipCode: e.target.value })
                    }
                    placeholder="75001"
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-[2px] text-gray-600 hover:bg-gray-50 border-0 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white font-medium rounded-[2px] border-0 cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-5 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/member/settings" className="hover:text-[#00a99d] transition-colors">
            Profile Settings
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">{getBreadcrumbTitle()}</span>
        </nav>

        {/* Title */}
        <h1 className="text-[22px] font-bold text-gray-900 mb-6">Profile Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Vertical Menu */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-white border border-[#ebebeb] rounded-[2px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <nav className="flex flex-col py-1">
                {[
                  { id: "update-profile", label: "Update Profile", icon: User },
                  { id: "location", label: "Location", icon: MapPin },
                  { id: "shipping-address", label: "Shipping Address", icon: Truck },
                  { id: "affiliate-links", label: "Affiliate Links", icon: LinkIcon },
                  { id: "social-media", label: "Social Media", icon: Share2 },
                  { id: "change-password", label: "Change Password", icon: Lock },
                  { id: "delete-account", label: "Delete Account", icon: UserX },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabChange(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 text-[13px] transition text-left cursor-pointer border-0 ${
                        isActive
                          ? "bg-[#f1f3f5] text-gray-900 font-semibold"
                          : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="md:col-span-8 lg:col-span-9">
            {/* Update Profile Tab */}
            {activeTab === "update-profile" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleProfileSubmit}>
                  {/* Cover Photo */}
                  <div className="relative w-full h-[170px] sm:h-[190px] bg-[#f8f9fa] border border-[#ebebeb] rounded-[2px] overflow-hidden flex items-center justify-center">
                    {coverPhoto ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-300 text-xs" />
                    )}
                    <label
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center cursor-pointer shadow-sm transition"
                      title="Upload Cover Photo"
                    >
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverChange}
                      />
                    </label>
                  </div>

                  {/* Circular Avatar */}
                  <div className="relative w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] rounded-full border-4 border-white shadow-md mx-auto -mt-[58px] sm:-mt-[63px] z-10 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatar}
                      alt="Peter Jone"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <label
                      className="absolute bottom-0 right-1 w-7 h-7 rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center cursor-pointer shadow-sm transition z-20"
                      title="Upload Profile Photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>

                  <p className="text-[11px] sm:text-[12px] text-gray-500 italic text-center mt-3 mb-6">
                    *Click on the save changes button after selecting your image
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Tax Registration Number
                      </label>
                      <input
                        type="text"
                        placeholder="Tax Registration Number"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    <div className="pt-1">
                      <label className="block text-[13px] font-medium text-gray-700 mb-2">
                        Cover Image Type
                      </label>
                      <div className="flex items-center gap-6 text-xs text-gray-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="coverType"
                            checked={coverType === "full"}
                            onChange={() => setCoverType("full")}
                            className="accent-[#00a99d] w-3.5 h-3.5"
                          />
                          <span>Full Width</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="coverType"
                            checked={coverType === "fixed"}
                            onChange={() => setCoverType("fixed")}
                            className="accent-[#00a99d] w-3.5 h-3.5"
                          />
                          <span>Fixed</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailNotification}
                          onChange={(e) => setEmailNotification(e.target.checked)}
                          className="accent-[#00a99d] w-3.5 h-3.5 rounded"
                        />
                        <span>Send me an email when someone send me a message</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showEmail}
                          onChange={(e) => setShowEmail(e.target.checked)}
                          className="accent-[#00a99d] w-3.5 h-3.5 rounded"
                        />
                        <span>Show my email address</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showPhone}
                          onChange={(e) => setShowPhone(e.target.checked)}
                          className="accent-[#00a99d] w-3.5 h-3.5 rounded"
                        />
                        <span>Show my phone number</span>
                      </label>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-7 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer border-0"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === "location" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleLocationSubmit} className="space-y-4">
                  <label className="block text-[13px] font-medium text-gray-800">Location</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition bg-white"
                      >
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="France">France</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition bg-white"
                      >
                        <option value="">State</option>
                        <option value="Centre">Centre</option>
                        <option value="Île-de-France">Île-de-France</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Kabul">Kabul</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-9">
                      <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showLocation}
                        onChange={(e) => setShowLocation(e.target.checked)}
                        className="accent-[#00a99d] w-3.5 h-3.5 rounded"
                      />
                      <span>Show my location</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-7 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer border-0"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Shipping Address Tab */}
            {activeTab === "shipping-address" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-[#ebebeb] rounded-[2px] p-5 bg-white relative shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                    >
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#e3f2fd] text-[#1976d2] text-[11px] font-medium rounded-[2px]">
                        <Truck className="w-3.5 h-3.5" />
                        Shipping Address
                      </span>
                      <h3 className="font-bold text-[14px] text-gray-900 mt-2.5 mb-1.5">
                        {addr.title}
                      </h3>
                      <p className="text-[13px] text-gray-700 leading-snug">{addr.fullName}</p>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
                        {addr.addressLine}
                      </p>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{addr.contact}</p>

                      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => handleOpenEditAddress(addr)}
                          className="text-gray-400 hover:text-gray-700 transition cursor-pointer border-0 bg-transparent p-0"
                          title="Edit address"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmModal({
                              open: true,
                              type: "address",
                              id: addr.id,
                              text: "Are you sure you want to delete this shipping address?",
                            })
                          }
                          className="text-gray-400 hover:text-red-500 transition cursor-pointer border-0 bg-transparent p-0"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleOpenAddAddress}
                    className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-5 py-2.5 rounded-[2px] transition inline-flex items-center gap-1.5 shadow-sm cursor-pointer border-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>
              </div>
            )}

            {/* Affiliate Links Tab */}
            {activeTab === "affiliate-links" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#ebebeb] text-[13px] font-bold text-gray-900">
                      <th className="py-3 px-3 font-semibold">Product</th>
                      <th className="py-3 px-3 font-semibold">Affiliate Link</th>
                      <th className="py-3 px-3 text-right font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebebeb] text-xs">
                    {affiliates.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-gray-400 text-xs">
                          No affiliate links found.
                        </td>
                      </tr>
                    ) : (
                      affiliates.map((aff) => (
                        <tr key={aff.id} className="hover:bg-gray-50/60 transition">
                          <td className="py-3.5 px-3 text-gray-700 font-normal">
                            {aff.productName}
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2 max-w-[420px]">
                              <span className="text-gray-600 truncate">{aff.link}</span>
                              <button
                                type="button"
                                onClick={() => handleCopyAffiliate(aff.link)}
                                className="text-gray-400 hover:text-[#00a99d] transition cursor-pointer p-0 bg-transparent border-0 shrink-0"
                                title="Copy link"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <span className="text-gray-500 block leading-tight">{aff.date}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmModal({
                                  open: true,
                                  type: "affiliate",
                                  id: aff.id,
                                  text: "Are you sure you want to delete this affiliate link?",
                                })
                              }
                              className="text-red-500 hover:underline cursor-pointer text-[11px] mt-1 border-0 bg-transparent p-0 inline-block font-normal"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === "social-media" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleSocialSubmit} className="space-y-4">
                  {[
                    { key: "facebook", label: "Facebook URL" },
                    { key: "twitter", label: "X (Twitter) URL" },
                    { key: "instagram", label: "Instagram URL" },
                    { key: "tiktok", label: "TikTok URL" },
                    { key: "whatsapp", label: "WhatsApp URL" },
                    { key: "youtube", label: "Youtube URL" },
                    { key: "discord", label: "Discord Url" },
                    { key: "telegram", label: "Telegram URL" },
                    { key: "pinterest", label: "Pinterest URL" },
                    { key: "linkedin", label: "LinkedIn URL" },
                    { key: "twitch", label: "Twitch Url" },
                    { key: "vk", label: "VK URL" },
                    { key: "website", label: "Personal Website URL" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        placeholder={field.label}
                        value={(socialMedia as any)[field.key]}
                        onChange={(e) =>
                          setSocialMedia({ ...socialMedia, [field.key]: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>
                  ))}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-7 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer border-0"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === "change-password" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Old Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Old Password"
                      value={passwordData.oldPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, oldPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Confirm Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-6 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer border-0"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Delete Account Tab */}
            {activeTab === "delete-account" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div className="bg-[#f8d7da] border border-[#f5c6cb] text-[#721c24] p-4 rounded-[2px] text-xs leading-relaxed mb-6 font-normal">
                  Deleting your account is permanent and cannot be reversed. All data, including
                  preferences and subscriptions, will be lost. The process requires admin approval,
                  which may take some time. Please enter your password and confirm to proceed.
                </div>

                <form onSubmit={handleDeleteAccountSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white font-medium text-xs px-5 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer inline-flex items-center gap-1.5 border-0"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
