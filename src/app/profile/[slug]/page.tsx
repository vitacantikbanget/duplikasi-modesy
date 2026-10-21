"use client";

/**
 * ============================================================================
 * HALAMAN PROFIL PENGGUNA / ADMIN (Member & Vendor Profile Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Menampilkan kartu profil lengkap pengguna atau admin/vendor, status online,
 * badge verifikasi, rating toko, bio, kontak, tautan sosial media,
 * serta tab navigasi produk toko, pengikut, ulasan, dan kebijakan toko.
 * 
 * FITUR:
 * 1. Kartu Profil Pengguna (Avatar, Verifikasi, Status Kehadiran, Kontak, Sosmed).
 * 2. Navigasi Tab (Produk, Pengikut, Mengikuti, Ulasan Pembeli, Ulasan Saya, Kebijakan).
 * 3. Filter Produk Sidebar (Kategori, Rentang Harga Min/Max, Pencarian Kata Kunci).
 * 4. Grid Katalog Produk (Foto, Badge Featured, Rating Bintang, Harga, Wishlist & Cart).
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Star, 
  Mail, 
  Phone, 
  ShoppingBag, 
  Rss, 
  Search, 
  Heart, 
  ShoppingCart, 
  SlidersHorizontal,
  X,
  Users,
  Truck,
  RotateCcw,
  CreditCard,
  Headphones,
  Check,
  MessageSquare
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

/**
 * Tipe data untuk masing-masing item produk katalog profil
 */
export interface ProfileProduct {
  id: string;               // ID unik produk
  slug: string;             // URL slug produk untuk navigasi
  title: string;            // Nama / judul produk
  category: string;         // Nama kategori produk
  categorySlug: string;     // Slug kategori
  price: number | "Free";   // Harga produk (angka USD atau gratis)
  rating: number;           // Skor rating bintang (0 - 5)
  reviewsCount: number;     // Jumlah ulasan yang diterima
  commentsCount: number;    // Jumlah komentar/pertanyaan
  wishlistCount: number;    // Jumlah ditambahkan ke wishlist
  image: string;            // URL gambar thumbnail produk
  isFeatured?: boolean;     // Penanda apakah produk termasuk produk unggulan
}

/**
 * Data mock produk toko Admin (23 produk sesuai katalog demo)
 */
