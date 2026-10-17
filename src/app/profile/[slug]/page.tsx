"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Star, 
  Calendar, 
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
  ArrowUpDown
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export interface ProfileProduct {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  price: number | "Free" | "Request a Quote";
  originalPrice?: number | null;
  rating: number;
  reviewsCount: number;
  wishlistCount: number;
  image: string;
  isFeatured?: boolean;
}

const TRENDSHOP_PRODUCTS: ProfileProduct[] = [
  {
    id: "p1",
    slug: "black-midi-skirt",
    title: "Black midi skirt with white flowers",
    category: "Clothing",
    categorySlug: "clothing",
    price: 791186.40,
    originalPrice: 906567.75,
    rating: 5,
    reviewsCount: 14,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p2",
    slug: "vacation-spots",
    title: "Animation of popular vacation spots",
    category: "Video & Audio",
    categorySlug: "video-audio",
    price: 164830.50,
    originalPrice: 247245.75,
    rating: 5,
    reviewsCount: 1,
    wishlistCount: 1,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p3",
    slug: "sneaker-shoes",
    title: "Sneaker shoes men",
    category: "Shoes",
    categorySlug: "shoes",
    price: 1466991.45,
    originalPrice: 1648305.00,
    rating: 0,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p4",
    slug: "sun-hat",
    title: "Sun hat for women protection cap",
    category: "Clothing",
    categorySlug: "clothing",
    price: 435000, // $29
    rating: 0,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p5",
    slug: "light-blue-shirt",
    title: "Light blue women shirt",
    category: "Clothing",
    categorySlug: "clothing",
    price: 807669.45,
    originalPrice: 1137330.45,
    rating: 5,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p6",
    slug: "summer-top-lace",
    title: "Summer fashion top lace",
    category: "Clothing",
    categorySlug: "clothing",
    price: 1071398.25,
    originalPrice: 1302160.95,
    rating: 5,
    reviewsCount: 1,
    wishlistCount: 1,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p7",
    slug: "blanket-pillow",
    title: "Blanket comfort couch pillow",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 585000, // $39
    rating: 0,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=600&q=80",
    isFeatured: true,
  },
  {
    id: "p8",
    slug: "colorful-scarves",
    title: "Colorful women scarves",
    category: "Clothing",
    categorySlug: "clothing",
    price: 659322.00,
    originalPrice: 741737.25,
    rating: 0,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p9",
    slug: "navy-polka-dot-dress",
    title: "Navy polka dot dress",
    category: "Clothing",
    categorySlug: "clothing",
    price: 472457.50,
    rating: 0,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p10",
    slug: "black-fashion-backpack",
    title: "Black fashion women backpack",
    category: "Clothing",
    categorySlug: "clothing",
    price: "Request a Quote",
    rating: 0,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p11",
    slug: "animal-prints",
    title: "Animal colorful digital prints",
    category: "Graphics & Photos",
    categorySlug: "graphics-photos",
    price: 642838.95,
    originalPrice: 791186.40,
    rating: 5,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p12",
    slug: "seychelles-bootie",
    title: "Seychelles women's brown ankle bootie",
    category: "Shoes",
    categorySlug: "shoes",
    price: 1302160.95,
    originalPrice: 1466991.45,
    rating: 0,
    reviewsCount: 0,
    wishlistCount: 0,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p13",
    slug: "vintage-denim-jacket",
    title: "Vintage oversized denim wash jacket",
    category: "Clothing",
    categorySlug: "clothing",
    price: 850000.00,
    originalPrice: 950000.00,
    rating: 5,
    reviewsCount: 3,
    wishlistCount: 4,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p14",
    slug: "ceramic-mug-set",
    title: "Handcrafted artisan ceramic coffee mug set",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 320000.00,
    rating: 5,
    reviewsCount: 2,
    wishlistCount: 2,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p15",
    slug: "gold-minimalist-necklace",
    title: "18K Gold plated minimalist geometric necklace",
    category: "Jewelry & Accessories",
    categorySlug: "jewelry-accessories",
    price: 450000.00,
    originalPrice: 550000.00,
    rating: 5,
    reviewsCount: 4,
    wishlistCount: 5,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p16",
    slug: "montessori-puzzle-toys",
    title: "Wooden educational Montessori animal puzzle",
    category: "Toys & Entertainment",
    categorySlug: "toys-entertainment",
    price: 210000.00,
    rating: 5,
    reviewsCount: 5,
    wishlistCount: 3,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p17",
    slug: "dashboard-template",
    title: "Clean responsive web app dashboard template",
    category: "Web Templates & Code",
    categorySlug: "web-templates-code",
    price: 350000.00,
    originalPrice: 490000.00,
    rating: 5,
    reviewsCount: 8,
    wishlistCount: 12,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p18",
    slug: "lo-fi-beats",
    title: "Lo-Fi chill beats acoustic audio pack",
    category: "Video & Audio",
    categorySlug: "video-audio",
    price: 180000.00,
    rating: 5,
    reviewsCount: 6,
    wishlistCount: 7,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p19",
    slug: "white-canvas-sneakers",
    title: "Classic white canvas low-top sneakers",
    category: "Shoes",
    categorySlug: "shoes",
    price: 620000.00,
    originalPrice: 750000.00,
    rating: 4.8,
    reviewsCount: 3,
    wishlistCount: 2,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p20",
    slug: "woven-macrame-wall",
    title: "Boho woven macrame wall hanging tapestry",
    category: "Home & Living",
    categorySlug: "home-living",
    price: 285000.00,
    rating: 5,
    reviewsCount: 2,
    wishlistCount: 1,
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p21",
    slug: "silver-hoop-earrings",
    title: "Sterling silver statement hoop earrings",
    category: "Jewelry & Accessories",
    categorySlug: "jewelry-accessories",
    price: 195000.00,
    rating: 5,
    reviewsCount: 1,
    wishlistCount: 3,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p22",
    slug: "vector-icon-pack",
    title: "Vector icon pack 500+ commercial SVG icons",
    category: "Graphics & Photos",
    categorySlug: "graphics-photos",
    price: 150000.00,
    originalPrice: 250000.00,
    rating: 5,
    reviewsCount: 12,
    wishlistCount: 8,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p23",
    slug: "folk-travel-track",
    title: "Acoustic folk travel background instrumental",
    category: "Video & Audio",
    categorySlug: "video-audio",
    price: 199000.00,
    rating: 5,
    reviewsCount: 3,
    wishlistCount: 4,
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80",
    isFeatured: false,
  },
  {
    id: "p24",
    slug: "modern-saas-template",
    title: "Modern SaaS landing page template Next.js",
    category: "Web Templates & Code",
    categorySlug: "web-templates-code",
    price: 499000.00,
    originalPrice: 699000.00,
    rating: 5,
    reviewsCount: 7,
    wishlistCount: 15,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80",
    isFeatured: false,
  },
];

