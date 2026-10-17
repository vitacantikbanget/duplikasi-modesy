"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, ChevronsUpDown, Trash2, Edit, X } from "lucide-react";

interface SliderItem {
  id: number;
  image: string;
  mobileImage?: string;
  title: string;
  description: string;
  link: string;
  language: string;
  order: number;
  buttonText: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  titleAnimation: string;
  descriptionAnimation: string;
  buttonAnimation: string;
}

const INITIAL_SLIDERS: SliderItem[] = [
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80",
    title: "Summer Collection",
    description: "Discover the latest fashion trends and accessories",
    link: "/category/fashion",
    language: "Arabic",
    order: 2,
    buttonText: "Shop Now",
    textColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    titleAnimation: "fadeInUp",
    descriptionAnimation: "fadeInUp",
    buttonAnimation: "fadeInUp",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80",
    title: "Vacation Essentials",
    description: "Handcrafted straw bags and beach wear for your holidays",
    link: "/category/bags",
    language: "Arabic",
    order: 1,
    buttonText: "Explore More",
    textColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    titleAnimation: "fadeInUp",
    descriptionAnimation: "fadeInUp",
    buttonAnimation: "fadeInUp",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80",
    title: "Women's Collection",
    description: "Exclusive new arrivals for the modern wardrobe",
    link: "/category/women",
    language: "English",
    order: 2,
    buttonText: "Shop Now",
    textColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    titleAnimation: "fadeInUp",
    descriptionAnimation: "fadeInUp",
    buttonAnimation: "fadeInUp",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80",
    title: "Handmade Bags",
    description: "Lightweight and eco-friendly bags made for your comfort",
    link: "/category/accessories",
    language: "English",
    order: 1,
    buttonText: "Discover",
    textColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    titleAnimation: "fadeInUp",
    descriptionAnimation: "fadeInUp",
    buttonAnimation: "fadeInUp",
  },
];

const ANIMATION_OPTIONS = [
  "fadeInUp",
  "fadeInDown",
  "fadeInLeft",
  "fadeInRight",
  "zoomIn",
  "bounceIn",
  "none",
];

const LANGUAGES = ["English", "Arabic", "Turkish", "Spanish", "French", "Indonesian"];

