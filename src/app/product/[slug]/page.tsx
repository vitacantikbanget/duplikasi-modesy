"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Eye, 
  Share2, 
  MessageCircle, 
  Store, 
  ChevronRight, 
  Minus, 
  Plus,
  X,
  Send,
  Lock,
  ThumbsUp
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { getProductBySlug, getRelatedProducts, ALL_PRODUCTS } from "@/lib/products-data";
import ProductCard from "@/components/common/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const routeParams = useParams();
  const slug = (routeParams?.slug as string) || "black-midi-skirt";
  
  const product = getProductBySlug(slug);
  
  if (!product) {
    // If not found in primary catalog, fallback to the first product so user never hits a dead end
    const fallback = ALL_PRODUCTS[0];
    if (!fallback) notFound();
  }

  const currentProduct = product || ALL_PRODUCTS[0];
  const { t, formatPrice, addToCart, toggleWishlist, isInWishlist } = useAppContext();

  // State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(currentProduct.colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(currentProduct.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "shipping" | "reviews">("desc");
  const [addedNotification, setAddedNotification] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactSent, setContactSent] = useState(false);
  
  // Review form states
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [reviewsList, setReviewsList] = useState(currentProduct.reviews);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const relatedProducts = getRelatedProducts(currentProduct.categorySlug, currentProduct.id);

  const isQuote = currentProduct.productType === "quote" || currentProduct.price === "Request a Quote";
  const isFree = currentProduct.price === "Free" || currentProduct.price === 0;
  const isFavorited = isInWishlist(currentProduct.slug);

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (typeof currentProduct.price !== "number") return;

    addToCart({
      id: `${currentProduct.slug}-${selectedColor}-${selectedSize}`,
      productSlug: currentProduct.slug,
      title: currentProduct.title,
      price: currentProduct.price,
      imageUrl: currentProduct.images[0] || "",
      quantity,
      selectedColor: selectedColor || undefined,
      selectedSize: selectedSize || undefined,
      vendorName: currentProduct.vendor.name
    });

    setAddedNotification(true);
    setTimeout(() => {
      setAddedNotification(false);
    }, 3500);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const newRev = {
      id: "r-" + Date.now(),
      user: newReviewAuthor.trim() || "Verified Buyer",
      avatar: "https://i.pravatar.cc/150?u=" + Date.now(),
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment.trim()
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewComment("");
    setNewReviewAuthor("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      
      {/* Toast Notification when item added to cart */}
      {addedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 border border-gray-700 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div>
            <p className="text-sm font-semibold">Berhasil ditambahkan ke Keranjang!</p>
            <p className="text-xs text-gray-300">{quantity}x {currentProduct.title}</p>
          </div>
          <Link 
            href="/cart" 
            className="ml-3 text-xs bg-brand-primary hover:bg-brand-primary-hover px-3 py-1.5 rounded font-medium text-white transition-colors"
          >
            Lihat Keranjang
          </Link>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-brand-primary transition-colors">{t("home")}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 shrink-0" />
          <Link href={`/category/${currentProduct.categorySlug}`} className="hover:text-brand-primary transition-colors">
            {currentProduct.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 shrink-0" />
          <Link href={`/category/${currentProduct.subcategorySlug}`} className="hover:text-brand-primary transition-colors">
            {currentProduct.subcategory}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 shrink-0" />
          <span className="text-gray-800 font-medium truncate max-w-[280px] md:max-w-md">
            {currentProduct.title}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-4 sm:p-6 md:p-8 rounded-xl border border-gray-100 shadow-xs">
          
          {/* LEFT COLUMN: Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={currentProduct.images[activeImageIndex] || currentProduct.images[0]} 
                alt={currentProduct.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {currentProduct.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-sm shadow-sm tracking-wide">
                  -{currentProduct.discount}%
                </div>
              )}
              {currentProduct.productType === "digital" && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm shadow-sm">
                  DIGITAL ASSET
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {currentProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {currentProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "w-20 h-20 rounded-md overflow-hidden border-2 shrink-0 transition-all",
                      activeImageIndex === idx ? "border-brand-primary shadow-xs ring-2 ring-brand-primary/20" : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Metadata Info Footer */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
              <div className="flex gap-4">
                <span>SKU: <strong className="text-gray-600">{currentProduct.sku}</strong></span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> 148 Views</span>
              </div>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: currentProduct.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Tautan produk berhasil disalin!");
                  }
                }}
                className="flex items-center gap-1 text-gray-500 hover:text-brand-primary transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Buy Box & Product Info */}
          <div className="lg:col-span-6 flex flex-col">
            
            {/* Category Pill */}
            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full">
                {currentProduct.subcategory}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3">
              {currentProduct.title}
            </h1>

            {/* Rating & Stock Status */}
            <div className="flex flex-wrap items-center gap-3 pb-4 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={cn(
                      "w-4 h-4", 
                      currentProduct.rating >= star ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    )} 
                  />
                ))}
                <span className="text-xs font-semibold text-gray-700 ml-1.5">{currentProduct.rating}</span>
                <button 
                  onClick={() => setActiveTab("reviews")}
                  className="text-xs text-gray-400 hover:text-brand-primary hover:underline ml-1"
                >
                  ({reviewsList.length} reviews)
                </button>
              </div>

              <span className="text-gray-300">|</span>

              {/* Stock badge */}
              {currentProduct.stock > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Check className="w-3 h-3 stroke-[3]" /> Tersedia ({currentProduct.stock} stok)
                </span>
              ) : (
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  Stok Habis
                </span>
              )}

              <span className="text-gray-300">|</span>

              <span className="text-xs text-gray-500 font-medium">
                Kondisi: <span className="text-gray-800">Baru</span>
              </span>
            </div>

            {/* Price Display */}
            <div className="bg-[#f8faf9] p-4 rounded-lg mb-6 flex items-baseline gap-3 border border-emerald-100/60">
              {typeof currentProduct.price === "number" ? (
                <>
                  <div className="text-3xl font-extrabold text-brand-primary tracking-tight">
                    {formatPrice(currentProduct.price)}
                  </div>
                  {currentProduct.originalPrice && (
                    <div className="text-base text-gray-400 line-through">
                      {formatPrice(currentProduct.originalPrice)}
                    </div>
                  )}
                  {currentProduct.discount && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                      HEMAT {currentProduct.discount}%
                    </span>
                  )}
                </>
              ) : (
                <div className="text-2xl font-bold text-gray-900">
                  {currentProduct.price === "Free" ? t("free") : t("request_quote")}
                </div>
              )}
            </div>

            {/* Variation: Colors */}
            {currentProduct.colors && currentProduct.colors.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-gray-700 mb-2.5 flex items-center justify-between">
                  <span>Warna: <strong className="text-gray-900">{selectedColor}</strong></span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {currentProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all",
                        selectedColor === c.name 
                          ? "border-brand-primary bg-brand-primary/5 text-brand-primary ring-1 ring-brand-primary shadow-xs" 
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      )}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.hex }}></span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variation: Sizes */}
            {currentProduct.sizes && currentProduct.sizes.length > 0 && (
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-700 mb-2.5 flex items-center justify-between">
                  <span>Ukuran / Varian: <strong className="text-gray-900">{selectedSize}</strong></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.sizes.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={cn(
                        "min-w-10 px-3.5 py-1.5 rounded border text-xs font-bold transition-all",
                        selectedSize === s 
                          ? "border-brand-primary bg-brand-primary text-white shadow-xs" 
                          : "border-gray-200 hover:border-gray-400 bg-white text-gray-700"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            {!isQuote && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-md bg-white h-11 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-sm font-semibold outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-11 bg-brand-primary hover:bg-brand-primary-hover active:scale-98 text-white rounded-md font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isFree ? "Unduh Sekarang (Gratis)" : "Tambah ke Keranjang"}
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(currentProduct.slug)}
                  className={cn(
                    "w-11 h-11 border rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0",
                    isFavorited 
                      ? "border-red-200 bg-red-50 text-red-500 shadow-xs" 
                      : "border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 bg-white"
                  )}
                  title={isFavorited ? "Hapus dari Favorit" : "Simpan ke Favorit"}
                >
                  <Heart className={cn("w-5 h-5", isFavorited ? "fill-red-500 text-red-500" : "")} />
                </button>
              </div>
            )}

            {/* Bidding / Request a Quote Button */}
            {isQuote && (
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full h-11 bg-gray-900 hover:bg-black text-white rounded-md font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ajukan Penawaran Harga (Request a Quote)
                </button>
              </div>
            )}

            {/* Trust and Safety Guarantees */}
            <div className="grid grid-cols-3 gap-2 py-4 px-3 bg-gray-50/80 rounded-lg border border-gray-100 text-center mb-6">
              <div className="flex flex-col items-center justify-center text-[11px] text-gray-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="font-semibold text-gray-800">100% Aman</span>
                <span className="text-[10px] text-gray-400">Pembayaran Terenkripsi</span>
              </div>
              <div className="flex flex-col items-center justify-center text-[11px] text-gray-600 border-x border-gray-200">
                <Truck className="w-5 h-5 text-blue-600 mb-1" />
                <span className="font-semibold text-gray-800">Pengiriman Cepat</span>
                <span className="text-[10px] text-gray-400">Ke Seluruh Indonesia</span>
              </div>
              <div className="flex flex-col items-center justify-center text-[11px] text-gray-600">
                <RotateCcw className="w-5 h-5 text-orange-600 mb-1" />
                <span className="font-semibold text-gray-800">Garansi Retur</span>
                <span className="text-[10px] text-gray-400">14 Hari Pengembalian</span>
              </div>
            </div>

            {/* Vendor Card Box */}
            <div className="mt-auto p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={currentProduct.vendor.avatar} 
                    alt={currentProduct.vendor.name} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-200" 
                  />
                  {currentProduct.vendor.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-brand-primary text-white p-0.5 rounded-full border border-white" title="Verified Seller">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-gray-900">{currentProduct.vendor.name}</span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                      Penjual
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                    <span>{currentProduct.vendor.location}</span>
                    <span>•</span>
                    <span className="flex items-center text-yellow-500 font-semibold">
                      <Star className="w-3 h-3 fill-yellow-400 mr-0.5" /> {currentProduct.vendor.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="px-3 py-1.5 rounded-md border border-gray-200 hover:border-brand-primary hover:text-brand-primary text-xs font-medium text-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Hubungi
                </button>
                <Link
                  href={`/vendor/${currentProduct.vendor.slug}`}
                  className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 transition-colors flex items-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" />
                  Toko
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: TABS */}
        <div className="mt-10 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs">
          
          {/* Tab Header Bar */}
          <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/50">
            <button
              onClick={() => setActiveTab("desc")}
              className={cn(
                "px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer",
                activeTab === "desc" 
                  ? "border-brand-primary text-brand-primary bg-white" 
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
              )}
            >
              Deskripsi Produk
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={cn(
                "px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer",
                activeTab === "specs" 
                  ? "border-brand-primary text-brand-primary bg-white" 
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
              )}
            >
              Spesifikasi ({currentProduct.specs.length})
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={cn(
                "px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer",
                activeTab === "shipping" 
                  ? "border-brand-primary text-brand-primary bg-white" 
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
              )}
            >
              Pengiriman & Garansi
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={cn(
                "px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer",
                activeTab === "reviews" 
                  ? "border-brand-primary text-brand-primary bg-white" 
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
              )}
            >
              Ulasan Pembeli ({reviewsList.length})
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6 md:p-8">
            
            {/* Description Tab */}
            {activeTab === "desc" && (
              <div className="max-w-3xl prose prose-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {currentProduct.description}
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === "specs" && (
              <div className="max-w-2xl">
                <table className="w-full text-sm text-left border border-gray-100 rounded-lg overflow-hidden">
                  <tbody>
                    {currentProduct.specs.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50/60" : "bg-white"}>
                        <th className="px-5 py-3 font-semibold text-gray-700 w-1/3 border-b border-gray-100">
                          {item.label}
                        </th>
                        <td className="px-5 py-3 text-gray-600 border-b border-gray-100">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === "shipping" && (
              <div className="max-w-2xl space-y-4 text-sm text-gray-600">
                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Estimasi Waktu Pengiriman</h4>
                    <p>{currentProduct.shippingInfo.estimatedDelivery}</p>
                    <p className="text-xs text-gray-400 mt-1">{currentProduct.shippingInfo.shippingCost}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Kebijakan Pengembalian (Return Policy)</h4>
                    <p>{currentProduct.shippingInfo.returnPolicy}</p>
                    <p className="text-xs text-gray-400 mt-1">Barang harus dikembalikan dalam kondisi asli lengkap dengan segel dan bukti tanda terima.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Reviews List */}
                <div className="lg:col-span-7 space-y-6">
                  {reviewsList.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-600">Belum ada ulasan untuk produk ini</p>
                      <p className="text-xs text-gray-400">Jadilah orang pertama yang memberikan ulasan!</p>
                    </div>
                  ) : (
                    reviewsList.map((rev) => (
                      <div key={rev.id} className="border-b border-gray-100 pb-5 last:border-none">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={rev.avatar} alt={rev.user} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <span className="text-xs font-bold text-gray-800">{rev.user}</span>
                              <div className="flex items-center gap-0.5 mt-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} className={cn("w-3 h-3", rev.rating >= s ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200")} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-[11px] text-gray-400">{rev.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pl-10.5">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Right: Write Review Form */}
                <div className="lg:col-span-5 bg-gray-50/80 p-5 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-sm text-gray-800 mb-1">Tulis Ulasan Anda</h3>
                  <p className="text-xs text-gray-400 mb-4">Bagikan pengalaman Anda mengenai kualitas produk ini.</p>

                  {reviewSubmitted && (
                    <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Terima kasih! Ulasan Anda telah diterbitkan.
                    </div>
                  )}

                  <form onSubmit={handleAddReview} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Rating Bintang</label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star className={cn("w-5 h-5", newReviewRating >= star ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-300")} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Anda</label>
                      <input 
                        type="text" 
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="Contoh: Jessica"
                        className="w-full text-xs bg-white border border-gray-200 rounded px-3 py-2 outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Ulasan Anda</label>
                      <textarea 
                        rows={3} 
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Ceritakan bagaimana bahan, ukuran, dan kenyamanan produk ini..."
                        className="w-full text-xs bg-white border border-gray-200 rounded px-3 py-2 outline-none focus:border-brand-primary resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Kirim Ulasan
                    </button>
                  </form>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Produk Terkait (Related Products)</h2>
              <Link 
                href={`/category/${currentProduct.categorySlug}`} 
                className="text-xs font-medium text-gray-500 hover:text-brand-primary flex items-center gap-1 transition-colors"
              >
                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CONTACT SELLER MODAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <button 
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentProduct.vendor.avatar} alt={currentProduct.vendor.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Hubungi {currentProduct.vendor.name}</h3>
                <p className="text-xs text-gray-400">Pertanyaan mengenai: {currentProduct.title.substring(0, 30)}...</p>
              </div>
            </div>

            {contactSent ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <h4 className="font-bold text-sm text-gray-800">Pesan Terkirim!</h4>
                <p className="text-xs text-gray-500">Penjual akan menerima notifikasi dan membalas melalui pesan akun Anda.</p>
                <button
                  onClick={() => {
                    setContactSent(false);
                    setContactModalOpen(false);
                  }}
                  className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold rounded text-gray-700"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!contactMessage.trim()) return;
                  setContactSent(true);
                  setContactMessage("");
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pesan Anda</label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Halo, apakah produk ini masih tersedia dan bisa dikirim hari ini?..."
                    className="w-full text-xs border border-gray-200 rounded p-3 outline-none focus:border-brand-primary resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold bg-brand-primary hover:bg-brand-primary-hover text-white rounded shadow-xs"
                  >
                    Kirim Pesan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* REQUEST A QUOTE MODAL */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <button 
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-gray-900 text-base mb-1">Ajukan Penawaran Harga (Quote)</h3>
            <p className="text-xs text-gray-400 mb-4">{currentProduct.title}</p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Penawaran harga Anda berhasil dikirim ke penjual!");
                setQuoteModalOpen(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Harga yang Ditawarkan (IDR)</label>
                <input 
                  type="number" 
                  placeholder="Masukkan nominal tawaran Anda..."
                  className="w-full text-xs border border-gray-200 rounded px-3 py-2 outline-none focus:border-brand-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Jumlah Unit yang Diminta</label>
                <input 
                  type="number" 
                  defaultValue={1}
                  min={1}
                  className="w-full text-xs border border-gray-200 rounded px-3 py-2 outline-none focus:border-brand-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Catatan Tambahan untuk Penjual</label>
                <textarea 
                  rows={3}
                  placeholder="Sebutkan detail pesanan kustom Anda..."
                  className="w-full text-xs border border-gray-200 rounded px-3 py-2 outline-none focus:border-brand-primary resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-brand-primary hover:bg-brand-primary-hover text-white rounded shadow-xs"
                >
                  Kirim Tawaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
