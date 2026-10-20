"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Download,
  Trash2,
  ExternalLink,
  Edit,
  Eye,
  X,
  CheckCircle,
  FileText,
  Send,
} from "lucide-react";

interface DraftProduct {
  id: number;
  slug: string;
  title: string;
  sku: string;
  imageUrl: string;
  productType: "Physical" | "Digital";
  category: string;
  subcategory?: string;
  listingType?: string;
  user: string;
  userSlug: string;
  price: string;
  stock: string;
  pageViews: number;
  updated: string;
  date: string;
}

const INITIAL_DRAFTS: DraftProduct[] = [
  // Page 1 Items matching live Modesy drafts with guaranteed local photos
  {
    id: 108,
    slug: "harrisburg-pa-guide-to-capital-city-108",
    title: "Harrisburg, PA: Your Guide to the Capital City",
    sku: "",
    imageUrl: "/images/products/vacation-spots.webp",
    productType: "Digital",
    category: "Clothing",
    subcategory: "Travel & E-Books",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-18 / 06:09",
  },
  {
    id: 107,
    slug: "nature-graphics-digital-projects-107",
    title: "Nature Graphics: Enhance Your Digital Projects",
    sku: "",
    imageUrl: "/images/categories/graphics.webp",
    productType: "Digital",
    category: "Graphics & Photos",
    subcategory: "Vectors",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-18 / 02:26",
  },
  {
    id: 106,
    slug: "smart-bluetooth-remote-controller-106",
    title: "Smart Bluetooth Remote & Wireless Controller",
    sku: "",
    imageUrl: "/images/blog/accessories.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Accessories",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-16 / 20:32",
  },
  {
    id: 105,
    slug: "minimalist-canvas-travel-backpack-105",
    title: "Minimalist Canvas Urban Travel Backpack",
    sku: "",
    imageUrl: "/images/products/black-backpack.webp",
    productType: "Physical",
    category: "Backpacks",
    subcategory: "Backpacks",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-14 / 16:24",
  },
  {
    id: 104,
    slug: "durable-silicone-versatile-material-104",
    title: "Durable Silicone: Versatile Material for Everyday Use",
    sku: "",
    imageUrl: "/images/categories/toys.webp",
    productType: "Physical",
    category: "Kid's Clothing",
    subcategory: "Accessories",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (1)",
    pageViews: 0,
    updated: "",
    date: "2026-10-13 / 17:43",
  },
  {
    id: 103,
    slug: "abstract-crimson-botanical-canvas-wall-art-103",
    title: "Abstract Crimson Botanical Canvas Wall Art",
    sku: "",
    imageUrl: "/images/categories/painting.webp",
    productType: "Physical",
    category: "Web Templates & Code",
    subcategory: "Wall Art",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (1)",
    pageViews: 0,
    updated: "",
    date: "2026-10-12 / 19:43",
  },
  {
    id: 102,
    slug: "casual-cobalt-blue-cotton-tshirt-102",
    title: "Casual Cobalt Blue Cotton T-Shirt",
    sku: "",
    imageUrl: "/images/products/cobalt-tshirt.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "T-Shirts",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-12 / 18:13",
  },
  {
    id: 101,
    slug: "mens-streetwear-shoes-urban-style-101",
    title: "Men's Streetwear Shoes - Urban Style & Comfort",
    sku: "",
    imageUrl: "/images/products/sneaker-shoes.webp",
    productType: "Physical",
    category: "Shoes",
    subcategory: "Sneakers",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock (1)",
    pageViews: 0,
    updated: "",
    date: "2026-10-12 / 15:45",
  },
  {
    id: 100,
    slug: "modern-scandinavian-living-room-couch-100",
    title: "Modern Scandinavian Living Room Couch",
    sku: "",
    imageUrl: "/images/products/modern-couch.webp",
    productType: "Physical",
    category: "Home & Living",
    subcategory: "Furniture",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-12 / 15:37",
  },
  {
    id: 99,
    slug: "cozy-cotton-bathrobes-loungewear-set-99",
    title: "Cozy Cotton Bathrobes & Loungewear Set",
    sku: "",
    imageUrl: "/images/products/summer-top.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Sleepwear",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock (1)",
    pageViews: 0,
    updated: "",
    date: "2026-10-12 / 14:50",
  },
  {
    id: 98,
    slug: "ant-tra-urban-streetwear-hoodie-98",
    title: "ANT TRA Urban Streetwear Graphic Hoodie",
    sku: "",
    imageUrl: "/images/categories/clothing.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Hoodies",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (1)",
    pageViews: 0,
    updated: "",
    date: "2026-10-12 / 11:21",
  },
  {
    id: 97,
    slug: "try-cyber-wildlife-digital-portrait-97",
    title: "Try: Cyber Wildlife Digital Portrait",
    sku: "",
    imageUrl: "/images/products/animal-photo.webp",
    productType: "Digital",
    category: "Graphics & Photos",
    subcategory: "Illustrations",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-11 / 17:20",
  },
  {
    id: 96,
    slug: "handcrafted-decorative-geometric-pillow-96",
    title: "Handcrafted Decorative Geometric Pillow",
    sku: "",
    imageUrl: "/images/products/decorative-pillow.webp",
    productType: "Physical",
    category: "Home & Living",
    subcategory: "Decorative Pillows",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (1)",
    pageViews: 0,
    updated: "",
    date: "2026-10-11 / 10:41",
  },
  {
    id: 95,
    slug: "refurbished-iphone-13-mini-95",
    title: "Refurbished iPhone 13 Mini - 1 Year Warranty",
    sku: "",
    imageUrl: "/images/blog/color-psychology.webp",
    productType: "Physical",
    category: "Office & School Supplies",
    subcategory: "Smartphones",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-08 / 04:19",
  },
  {
    id: 94,
    slug: "apple-iphone-15-pro-max-94",
    title: "Apple iPhone 15 Pro Max: Pro Camera, Pro Performance",
    sku: "",
    imageUrl: "/images/blog/gift-ideas.webp",
    productType: "Physical",
    category: "Clothing Sets",
    subcategory: "Smartphones",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-06 / 01:15",
  },

  // Page 2 Items to support multi-page pagination (1, 2, 3)
  {
    id: 93,
    slug: "wireless-noise-cancelling-headphones-93",
    title: "Wireless Bluetooth Noise-Cancelling Headphones",
    sku: "",
    imageUrl: "/images/products/black-sneakers.webp",
    productType: "Physical",
    category: "Electronics",
    subcategory: "Audio",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-10-04 / 14:22",
  },
  {
    id: 92,
    slug: "artisan-scented-soy-candle-92",
    title: "Artisan Scented Soy Candle with Wooden Wick",
    sku: "SOY-CND-92",
    imageUrl: "/images/blog/home-fragrance.webp",
    productType: "Physical",
    category: "Home & Living",
    subcategory: "Home Fragrance",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (3)",
    pageViews: 0,
    updated: "",
    date: "2026-10-03 / 11:10",
  },
  {
    id: 91,
    slug: "retro-mechanical-keyboard-rgb-91",
    title: "Retro Mechanical Keyboard with Custom RGB Backlight",
    sku: "MEC-KBD-91",
    imageUrl: "/images/blog/sustainable-fashion.webp",
    productType: "Physical",
    category: "Electronics",
    subcategory: "Computer Accessories",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock (5)",
    pageViews: 0,
    updated: "",
    date: "2026-10-01 / 09:40",
  },
  {
    id: 90,
    slug: "travel-duffle-bag-waterproof-90",
    title: "Weekend Travel Duffle Bag with Shoe Compartment",
    sku: "TRV-DFL-90",
    imageUrl: "/images/products/gucci-backpack.webp",
    productType: "Physical",
    category: "Backpacks",
    subcategory: "Travel Bags",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-09-28 / 18:25",
  },
  {
    id: 89,
    slug: "kipling-compact-nylon-crossbody-handbag-89",
    title: "Kipling Compact Nylon Crossbody Handbag",
    sku: "KIP-HBG-89",
    imageUrl: "/images/products/kipling-handbag.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Handbags",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock (2)",
    pageViews: 0,
    updated: "",
    date: "2026-09-27 / 15:30",
  },
  {
    id: 88,
    slug: "elegant-lace-summer-blouse-88",
    title: "Elegant Lace Embroidered Summer Blouse",
    sku: "LCE-BLS-88",
    imageUrl: "/images/products/lace-blouse.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Blouses",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-09-26 / 12:15",
  },
  {
    id: 87,
    slug: "light-blue-casual-oxford-shirt-87",
    title: "Light Blue Casual Oxford Long-Sleeve Shirt",
    sku: "LBL-SHT-87",
    imageUrl: "/images/products/light-blue-shirt.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Shirts",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (4)",
    pageViews: 0,
    updated: "",
    date: "2026-09-25 / 17:40",
  },
  {
    id: 86,
    slug: "black-midi-skirt-floral-86",
    title: "Black Midi Skirt with White Floral Prints",
    sku: "BLK-SKT-86",
    imageUrl: "/images/products/black-midi-skirt.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Skirts",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-09-24 / 09:10",
  },
  {
    id: 85,
    slug: "navy-polka-sundress-85",
    title: "Navy Blue Vintage Polka Dot Sundress",
    sku: "NVY-DRS-85",
    imageUrl: "/images/products/navy-polka-dress.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Dresses",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (2)",
    pageViews: 0,
    updated: "",
    date: "2026-09-22 / 16:55",
  },
  {
    id: 84,
    slug: "bohemian-wide-brim-sun-hat-84",
    title: "Handmade Bohemian Wide-Brim Sun Hat",
    sku: "SUN-HAT-84",
    imageUrl: "/images/products/sun-hat.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Hats",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-09-20 / 11:45",
  },
  {
    id: 83,
    slug: "classical-piano-scores-83",
    title: "Classical Grand Piano Sheet Music Collection",
    sku: "PNO-MSC-83",
    imageUrl: "/images/products/piano-music.webp",
    productType: "Digital",
    category: "Web Templates & Code",
    subcategory: "Audio",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-09-18 / 14:20",
  },
  {
    id: 82,
    slug: "vibrant-silk-scarves-82",
    title: "Vibrant Silk Patterned Women Scarves",
    sku: "SLK-SCV-82",
    imageUrl: "/images/products/scarves.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Scarves",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (6)",
    pageViews: 0,
    updated: "",
    date: "2026-09-15 / 10:05",
  },
  {
    id: 81,
    slug: "high-top-urban-sport-sneakers-81",
    title: "High-Top Urban Sport Sneakers",
    sku: "URB-SNK-81",
    imageUrl: "/images/products/black-sneakers-2.webp",
    productType: "Physical",
    category: "Shoes",
    subcategory: "Sneakers",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-09-12 / 18:35",
  },
  {
    id: 80,
    slug: "bohemian-floral-sundress-80",
    title: "Bohemian Floral Print Summer Dress",
    sku: "FLR-DRS-80",
    imageUrl: "/images/products/floral-sundress.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Dresses",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (3)",
    pageViews: 0,
    updated: "",
    date: "2026-09-10 / 13:50",
  },
  {
    id: 79,
    slug: "leather-ankle-boots-brass-79",
    title: "Leather Ankle Boots with Brass Buckles",
    sku: "LTH-BOT-79",
    imageUrl: "/images/products/ankle-boot.webp",
    productType: "Physical",
    category: "Shoes",
    subcategory: "Boots",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-09-08 / 08:25",
  },

  // Page 3 Items
  {
    id: 78,
    slug: "summer-sleeveless-linen-top-78",
    title: "Summer Breeze Sleeveless Linen Top",
    sku: "SMR-TOP-78",
    imageUrl: "/images/products/summer-top-2.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Tops",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-09-05 / 16:10",
  },
  {
    id: 77,
    slug: "luxury-decorative-pillow-set-77",
    title: "Luxury Decorative Throw Pillow Set",
    sku: "LXZ-PLW-77",
    imageUrl: "/images/products/decorative-pillow-2.webp",
    productType: "Physical",
    category: "Home & Living",
    subcategory: "Decorative Pillows",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock (4)",
    pageViews: 0,
    updated: "",
    date: "2026-09-03 / 11:20",
  },
  {
    id: 76,
    slug: "floral-garden-ruffled-sundress-76",
    title: "Floral Garden Ruffled Sundress",
    sku: "FLR-GRD-76",
    imageUrl: "/images/products/floral-sundress-2.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Dresses",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-08-31 / 14:45",
  },
  {
    id: 75,
    slug: "designer-monogram-canvas-backpack-75",
    title: "Designer Monogram Canvas Backpack",
    sku: "DSG-BPK-75",
    imageUrl: "/images/products/gucci-backpack-2.webp",
    productType: "Physical",
    category: "Backpacks",
    subcategory: "Backpacks",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock (1)",
    pageViews: 0,
    updated: "",
    date: "2026-08-28 / 19:30",
  },
  {
    id: 74,
    slug: "casual-lightweight-travel-handbag-74",
    title: "Casual Lightweight Travel Handbag",
    sku: "CSL-HBG-74",
    imageUrl: "/images/products/kipling-handbag-2.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Handbags",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-08-25 / 15:15",
  },
  {
    id: 73,
    slug: "handmade-vintage-ceramic-tea-cup-set-73",
    title: "Handmade Vintage Ceramic Tea Cup Set",
    sku: "CRM-TEA-73",
    imageUrl: "/images/categories/home-living.webp",
    productType: "Physical",
    category: "Home & Living",
    subcategory: "Kitchenware",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (2)",
    pageViews: 0,
    updated: "",
    date: "2026-08-22 / 10:40",
  },
  {
    id: 72,
    slug: "modern-wooden-ergonomic-study-desk-72",
    title: "Modern Wooden Ergonomic Study Desk",
    sku: "DSK-WDN-72",
    imageUrl: "/images/categories/furniture.webp",
    productType: "Physical",
    category: "Home & Living",
    subcategory: "Furniture",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-08-19 / 17:05",
  },
  {
    id: 71,
    slug: "children-educational-wooden-building-blocks-71",
    title: "Children Educational Wooden Building Blocks",
    sku: "EDU-BLK-71",
    imageUrl: "/images/categories/toys.webp",
    productType: "Physical",
    category: "Kid's Clothing",
    subcategory: "Toys",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (5)",
    pageViews: 0,
    updated: "",
    date: "2026-08-16 / 12:50",
  },
  {
    id: 70,
    slug: "watercolor-landscape-art-print-canvas-70",
    title: "Watercolor Landscape Art Print Canvas",
    sku: "WTR-LND-70",
    imageUrl: "/images/categories/painting.webp",
    productType: "Physical",
    category: "Web Templates & Code",
    subcategory: "Art",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-08-13 / 09:35",
  },
  {
    id: 69,
    slug: "vector-icon-set-for-mobile-apps-69",
    title: "Vector Icon Set for Mobile Apps",
    sku: "VCT-ICN-69",
    imageUrl: "/images/categories/graphics.webp",
    productType: "Digital",
    category: "Graphics & Photos",
    subcategory: "Icons",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-08-10 / 14:15",
  },
  {
    id: 68,
    slug: "mens-tailored-slim-fit-wool-blazer-68",
    title: "Men's Tailored Slim Fit Wool Blazer",
    sku: "MN-BLZ-68",
    imageUrl: "/images/categories/mens-clothing.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Suits",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock (2)",
    pageViews: 0,
    updated: "",
    date: "2026-08-07 / 18:00",
  },
  {
    id: 67,
    slug: "womens-elegant-silk-evening-gown-67",
    title: "Women's Elegant Silk Evening Gown",
    sku: "WMN-GWN-67",
    imageUrl: "/images/categories/womens-clothing.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Dresses",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-08-04 / 11:25",
  },
  {
    id: 66,
    slug: "bohemian-turquoise-beaded-necklace-66",
    title: "Bohemian Turquoise Beaded Necklace",
    sku: "BHM-NCK-66",
    imageUrl: "/images/categories/necklaces.webp",
    productType: "Physical",
    category: "Clothing",
    subcategory: "Jewelry",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock (3)",
    pageViews: 0,
    updated: "",
    date: "2026-08-01 / 16:40",
  },
  {
    id: 65,
    slug: "classic-chelsea-leather-ankle-boots-65",
    title: "Classic Chelsea Leather Ankle Boots",
    sku: "CLS-BOT-65",
    imageUrl: "/images/categories/boots.webp",
    productType: "Physical",
    category: "Shoes",
    subcategory: "Boots",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-07-29 / 13:10",
  },
  {
    id: 64,
    slug: "animal-wildlife-photography-bundle-64",
    title: "Animal Wildlife Photography High-Res Bundle",
    sku: "WLD-PHT-64",
    imageUrl: "/images/products/animal-prints.webp",
    productType: "Digital",
    category: "Graphics & Photos",
    subcategory: "Photography",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp0",
    stock: "In Stock",
    pageViews: 0,
    updated: "",
    date: "2026-07-26 / 10:20",
  },
];

