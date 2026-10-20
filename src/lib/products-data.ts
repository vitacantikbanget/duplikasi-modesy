/**
 * ============================================================================
 * Mock Database Katalog Produk Modesy (Modesy Products Catalog Mock Data)
 * ============================================================================
 * Berkas ini menyediakan kumpulan data produk tiruan (mock data) yang mencerminkan
 * skema dan jenis produk asli Modesy:
 * - Produk Fisik (Physical Products): Barang berwujud dengan varian warna, ukuran,
 *   stok inventaris, SKU, dan informasi pengiriman.
 * - Produk Digital (Digital Products): File yang dapat diunduh langsung (misal lagu Piano).
 * - Iklan Baris / Digunakan (Ordinary / Classifieds Listing): Barang bekas untuk COD/lokal.
 * - Permintaan Penawaran (Request a Quote): Produk B2B khusus yang memerlukan penawaran harga.
 *
 * Tipe data diimpor langsung dari `@/types/product` untuk menjaga konsistensi tipe
 * data di seluruh aplikasi (Single Source of Truth).
 */

import type { ProductItem, ProductReview, ProductVariationColor } from "@/types/product";

// Ekspor kembali tipe data agar berkas lain yang mengimpor dari sini tetap kompatibel
export type { ProductItem, ProductReview, ProductVariationColor };

