"use client";

import { useState, useRef } from "react";
import {
  UploadCloud,
  AlertCircle,
  ChevronDown,
  Sparkles,
  Image as ImageIcon,
  Check,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Maximize2,
  Code,
  Eye,
  Link2,
  Film,
  Type,
  Trash2
} from "lucide-react";

type ProductType = "physical" | "digital";
type ListingType = "sale" | "ordinary" | "quote" | "license";

export default function AddProductPage() {
  const [step, setStep] = useState(1);

  // Form State
  const [images, setImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [productType, setProductType] = useState<ProductType>("physical");
  const [listingType, setListingType] = useState<ListingType>("sale");
  const [category, setCategory] = useState("");

  // Details: English
  const [englishOpen, setEnglishOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");

  // Details: Arabic
  const [arabicOpen, setArabicOpen] = useState(false);
  const [titleAr, setTitleAr] = useState("");
  const [shortDescAr, setShortDescAr] = useState("");
  const [descAr, setDescAr] = useState("");

  // Step 2 State
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [discountRate, setDiscountRate] = useState("");
  const [vatRate, setVatRate] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [condition, setCondition] = useState("Brand New");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImages((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setImages((prev) => [...prev, ev.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex((prev) => prev - 1);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags((prev) => [...prev, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleSaveAndContinue = () => {
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
      }, 600);
    }
  };

  return (
    <div className="w-full max-w-[1050px] mx-auto py-2">
      {/* Page Title */}
      <h1 className="text-[22px] font-bold text-[#2c333e] text-center mb-6">
        Add Product
      </h1>

      {/* Progress Wizard */}
      <div className="flex items-center justify-center mb-8 select-none">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div
            className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold text-white transition-colors ${
              step >= 1 ? "bg-[#00ab97]" : "bg-[#cbd5e1]"
            }`}
          >
            1
          </div>
          <span
            className={`text-[12px] font-medium mt-1.5 ${
              step >= 1 ? "text-[#00ab97]" : "text-[#8c98a4]"
            }`}
          >
            General Information
          </span>
        </div>

        {/* Connector Line */}
        <div className="w-[180px] sm:w-[220px] h-[2.5px] bg-[#e2e8f0] relative -mt-5 mx-2">
          <div
            className="h-full bg-[#00ab97] transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div
            className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold text-white transition-colors ${
              step >= 2 ? "bg-[#00ab97]" : "bg-[#cbd5e1]"
            }`}
          >
            2
          </div>
          <span
            className={`text-[12px] font-medium mt-1.5 ${
              step >= 2 ? "text-[#00ab97]" : "text-[#8c98a4]"
            }`}
          >
            Details
          </span>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-[#e8f7f5] border border-[#00ab97] rounded-[3px] text-[#008775] text-[13.5px] flex items-center gap-2">
          <Check className="w-5 h-5 shrink-0" />
          <span>Product has been successfully published to your store!</span>
        </div>
      )}

      {/* STEP 1: General Information Form Card */}
      {step === 1 && (
        <div className="bg-white border border-[#e2e8f0] rounded-[3px] p-6 sm:p-8 shadow-2xs">
          {/* Images Section */}
          <div className="mb-6">
            <label className="block text-[13.5px] font-bold text-[#2c333e] mb-2.5">
              Images
            </label>

            {/* Upload Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-[#cbd5e1] rounded-[3px] py-12 px-4 text-center bg-[#fafbfc] hover:border-[#a0aec0] transition-colors cursor-pointer"
            >
              <UploadCloud className="w-12 h-12 text-[#cbd5e1] mx-auto mb-2.5 stroke-[1.5]" />
              <p className="text-[13px] text-[#8c98a4] mb-0">
                Drag and drop images here or{" "}
                <span className="text-[#6c757d] underline font-medium hover:text-[#2c333e]">
                  Browse Files
                </span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Previews */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative w-[85px] h-[85px] rounded-[3px] overflow-hidden border ${
                      mainImageIndex === idx
                        ? "border-[#00ab97] ring-1 ring-[#00ab97]"
                        : "border-[#e2e8f0]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Upload ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setMainImageIndex(idx)}
                      className={`absolute bottom-0 inset-x-0 py-0.5 text-[10px] font-bold text-center text-white ${
                        mainImageIndex === idx ? "bg-[#00ab97]" : "bg-black/60 hover:bg-black/80"
                      }`}
                    >
                      {mainImageIndex === idx ? "Main" : "Set Main"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Info Hint */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#8c98a4] mt-2.5">
              <AlertCircle className="w-4 h-4 text-[#8c98a4] shrink-0" />
              <span>
                You can click on the &quot;Main&quot; button on the images to select the main image of your product
              </span>
            </div>
          </div>

          {/* Product Type Section */}
          <div className="mb-6">
            <label className="block text-[13.5px] font-bold text-[#2c333e] mb-3">
              Product Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Physical */}
              <label
                onClick={() => setProductType("physical")}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    productType === "physical"
                      ? "border-[#00ab97]"
                      : "border-gray-400"
                  }`}
                >
                  {productType === "physical" && (
                    <div className="w-2 h-2 rounded-full bg-[#00ab97]" />
                  )}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-[#2c333e] leading-tight">
                    Physical
                  </div>
                  <div className="text-[12px] text-[#8c98a4] mt-0.5">
                    A tangible product that you will ship to buyers
                  </div>
                </div>
              </label>

              {/* Digital */}
              <label
                onClick={() => setProductType("digital")}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    productType === "digital"
                      ? "border-[#00ab97]"
                      : "border-gray-400"
                  }`}
                >
                  {productType === "digital" && (
                    <div className="w-2 h-2 rounded-full bg-[#00ab97]" />
                  )}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-[#2c333e] leading-tight">
                    Digital
                  </div>
                  <div className="text-[12px] text-[#8c98a4] mt-0.5">
                    A digital file that buyers will download
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Listing Type Section */}
          <div className="mb-6">
            <label className="block text-[13.5px] font-bold text-[#2c333e] mb-3">
              Listing Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Sale */}
              <label
                onClick={() => setListingType("sale")}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    listingType === "sale"
                      ? "border-[#00ab97]"
                      : "border-gray-400"
                  }`}
                >
                  {listingType === "sale" && (
                    <div className="w-2 h-2 rounded-full bg-[#00ab97]" />
                  )}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-[#2c333e] leading-tight">
                    Add a Product for Sale
                  </div>
                  <div className="text-[12px] text-[#8c98a4] mt-0.5">
                    Add a product to sell on the site
                  </div>
                </div>
              </label>

              {/* Ordinary */}
              <label
                onClick={() => setListingType("ordinary")}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    listingType === "ordinary"
                      ? "border-[#00ab97]"
                      : "border-gray-400"
                  }`}
                >
                  {listingType === "ordinary" && (
                    <div className="w-2 h-2 rounded-full bg-[#00ab97]" />
                  )}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-[#2c333e] leading-tight">
                    Add a Product or Service as an Ordinary Listing
                  </div>
                  <div className="text-[12px] text-[#8c98a4] mt-0.5">
                    Add a product or service without buy option
                  </div>
                </div>
              </label>

              {/* Quote */}
              <label
                onClick={() => setListingType("quote")}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    listingType === "quote"
                      ? "border-[#00ab97]"
                      : "border-gray-400"
                  }`}
                >
                  {listingType === "quote" && (
                    <div className="w-2 h-2 rounded-full bg-[#00ab97]" />
                  )}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-[#2c333e] leading-tight">
                    Add a Product to Receive Quote (Price) Requests
                  </div>
                  <div className="text-[12px] text-[#8c98a4] mt-0.5">
                    Add a product without adding a price to get price requests from customers
                  </div>
                </div>
              </label>

              {/* License */}
              <label
                onClick={() => setListingType("license")}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    listingType === "license"
                      ? "border-[#00ab97]"
                      : "border-gray-400"
                  }`}
                >
                  {listingType === "license" && (
                    <div className="w-2 h-2 rounded-full bg-[#00ab97]" />
                  )}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-[#2c333e] leading-tight">
                    Add a Product to Sell License Keys
                  </div>
                  <div className="text-[12px] text-[#8c98a4] mt-0.5">
                    Add a product to sell only license keys
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Category Section */}
          <div className="mb-6">
            <label className="block text-[13.5px] font-bold text-[#2c333e] mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2.5 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="">Select Category</option>
                <option value="clothing">Women &gt; Clothing</option>
                <option value="dresses">Women &gt; Dresses</option>
                <option value="shoes">Women &gt; Shoes</option>
                <option value="men">Men &gt; Clothing</option>
                <option value="electronics">Electronics &gt; Gadgets</option>
                <option value="accessories">Jewelry &amp; Accessories</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Details: English Section (Collapsible) */}
          <div className="mb-6">
            <div
              onClick={() => setEnglishOpen(!englishOpen)}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[3px] px-4 py-2.5 flex items-center justify-between cursor-pointer select-none"
            >
              <span className="text-[13.5px] font-semibold text-[#2c333e]">
                Details: English
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  englishOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>

            {englishOpen && (
              <div className="pt-4">
                {/* Generate with AI button */}
                <div className="flex justify-end mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!title) setTitle("Summer Floral Midi Dress");
                      if (!shortDescription) setShortDescription("Lightweight, breathable floral dress perfect for summer days.");
                      if (tags.length === 0) setTags(["dress", "summer", "floral", "fashion"]);
                      if (!description) setDescription("<p>Crafted from soft organic cotton, this stunning piece blends effortless comfort with sophisticated elegance. Features a flattering silhouette and vibrant patterns.</p>");
                    }}
                    className="bg-[#007bff] hover:bg-[#0069d9] text-white px-3.5 py-1.5 rounded-[3px] text-[12px] font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate with AI</span>
                  </button>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label className="block text-[13.5px] font-bold text-[#2c333e] mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                  />
                </div>

                {/* Short Description */}
                <div className="mb-4">
                  <label className="block text-[13.5px] font-bold text-[#2c333e] mb-1.5">
                    Short Description
                  </label>
                  <input
                    type="text"
                    placeholder="Short Description"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                  />
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label className="block text-[13.5px] font-bold text-[#2c333e] mb-1.5">
                    Tags{" "}
                    <span className="text-[12px] font-normal text-[#8c98a4]">
                      (Add relevant keywords for your product to increase visibility in search results)
                    </span>
                  </label>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 bg-[#f0f3f6] text-[#495057] text-xs px-2.5 py-1 rounded-[3px]"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Type tag and hit enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-[13.5px] font-bold text-[#2c333e] mb-2">
                    Description
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      const sample = "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600";
                      setDescription((prev) => prev + `<p><img src="${sample}" alt="Product visual" /></p>`);
                    }}
                    className="bg-[#00ab97] hover:bg-[#009180] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-medium flex items-center gap-1.5 mb-2.5 transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Add Image</span>
                  </button>

                  {/* TinyMCE Editor Recreation */}
                  <div className="border border-[#d1d5db] rounded-[3px] overflow-hidden bg-white">
                    {/* Menu Bar */}
                    <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-3 py-1.5 flex gap-4 text-[12px] text-[#495057] select-none">
                      <span className="hover:text-black cursor-pointer">File</span>
                      <span className="hover:text-black cursor-pointer">Insert</span>
                      <span className="hover:text-black cursor-pointer">Format</span>
                      <span className="hover:text-black cursor-pointer">Table</span>
                    </div>

                    {/* Toolbar Bar */}
                    <div className="bg-white border-b border-[#e2e8f0] px-3 py-1.5 flex flex-wrap items-center gap-1 text-[#495057] select-none">
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Fullscreen">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Code">
                        <Code className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Preview">
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-px h-4 bg-gray-200 mx-1" />

                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Undo">
                        <Undo2 className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Redo">
                        <Redo2 className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-px h-4 bg-gray-200 mx-1" />

                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-700 font-bold" title="Bold">
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-700 italic" title="Italic">
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-700 underline" title="Underline">
                        <Underline className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-700 line-through" title="Strikethrough">
                        <Strikethrough className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-px h-4 bg-gray-200 mx-1" />

                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Align Left">
                        <AlignLeft className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Align Center">
                        <AlignCenter className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Align Right">
                        <AlignRight className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Justify">
                        <AlignJustify className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-px h-4 bg-gray-200 mx-1" />

                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Bullet List">
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Numbered List">
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-px h-4 bg-gray-200 mx-1" />

                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Format">
                        <Type className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Media">
                        <Film className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Link">
                        <Link2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Editor Content Area */}
                    <textarea
                      rows={9}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write your product description here..."
                      className="w-full p-3.5 text-[13px] text-[#495057] outline-none resize-y border-none"
                    />

                    {/* Editor Status Bar */}
                    <div className="bg-[#f8fafc] border-t border-[#e2e8f0] px-3 py-1 flex items-center justify-between text-[11px] text-[#8c98a4] select-none">
                      <span>p</span>
                      <span className="flex items-center gap-1 font-sans">
                        ⚡ <strong className="font-semibold text-gray-600">tiny</strong> ◿
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Details: Arabic (Optional) (Collapsible) */}
          <div className="mb-6">
            <div
              onClick={() => setArabicOpen(!arabicOpen)}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[3px] px-4 py-2.5 flex items-center justify-between cursor-pointer select-none"
            >
              <span className="text-[13.5px] font-semibold text-[#2c333e]">
                Details: Arabic (Optional)
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  arabicOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>

            {arabicOpen && (
              <div className="pt-4 space-y-4" dir="rtl">
                <div>
                  <label className="block text-[13.5px] font-bold text-[#2c333e] mb-1.5">
                    العنوان
                  </label>
                  <input
                    type="text"
                    placeholder="العنوان"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                  />
                </div>
                <div>
                  <label className="block text-[13.5px] font-bold text-[#2c333e] mb-1.5">
                    الوصف القصير
                  </label>
                  <input
                    type="text"
                    placeholder="الوصف القصير"
                    value={shortDescAr}
                    onChange={(e) => setShortDescAr(e.target.value)}
                    className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                  />
                </div>
                <div>
                  <label className="block text-[13.5px] font-bold text-[#2c333e] mb-1.5">
                    الوصف
                  </label>
                  <textarea
                    rows={4}
                    placeholder="الوصف التفصيلي"
                    value={descAr}
                    onChange={(e) => setDescAr(e.target.value)}
                    className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSaveAndContinue}
              className="bg-[#00ab97] hover:bg-[#009180] text-white px-5 py-2.5 rounded-[3px] text-[13.5px] font-medium flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save and Continue</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Details */}
      {step === 2 && (
        <div className="bg-white border border-[#e2e8f0] rounded-[3px] p-6 sm:p-8 shadow-2xs">
          <h2 className="text-[16px] font-bold text-[#2c333e] mb-4 border-b border-[#e2e8f0] pb-3">
            Product Pricing &amp; Inventory Details
          </h2>

          {/* Ordinary Listing (Classified / Used Stuff) Notice */}
          {listingType === "ordinary" && (
            <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-[3px] text-xs text-amber-900 flex items-start gap-2.5">
              <span className="text-base shrink-0">📢</span>
              <div>
                <strong className="block font-semibold">Mode Iklan Baris / Ordinary Listing Aktif:</strong>
                <p className="text-[12px] text-amber-800 mt-0.5 leading-relaxed">
                  Produk ini akan dipublikasikan sebagai iklan barang bekas/iklan baris tanpa checkout langsung. Calon pembeli akan diarahkan menghubungi Anda via WhatsApp atau fitur Chat Modesy untuk negosiasi atau Cash on Delivery (COD).
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5">
                Price *
              </label>
              <div className="flex">
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-[#d1d5db] rounded-l-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#00ab97]"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-gray-100 border border-l-0 border-[#d1d5db] rounded-r-[3px] px-3 text-[13px] text-[#495057] outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="IDR">IDR (Rp)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5">
                Item Condition (Kondisi Barang) *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full border border-[#d1d5db] rounded-[3px] px-3 py-2 text-[13px] text-[#495057] outline-none focus:border-[#00ab97] bg-white cursor-pointer"
              >
                <option value="Brand New">Brand New (Baru dengan Tag / Dus)</option>
                <option value="Used - Like New">Used - Like New (Bekas Seperti Baru, 95%+ Mulus)</option>
                <option value="Used - Good">Used - Good (Bekas Bagus / Pemakaian Normal)</option>
                <option value="Used - Fair">Used - Fair (Bekas Wajar / Ada Tanda Pemakaian)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5">
                Discount Rate (%)
              </label>
              <input
                type="number"
                placeholder="0"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
                className="w-full border border-[#d1d5db] rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#00ab97]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5">
                VAT Rate (%)
              </label>
              <input
                type="number"
                placeholder="0"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
                className="w-full border border-[#d1d5db] rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#00ab97]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5">
                Shipping Cost
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                className="w-full border border-[#d1d5db] rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#00ab97]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-5 mt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              &larr; Back
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSaveAndContinue}
              className="bg-[#00ab97] hover:bg-[#009180] text-white px-6 py-2.5 rounded-[3px] text-[13.5px] font-medium flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Submit Product</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