const CATEGORIES = [
  "All",
  "Clothing",
  "Graphics & Photos",
  "Kid's Clothing",
  "Web Templates & Code",
  "Shoes",
  "Home & Living",
  "Office & School Supplies",
  "Clothing Sets",
  "Electronics",
  "Backpacks",
];

export default function DraftsPage() {
  const [products, setProducts] = useState<DraftProduct[]>(INITIAL_DRAFTS);

  // Filters State
  const [showCount, setShowCount] = useState<number>(15);
  const [listingType, setListingType] = useState<string>("All");
  const [productType, setProductType] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [subcategory, setSubcategory] = useState<string>("All");
  const [stockStatus, setStockStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Applied Filters
  const [appliedFilters, setAppliedFilters] = useState({
    listingType: "All",
    productType: "All",
    category: "All",
    subcategory: "All",
    stockStatus: "All",
    search: "",
  });

  // Table selection & pagination
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Active dropdown menu for options
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [bulkAction, setBulkAction] = useState<string>("");

  // Modals & Feedback
  const [selectedProduct, setSelectedProduct] = useState<DraftProduct | null>(
    null
  );
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdownId(null);
      setIsExportOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter submit handler
  const handleFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      listingType,
      productType,
      category,
      subcategory,
      stockStatus,
      search: searchQuery.trim().toLowerCase(),
    });
    setCurrentPage(1);
  };

  // Filtered dataset
  const filteredProducts = products.filter((item) => {
    if (
      appliedFilters.productType !== "All" &&
      item.productType !== appliedFilters.productType
    ) {
      return false;
    }
    if (
      appliedFilters.listingType !== "All" &&
      item.listingType !== appliedFilters.listingType
    ) {
      return false;
    }
    if (
      appliedFilters.category !== "All" &&
      item.category !== appliedFilters.category
    ) {
      return false;
    }
    if (
      appliedFilters.subcategory !== "All" &&
      item.subcategory !== appliedFilters.subcategory
    ) {
      return false;
    }
    if (appliedFilters.stockStatus !== "All") {
      if (
        appliedFilters.stockStatus === "In Stock" &&
        !item.stock.includes("In Stock")
      ) {
        return false;
      }
      if (
        appliedFilters.stockStatus === "Out of Stock" &&
        item.stock.includes("In Stock")
      ) {
        return false;
      }
    }
    if (appliedFilters.search) {
      const matchTitle = item.title.toLowerCase().includes(appliedFilters.search);
      const matchSku = item.sku ? item.sku.toLowerCase().includes(appliedFilters.search) : false;
      const matchUser = item.user.toLowerCase().includes(appliedFilters.search);
      const matchId = item.id.toString() === appliedFilters.search;
      if (!matchTitle && !matchSku && !matchUser && !matchId) {
        return false;
      }
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / showCount) || 1;
  const startIndex = (currentPage - 1) * showCount;
  const currentRows = filteredProducts.slice(startIndex, startIndex + showCount);

  // Select all checkbox
  const isAllSelected =
    currentRows.length > 0 &&
    currentRows.every((row) => selectedIds.includes(row.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentRows.map((r) => r.id));
    }
  };

  const handleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Row Actions
  const handleDeleteProduct = (id: number) => {
    const target = products.find((p) => p.id === id);
    if (
      window.confirm(
        `Are you sure you want to permanently delete draft "${target?.title}"?`
      )
    ) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showToast("Draft successfully deleted.");
    }
  };

  const handlePublishProduct = (id: number) => {
    const target = products.find((p) => p.id === id);
    if (
      window.confirm(
        `Are you sure you want to publish draft "${target?.title}" to live products?`
      )
    ) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showToast(`Draft "${target?.title}" published successfully.`);
    }
  };

  // Bulk Actions
  const handleApplyBulk = () => {
    if (!bulkAction) {
      alert("Please select a bulk action.");
      return;
    }
    if (selectedIds.length === 0) {
      alert("Please select at least one draft.");
      return;
    }

    if (bulkAction === "delete") {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedIds.length} selected draft(s)?`
        )
      ) {
        setProducts((prev) =>
          prev.filter((p) => !selectedIds.includes(p.id))
        );
        setSelectedIds([]);
        showToast(`${selectedIds.length} drafts deleted successfully.`);
      }
    } else if (bulkAction === "publish") {
      if (
        window.confirm(
          `Are you sure you want to publish ${selectedIds.length} draft(s)?`
        )
      ) {
        setProducts((prev) =>
          prev.filter((p) => !selectedIds.includes(p.id))
        );
        setSelectedIds([]);
        showToast(`${selectedIds.length} drafts published successfully.`);
      }
    }
    setBulkAction("");
  };

  const showToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => {
      setActionSuccess(null);
    }, 4000);
  };

  // Export
  const handleExport = (type: "csv" | "excel") => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Id,Title,SKU,Product Type,Category,User,Price,Stock,Page Views,Updated,Date",
        ...filteredProducts.map(
          (p) =>
            `${p.id},"${p.title}","${p.sku}","${p.productType}","${p.category}","${p.user}","${p.price}","${p.stock}",${p.pageViews},"${p.updated}","${p.date}"`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `draft_products_${type}_${Date.now()}.${type === "csv" ? "csv" : "xls"}`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Toast Notification */}
      {actionSuccess && (
        <div className="mb-4 bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-3 rounded-[3px] flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#3c763d]" />
            <span>{actionSuccess}</span>
          </div>
          <button
            onClick={() => setActionSuccess(null)}
            className="text-[#3c763d] hover:text-[#2b542c]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Drafts</h1>
      </div>

      {/* Main Content Box (Modesy Admin White Box) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
        {/* Filter Controls Row */}
        <form
          onSubmit={handleFilter}
          className="flex flex-wrap items-end gap-3 mb-6"
        >
          {/* Show */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Show
            </label>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => {
                  setShowCount(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-[34px] w-[75px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Listing Type */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Listing Type
            </label>
            <div className="relative">
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="h-[34px] min-w-[100px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Add Product">Add Product</option>
                <option value="Sell from Store">Sell from Store</option>
                <option value="Ordinary Listing">Ordinary Listing</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Product Type
            </label>
            <div className="relative">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="h-[34px] min-w-[100px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-[34px] min-w-[110px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Subcategory
            </label>
            <div className="relative">
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="h-[34px] min-w-[110px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={`sub-${cat}`} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Stock
            </label>
            <div className="relative">
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
                className="h-[34px] min-w-[90px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3c8dbc] w-[160px]"
            />
          </div>

          {/* Filter Button (Modesy Purple #605ca8) */}
          <button
            type="submit"
            className="h-[34px] px-4 bg-[#605ca8] hover:bg-[#504d8c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
          >
            Filter
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExportOpen(!isExportOpen);
              }}
              className="h-[34px] px-3.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 text-[13px] rounded-[3px] flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Export</span>
              <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-gray-600 ml-1"></span>
            </button>

            {isExportOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-[13px]"
              >
                <button
                  type="button"
                  onClick={() => handleExport("csv")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("excel")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>Excel</span>
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Drafts Table with responsive horizontal scroll */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-[12.5px] border-collapse table-fixed">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left w-8">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-[#3c8dbc] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-2.5 px-2 text-left w-12">Id</th>
                <th className="py-2.5 px-3 text-left w-[28%]">Product</th>
                <th className="py-2.5 px-2 text-left w-[9%] leading-tight">
                  Product<br />Type
                </th>
                <th className="py-2.5 px-2 text-left w-[12%]">Category</th>
                <th className="py-2.5 px-2 text-left w-[9%]">User</th>
                <th className="py-2.5 px-2 text-left w-[8%]">Price</th>
                <th className="py-2.5 px-2 text-left w-[9%]">Stock</th>
                <th className="py-2.5 px-1.5 text-left w-[6%] leading-tight">
                  Page<br />Views
                </th>
                <th className="py-2.5 px-1.5 text-left w-[6%]">Updated</th>
                <th className="py-2.5 px-2 text-left w-[10%]">Date</th>
                <th className="py-2.5 px-2 text-left w-[120px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="py-12 text-center text-gray-500 text-sm"
                  >
                    No drafts found.
                  </td>
                </tr>
              ) : (
                currentRows.map((product) => {
                  const isChecked = selectedIds.includes(product.id);

                  return (
                    <tr
                      key={product.id}
                      className={`border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[12.5px] ${
                        isChecked ? "bg-[#fcf8e3]/40" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-3 align-middle">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(product.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[#3c8dbc] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Id */}
                      <td className="py-3 px-2 text-gray-600 font-normal align-middle text-[12.5px]">
                        {product.id}
                      </td>

                      {/* Product (Thumb + Title, matching Modesy drafts) */}
                      <td className="py-3 px-3 align-middle">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.imageUrl || "/images/products/vacation-spots.webp"}
                            alt={product.title}
                            className="w-[50px] h-[50px] object-cover rounded-[3px] border border-gray-200 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/products/vacation-spots.webp";
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <span
                              onClick={() => setSelectedProduct(product)}
                              className="text-gray-800 hover:text-[#3c8dbc] font-normal cursor-pointer leading-snug text-[13px] line-clamp-2"
                              title={product.title}
                            >
                              {product.title}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Product Type */}
                      <td className="py-3 px-2 text-gray-700 align-middle text-[12.5px] truncate">
                        {product.productType}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-2 text-gray-700 align-middle text-[12.5px] truncate">
                        {product.category || ""}
                      </td>

                      {/* User */}
                      <td className="py-3 px-2 align-middle">
                        <Link
                          href={`/profile/${product.userSlug}`}
                          className="text-gray-700 hover:text-[#3c8dbc] transition-colors text-[12.5px] truncate block"
                        >
                          {product.user}
                        </Link>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-2 text-gray-800 font-normal align-middle text-[12.5px] whitespace-nowrap">
                        {product.price}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-2 text-[#00a65a] font-normal align-middle text-[12.5px] whitespace-nowrap">
                        {product.stock}
                      </td>

                      {/* Page Views */}
                      <td className="py-3 px-1.5 text-gray-600 align-middle text-[12.5px]">
                        {product.pageViews}
                      </td>

                      {/* Updated (blank in Modesy drafts) */}
                      <td className="py-3 px-1.5 text-gray-500 text-[11px] align-middle">
                        {product.updated || ""}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-2 text-gray-500 text-[11.5px] align-middle whitespace-nowrap">
                        <div className="leading-tight">
                          <div>{product.date.split(" / ")[0]} /</div>
                          <div>{product.date.split(" / ")[1]}</div>
                        </div>
                      </td>

                      {/* Options Button with Dropdown (Modesy Purple #605ca8) */}
                      <td className="py-3 px-2 align-middle text-left relative">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdownId(
                                activeDropdownId === product.id
                                  ? null
                                  : product.id
                              );
                            }}
                            className="bg-[#605ca8] hover:bg-[#504d8c] text-white text-[11.5px] px-2.5 py-1.5 rounded-[3px] flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                          >
                            <span>Select an option</span>
                            <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white ml-0.5"></span>
                          </button>

                          {activeDropdownId === product.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-[13px] text-left"
                            >
                              <Link
                                href="/sell"
                                className="w-full px-4 py-1.5 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5 text-gray-500" />
                                <span>Edit</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownId(null);
                                  handleDeleteProduct(product.id);
                                }}
                                className="w-full px-4 py-1.5 text-left text-red-600 hover:bg-[#f4f4f4] flex items-center space-x-2 border-t border-gray-100 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination Controls matching Modesy screenshot */}
        <div className="mt-4 flex items-center justify-end">
          <div className="flex items-center space-x-1">
            {currentPage > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="h-[32px] min-w-[32px] px-2.5 text-[13px] border border-[#d2d6de] text-[#337ab7] bg-white hover:bg-gray-100 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  «
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-[32px] min-w-[32px] px-2.5 text-[13px] border border-[#d2d6de] text-[#337ab7] bg-white hover:bg-gray-100 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  &lt;
                </button>
              </>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = currentPage === pageNum;
              return (
                <button
                  type="button"
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#337ab7] border-[#337ab7] text-white"
                      : "bg-white border-[#d2d6de] text-[#337ab7] hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {currentPage < totalPages && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="h-[32px] min-w-[32px] px-2.5 text-[13px] border border-[#d2d6de] text-[#337ab7] bg-white hover:bg-gray-100 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  &gt;
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className="h-[32px] min-w-[32px] px-2.5 text-[13px] border border-[#d2d6de] text-[#337ab7] bg-white hover:bg-gray-100 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  »
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Draft Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-[4px] shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-300 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#605ca8] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Draft #{selectedProduct.id} Details</span>
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-24 h-24 object-cover rounded border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/products/vacation-spots.webp";
                  }}
                />
                <div className="flex-1">
                  <div className="inline-block bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-[2px] mb-1">
                    Draft (Unpublished)
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    {selectedProduct.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-mono mt-0.5">
                    SKU: {selectedProduct.sku}
                  </p>
                  <p className="text-lg font-bold text-gray-700 mt-2">
                    Price: {selectedProduct.price} (Not set)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[13px] pt-3 border-t border-gray-200">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Product Type
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.productType}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Category
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.category}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Author / Vendor
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.user}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Stock
                  </span>
                  <span className="text-[#00a65a] font-medium">
                    {selectedProduct.stock}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Date Created
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.date}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Views
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.pageViews}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
              <Link
                href="/sell"
                className="px-4 py-1.5 bg-[#3c8dbc] hover:bg-[#367fa9] text-white text-[13px] rounded-[3px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Continue Editing Draft</span>
              </Link>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[13px] rounded-[3px] font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