const CATEGORIES = [
  "Clothing",
  "Shoes",
  "Home & Living",
  "Jewelry & Accessories",
  "Toys & Entertainment",
  "Graphics & Photos",
  "Video & Audio",
  "Web Templates & Code",
];

const STORE_REVIEWS = [
  {
    id: "rev1",
    author: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "3 days ago",
    productTitle: "Black midi skirt with white flowers",
    comment: "The floral skirt is gorgeous! Material is exceptionally soft and breathable. Arrived packaged very neatly."
  },
  {
    id: "rev2",
    author: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    date: "1 week ago",
    productTitle: "Sneaker shoes men",
    comment: "High quality sneakers, fits true to size and arrived very quickly. Cushioning is superb for daily jogging."
  },
  {
    id: "rev3",
    author: "Emily Watson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    date: "2 weeks ago",
    productTitle: "Animation of popular vacation spots",
    comment: "The animation pack saved me hours of work on my client video project. Clean keyframes and easy to adapt."
  },
  {
    id: "rev4",
    author: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    date: "3 weeks ago",
    productTitle: "Animal colorful digital prints",
    comment: "Beautiful print quality on the animal poster. Colors are vibrant and the museum-grade paper is thick."
  },
  {
    id: "rev5",
    author: "Clara Oswald",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    date: "1 month ago",
    productTitle: "Light blue women shirt",
    comment: "Love the light blue shirt, looks professional yet relaxed. Washes well without shrinking or color fading."
  },
  {
    id: "rev6",
    author: "Jessica Lee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    rating: 5,
    date: "1 month ago",
    productTitle: "Summer fashion top lace",
    comment: "Great seller communication and lightning-fast delivery. The lace details are delicate and top quality."
  }
];

