"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Package,
  Layers,
  ArrowRight,
  Plus,
  Trash2,
  DollarSign,
  Info,
} from "lucide-react";

export default function AdminAddProductPage() {
  const [productType, setProductType] = useState<"Physical" | "Digital">("Physical");
  const [listingType, setListingType] = useState<"Sell to Anyone" | "Bidding / Quote" | "Classified">("Sell to Anyone");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [brand, setBrand] = useState("Nike");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("100");
  const [sku, setSku] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSpecialOffer, setIsSpecialOffer] = useState(false);
  const [images, setImages] = useState<string[]>([
    "/images/products/cobalt-tshirt.webp",
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setNotification(`Product "${title}" has been published successfully.`);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddSampleImage = () => {
    const samples = [
      "/images/products/black-backpack.webp",
      "/images/products/gucci-backpack.webp",
      "/images/products/scarves.webp",
      "/images/products/ankle-boot.webp",
    ];
    const nextImg = samples[images.length % samples.length];
    setImages((prev) => [...prev, nextImg]);
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h1 className="text-[24px] font-normal text-[#333333]">Add Product</h1>
        </div>
        <div className="text-xs text-gray-500">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/admin/products" className="text-[#3c8dbc] hover:underline">
            Products
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-400">Add Product</span>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Card 1: Product Images */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]">
          <div className="px-5 py-3 border-b border-[#f4f4f4] bg-gray-50/50">
            <h2 className="text-[15px] font-normal text-[#333333]">Product Images</h2>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-28 h-28 border border-gray-300 rounded-[3px] overflow-hidden group shadow-2xs"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-[#00a65a] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-[2px]">
                      Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                    className="absolute bottom-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddSampleImage}
                className="w-28 h-28 border-2 border-dashed border-gray-300 hover:border-[#00c0ef] rounded-[3px] flex flex-col items-center justify-center text-gray-500 hover:text-[#00c0ef] transition-colors cursor-pointer bg-gray-50/50"
              >
                <UploadCloud className="w-6 h-6 mb-1 text-gray-400" />
                <span className="text-[11px] font-medium">+ Add Image</span>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: JPG, PNG, WEBP. First image will be used as the primary display thumbnail.
            </p>
          </div>
        </div>

        {/* Card 2: General Details */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]">
          <div className="px-5 py-3 border-b border-[#f4f4f4] bg-gray-50/50">
            <h2 className="text-[15px] font-normal text-[#333333]">Product Details</h2>
          </div>
          <div className="p-5 space-y-4 text-[13px]">
            {/* Title */}
            <div>
              <label className="block text-[13px] text-[#333333] font-normal mb-1">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Cobalt man t-shirt all colors"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] text-[#555] outline-none focus:border-[#3c8dbc]"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-[13px] text-[#333333] font-normal mb-1">
                Slug (URL Key)
              </label>
              <input
                type="text"
                placeholder="Auto-generated if empty"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] text-[#555] outline-none focus:border-[#3c8dbc]"
              />
            </div>

            {/* Product Type & Listing Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Product Type
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value as "Physical" | "Digital")}
                  className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                >
                  <option value="Physical">Physical Product (Requires Shipping)</option>
                  <option value="Digital">Digital Downloadable Product</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Listing Type
                </label>
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value as any)}
                  className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                >
                  <option value="Sell to Anyone">Add Product for Direct Sale</option>
                  <option value="Bidding / Quote">Quote Request (Negotiable Price)</option>
                  <option value="Classified">Classified / Ordinary Listing</option>
                </select>
              </div>
            </div>

            {/* Category & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                >
                  <option value="Clothing">Clothing</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                  <option value="Toys & Entertainment">Toys & Entertainment</option>
                  <option value="Web Templates & Code">Web Templates & Code</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Brand
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                >
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Zara">Zara</option>
                  <option value="H&M">H&M</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Gucci">Gucci</option>
                  <option value="Kipling">Kipling</option>
                  <option value="None">None (Unbranded)</option>
                </select>
              </div>
            </div>

            {/* Price, Stock, SKU */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Price ($ USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 49.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  SKU (Stock Keeping Unit)
                </label>
                <input
                  type="text"
                  placeholder="e.g. PRD-89102"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] outline-none focus:border-[#3c8dbc]"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-[13px] text-[#333333] font-normal mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary shown in product preview cards..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full p-2.5 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#3c8dbc] resize-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[13px] text-[#333333] font-normal mb-1">
                Full Description
              </label>
              <textarea
                rows={5}
                placeholder="Detailed specifications, features, materials and instructions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#3c8dbc] resize-none"
              />
            </div>

            {/* Promotion Toggles */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#333333]">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#00c0ef] rounded border-gray-300"
                />
                <span>Set as Featured Product (Show on homepage top picks)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#333333]">
                <input
                  type="checkbox"
                  checked={isSpecialOffer}
                  onChange={(e) => setIsSpecialOffer(e.target.checked)}
                  className="w-4 h-4 text-[#f39c12] rounded border-gray-300"
                />
                <span>Set as Special Offer</span>
              </label>
            </div>
          </div>

          {/* Form Footer Buttons */}
          <div className="px-5 py-4 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-3">
            <Link
              href="/admin/products"
              className="h-[36px] px-5 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors flex items-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="h-[36px] px-6 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white text-[13px] font-medium rounded-[3px] transition-colors cursor-pointer shadow-xs"
            >
              Save and Publish Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