export default function AdminSliderPage() {
  const [sliderItems, setSliderItems] = useState<SliderItem[]>(INITIAL_SLIDERS);

  // Form states
  const [language, setLanguage] = useState("English");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState<number | string>("");
  const [buttonText, setButtonText] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [buttonColor, setButtonColor] = useState("#000000");
  const [buttonTextColor, setButtonTextColor] = useState("#ffffff");
  const [titleAnimation, setTitleAnimation] = useState("fadeInUp");
  const [descriptionAnimation, setDescriptionAnimation] = useState("fadeInUp");
  const [buttonAnimation, setButtonAnimation] = useState("fadeInUp");
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [mobileImage, setMobileImage] = useState<string | null>(null);

  // Table filter states
  const [showCount, setShowCount] = useState<number>(15);
  const [filterLanguage, setFilterLanguage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  // Slider settings state
  const [status, setStatus] = useState<"enable" | "disable">("enable");
  const [sliderType, setSliderType] = useState<"full" | "boxed">("full");
  const [effect, setEffect] = useState<"fade" | "slide">("slide");

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  const fileInputMainRef = useRef<HTMLInputElement>(null);
  const fileInputMobileRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveDropdownId(null);
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMainImage(url);
    }
  };

  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMobileImage(url);
    }
  };

  const handleAddSliderItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: SliderItem = {
      id: sliderItems.length > 0 ? Math.max(...sliderItems.map((s) => s.id)) + 1 : 1,
      image:
        mainImage ||
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80",
      mobileImage: mobileImage || undefined,
      title: title || "New Slider Item",
      description: description || "Slider description",
      link: link || "#",
      language,
      order: Number(order) || 1,
      buttonText: buttonText || "Shop Now",
      textColor,
      buttonColor,
      buttonTextColor,
      titleAnimation,
      descriptionAnimation,
      buttonAnimation,
    };

    setSliderItems([newItem, ...sliderItems]);
    // Reset form
    setTitle("");
    setDescription("");
    setLink("");
    setOrder("");
    setButtonText("");
    setMainImage(null);
    setMobileImage(null);
    showToast("Slider item added successfully!");
  };

  const handleDeleteItem = (id: number) => {
    setSliderItems(sliderItems.filter((item) => item.id !== id));
    setActiveDropdownId(null);
    showToast("Slider item deleted successfully!");
  };

  const handleSaveSettings = () => {
    showToast("Slider settings saved successfully!");
  };

  // Filter items
  const filteredItems = sliderItems.filter((item) => {
    const matchLang =
      filterLanguage === "All" || item.language.toLowerCase() === filterLanguage.toLowerCase();
    const matchSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery);
    return matchLang && matchSearch;
  });

  return (
    <div className="w-full text-[#333333] min-w-[1080px]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-[#00a65a] text-white px-5 py-3 rounded shadow-lg text-[14px] flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main 2-Column Grid (Keeps 2 columns on zoom & desktop layout) */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {/* Left Column (Forms: Add Slider Item & Slider Settings) */}
        <div className="flex flex-col space-y-6">
          {/* Card: Add Slider Item */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#f4f4f4]">
              <h2 className="text-[17px] font-normal text-[#333333]">Add Slider Item</h2>
            </div>

            <form onSubmit={handleAddSliderItem} className="p-5 space-y-4 text-[13.5px]">
              {/* Language */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                  Language
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-[34px] px-3 pr-8 bg-white border border-[#d2d6de] rounded-[3px] text-gray-700 text-[13.5px] appearance-none focus:outline-none focus:border-[#3c8dbc]"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-gray-700 placeholder-[#999] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 border border-[#d2d6de] rounded-[3px] text-gray-700 placeholder-[#999] text-[13.5px] focus:outline-none focus:border-[#3c8dbc] resize-y"
                />
              </div>

              {/* Link */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                  Link
                </label>
                <input
                  type="text"
                  placeholder="Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-gray-700 placeholder-[#999] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              {/* Order & Button Text */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    placeholder="Order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-gray-700 placeholder-[#999] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-gray-700 placeholder-[#999] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-3 gap-4 pt-1">
                {/* Text Color */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                    Text Color
                  </label>
                  <div className="relative flex items-center border border-[#d2d6de] rounded-[3px] p-[3px] h-[34px] bg-white cursor-pointer hover:border-gray-400">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    />
                    <div
                      className="w-full h-full rounded-[2px] border border-gray-300"
                      style={{ backgroundColor: textColor }}
                    />
                  </div>
                </div>

                {/* Button Color */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                    Button Color
                  </label>
                  <div className="relative flex items-center border border-[#d2d6de] rounded-[3px] p-[3px] h-[34px] bg-white cursor-pointer hover:border-gray-400">
                    <input
                      type="color"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    />
                    <div
                      className="w-full h-full rounded-[2px] border border-gray-300"
                      style={{ backgroundColor: buttonColor }}
                    />
                  </div>
                </div>

                {/* Button Text Color */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#333333] mb-1">
                    Button Text Color
                  </label>
                  <div className="relative flex items-center border border-[#d2d6de] rounded-[3px] p-[3px] h-[34px] bg-white cursor-pointer hover:border-gray-400">
                    <input
                      type="color"
                      value={buttonTextColor}
                      onChange={(e) => setButtonTextColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    />
                    <div
                      className="w-full h-full rounded-[2px] border border-gray-300"
                      style={{ backgroundColor: buttonTextColor }}
                    />
                  </div>
                </div>
              </div>

              {/* Animations */}
              <div className="pt-1">
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Animations
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {/* Title Animation */}
                  <div>
                    <span className="block text-[12px] text-gray-500 mb-1">Title</span>
                    <div className="relative">
                      <select
                        value={titleAnimation}
                        onChange={(e) => setTitleAnimation(e.target.value)}
                        className="w-full h-[34px] px-3 pr-7 bg-white border border-[#d2d6de] rounded-[3px] text-gray-700 text-[13px] appearance-none focus:outline-none focus:border-[#3c8dbc]"
                      >
                        {ANIMATION_OPTIONS.map((anim) => (
                          <option key={anim} value={anim}>
                            {anim}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Description Animation */}
                  <div>
                    <span className="block text-[12px] text-gray-500 mb-1">Description</span>
                    <div className="relative">
                      <select
                        value={descriptionAnimation}
                        onChange={(e) => setDescriptionAnimation(e.target.value)}
                        className="w-full h-[34px] px-3 pr-7 bg-white border border-[#d2d6de] rounded-[3px] text-gray-700 text-[13px] appearance-none focus:outline-none focus:border-[#3c8dbc]"
                      >
                        {ANIMATION_OPTIONS.map((anim) => (
                          <option key={anim} value={anim}>
                            {anim}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Button Animation */}
                  <div>
                    <span className="block text-[12px] text-gray-500 mb-1">Button</span>
                    <div className="relative">
                      <select
                        value={buttonAnimation}
                        onChange={(e) => setButtonAnimation(e.target.value)}
                        className="w-full h-[34px] px-3 pr-7 bg-white border border-[#d2d6de] rounded-[3px] text-gray-700 text-[13px] appearance-none focus:outline-none focus:border-[#3c8dbc]"
                      >
                        {ANIMATION_OPTIONS.map((anim) => (
                          <option key={anim} value={anim}>
                            {anim}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image (2560x800) */}
              <div className="pt-1">
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Image (2560x800)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    ref={fileInputMainRef}
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputMainRef.current?.click()}
                    className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] px-3.5 py-1.5 rounded-[3px] font-normal transition-colors shadow-xs inline-flex items-center cursor-pointer"
                  >
                    Select Image
                  </button>
                  {mainImage && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={mainImage}
                        alt="Preview"
                        className="h-7 w-16 object-cover rounded border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setMainImage(null)}
                        className="text-gray-400 hover:text-red-500 text-xs cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Image (for mobile) (768x500) */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                  Image (for mobile) (768x500)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    ref={fileInputMobileRef}
                    accept="image/*"
                    onChange={handleMobileImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputMobileRef.current?.click()}
                    className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] px-3.5 py-1.5 rounded-[3px] font-normal transition-colors shadow-xs inline-flex items-center cursor-pointer"
                  >
                    Select Image
                  </button>
                  {mobileImage && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={mobileImage}
                        alt="Mobile Preview"
                        className="h-7 w-12 object-cover rounded border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setMobileImage(null)}
                        className="text-gray-400 hover:text-red-500 text-xs cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white text-[13.5px] px-4 py-2 rounded-[3px] font-normal transition-colors shadow-xs cursor-pointer"
                >
                  Add Slider Item
                </button>
              </div>
            </form>
          </div>

          {/* Card: Slider Settings */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#f4f4f4]">
              <h2 className="text-[17px] font-normal text-[#333333]">Slider Settings</h2>
            </div>

            <div className="p-5 space-y-4 text-[13.5px]">
              {/* Status */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                  Status
                </label>
                <div className="flex items-center space-x-8">
                  {/* Enable */}
                  <label
                    onClick={() => setStatus("enable")}
                    className="flex items-center cursor-pointer select-none"
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                        status === "enable"
                          ? "bg-[#605ca8] text-white"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {status === "enable" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                    </div>
                    <span className="text-[13.5px] text-gray-700">Enable</span>
                  </label>

                  {/* Disable */}
                  <label
                    onClick={() => setStatus("disable")}
                    className="flex items-center cursor-pointer select-none"
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                        status === "disable"
                          ? "bg-[#605ca8] text-white"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {status === "disable" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                    </div>
                    <span className="text-[13.5px] text-gray-700">Disable</span>
                  </label>
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                  Type
                </label>
                <div className="flex items-center space-x-8">
                  {/* Full Width */}
                  <label
                    onClick={() => setSliderType("full")}
                    className="flex items-center cursor-pointer select-none"
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                        sliderType === "full"
                          ? "bg-[#605ca8] text-white"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {sliderType === "full" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                    </div>
                    <span className="text-[13.5px] text-gray-700">Full Width</span>
                  </label>

                  {/* Boxed */}
                  <label
                    onClick={() => setSliderType("boxed")}
                    className="flex items-center cursor-pointer select-none"
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                        sliderType === "boxed"
                          ? "bg-[#605ca8] text-white"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {sliderType === "boxed" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                    </div>
                    <span className="text-[13.5px] text-gray-700">Boxed</span>
                  </label>
                </div>
              </div>

              {/* Effect */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                  Effect
                </label>
                <div className="flex items-center space-x-8">
                  {/* Fade */}
                  <label
                    onClick={() => setEffect("fade")}
                    className="flex items-center cursor-pointer select-none"
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                        effect === "fade"
                          ? "bg-[#605ca8] text-white"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {effect === "fade" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                    </div>
                    <span className="text-[13.5px] text-gray-700">Fade</span>
                  </label>

                  {/* Slide */}
                  <label
                    onClick={() => setEffect("slide")}
                    className="flex items-center cursor-pointer select-none"
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                        effect === "slide"
                          ? "bg-[#605ca8] text-white"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {effect === "slide" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                    </div>
                    <span className="text-[13.5px] text-gray-700">Slide</span>
                  </label>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white text-[13.5px] px-4 py-2 rounded-[3px] font-normal transition-colors shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Slider Items Table) */}
        <div className="flex flex-col">
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 overflow-visible">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-[#f4f4f4]">
              <h2 className="text-[17px] font-normal text-[#333333]">Slider Items</h2>
            </div>

            <div className="p-5">
              {/* Controls: Show, Language, Search */}
              <div className="flex items-center justify-between gap-4 mb-4 text-[13px] text-gray-700">
                <div className="flex items-center space-x-4">
                  {/* Show */}
                  <div className="flex items-center space-x-1.5">
                    <span>Show</span>
                    <div className="relative">
                      <select
                        value={showCount}
                        onChange={(e) => setShowCount(Number(e.target.value))}
                        className="h-[30px] pl-2.5 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc]"
                      >
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                        <option value={60}>60</option>
                        <option value={100}>100</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Language */}
                  <div className="flex items-center space-x-1.5">
                    <span>Language</span>
                    <div className="relative">
                      <select
                        value={filterLanguage}
                        onChange={(e) => setFilterLanguage(e.target.value)}
                        className="h-[30px] pl-2.5 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc]"
                      >
                        <option value="All">All</option>
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="flex items-center space-x-1.5">
                  <span>Search:</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-[30px] px-2.5 border border-[#d2d6de] rounded-[3px] text-[13px] focus:outline-none focus:border-[#3c8dbc] w-[150px]"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left text-[13px] border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-[#333] font-semibold">
                      <th className="py-2.5 px-3 text-left w-14 cursor-pointer select-none">
                        <div className="flex items-center space-x-1">
                          <span>Id</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      </th>
                      <th className="py-2.5 px-3 text-left">Image</th>
                      <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                        <div className="flex items-center space-x-1">
                          <span>Language</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      </th>
                      <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                        <div className="flex items-center space-x-1">
                          <span>Order</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      </th>
                      <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                        <div className="flex items-center space-x-1">
                          <span>Options</span>
                          <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-400 text-[13px]">
                          No slider items found
                        </td>
                      </tr>
                    ) : (
                      filteredItems.slice(0, showCount).map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-[#f4f4f4] hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-3 px-3 text-gray-600 font-normal">{item.id}</td>
                          <td className="py-3 px-3">
                            <div className="relative group w-[160px] h-[50px] overflow-hidden rounded-[2px] bg-gray-100 border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3 text-gray-700">{item.language}</td>
                          <td className="py-3 px-3 text-gray-700">{item.order}</td>
                          <td className="py-3 px-3 relative">
                            {/* Option dropdown button */}
                            <div className="relative inline-block text-left">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveDropdownId(
                                    activeDropdownId === item.id ? null : item.id
                                  );
                                }}
                                className="bg-[#605ca8] hover:bg-[#504d8c] text-white text-[12.5px] px-3 py-1.5 rounded-[3px] transition-colors flex items-center space-x-1 font-normal cursor-pointer shadow-xs"
                              >
                                <span>Select an option</span>
                                <ChevronDown className="w-3 h-3 ml-0.5" />
                              </button>

                              {/* Dropdown Menu */}
                              {activeDropdownId === item.id && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1"
                                >
                                  <button
                                    onClick={() => {
                                      setTitle(item.title);
                                      setDescription(item.description);
                                      setLink(item.link);
                                      setLanguage(item.language);
                                      setOrder(item.order);
                                      setButtonText(item.buttonText);
                                      setTextColor(item.textColor);
                                      setButtonColor(item.buttonColor);
                                      setButtonTextColor(item.buttonTextColor);
                                      setTitleAnimation(item.titleAnimation);
                                      setDescriptionAnimation(item.descriptionAnimation);
                                      setButtonAnimation(item.buttonAnimation);
                                      setMainImage(item.image);
                                      setActiveDropdownId(null);
                                      showToast(`Loaded slider #${item.id} into form for editing.`);
                                    }}
                                    className="w-full px-4 py-2 text-left text-[13px] text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                                  >
                                    <Edit className="w-3.5 h-3.5 text-blue-500" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="w-full px-4 py-2 text-left text-[13px] text-red-600 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center mt-4 pt-3 border-t border-[#f4f4f4] space-x-1">
                <button
                  disabled
                  className="w-[30px] h-[30px] flex items-center justify-center border border-gray-200 rounded-[3px] text-gray-400 bg-white cursor-not-allowed text-[12px]"
                >
                  &lt;
                </button>
                <button className="w-[30px] h-[30px] flex items-center justify-center rounded-[3px] text-white bg-[#0088cc] font-medium text-[12px]">
                  1
                </button>
                <button
                  disabled
                  className="w-[30px] h-[30px] flex items-center justify-center border border-gray-200 rounded-[3px] text-gray-400 bg-white cursor-not-allowed text-[12px]"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