export const ALL_PRODUCTS: ProductItem[] = [
  {
    id: "f1",
    slug: "black-midi-skirt",
    title: "Black midi skirt with white flowers",
    category: "Clothing",
    categorySlug: "clothing",
    subcategory: "Women's Clothing",
    subcategorySlug: "womens-clothing",
    price: 791186.40,
    originalPrice: 906567.75,
    discount: 13,
    productType: "physical",
    condition: "New",
    stock: 24,
    sku: "SKU-BMS-001",
    rating: 4.8,
    reviewsCount: 14,
    images: [
      "/images/products/black-midi-skirt.webp",
      "https://images.unsplash.com/photo-1583496661160-c588c4af16b2?w=500&q=80"
    ],
    colors: [
      { name: "Black Floral", hex: "#1a1a1a" },
      { name: "Navy Floral", hex: "#1e3a5f" },
      { name: "Cream White", hex: "#f5f5dc" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    vendor: {
      name: "Trendshop",
      slug: "trendshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 4.9,
      joinedDate: "Jan 2024",
      location: "Jakarta, Indonesia",
      verified: true
    },
    description: `
      Elevate your wardrobe with this charming black midi skirt decorated with delicate white flower prints. 
      Crafted from breathable, lightweight rayon blend fabric, it features an elastic waistband with drawstring closure, 
      flowing A-line silhouette, and stylish pleats that ensure comfort and flattering movement throughout the day.
      
      Highlights:
      • High waist with comfortable elasticated band
      • All-over floral botanical pattern
      • Flowy midi-length cut with soft lining
      • Machine washable (cold delicate cycle recommended)
    `,
    specs: [
      { label: "Material", value: "95% Viscose, 5% Elastane" },
      { label: "Pattern", value: "Floral Print" },
      { label: "Length", value: "Midi (Calf length)" },
      { label: "Closure", value: "Elastic waistband" },
      { label: "Condition", value: "New with tags" }
    ],
    shippingInfo: {
      estimatedDelivery: "2 - 4 Business Days",
      shippingCost: "Calculated at checkout (Free above Rp 500.000)",
      returnPolicy: "14 days unconditional return & refund"
    },
    reviews: [
      {
        id: "r1",
        user: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Absolutely in love with this skirt! The fabric feels premium, soft, and it falls gracefully."
      },
      {
        id: "r2",
        user: "Amanda Cole",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "True to size! Got so many compliments at work and family gatherings."
      }
    ]
  },
  {
    id: "f2",
    slug: "decorative-pillow",
    title: "Handcrafted decorative pillow for a luxurious home",
    category: "Home & Living",
    categorySlug: "home-living",
    subcategory: "Decorative Pillows",
    subcategorySlug: "decorative-pillows",
    price: 972499.95,
    originalPrice: 1137330.45,
    discount: 14,
    productType: "physical",
    condition: "Used - Like New",
    stock: 12,
    sku: "SKU-HDP-002",
    rating: 5.0,
    reviewsCount: 8,
    images: [
      "/images/products/decorative-pillow.webp",
      "/images/products/decorative-pillow-2.webp"
    ],
    colors: [
      { name: "Mustard Gold", hex: "#e5a93c" },
      { name: "Emerald Green", hex: "#1f5f4b" },
      { name: "Charcoal Grey", hex: "#3a3a3a" }
    ],
    sizes: ["40x40 cm", "45x45 cm", "50x50 cm"],
    vendor: {
      name: "Admin",
      slug: "admin",
      avatar: "https://i.pravatar.cc/150?u=admin",
      rating: 5.0,
      joinedDate: "2023",
      location: "Bandung, Indonesia",
      verified: true
    },
    description: `
      Give your sofa, accent chair, or bed a cozy upgrade with our handcrafted luxury decorative pillow. 
      Featuring premium textured velvet weave and concealed zipper construction for a seamless, upscale look.
    `,
    specs: [
      { label: "Cover Material", value: "100% Cotton Velvet" },
      { label: "Fill Material", value: "Hypoallergenic Microfiber" },
      { label: "Shape", value: "Square" },
      { label: "Care Instructions", value: "Spot clean or dry clean only" }
    ],
    shippingInfo: {
      estimatedDelivery: "3 - 5 Business Days",
      shippingCost: "Calculated at checkout",
      returnPolicy: "7 days return if damaged on arrival"
    },
    reviews: [
      {
        id: "r3",
        user: "Budi Santoso",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "Bahan sangat halus, jahitan rapi sekali. Ruang tamu jadi terlihat mewah!"
      }
    ]
  },
  {
    id: "f3",
    slug: "floral-sundress-2",
    title: "Floral women sundress for summer",
    category: "Clothing",
    categorySlug: "clothing",
    subcategory: "Women's Clothing",
    subcategorySlug: "womens-clothing",
    price: 1318644,
    originalPrice: 1466991.45,
    discount: 10,
    productType: "physical",
    stock: 18,
    sku: "SKU-FSD-003",
    rating: 4.7,
    reviewsCount: 19,
    images: [
      "/images/products/floral-sundress.webp",
      "/images/products/floral-sundress-2.webp"
    ],
    colors: [
      { name: "Sunshine Yellow", hex: "#f4c430" },
      { name: "Coral Peach", hex: "#f08080" }
    ],
    sizes: ["S", "M", "L"],
    vendor: {
      name: "Admin",
      slug: "admin",
      avatar: "https://i.pravatar.cc/150?u=admin",
      rating: 5.0,
      joinedDate: "2023",
      location: "Jakarta, Indonesia",
      verified: true
    },
    description: `
      Embrace sunshine and breezy afternoons in this lightweight floral sundress. 
      Designed with adjustable spaghetti straps, a ruffled hemline, and a tie back for a customized silhouette.
    `,
    specs: [
      { label: "Fabric", value: "100% Breathable Chiffon" },
      { label: "Neckline", value: "Sweetheart Neck" },
      { label: "Style", value: "Bohemian Summer" }
    ],
    shippingInfo: {
      estimatedDelivery: "2 - 4 Business Days",
      shippingCost: "Standard shipping available",
      returnPolicy: "14 days exchange policy"
    },
    reviews: []
  },
  {
    id: "f4",
    slug: "sun-hat",
    title: "Sun hat for women protection cap",
    category: "Clothing",
    categorySlug: "clothing",
    subcategory: "Accessories",
    subcategorySlug: "accessories",
    price: "Request a Quote",
    productType: "quote",
    stock: 50,
    sku: "SKU-SHT-004",
    rating: 4.9,
    reviewsCount: 6,
    images: [
      "/images/products/sun-hat.webp",
      "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=500&q=80"
    ],
    vendor: {
      name: "Trendshop",
      slug: "trendshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 4.9,
      joinedDate: "Jan 2024",
      location: "Bali, Indonesia",
      verified: true
    },
    description: `
      Handwoven wide-brim straw hat providing maximum UPF 50+ sun protection. 
      Available for custom wholesale orders and tailored requests. Request a quote directly from the seller.
    `,
    specs: [
      { label: "Material", value: "Natural Papyrus Straw" },
      { label: "Brim Width", value: "12 cm" },
      { label: "Protection", value: "UPF 50+ UV Guard" }
    ],
    shippingInfo: {
      estimatedDelivery: "Negotiable upon quote agreement",
      shippingCost: "Included in quotation",
      returnPolicy: "Subject to seller terms"
    },
    reviews: []
  },
  {
    id: "f5",
    slug: "sneaker-shoes",
    title: "Sneaker shoes men sport streetwear",
    category: "Shoes",
    categorySlug: "shoes",
    subcategory: "Men's Shoes",
    subcategorySlug: "mens-shoes",
    price: 1466991.45,
    originalPrice: 1648305,
    discount: 11,
    productType: "physical",
    condition: "Used - Good",
    stock: 35,
    sku: "SKU-SNK-005",
    rating: 4.8,
    reviewsCount: 22,
    images: [
      "/images/products/sneaker-shoes.webp",
      "/images/products/black-sneakers-2.webp"
    ],
    colors: [
      { name: "Vibrant Crimson Red", hex: "#e63946" },
      { name: "Stealth Black", hex: "#111111" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    vendor: {
      name: "Trendshop",
      slug: "trendshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 4.9,
      joinedDate: "Jan 2024",
      location: "Surabaya, Indonesia",
      verified: true
    },
    description: `
      Engineered for lifestyle comfort and high-energy urban movement. 
      Featuring responsive EVA cushioning, breathable mesh upper, and anti-slip rubber outsoles.
    `,
    specs: [
      { label: "Upper Material", value: "Knit Mesh & TPU Overlays" },
      { label: "Outsole", value: "Anti-slip Rubber" },
      { label: "Insole", value: "Memory Foam Cushioning" }
    ],
    shippingInfo: {
      estimatedDelivery: "2 - 3 Business Days",
      shippingCost: "Standard Delivery",
      returnPolicy: "30 days size exchange guarantee"
    },
    reviews: [
      {
        id: "r4",
        user: "Rian Pratama",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
        rating: 5,
        date: "1 week ago",
        comment: "Sangat empuk dan nyaman dipakai lari maupun nongkrong. Rekomended!"
      }
    ]
  },
  {
    id: "f8",
    slug: "animal-photo",
    title: "Adorable animals digital photo pack (High Res)",
    category: "Graphics & Photos",
    categorySlug: "graphics-photos",
    subcategory: "Stock Photos",
    subcategorySlug: "stock-photos",
    price: "Free",
    productType: "digital",
    stock: 9999,
    sku: "SKU-ANP-008",
    rating: 5.0,
    reviewsCount: 15,
    images: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80",
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&q=80"
    ],
    vendor: {
      name: "Admin",
      slug: "admin",
      avatar: "https://i.pravatar.cc/150?u=admin",
      rating: 5.0,
      joinedDate: "2023",
      location: "Global",
      verified: true
    },
    description: `
      Collection of 20 ultra high-resolution animal portrait photographs in JPEG & RAW formats. 
      Licensed for personal and commercial creative projects. Instant download upon free checkout.
    `,
    specs: [
      { label: "Format", value: "ZIP archive (JPEG, 300 DPI)" },
      { label: "Resolution", value: "6000 x 4000 px" },
      { label: "License", value: "Royalty Free Commercial" }
    ],
    shippingInfo: {
      estimatedDelivery: "Instant Digital Download",
      shippingCost: "Free",
      returnPolicy: "Digital products are non-refundable"
    },
    reviews: []
  },
  {
    id: "f9",
    slug: "piano-music",
    title: "Moment of inspiration piano acoustic music",
    category: "Video & Audio",
    categorySlug: "video-audio",
    subcategory: "Music Tracks",
    subcategorySlug: "music-tracks",
    price: 247245.75,
    originalPrice: 560423.70,
    discount: 56,
    productType: "digital",
    stock: 9999,
    sku: "SKU-MUS-009",
    rating: 5.0,
    reviewsCount: 12,
    images: [
      "/images/products/piano-music.webp",
      "https://images.unsplash.com/photo-1520523839898-50712825e3a7?w=500&q=80"
    ],
    vendor: {
      name: "Admin",
      slug: "admin",
      avatar: "https://i.pravatar.cc/150?u=admin",
      rating: 5.0,
      joinedDate: "2023",
      location: "Global",
      verified: true
    },
    description: `
      An emotional, gentle, and uplifting piano composition accompanied by subtle cinematic strings. 
      Ideal for documentaries, commercials, travel vlogs, and wedding cinematography.
    `,
    specs: [
      { label: "Audio Format", value: "WAV (24-bit, 48kHz) & MP3 (320kbps)" },
      { label: "Tempo", value: "72 BPM" },
      { label: "Duration", value: "3:45" }
    ],
    shippingInfo: {
      estimatedDelivery: "Instant Download Link in My Account",
      shippingCost: "Free",
      returnPolicy: "Instant digital access"
    },
    reviews: []
  },
  {
    id: "f10",
    slug: "vacation-spots",
    title: "Animation of popular vacation spots motion pack",
    category: "Video & Audio",
    categorySlug: "video-audio",
    subcategory: "Motion Graphics",
    subcategorySlug: "motion-graphics",
    price: 164830.50,
    originalPrice: 247245.75,
    discount: 33,
    productType: "digital",
    stock: 9999,
    sku: "SKU-VAC-010",
    rating: 5.0,
    reviewsCount: 18,
    images: [
      "/images/products/vacation-spots.webp",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80"
    ],
    vendor: {
      name: "Trendshop",
      slug: "trendshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 4.9,
      joinedDate: "Jan 2024",
      location: "Global",
      verified: true
    },
    description: `
      15 high-quality animated travel destination stickers and title cards for After Effects & Premiere Pro.
    `,
    specs: [
      { label: "Software Compatibility", value: "After Effects CC+, Premiere Pro Mogrt" },
      { label: "Resolution", value: "4K (3840 x 2160)" }
    ],
    shippingInfo: {
      estimatedDelivery: "Instant Digital Download",
      shippingCost: "Free",
      returnPolicy: "Digital goods policy"
    },
    reviews: []
  },
  {
    id: "f11",
    slug: "light-blue-shirt",
    title: "Light blue women classic casual shirt",
    category: "Clothing",
    categorySlug: "clothing",
    subcategory: "Women's Clothing",
    subcategorySlug: "womens-clothing",
    price: 807669.45,
    originalPrice: 1137330.45,
    discount: 29,
    productType: "physical",
    stock: 15,
    sku: "SKU-LBS-011",
    rating: 5.0,
    reviewsCount: 7,
    images: [
      "/images/products/light-blue-shirt.webp",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80"
    ],
    colors: [
      { name: "Pastel Light Blue", hex: "#a0c4e2" },
      { name: "Crisp White", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL"],
    vendor: {
      name: "Trendshop",
      slug: "trendshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 4.9,
      joinedDate: "Jan 2024",
      location: "Jakarta, Indonesia",
      verified: true
    },
    description: `
      Timeless button-down collared shirt tailored with a relaxed modern fit. 
      Crafted from 100% premium long-staple organic cotton.
    `,
    specs: [
      { label: "Fabric", value: "100% Organic Cotton" },
      { label: "Fit", value: "Regular Relaxed" }
    ],
    shippingInfo: {
      estimatedDelivery: "2 - 3 Business Days",
      shippingCost: "Standard shipping",
      returnPolicy: "14 days return"
    },
    reviews: []
  },
  {
    id: "f12",
    slug: "summer-top-2",
    title: "Summer fashion top lace with elegant sleeves",
    category: "Clothing",
    categorySlug: "clothing",
    subcategory: "Women's Clothing",
    subcategorySlug: "womens-clothing",
    price: 1071398.25,
    originalPrice: 1302160.95,
    discount: 17,
    productType: "physical",
    stock: 20,
    sku: "SKU-ST2-012",
    rating: 5.0,
    reviewsCount: 11,
    images: [
      "/images/products/summer-top.webp",
      "/images/products/summer-top-2.webp"
    ],
    colors: [
      { name: "Ivory White", hex: "#fffff0" },
      { name: "Rose Blush", hex: "#ffe4e1" }
    ],
    sizes: ["S", "M", "L"],
    vendor: {
      name: "Trendshop",
      slug: "trendshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 4.9,
      joinedDate: "Jan 2024",
      location: "Jakarta, Indonesia",
      verified: true
    },
    description: `
      An elegant romantic lace top suitable for warm summer afternoons and dinner dates.
    `,
    specs: [
      { label: "Material", value: "Polyester & Lace" },
      { label: "Style", value: "Romantic Chic" }
    ],
    shippingInfo: {
      estimatedDelivery: "2 - 4 Business Days",
      shippingCost: "Standard Delivery",
      returnPolicy: "14 days return policy"
    },
    reviews: []
  },
  {
    id: "s1",
    slug: "animal-prints",
    title: "Animal colorful digital prints poster set",
    category: "Graphics & Photos",
    categorySlug: "graphics-photos",
    subcategory: "Wall Art",
    subcategorySlug: "wall-art",
    price: 478008.45,
    originalPrice: 642838.95,
    discount: 25,
    productType: "physical",
    stock: 40,
    sku: "SKU-ANP-013",
    rating: 5.0,
    reviewsCount: 13,
    images: [
      "/images/products/animal-prints.webp",
      "/images/products/animal-prints-2.webp"
    ],
    vendor: {
      name: "Trendshop",
      slug: "trendshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 4.9,
      joinedDate: "Jan 2024",
      location: "Surabaya, Indonesia",
      verified: true
    },
    description: `
      Set of 3 modern vibrant animal art prints on museum-grade heavyweight matte art paper.
    `,
    specs: [
      { label: "Paper Weight", value: "250 gsm Archival Paper" },
      { label: "Print Technique", value: "Giclée Fine Art" }
    ],
    shippingInfo: {
      estimatedDelivery: "3 - 5 Business Days in Rigid Tube",
      shippingCost: "Standard shipping",
      returnPolicy: "30 days replacement if damaged"
    },
    reviews: []
  },
  {
    id: "s5",
    slug: "gucci-backpack",
    title: "Gucci nylon fabric smart backpack black",
    category: "Clothing",
    categorySlug: "clothing",
    subcategory: "Bags & Backpacks",
    subcategorySlug: "bags-backpacks",
    price: 906567.75,
    originalPrice: 1137330.45,
    discount: 20,
    productType: "physical",
    condition: "Used - Like New",
    stock: 8,
    sku: "SKU-GBP-014",
    rating: 4.9,
    reviewsCount: 29,
    images: [
      "/images/products/gucci-backpack.webp",
      "/images/products/gucci-backpack-2.webp"
    ],
    colors: [
      { name: "Black Onyx", hex: "#0a0a0a" }
    ],
    sizes: ["One Size (24L)"],
    vendor: {
      name: "Admin",
      slug: "admin",
      avatar: "https://i.pravatar.cc/150?u=admin",
      rating: 5.0,
      joinedDate: "2023",
      location: "Jakarta, Indonesia",
      verified: true
    },
    description: `
      Crafted from water-resistant ballistic nylon with genuine leather trims. 
      Features a padded 15.6" laptop compartment, ergonomic airflow shoulder straps, and hidden anti-theft back pocket.
    `,
    specs: [
      { label: "Capacity", value: "24 Liters" },
      { label: "Laptop Compartment", value: "Up to 15.6 inches" },
      { label: "Water Resistance", value: "Hydrophobic Coated" }
    ],
    shippingInfo: {
      estimatedDelivery: "1 - 3 Business Days Express",
      shippingCost: "Free Express Shipping",
      returnPolicy: "14 days return guarantee"
    },
    reviews: [
      {
        id: "r5",
        user: "Dimas Aditya",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        rating: 5,
        date: "5 days ago",
        comment: "Tas sangat kuat dan jahitannya presisi. Muat laptop dan pakaian untuk trip 2 hari!"
      }
    ]
  },
  {
    id: "u1",
    slug: "vintage-leather-jacket",
    title: "Vintage 90s Distressed Biker Leather Jacket",
    category: "Clothing",
    categorySlug: "clothing",
    subcategory: "Men's Clothing",
    subcategorySlug: "mens-clothing",
    price: 1250000,
    originalPrice: 2800000,
    discount: 55,
    productType: "ordinary",
    condition: "Used - Good",
    listingType: "ordinary",
    stock: 1,
    sku: "USED-VLJ-099",
    rating: 5.0,
    reviewsCount: 4,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80"
    ],
    colors: [
      { name: "Distressed Brown", hex: "#4a3525" }
    ],
    sizes: ["L"],
    vendor: {
      name: "Trendshop",
      slug: "trendshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 4.9,
      joinedDate: "Jan 2024",
      location: "Yogyakarta, Indonesia",
      verified: true
    },
    description: `
      Authentic 1990s heavyweight cowhide biker leather jacket with natural distressing and patina. 
      Heavy duty YKK zippers, quilted satin lining, and classic asymmetrical zip closure. 
      Dijual karena koleksi pribadi, kondisi sangat terawat tanpa sobek. Hubungi langsung via WhatsApp atau chat untuk nego dan COD di Yogya.
    `,
    specs: [
      { label: "Material", value: "Genuine Heavyweight Cowhide" },
      { label: "Era", value: "1990s Vintage" },
      { label: "Condition", value: "Used - Good (Authentic Patina)" },
      { label: "Fit", value: "Regular Mens Large" }
    ],
    shippingInfo: {
      estimatedDelivery: "2 - 4 Business Days / COD Available",
      shippingCost: "Standard shipping or local pickup",
      returnPolicy: "As-is pre-owned classified item"
    },
    reviews: []
  },
  {
    id: "u2",
    slug: "canon-dslr-camera-set",
    title: "Canon EOS DSLR Camera + 18-55mm IS II Lens Kit (Pre-owned)",
    category: "Graphics & Photos",
    categorySlug: "graphics-photos",
    subcategory: "Cameras",
    subcategorySlug: "cameras",
    price: 3600000,
    originalPrice: 6500000,
    discount: 45,
    productType: "ordinary",
    condition: "Used - Like New",
    listingType: "ordinary",
    stock: 1,
    sku: "USED-CAM-101",
    rating: 5.0,
    reviewsCount: 9,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"
    ],
    vendor: {
      name: "Admin",
      slug: "admin",
      avatar: "https://i.pravatar.cc/150?u=admin",
      rating: 5.0,
      joinedDate: "2023",
      location: "Jakarta Barat, Indonesia",
      verified: true
    },
    description: `
      Kamera Canon EOS DSLR lengkap dengan lensa kit 18-55mm IS II. 
      Shutter count rendah (sekitar 3.500 shot), sensor bersih bebas jamur, optik lensa bening. 
      Kelengkapan: Body, Lensa, Baterai Original, Charger, Strap, Dus & Buku lengkap.
      Menerima COD area Jakarta Barat atau pengiriman berasuransi dengan packing kayu.
    `,
    specs: [
      { label: "Sensor", value: "24.2 MP APS-C CMOS" },
      { label: "Lens", value: "EF-S 18-55mm f/3.5-5.6 IS II" },
      { label: "Shutter Count", value: "~3,500 shots" },
      { label: "Condition", value: "Used - Like New (98% mulus)" }
    ],
    shippingInfo: {
      estimatedDelivery: "1 - 3 Business Days with Insurance",
      shippingCost: "Free Delivery Jakarta Area",
      returnPolicy: "3 days inspection warranty"
    },
    reviews: []
  }
];

export function getProductBySlug(slug: string): ProductItem | undefined {
  return ALL_PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getRelatedProducts(categorySlug: string, currentId: string): ProductItem[] {
  return ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.id !== currentId).slice(0, 5);
}