const ADMIN_PRODUCTS: ProfileProduct[] = [
  // Baris 1
  {
    id: "p1",
    slug: "handcrafted-decorative-pillow",
    title: "Handcrafted decorative pillow for embroidered touch",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 35,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p2",
    slug: "modern-spring-husky-saddle-handbag",
    title: "Modern spring husky saddle handbag",
    category: "Clothing",
    categorySlug: "clothing",
    price: 15,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p3",
    slug: "floral-women-sundress",
    title: "Floral women sundress",
    category: "Clothing",
    categorySlug: "clothing",
    price: 29,
    rating: 3,
    reviewsCount: 1,
    commentsCount: 0,
    wishlistCount: 1,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p4",
    slug: "adorable-animal-photo-pack",
    title: "Adorable animal photo pack",
    category: "Graphics & Photos",
    categorySlug: "graphics-photos",
    price: "Free",
    rating: 0,
    reviewsCount: 0,
    commentsCount: 1,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    isFeatured: true,
  },

  // Baris 2
  {
    id: "p5",
    slug: "women-maxi-skirt",
    title: "Women maxi floral skirt",
    category: "Clothing",
    categorySlug: "clothing",
    price: 45,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p6",
    slug: "abstract-outdoor-artist-painting",
    title: "Abstract outdoor artist painting",
    category: "Graphics & Photos",
    categorySlug: "graphics-photos",
    price: 45,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p7",
    slug: "round-accent-straw-handbag",
    title: "Round accent straw handbag with floral scarf",
    category: "Clothing",
    categorySlug: "clothing",
    price: 52,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p8",
    slug: "casual-cotton-trousers-tshirt",
    title: "Casual cotton trousers t-shirt",
    category: "Clothing",
    categorySlug: "clothing",
    price: 24,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    isFeatured: true,
  },

  // Baris 3
  {
    id: "p9",
    slug: "geometric-deer-trophy-sculpture",
    title: "Geometric deer trophy head sculpture",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 19,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 1,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p10",
    slug: "futuristic-landscape-animation",
    title: "Futuristic landscape animation",
    category: "Videos & Audio",
    categorySlug: "videos-audio",
    price: 14,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p11",
    slug: "mens-sport-shoe-boots",
    title: "Men's sport shoe ankle boot",
    category: "Shoes",
    categorySlug: "shoes",
    price: 25,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p12",
    slug: "aldos-katy-shoes",
    title: "Aldo's Katy shoes cut out sandal",
    category: "Shoes",
    categorySlug: "shoes",
    price: 59,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    isFeatured: false,
  },

  // Baris 4
  {
    id: "p13",
    slug: "women-vintage-collage-art-design",
    title: "Women vintage collage art design",
    category: "Clothing",
    categorySlug: "clothing",
    price: 19,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p14",
    slug: "black-sneakers-white-sole",
    title: "Black sneakers with white sole",
    category: "Shoes",
    categorySlug: "shoes",
    price: 49,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p15",
    slug: "womens-red-casual-dress",
    title: "Women's red casual dress in field",
    category: "Clothing",
    categorySlug: "clothing",
    price: 99,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p16",
    slug: "women-black-leather-handbag",
    title: "Women black leather handbag",
    category: "Clothing",
    categorySlug: "clothing",
    price: 75,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    isFeatured: false,
  },

  // Baris 5
  {
    id: "p17",
    slug: "navy-bag-over-the-shoulder",
    title: "Navy bag over the shoulder",
    category: "Clothing",
    categorySlug: "clothing",
    price: 29,
    rating: 5,
    reviewsCount: 2,
    commentsCount: 0,
    wishlistCount: 1,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p18",
    slug: "gym-nylon-fabric-smart-backpack",
    title: "Gym nylon fabric smart backpack",
    category: "Clothing",
    categorySlug: "clothing",
    price: 39,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p19",
    slug: "stylish-lazy-tour-modern",
    title: "Stylish lazy tour modern cut-out",
    category: "Shoes",
    categorySlug: "shoes",
    price: 38,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p20",
    slug: "polka-dot-summer-dress",
    title: "Polka dot summer dress",
    category: "Clothing",
    categorySlug: "clothing",
    price: 45,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    isFeatured: false,
  },

  // Baris 6
  {
    id: "p21",
    slug: "colorful-women-scarves",
    title: "Colorful women scarves",
    category: "Clothing",
    categorySlug: "clothing",
    price: 19,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p22",
    slug: "white-elegant-lace-top",
    title: "White elegant lace top",
    category: "Clothing",
    categorySlug: "clothing",
    price: 42,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p23",
    slug: "clean-casual-men-tshirt",
    title: "Clean casual men t-shirt",
    category: "Clothing",
    categorySlug: "clothing",
    price: 22,
    rating: 0,
    reviewsCount: 0,
    commentsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    isFeatured: false,
  },
];

/**
 * Daftar kategori untuk filter sidebar
 */
const CATEGORIES = [
  "Clothing",
  "Shoes",
  "Home & Living",
  "Jewelry & Accessories",
  "Toys & Entertainment",
  "Graphics & Photos",
  "Videos & Audio",
];

/**
 * Data mock ulasan yang diterima toko
 */
const STORE_REVIEWS = [
  {
    id: "rev1",
    author: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "3 days ago",
    productTitle: "Floral women sundress",
    comment: "The dress fits perfectly and the fabric is fantastic! Will definitely purchase from Admin again."
  },
  {
    id: "rev2",
    author: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    date: "1 week ago",
    productTitle: "Navy bag over the shoulder",
    comment: "Super fast shipping and very high quality stitching on the bag. Highly recommended!"
  }
];