const MY_REVIEWS = [
  {
    id: "mrev1",
    author: "Trendshop",
    avatar: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=100&q=80",
    rating: 5,
    date: "2 months ago",
    productTitle: "Vintage Genuine Leather Belt by CraftStudio",
    comment: "Very durable genuine leather. Used it daily for weeks and it holds up great."
  },
  {
    id: "mrev2",
    author: "Trendshop",
    avatar: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=100&q=80",
    rating: 5,
    date: "3 months ago",
    productTitle: "Minimalist Watch Face UI Kit by DigitalForge",
    comment: "Super well organized Figma components. Made prototyping swift and smooth."
  }
];

export default function ProfilePage() {
  const params = useParams();
  const slug = (params?.slug as string) || "daniel-jones";
  const { formatPrice, addToCart, toggleWishlist, isInWishlist } = useAppContext();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "products" | "followers" | "following" | "reviews" | "my-reviews" | "policies"
  >("products");

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [submittedKeyword, setSubmittedKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recent");

  // Store profile states
  const [showPhone, setShowPhone] = useState(false);
  const [copiedRss, setCopiedRss] = useState(false);

  // Shop details matching screenshot
  const storeName = "Trendshop";
  const storeEmail = "trendshop@codingest.net";
  const storePhone = "+62 812 3456 7890";
  const memberSince = "July 2026";
  const salesCount = 15;
  const ratingScore = 5.0;
  const reviewsCount = 6;

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return TRENDSHOP_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      // Keyword filter
      if (submittedKeyword.trim()) {
        const q = submittedKeyword.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        if (!matchTitle && !matchCat) return false;
      }
      // Price filter
      const numericPrice = typeof product.price === "number" ? product.price : 0;
      if (minPrice && numericPrice < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice && numericPrice > parseFloat(maxPrice)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") {
        const pa = typeof a.price === "number" ? a.price : 0;
        const pb = typeof b.price === "number" ? b.price : 0;
        return pa - pb;
      }
      if (sortBy === "price-high") {
        const pa = typeof a.price === "number" ? a.price : 0;
        const pb = typeof b.price === "number" ? b.price : 0;
        return pb - pa;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [selectedCategory, submittedKeyword, minPrice, maxPrice, sortBy]);

  const handleApplyKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setMinPrice("");
    setMaxPrice("");
    setKeyword("");
    setSubmittedKeyword("");
  };

  const handleCopyRss = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/rss/profile/${slug}`);
      setCopiedRss(true);
      setTimeout(() => setCopiedRss(false), 2500);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#495057] font-sans pb-16">
      {/* 1. STORE COVER BANNER */}
      <div className="w-full bg-[#1a1a1a]">
        <div className="max-w-[1320px] mx-auto overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80"
            alt="Store Cover Banner"
            className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover object-center"
          />
        </div>
      </div>

      {/* 2. STORE PROFILE INFO HEADER (Exactly matches Screenshot 1) */}
      <div className="bg-white border-b border-[#e9ecef]">
        <div className="max-w-[1320px] mx-auto px-4 py-6">
          <div className="flex items-start gap-6">
            
            {/* Profile Avatar (Square with yellow background and dried flowers) */}
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=300&q=80"
                alt={storeName}
                className="w-[125px] h-[125px] sm:w-[135px] sm:h-[135px] rounded-[3px] object-cover border border-gray-200"
              />
            </div>

            {/* Store Details */}
            <div className="space-y-1.5 flex-1">
              {/* Name + Verified Checkmark Badge */}
              <div className="flex items-center gap-1.5">
                <h1 className="text-2xl font-bold text-[#2c333e] leading-none">{storeName}</h1>
                <div className="text-[#0084ff]" title="Verified Store">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>

              {/* Online indicator */}
              <div className="flex items-center gap-1.5 text-xs text-[#6c757d]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Last seen: 3 minutes ago</span>
              </div>

              {/* Rating & Sales */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                  ))}
                  <span className="text-[#6c757d] font-medium ml-1">({reviewsCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#6c757d]">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#6c757d]" />
                  <span>{salesCount} Sales</span>
                </div>
              </div>

              {/* Store Description */}
              <p className="text-xs text-[#6c757d] max-w-3xl leading-relaxed pt-0.5">
                Welcome to our store! We offer a wide range of high-quality products to meet all your needs, from the latest electronics and gadgets to stylish clothing and accessories.
              </p>

              {/* Meta details row: Member since, Show Phone, Email */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-[#6c757d] pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#868e96]" />
                  <span>Member since {memberSince}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#868e96]" />
                  {showPhone ? (
                    <span className="font-semibold text-gray-800">{storePhone}</span>
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
                  <a href={`mailto:${storeEmail}`} className="text-[#6c757d] hover:text-[#00ab97]">
                    {storeEmail}
                  </a>
                </div>
              </div>

              {/* RSS Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCopyRss}
                  className="w-7 h-7 rounded border border-gray-300 hover:border-gray-400 bg-white flex items-center justify-center text-gray-600 hover:text-[#00ab97] transition-colors cursor-pointer"
                  title={copiedRss ? "RSS Link Copied!" : "RSS Feed"}
                  aria-label="RSS Feed"
                >
                  <Rss className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 3. PROFILE NAVIGATION TABS (Screenshot 2) */}
      <div className="bg-white border-b border-[#e9ecef]">
        <div className="max-w-[1320px] mx-auto px-4">
          <nav className="flex items-center gap-8 overflow-x-auto text-[13px] font-semibold text-[#6c757d] whitespace-nowrap scrollbar-none">
            <button
              onClick={() => setActiveTab("products")}
              className={cn(
                "py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "products"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Products</span>
              <span>({TRENDSHOP_PRODUCTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("followers")}
              className={cn(
                "py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "followers"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Followers</span>
              <span>(1)</span>
            </button>

            <button
              onClick={() => setActiveTab("following")}
              className={cn(
                "py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "following"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Following</span>
              <span>(0)</span>
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={cn(
                "py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "reviews"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>Reviews</span>
              <span>({reviewsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab("my-reviews")}
              className={cn(
                "py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
                activeTab === "my-reviews"
                  ? "border-[#2c333e] text-[#2c333e]"
                  : "border-transparent hover:text-[#2c333e]"
              )}
            >
              <span>My Reviews</span>
              <span>(2)</span>
            </button>

            <button
              onClick={() => setActiveTab("policies")}
              className={cn(
                "py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1",
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

      {/* 4. MAIN BODY CONTAINER */}
      <div className="max-w-[1320px] mx-auto px-4 py-8">
        
        {/* TAB 1: PRODUCTS */}
        {activeTab === "products" && (
          <div className="flex flex-col lg:flex-row items-start gap-7">
            
            {/* LEFT SIDEBAR FILTERS (Screenshot 2: Single clean card) */}
            <aside className="w-full lg:w-[250px] shrink-0">
              <div className="bg-white border border-[#dee2e6] rounded-[2px] p-5">
                
                {/* Category Header */}
                <h3 className="font-semibold text-xs text-[#2c333e] mb-3">Category</h3>
                <ul className="space-y-2 text-xs text-[#495057]">
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={cn(
                          "w-full text-left py-0.5 transition-colors cursor-pointer block",
                          selectedCategory === cat
                            ? "text-[#00ab97] font-bold"
                            : "hover:text-[#00ab97]"
                        )}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Divider Line */}
                <div className="border-t border-[#dee2e6] my-4" />

                {/* Price Section */}
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

                {/* Divider Line */}
                <div className="border-t border-[#dee2e6] my-4" />

                {/* Filter by keyword Section */}
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

                {/* Clear Filter if active */}
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

            {/* RIGHT PRODUCTS CONTENT AREA */}
            <div className="flex-1 min-w-0 w-full">
              
              {/* Top Bar: Sort dropdown on right */}
              <div className="flex items-center justify-end mb-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort products"
                    className="px-3 py-1.5 pr-8 bg-white border border-[#dee2e6] rounded-[2px] text-xs font-medium text-[#495057] outline-none focus:border-[#00ab97] cursor-pointer appearance-none"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="price-low">Lowest Price</option>
                    <option value="price-high">Highest Price</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ArrowUpDown className="w-3 h-3 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Products Grid (4 columns on desktop matching Modesy screenshot) */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white border border-[#e9ecef] rounded p-12 text-center text-gray-500">
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
                    const isQuote = product.price === "Request a Quote";
                    const isDiscounted = typeof product.price === "number" && product.originalPrice && product.originalPrice > product.price;

                    return (
                      <div
                        key={product.id}
                        className="group bg-white rounded-[2px] border border-[#e9ecef] hover:border-gray-300 transition-all duration-200 flex flex-col overflow-hidden relative"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-[4/4.2] bg-[#f8f9fa] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.title}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80";
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Green "Featured" Badge matching screenshot */}
                          {product.isFeatured && (
                            <span className="absolute top-2 left-2 bg-[#00ab97] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-xs">
                              Featured
                            </span>
                          )}

                          {/* Hover Action Buttons (Cart & Wishlist round buttons as in Screenshot 3) */}
                          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            {!isQuote && (
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
                                    vendorName: storeName,
                                  });
                                }}
                                className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-[#00ab97] hover:scale-110 transition-all cursor-pointer"
                                title="Add to Cart"
                              >
                                <ShoppingCart className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(product.slug);
                              }}
                              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
                              title="Add to Wishlist"
                            >
                              <Heart className={cn("w-4 h-4", isWish ? "fill-red-500 text-red-500" : "")} />
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-3.5 flex flex-col flex-1">
                          {/* Title */}
                          <Link
                            href={`/product/${product.slug}`}
                            className="text-[13px] font-medium text-[#2c333e] line-clamp-2 hover:text-[#00ab97] transition-colors leading-snug mb-1 min-h-[38px]"
                          >
                            {product.title}
                          </Link>

                          {/* Vendor Name */}
                          <div className="text-[11px] text-[#6c757d] mb-1.5">
                            {storeName}
                          </div>

                          {/* Rating stars (yellow if rated, outline if 0) */}
                          <div className="flex items-center gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "w-3.5 h-3.5",
                                  product.rating >= star
                                    ? "fill-[#ffc107] text-[#ffc107]"
                                    : "fill-transparent text-[#ced4da]"
                                )}
                              />
                            ))}
                          </div>

                          {/* Price & Wishlist row */}
                          <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-gray-50">
                            <div>
                              {isDiscounted && product.originalPrice && (
                                <div className="text-[11px] text-[#6c757d] line-through leading-none mb-0.5">
                                  {formatPrice(product.originalPrice)}
                                </div>
                              )}
                              <div
                                className={cn(
                                  "text-sm font-bold leading-tight",
                                  isQuote
                                    ? "text-[#2c333e] text-xs font-semibold"
                                    : isDiscounted
                                    ? "text-[#00ab97]"
                                    : "text-[#2c333e]"
                                )}
                              >
                                {typeof product.price === "number"
                                  ? formatPrice(product.price)
                                  : product.price}
                              </div>
                            </div>

                            {/* Wishlist count on bottom right (♡ 0 / ♡ 1) */}
                            <button
                              type="button"
                              onClick={() => toggleWishlist(product.slug)}
                              className="flex items-center gap-1 text-xs text-[#6c757d] hover:text-red-500 transition-colors"
                            >
                              <Heart className={cn("w-3.5 h-3.5", isWish ? "fill-red-500 text-red-500" : "")} />
                              <span>{isWish ? product.wishlistCount + 1 : product.wishlistCount}</span>
                            </button>
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

        {/* TAB 2: FOLLOWERS */}
        {activeTab === "followers" && (
          <div className="bg-white border border-[#dee2e6] rounded-[2px] p-6 max-w-4xl">
            <h3 className="font-bold text-sm text-[#2c333e] mb-4">Followers (1)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border border-[#e9ecef] rounded-[2px] flex items-center justify-between gap-3 bg-[#fcfcfc]">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                    alt="David Miller"
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-gray-800">David Miller</h4>
                    <span className="text-[11px] text-gray-500 block">@davidmiller</span>
                    <span className="text-[10px] text-gray-400">Member since May 2024</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded cursor-pointer"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FOLLOWING */}
        {activeTab === "following" && (
          <div className="bg-white border border-[#dee2e6] rounded-[2px] p-12 text-center max-w-xl mx-auto">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-sm text-gray-700">No Following</h3>
            <p className="text-xs text-gray-400 mt-1">This user has not followed any other members yet.</p>
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-white border border-[#dee2e6] rounded-[2px] p-6 flex flex-col sm:flex-row items-center gap-8">
              <div className="text-center sm:text-left sm:border-r border-gray-100 sm:pr-8">
                <div className="text-4xl font-extrabold text-[#2c333e]">{ratingScore.toFixed(1)}</div>
                <div className="flex items-center justify-center sm:justify-start gap-1 my-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#ffc107] text-[#ffc107]" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">Based on {reviewsCount} reviews</span>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      Purchased: <span className="font-medium text-gray-600">{rev.productTitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MY REVIEWS */}
        {activeTab === "my-reviews" && (
          <div className="bg-white border border-[#dee2e6] rounded-[2px] divide-y divide-gray-100 max-w-4xl">
            {MY_REVIEWS.map((rev) => (
              <div key={rev.id} className="p-5 flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    Product: <span className="font-medium text-[#00ab97]">{rev.productTitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: SHOP POLICIES */}
        {activeTab === "policies" && (
          <div className="bg-white border border-[#dee2e6] rounded-[2px] p-6 md:p-8 max-w-4xl space-y-6 text-xs text-gray-600 leading-relaxed">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#00ab97] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2c333e] mb-1">Shipping & Delivery Policy</h4>
                <p>
                  Orders received before 15:00 WIB are dispatched on the same business day. We partner with reputable national couriers (JNE, SiCepat, J&T Express) and express international shipping. All dispatches include full end-to-end tracking updates sent directly to your registered account and email.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-[#00ab97] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2c333e] mb-1">Returns, Exchange & Refund Guarantee</h4>
                <p>
                  We offer a 14-day hassle-free return and size exchange policy. In case of defective or mismatched merchandise, please provide unboxing video evidence within 48 hours of delivery. Refunds are credited instantly to your Modesy Wallet upon parcel inspection.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#00ab97] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2c333e] mb-1">Secure Payments & Escrow Protection</h4>
                <p>
                  All transactions through Trendshop on Modesy are secured via encrypted 256-bit SSL escrow. Funds are securely held until you confirm successful receipt and satisfaction with your items.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex items-start gap-3">
              <Headphones className="w-5 h-5 text-[#00ab97] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2c333e] mb-1">Customer Support Hours</h4>
                <p>
                  Our customer service team is actively online Monday through Saturday from 08:00 to 21:00 WIB. Inquiries are responded to within an average of 15 minutes.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