export default function ProfilePage() {
  const params = useParams();
  const slug = (params?.slug as string) || "admin";
  const { formatPrice, addToCart, toggleWishlist, isInWishlist } = useAppContext();

  // State untuk navigasi tab profil yang sedang aktif
  const [activeTab, setActiveTab] = useState<
    "products" | "followers" | "following" | "reviews" | "my-reviews" | "policies"
  >("products");

  // State untuk filter produk di tab 'Products'
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [submittedKeyword, setSubmittedKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");

  // State tampilan interaktif
  const [showPhone, setShowPhone] = useState(false);
  const [copiedRss, setCopiedRss] = useState(false);

  // Metadata detail admin/vendor
  const profileName = "Admin";
  const profileEmail = "admin@example.com";
  const profilePhone = "+1 234 567 8900";
  const memberSince = "July 2018";
  const salesCount = 11;
  const ratingScore = "5/5";
  const bio = "We offer a wide variety of products ranging from everyday essentials to specialty items, all carefully selected to meet your needs and exceed your expectations.";

  /**
   * Filter dan sort produk berdasarkan kategori, kata kunci, rentang harga, dan pengurutan
   */
  const filteredProducts = useMemo(() => {
    return ADMIN_PRODUCTS.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      if (submittedKeyword.trim()) {
        const q = submittedKeyword.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        if (!matchTitle && !matchCat) return false;
      }
      const numPrice = typeof product.price === "number" ? product.price : 0;
      if (minPrice && numPrice < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice && numPrice > parseFloat(maxPrice)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const pa = typeof a.price === "number" ? a.price : 0;
      const pb = typeof b.price === "number" ? b.price : 0;
      if (sortBy === "price-low") return pa - pb;
      if (sortBy === "price-high") return pb - pa;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, submittedKeyword, minPrice, maxPrice, sortBy]);

  // Handler submit pencarian kata kunci
  const handleApplyKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedKeyword(keyword);
  };

  // Handler reset semua filter produk
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setMinPrice("");
    setMaxPrice("");
    setKeyword("");
    setSubmittedKeyword("");
  };

  // Handler menyalin tautan RSS Feed ke clipboard
  const handleCopyRss = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/rss/profile/${slug}`);
      setCopiedRss(true);
      setTimeout(() => setCopiedRss(false), 2000);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#495057] font-sans pb-16">
      
      {/* 1. KARTU PROFIL UTAMA (Header Info Card) */}
      <div className="max-w-[1320px] mx-auto px-4 pt-6">
        <div className="bg-white border border-[#dee2e6] rounded-[2px] p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            
            {/* Foto Avatar Pengguna / Admin */}
            <div className="shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=300&q=80"
                alt={profileName}
                className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-[3px] object-cover border border-[#e9ecef]"
              />
            </div>

            {/* Rincian Profil & Biodata */}
            <div className="flex-1 space-y-1.5">
              
              {/* Nama Pengguna & Lencana Verifikasi Checklist Cyan */}
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-bold text-[#2c333e] leading-tight">
                  {profileName}
                </h1>
                <div 
                  className="w-4 h-4 rounded-full bg-[#00bcd4] text-white flex items-center justify-center shrink-0" 
                  title="Verified User"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>

              {/* Indikator Online (Last seen: just now) */}
              <div className="flex items-center gap-1.5 text-xs text-[#6c757d]">
                <span className="w-2 h-2 rounded-[1px] bg-[#28a745] inline-block" />
                <span>Last seen: just now</span>
              </div>

              {/* Rating Toko & Total Penjualan */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                  ))}
                  <span className="text-[#495057] font-medium ml-1.5">{ratingScore}</span>
                </div>
                <span className="text-[#ced4da]">|</span>
                <div className="flex items-center gap-1 text-[#6c757d]">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#868e96]" />
                  <span>{salesCount} Sales</span>
                </div>
              </div>

              {/* Deskripsi Singkat / Bio */}
              <p className="text-xs text-[#6c757d] max-w-4xl leading-relaxed pt-0.5">
                {bio}
              </p>

              {/* Informasi Kontak & Tanggal Bergabung */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-[#6c757d] pt-1">
                <div className="flex items-center gap-1.5">
                  <span>Member since {memberSince}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#868e96]" />
                  {showPhone ? (
                    <span className="font-semibold text-gray-800">{profilePhone}</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowPhone(true)}
                      className="text-[#00ab97] hover:underline font-medium cursor-pointer"
                    >
                      Show
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#868e96]" />
                  <a href={`mailto:${profileEmail}`} className="text-[#6c757d] hover:text-[#00ab97]">
                    {profileEmail}
                  </a>
                </div>
              </div>

              {/* Deretan Tombol Sosial Media Melingkar */}
              <div className="flex items-center gap-1.5 pt-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full border border-gray-300 hover:border-[#3b5998] hover:text-[#3b5998] flex items-center justify-center text-[10px] text-gray-500 transition-colors" title="Facebook">f</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full border border-gray-300 hover:border-black hover:text-black flex items-center justify-center text-[10px] text-gray-500 transition-colors" title="Twitter">𝕏</a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full border border-gray-300 hover:border-[#bd081c] hover:text-[#bd081c] flex items-center justify-center text-[10px] text-gray-500 transition-colors" title="Pinterest">p</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full border border-gray-300 hover:border-[#e1306c] hover:text-[#e1306c] flex items-center justify-center text-[10px] text-gray-500 transition-colors" title="Instagram">ig</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full border border-gray-300 hover:border-[#0077b5] hover:text-[#0077b5] flex items-center justify-center text-[10px] text-gray-500 transition-colors" title="LinkedIn">in</a>
                <a href="https://vk.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full border border-gray-300 hover:border-[#4c75a3] hover:text-[#4c75a3] flex items-center justify-center text-[10px] text-gray-500 transition-colors" title="VK">vk</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full border border-gray-300 hover:border-[#ff0000] hover:text-[#ff0000] flex items-center justify-center text-[10px] text-gray-500 transition-colors" title="YouTube">▶</a>
                <button type="button" onClick={handleCopyRss} className="w-6 h-6 rounded-full border border-gray-300 hover:border-[#ee802f] hover:text-[#ee802f] flex items-center justify-center text-[10px] text-gray-500 transition-colors cursor-pointer" title={copiedRss ? "Copied RSS link!" : "RSS Feed"}>
                  <Rss className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 2. TAB NAVIGASI PROFIL */}
      <div className="max-w-[1320px] mx-auto px-4 mt-6">
        <div className="border-b border-[#dee2e6]">
          <nav className="flex items-center gap-8 overflow-x-auto text-[13px] font-semibold text-[#6c757d] whitespace-nowrap scrollbar-none">
            <button
              onClick={() => setActiveTab("products")}
              className={cn(
                "py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "products"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Products ({ADMIN_PRODUCTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("followers")}
              className={cn(
                "py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "followers"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Followers (0)</span>
            </button>

            <button
              onClick={() => setActiveTab("following")}
              className={cn(
                "py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "following"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Following (1)</span>
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={cn(
                "py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "reviews"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Reviews (2)</span>
            </button>

            <button
              onClick={() => setActiveTab("my-reviews")}
              className={cn(
                "py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "my-reviews"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>My Reviews (0)</span>
            </button>

            <button
              onClick={() => setActiveTab("policies")}
              className={cn(
                "py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "policies"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Shop Policies</span>
            </button>
          </nav>
        </div>
      </div>

      {/* 3. KONTEN UTAMA SESUAI TAB YANG AKTIF */}
      <div className="max-w-[1320px] mx-auto px-4 py-6">
        
        {/* TAB 1: DAFTAR PRODUK (PRODUCTS) */}
        {activeTab === "products" && (
          <div className="flex flex-col lg:flex-row items-start gap-6">
            
            {/* SIDEBAR FILTER PRODUK (KIRI) */}
            <aside className="w-full lg:w-[240px] shrink-0">
              <div className="bg-white border border-[#dee2e6] rounded-[2px] p-4">
                
                {/* Filter Kategori */}
                <h3 className="font-semibold text-xs text-[#2c333e] mb-3">Category</h3>
                <ul className="space-y-1.5 text-xs text-[#495057]">
                  <li>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      className={cn(
                        "w-full text-left py-0.5 transition-colors cursor-pointer block",
                        selectedCategory === null
                          ? "text-[#00ab97] font-semibold"
                          : "hover:text-[#00ab97]"
                      )}
                    >
                      All Categories
                    </button>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={cn(
                          "w-full text-left py-0.5 transition-colors cursor-pointer block",
                          selectedCategory === cat
                            ? "text-[#00ab97] font-semibold"
                            : "hover:text-[#00ab97]"
                        )}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#dee2e6] my-4" />

                {/* Filter Rentang Harga */}
                <h3 className="font-semibold text-xs text-[#2c333e] mb-3">Price</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-[#dee2e6] rounded-[2px] outline-none focus:border-[#00ab97]"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-[#dee2e6] rounded-[2px] outline-none focus:border-[#00ab97]"
                  />
                </div>

                <div className="border-t border-[#dee2e6] my-4" />

                {/* Filter Berdasarkan Kata Kunci */}
                <h3 className="font-semibold text-xs text-[#2c333e] mb-3">Filter by keyword</h3>
                <form onSubmit={handleApplyKeyword} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-[#dee2e6] rounded-[2px] outline-none focus:border-[#00ab97]"
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-[#f8f9fa] hover:bg-[#e9ecef] border border-[#dee2e6] text-xs font-semibold text-[#495057] rounded-[2px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-gray-500" /> Filter
                  </button>
                </form>

                {/* Tombol Reset Filter */}
                {(selectedCategory || minPrice || maxPrice || submittedKeyword) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="w-full mt-3 py-1.5 text-[11px] text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-[2px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" /> Reset Filter
                  </button>
                )}

              </div>
            </aside>

            {/* AREA KATALOG PRODUK (KANAN) */}
            <div className="flex-1 min-w-0 w-full">
              
              {/* Baris Atas: Dropdown Pengurutan */}
              <div className="flex items-center justify-end mb-4">
                <div className="relative">
                  <div className="flex items-center gap-1 px-3 py-1 bg-white border border-[#dee2e6] rounded-[2px] text-xs text-[#495057]">
                    <SlidersHorizontal className="w-3 h-3 text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label="Sort products"
                      className="bg-transparent border-none text-xs text-[#495057] outline-none cursor-pointer pr-1"
                    >
                      <option value="default">Sort: Default</option>
                      <option value="recent">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid Produk 4 Kolom */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white border border-[#dee2e6] rounded-[2px] p-12 text-center text-gray-500">
                  <SlidersHorizontal className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p className="font-semibold text-sm text-gray-700">No products found.</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-3 text-xs text-[#00ab97] hover:underline font-semibold"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => {
                    const isWish = isInWishlist(product.slug);

                    return (
                      <div
                        key={product.id}
                        className="group bg-white rounded-[2px] border border-[#dee2e6] hover:border-gray-400 transition-all duration-200 flex flex-col overflow-hidden relative"
                      >
                        {/* Container Gambar Thumbnail */}
                        <div className="relative aspect-square bg-[#f8f9fa] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80";
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Badge Hijau "Featured" untuk produk unggulan */}
                          {product.isFeatured && (
                            <span className="absolute top-2 left-2 bg-[#28a745] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px]">
                              Featured
                            </span>
                          )}

                          {/* Tombol Cepat saat Hover (Add to Cart & Wishlist) */}
                          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart({
                                  id: product.id,
                                  productSlug: product.slug,
                                  title: product.title,
                                  price: typeof product.price === "number" ? product.price : 0,
                                  imageUrl: product.image,
                                  quantity: 1,
                                  vendorName: profileName,
                                });
                              }}
                              className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-[#00ab97] transition-all cursor-pointer"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(product.slug);
                              }}
                              className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-red-500 transition-all cursor-pointer"
                              title="Add to Wishlist"
                            >
                              <Heart className={cn("w-3.5 h-3.5", isWish ? "fill-red-500 text-red-500" : "")} />
                            </button>
                          </div>
                        </div>

                        {/* Informasi Produk (Judul, Vendor, Bintang, Harga) */}
                        <div className="p-3 flex flex-col flex-1">
                          <Link
                            href={`/product/${product.slug}`}
                            className="text-[12px] font-semibold text-[#2c333e] line-clamp-2 hover:text-[#00ab97] transition-colors leading-snug min-h-[32px]"
                          >
                            {product.title}
                          </Link>

                          <div className="text-[11px] text-[#868e96] mt-1 mb-1.5">
                            {profileName}
                          </div>

                          <div className="flex items-center justify-between text-xs text-[#868e96] mb-2">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={cn(
                                    "w-3 h-3",
                                    product.rating >= star
                                      ? "fill-[#ffc107] text-[#ffc107]"
                                      : "fill-transparent text-[#ced4da]"
                                  )}
                                />
                              ))}
                              {product.reviewsCount > 0 && (
                                <span className="text-[10px] ml-0.5 text-gray-500">
                                  ({product.reviewsCount})
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1 text-[11px] text-gray-400">
                              <Heart className="w-3 h-3" />
                              <span>{product.wishlistCount}</span>
                            </div>
                          </div>

                          <div className="mt-auto pt-1 flex items-center justify-between">
                            <span className="text-[13px] font-bold text-[#28a745]">
                              {product.price === "Free" 
                                ? "Free" 
                                : typeof product.price === "number" 
                                ? formatPrice(product.price) 
                                : product.price}
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        )}

        {/* TAB 2: DAFTAR PENGIKUT (FOLLOWERS) */}
        {activeTab === "followers" && (
          <div className="bg-white border border-[#dee2e6] rounded-[2px] p-8 text-center max-w-xl mx-auto">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-[#2c333e]">No Followers</h3>
            <p className="text-xs text-gray-400 mt-1">This user does not have any followers yet.</p>
          </div>
        )}

        {/* TAB 3: DAFTAR YANG DIIKUTI (FOLLOWING) */}
        {activeTab === "following" && (
          <div className="bg-white border border-[#dee2e6] rounded-[2px] p-6 max-w-4xl">
            <h3 className="font-bold text-sm text-[#2c333e] mb-4">Following (1)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border border-[#e9ecef] rounded-[2px] flex items-center justify-between gap-3 bg-[#fcfcfc]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                    alt="Daniel Jones"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-gray-800">Daniel Jones</h4>
                    <span className="text-[11px] text-gray-500 block">@danieljones</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded cursor-pointer"
                >
                  Unfollow
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ULASAN TOKO (REVIEWS) */}
        {activeTab === "reviews" && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-white border border-[#dee2e6] rounded-[2px] p-6 flex flex-col sm:flex-row items-center gap-8">
              <div className="text-center sm:text-left sm:border-r border-gray-100 sm:pr-8">
                <div className="text-3xl font-extrabold text-[#2c333e]">5.0</div>
                <div className="flex items-center justify-center sm:justify-start gap-1 my-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#ffc107] text-[#ffc107]" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">Based on 2 reviews</span>
              </div>

              <div className="flex-1 w-full space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-12">5 Star</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ffc107] w-full" />
                  </div>
                  <span className="w-8 text-right font-medium">100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12">4 Star</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ffc107] w-0" />
                  </div>
                  <span className="w-8 text-right font-medium text-gray-400">0%</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#dee2e6] rounded-[2px] divide-y divide-gray-100">
              {STORE_REVIEWS.map((rev) => (
                <div key={rev.id} className="p-5 flex items-start gap-4">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-gray-900">{rev.author}</span>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-[#ffc107] text-[#ffc107]" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {rev.comment}
                    </p>
                    <div className="mt-2 text-[11px] text-gray-400">
                      Product: <span className="font-medium text-gray-600">{rev.productTitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ULASAN SAYA (MY REVIEWS) */}
        {activeTab === "my-reviews" && (
          <div className="bg-white border border-[#dee2e6] rounded-[2px] p-8 text-center max-w-xl mx-auto">
            <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-[#2c333e]">No Reviews</h3>
            <p className="text-xs text-gray-400 mt-1">This user has not written any product reviews yet.</p>
          </div>
        )}

        {/* TAB 6: KEBIJAKAN TOKO (SHOP POLICIES) */}
        {activeTab === "policies" && (
          <div className="bg-white border border-[#dee2e6] rounded-[2px] p-6 md:p-8 max-w-4xl space-y-6 text-xs text-gray-600 leading-relaxed">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#00ab97] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2c333e] mb-1">Shipping & Delivery Policy</h4>
                <p>
                  Orders received before 15:00 are processed on the same business day. We partner with reputable carriers for domestic and international shipments.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-[#00ab97] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2c333e] mb-1">Returns, Exchange & Refund Guarantee</h4>
                <p>
                  We offer a 14-day return and exchange policy. In case of defective or mismatched merchandise, please contact our support team.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#00ab97] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2c333e] mb-1">Secure Payments</h4>
                <p>
                  All transactions through Admin store on Modesy are secured via encrypted SSL escrow.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex items-start gap-3">
              <Headphones className="w-5 h-5 text-[#00ab97] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2c333e] mb-1">Customer Support Hours</h4>
                <p>
                  Our customer service team is actively online Monday through Friday from 09:00 to 18:00.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
