"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  Edit,
  Trash2,
  Folder,
  FolderOpen,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

interface AdminCategoryRecord {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  parentName?: string;
  order: number;
  showOnHomepage: boolean;
  visibility: boolean;
  subcategories?: AdminCategoryRecord[];
}

const FULL_CATEGORIES_DATA: AdminCategoryRecord[] = [
  {
    id: 1,
    name: "Clothing",
    slug: "clothing",
    parentId: null,
    order: 1,
    showOnHomepage: true,
    visibility: true,
    subcategories: [
      {
        id: 101,
        name: "Women's Clothing",
        slug: "womens-clothing",
        parentId: 1,
        parentName: "Clothing",
        order: 1,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 1011, name: "Dresses", slug: "dresses", parentId: 101, parentName: "Women's Clothing", order: 1, showOnHomepage: true, visibility: true },
          { id: 1012, name: "Skirts", slug: "skirts", parentId: 101, parentName: "Women's Clothing", order: 2, showOnHomepage: true, visibility: true },
          { id: 1013, name: "Pants & Capris", slug: "pants-capris", parentId: 101, parentName: "Women's Clothing", order: 3, showOnHomepage: true, visibility: true },
          { id: 1014, name: "Sweaters & Cardigans", slug: "sweaters", parentId: 101, parentName: "Women's Clothing", order: 4, showOnHomepage: true, visibility: true },
          { id: 1015, name: "Tops & T-Shirts", slug: "tops-tshirts", parentId: 101, parentName: "Women's Clothing", order: 5, showOnHomepage: true, visibility: true },
          { id: 1016, name: "Jackets & Coats", slug: "jackets-coats", parentId: 101, parentName: "Women's Clothing", order: 6, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 102,
        name: "Men's Clothing",
        slug: "mens-clothing",
        parentId: 1,
        parentName: "Clothing",
        order: 2,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 1021, name: "Shirts", slug: "shirts", parentId: 102, parentName: "Men's Clothing", order: 1, showOnHomepage: true, visibility: true },
          { id: 1022, name: "T-Shirts & Polos", slug: "tshirts-polos", parentId: 102, parentName: "Men's Clothing", order: 2, showOnHomepage: true, visibility: true },
          { id: 1023, name: "Pants & Jeans", slug: "pants-jeans", parentId: 102, parentName: "Men's Clothing", order: 3, showOnHomepage: true, visibility: true },
          { id: 1024, name: "Jackets & Coats", slug: "jackets-coats-men", parentId: 102, parentName: "Men's Clothing", order: 4, showOnHomepage: true, visibility: true },
          { id: 1025, name: "Sweaters & Hoodies", slug: "sweaters-hoodies", parentId: 102, parentName: "Men's Clothing", order: 5, showOnHomepage: true, visibility: true },
          { id: 1026, name: "Suits & Blazers", slug: "suits-blazers", parentId: 102, parentName: "Men's Clothing", order: 6, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 103,
        name: "Kid's Clothing",
        slug: "kids-clothing",
        parentId: 1,
        parentName: "Clothing",
        order: 3,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 1031, name: "Boys Clothing", slug: "boys-clothing", parentId: 103, parentName: "Kid's Clothing", order: 1, showOnHomepage: true, visibility: true },
          { id: 1032, name: "Girls Clothing", slug: "girls-clothing", parentId: 103, parentName: "Kid's Clothing", order: 2, showOnHomepage: true, visibility: true },
          { id: 1033, name: "Baby & Toddler", slug: "baby-toddler", parentId: 103, parentName: "Kid's Clothing", order: 3, showOnHomepage: true, visibility: true },
          { id: 1034, name: "Clothing Sets", slug: "clothing-sets", parentId: 103, parentName: "Kid's Clothing", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Shoes",
    slug: "shoes",
    parentId: null,
    order: 2,
    showOnHomepage: true,
    visibility: true,
    subcategories: [
      {
        id: 201,
        name: "Men's Shoes",
        slug: "mens-shoes",
        parentId: 2,
        parentName: "Shoes",
        order: 1,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 2011, name: "Sneakers", slug: "sneakers-men", parentId: 201, parentName: "Men's Shoes", order: 1, showOnHomepage: true, visibility: true },
          { id: 2012, name: "Boots", slug: "boots-men", parentId: 201, parentName: "Men's Shoes", order: 2, showOnHomepage: true, visibility: true },
          { id: 2013, name: "Loafers & Slip-Ons", slug: "loafers", parentId: 201, parentName: "Men's Shoes", order: 3, showOnHomepage: true, visibility: true },
          { id: 2014, name: "Formal Shoes", slug: "formal-shoes", parentId: 201, parentName: "Men's Shoes", order: 4, showOnHomepage: true, visibility: true },
          { id: 2015, name: "Sandals & Slides", slug: "sandals-slides", parentId: 201, parentName: "Men's Shoes", order: 5, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 202,
        name: "Women's Shoes",
        slug: "womens-shoes",
        parentId: 2,
        parentName: "Shoes",
        order: 2,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 2021, name: "Heels & Pumps", slug: "heels", parentId: 202, parentName: "Women's Shoes", order: 1, showOnHomepage: true, visibility: true },
          { id: 2022, name: "Flats & Ballerinas", slug: "flats", parentId: 202, parentName: "Women's Shoes", order: 2, showOnHomepage: true, visibility: true },
          { id: 2023, name: "Sneakers", slug: "sneakers-women", parentId: 202, parentName: "Women's Shoes", order: 3, showOnHomepage: true, visibility: true },
          { id: 2024, name: "Boots & Booties", slug: "boots-women", parentId: 202, parentName: "Women's Shoes", order: 4, showOnHomepage: true, visibility: true },
          { id: 2025, name: "Sandals & Wedges", slug: "sandals-wedges", parentId: 202, parentName: "Women's Shoes", order: 5, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 203,
        name: "Kid's Shoes",
        slug: "kids-shoes",
        parentId: 2,
        parentName: "Shoes",
        order: 3,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 2031, name: "Boys Shoes", slug: "boys-shoes", parentId: 203, parentName: "Kid's Shoes", order: 1, showOnHomepage: true, visibility: true },
          { id: 2032, name: "Girls Shoes", slug: "girls-shoes", parentId: 203, parentName: "Kid's Shoes", order: 2, showOnHomepage: true, visibility: true },
          { id: 2033, name: "Toddler & Baby Shoes", slug: "toddler-shoes", parentId: 203, parentName: "Kid's Shoes", order: 3, showOnHomepage: true, visibility: true },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Home & Living",
    slug: "home-living",
    parentId: null,
    order: 3,
    showOnHomepage: true,
    visibility: true,
    subcategories: [
      {
        id: 301,
        name: "Furniture",
        slug: "furniture",
        parentId: 3,
        parentName: "Home & Living",
        order: 1,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 3011, name: "Living Room Furniture", slug: "living-room", parentId: 301, parentName: "Furniture", order: 1, showOnHomepage: true, visibility: true },
          { id: 3012, name: "Bedroom Furniture", slug: "bedroom", parentId: 301, parentName: "Furniture", order: 2, showOnHomepage: true, visibility: true },
          { id: 3013, name: "Office Furniture", slug: "office", parentId: 301, parentName: "Furniture", order: 3, showOnHomepage: true, visibility: true },
          { id: 3014, name: "Dining Room Furniture", slug: "dining-furniture", parentId: 301, parentName: "Furniture", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 302,
        name: "Home Decor",
        slug: "home-decor",
        parentId: 3,
        parentName: "Home & Living",
        order: 2,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 3021, name: "Decorative Pillows & Throws", slug: "decorative-pillows", parentId: 302, parentName: "Home Decor", order: 1, showOnHomepage: true, visibility: true },
          { id: 3022, name: "Mirrors & Clocks", slug: "mirrors", parentId: 302, parentName: "Home Decor", order: 2, showOnHomepage: true, visibility: true },
          { id: 3023, name: "Wall Art & Prints", slug: "wall-art", parentId: 302, parentName: "Home Decor", order: 3, showOnHomepage: true, visibility: true },
          { id: 3024, name: "Vases & Sculptures", slug: "vases-sculptures", parentId: 302, parentName: "Home Decor", order: 4, showOnHomepage: true, visibility: true },
          { id: 3025, name: "Rugs & Carpets", slug: "rugs-carpets", parentId: 302, parentName: "Home Decor", order: 5, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 303,
        name: "Lighting",
        slug: "lighting",
        parentId: 3,
        parentName: "Home & Living",
        order: 3,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 3031, name: "Desk & Table Lamps", slug: "table-lamps", parentId: 303, parentName: "Lighting", order: 1, showOnHomepage: true, visibility: true },
          { id: 3032, name: "Ceiling & Pendant Lights", slug: "ceiling-lights", parentId: 303, parentName: "Lighting", order: 2, showOnHomepage: true, visibility: true },
          { id: 3033, name: "Floor Lamps", slug: "floor-lamps", parentId: 303, parentName: "Lighting", order: 3, showOnHomepage: true, visibility: true },
          { id: 3034, name: "Wall Sconces", slug: "wall-sconces", parentId: 303, parentName: "Lighting", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 304,
        name: "Kitchen & Dining",
        slug: "kitchen-dining",
        parentId: 3,
        parentName: "Home & Living",
        order: 4,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 3041, name: "Cookware & Bakeware", slug: "cookware", parentId: 304, parentName: "Kitchen & Dining", order: 1, showOnHomepage: true, visibility: true },
          { id: 3042, name: "Dinnerware & Plates", slug: "dinnerware", parentId: 304, parentName: "Kitchen & Dining", order: 2, showOnHomepage: true, visibility: true },
          { id: 3043, name: "Drinkware & Glassware", slug: "drinkware", parentId: 304, parentName: "Kitchen & Dining", order: 3, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 305,
        name: "Painting & Art",
        slug: "painting-art",
        parentId: 3,
        parentName: "Home & Living",
        order: 5,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 3051, name: "Canvas Paintings", slug: "canvas-paintings", parentId: 305, parentName: "Painting & Art", order: 1, showOnHomepage: true, visibility: true },
          { id: 3052, name: "Watercolor Paintings", slug: "watercolor-paintings", parentId: 305, parentName: "Painting & Art", order: 2, showOnHomepage: true, visibility: true },
          { id: 3053, name: "Oil Paintings", slug: "oil-paintings", parentId: 305, parentName: "Painting & Art", order: 3, showOnHomepage: true, visibility: true },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Jewelry & Accessories",
    slug: "jewelry-accessories",
    parentId: null,
    order: 4,
    showOnHomepage: true,
    visibility: true,
    subcategories: [
      {
        id: 401,
        name: "Fine Jewelry",
        slug: "fine-jewelry",
        parentId: 4,
        parentName: "Jewelry & Accessories",
        order: 1,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 4011, name: "Rings", slug: "rings", parentId: 401, parentName: "Fine Jewelry", order: 1, showOnHomepage: true, visibility: true },
          { id: 4012, name: "Necklaces & Pendants", slug: "necklaces", parentId: 401, parentName: "Fine Jewelry", order: 2, showOnHomepage: true, visibility: true },
          { id: 4013, name: "Bracelets & Bangles", slug: "bracelets", parentId: 401, parentName: "Fine Jewelry", order: 3, showOnHomepage: true, visibility: true },
          { id: 4014, name: "Earrings", slug: "earrings", parentId: 401, parentName: "Fine Jewelry", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 402,
        name: "Watches",
        slug: "watches",
        parentId: 4,
        parentName: "Jewelry & Accessories",
        order: 2,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 4021, name: "Men's Watches", slug: "mens-watches", parentId: 402, parentName: "Watches", order: 1, showOnHomepage: true, visibility: true },
          { id: 4022, name: "Women's Watches", slug: "womens-watches", parentId: 402, parentName: "Watches", order: 2, showOnHomepage: true, visibility: true },
          { id: 4023, name: "Smartwatches & Bands", slug: "smartwatches", parentId: 402, parentName: "Watches", order: 3, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 403,
        name: "Bags & Purses",
        slug: "bags-purses",
        parentId: 4,
        parentName: "Jewelry & Accessories",
        order: 3,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 4031, name: "Handbags & Totes", slug: "handbags", parentId: 403, parentName: "Bags & Purses", order: 1, showOnHomepage: true, visibility: true },
          { id: 4032, name: "Backpacks", slug: "backpacks", parentId: 403, parentName: "Bags & Purses", order: 2, showOnHomepage: true, visibility: true },
          { id: 4033, name: "Wallets & Cardholders", slug: "wallets", parentId: 403, parentName: "Bags & Purses", order: 3, showOnHomepage: true, visibility: true },
          { id: 4034, name: "Clutches & Evening Bags", slug: "clutches", parentId: 403, parentName: "Bags & Purses", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 404,
        name: "Accessories",
        slug: "accessories",
        parentId: 4,
        parentName: "Jewelry & Accessories",
        order: 4,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 4041, name: "Hats & Caps", slug: "hats-caps", parentId: 404, parentName: "Accessories", order: 1, showOnHomepage: true, visibility: true },
          { id: 4042, name: "Belts", slug: "belts", parentId: 404, parentName: "Accessories", order: 2, showOnHomepage: true, visibility: true },
          { id: 4043, name: "Sunglasses & Eyewear", slug: "sunglasses", parentId: 404, parentName: "Accessories", order: 3, showOnHomepage: true, visibility: true },
          { id: 4044, name: "Scarves & Shawls", slug: "scarves-shawls", parentId: 404, parentName: "Accessories", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Toys & Entertainment",
    slug: "toys-entertainment",
    parentId: null,
    order: 5,
    showOnHomepage: true,
    visibility: true,
    subcategories: [
      {
        id: 501,
        name: "Toys & Games",
        slug: "toys-games",
        parentId: 5,
        parentName: "Toys & Entertainment",
        order: 1,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 5011, name: "Action Figures & Collectibles", slug: "action-figures", parentId: 501, parentName: "Toys & Games", order: 1, showOnHomepage: true, visibility: true },
          { id: 5012, name: "Dolls & Plush Toys", slug: "dolls", parentId: 501, parentName: "Toys & Games", order: 2, showOnHomepage: true, visibility: true },
          { id: 5013, name: "Puzzles & Board Games", slug: "puzzles", parentId: 501, parentName: "Toys & Games", order: 3, showOnHomepage: true, visibility: true },
          { id: 5014, name: "Building Blocks & LEGO", slug: "building-blocks", parentId: 501, parentName: "Toys & Games", order: 4, showOnHomepage: true, visibility: true },
          { id: 5015, name: "Remote Control & Vehicles", slug: "remote-control", parentId: 501, parentName: "Toys & Games", order: 5, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 502,
        name: "Video Games & Consoles",
        slug: "video-games",
        parentId: 5,
        parentName: "Toys & Entertainment",
        order: 2,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 5021, name: "PlayStation", slug: "playstation", parentId: 502, parentName: "Video Games & Consoles", order: 1, showOnHomepage: true, visibility: true },
          { id: 5022, name: "Xbox", slug: "xbox", parentId: 502, parentName: "Video Games & Consoles", order: 2, showOnHomepage: true, visibility: true },
          { id: 5023, name: "Nintendo Switch", slug: "nintendo", parentId: 502, parentName: "Video Games & Consoles", order: 3, showOnHomepage: true, visibility: true },
          { id: 5024, name: "PC Gaming & Accessories", slug: "pc-gaming", parentId: 502, parentName: "Video Games & Consoles", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 503,
        name: "Movies & Music",
        slug: "movies-music",
        parentId: 5,
        parentName: "Toys & Entertainment",
        order: 3,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 5031, name: "Vinyl Records", slug: "vinyl-records", parentId: 503, parentName: "Movies & Music", order: 1, showOnHomepage: true, visibility: true },
          { id: 5032, name: "CDs & DVDs", slug: "cds-dvds", parentId: 503, parentName: "Movies & Music", order: 2, showOnHomepage: true, visibility: true },
          { id: 5033, name: "Musical Instruments", slug: "musical-instruments", parentId: 503, parentName: "Movies & Music", order: 3, showOnHomepage: true, visibility: true },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Graphics & Photos",
    slug: "graphics-photos",
    parentId: null,
    order: 6,
    showOnHomepage: true,
    visibility: true,
    subcategories: [
      {
        id: 601,
        name: "Vectors & Illustrations",
        slug: "vectors",
        parentId: 6,
        parentName: "Graphics & Photos",
        order: 1,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 6011, name: "Icons & Badges", slug: "icons", parentId: 601, parentName: "Vectors & Illustrations", order: 1, showOnHomepage: true, visibility: true },
          { id: 6012, name: "Vector Illustrations", slug: "illustrations", parentId: 601, parentName: "Vectors & Illustrations", order: 2, showOnHomepage: true, visibility: true },
          { id: 6013, name: "Backgrounds & Patterns", slug: "patterns", parentId: 601, parentName: "Vectors & Illustrations", order: 3, showOnHomepage: true, visibility: true },
          { id: 6014, name: "Character Art", slug: "character-art", parentId: 601, parentName: "Vectors & Illustrations", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 602,
        name: "Photos & Stock",
        slug: "photos",
        parentId: 6,
        parentName: "Graphics & Photos",
        order: 2,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 6021, name: "Nature & Landscapes", slug: "nature-landscapes", parentId: 602, parentName: "Photos & Stock", order: 1, showOnHomepage: true, visibility: true },
          { id: 6022, name: "People & Lifestyle", slug: "people-lifestyle", parentId: 602, parentName: "Photos & Stock", order: 2, showOnHomepage: true, visibility: true },
          { id: 6023, name: "Business & Tech", slug: "business-tech", parentId: 602, parentName: "Photos & Stock", order: 3, showOnHomepage: true, visibility: true },
          { id: 6024, name: "Food & Architecture", slug: "food-architecture", parentId: 602, parentName: "Photos & Stock", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 603,
        name: "Fonts & Typography",
        slug: "fonts",
        parentId: 6,
        parentName: "Graphics & Photos",
        order: 3,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 6031, name: "Serif Fonts", slug: "serif-fonts", parentId: 603, parentName: "Fonts & Typography", order: 1, showOnHomepage: true, visibility: true },
          { id: 6032, name: "Sans-Serif Fonts", slug: "sans-serif-fonts", parentId: 603, parentName: "Fonts & Typography", order: 2, showOnHomepage: true, visibility: true },
          { id: 6033, name: "Script & Calligraphy", slug: "script-calligraphy", parentId: 603, parentName: "Fonts & Typography", order: 3, showOnHomepage: true, visibility: true },
          { id: 6034, name: "Display & Decorative", slug: "display-fonts", parentId: 603, parentName: "Fonts & Typography", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Video & Audio",
    slug: "video-audio",
    parentId: null,
    order: 7,
    showOnHomepage: true,
    visibility: true,
    subcategories: [
      {
        id: 701,
        name: "Video Templates",
        slug: "video-templates",
        parentId: 7,
        parentName: "Video & Audio",
        order: 1,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 7011, name: "After Effects Templates", slug: "after-effects", parentId: 701, parentName: "Video Templates", order: 1, showOnHomepage: true, visibility: true },
          { id: 7012, name: "Premiere Pro Templates", slug: "premiere-pro", parentId: 701, parentName: "Video Templates", order: 2, showOnHomepage: true, visibility: true },
          { id: 7013, name: "DaVinci Resolve Templates", slug: "davinci-resolve", parentId: 701, parentName: "Video Templates", order: 3, showOnHomepage: true, visibility: true },
          { id: 7014, name: "Intros & Openers", slug: "intros-openers", parentId: 701, parentName: "Video Templates", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 702,
        name: "Audio & Music",
        slug: "audio-music",
        parentId: 7,
        parentName: "Video & Audio",
        order: 2,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 7021, name: "Music Tracks", slug: "music-tracks", parentId: 702, parentName: "Audio & Music", order: 1, showOnHomepage: true, visibility: true },
          { id: 7022, name: "Sound Effects (SFX)", slug: "sound-effects", parentId: 702, parentName: "Audio & Music", order: 2, showOnHomepage: true, visibility: true },
          { id: 7023, name: "Logos & Idents", slug: "logos-idents", parentId: 702, parentName: "Audio & Music", order: 3, showOnHomepage: true, visibility: true },
          { id: 7024, name: "Ambient & Lo-Fi", slug: "ambient-lofi", parentId: 702, parentName: "Audio & Music", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 703,
        name: "Stock Footage",
        slug: "stock-footage",
        parentId: 7,
        parentName: "Video & Audio",
        order: 3,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 7031, name: "Nature & Aerial", slug: "nature-aerial", parentId: 703, parentName: "Stock Footage", order: 1, showOnHomepage: true, visibility: true },
          { id: 7032, name: "Urban & Drone", slug: "urban-drone", parentId: 703, parentName: "Stock Footage", order: 2, showOnHomepage: true, visibility: true },
          { id: 7033, name: "People & Events", slug: "people-events", parentId: 703, parentName: "Stock Footage", order: 3, showOnHomepage: true, visibility: true },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Web Templates & Code",
    slug: "web-templates-code",
    parentId: null,
    order: 8,
    showOnHomepage: true,
    visibility: true,
    subcategories: [
      {
        id: 801,
        name: "HTML Templates",
        slug: "html-templates",
        parentId: 8,
        parentName: "Web Templates & Code",
        order: 1,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 8011, name: "Admin Dashboards", slug: "admin-dashboards", parentId: 801, parentName: "HTML Templates", order: 1, showOnHomepage: true, visibility: true },
          { id: 8012, name: "Landing Pages", slug: "landing-pages", parentId: 801, parentName: "HTML Templates", order: 2, showOnHomepage: true, visibility: true },
          { id: 8013, name: "Portfolio & Creative", slug: "portfolio-creative", parentId: 801, parentName: "HTML Templates", order: 3, showOnHomepage: true, visibility: true },
          { id: 8014, name: "E-commerce Templates", slug: "ecommerce-templates", parentId: 801, parentName: "HTML Templates", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 802,
        name: "CMS Themes",
        slug: "cms-themes",
        parentId: 8,
        parentName: "Web Templates & Code",
        order: 2,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 8021, name: "WordPress Themes", slug: "wordpress-themes", parentId: 802, parentName: "CMS Themes", order: 1, showOnHomepage: true, visibility: true },
          { id: 8022, name: "Shopify Themes", slug: "shopify-themes", parentId: 802, parentName: "CMS Themes", order: 2, showOnHomepage: true, visibility: true },
          { id: 8023, name: "Magento Themes", slug: "magento-themes", parentId: 802, parentName: "CMS Themes", order: 3, showOnHomepage: true, visibility: true },
          { id: 8024, name: "WooCommerce", slug: "woocommerce", parentId: 802, parentName: "CMS Themes", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
      {
        id: 803,
        name: "Scripts & Code",
        slug: "scripts-code",
        parentId: 8,
        parentName: "Web Templates & Code",
        order: 3,
        showOnHomepage: true,
        visibility: true,
        subcategories: [
          { id: 8031, name: "PHP Scripts", slug: "php-scripts", parentId: 803, parentName: "Scripts & Code", order: 1, showOnHomepage: true, visibility: true },
          { id: 8032, name: "JavaScript & Python", slug: "javascript-python", parentId: 803, parentName: "Scripts & Code", order: 2, showOnHomepage: true, visibility: true },
          { id: 8033, name: "Mobile App Templates", slug: "mobile-apps", parentId: 803, parentName: "Scripts & Code", order: 3, showOnHomepage: true, visibility: true },
          { id: 8034, name: "Plugins & Extensions", slug: "plugins-extensions", parentId: 803, parentName: "Scripts & Code", order: 4, showOnHomepage: true, visibility: true },
        ],
      },
    ],
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategoryRecord[]>(FULL_CATEGORIES_DATA);
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allIds: Record<number, boolean> = {};
    const collectIds = (cats: AdminCategoryRecord[]) => {
      cats.forEach((c) => {
        if (c.subcategories && c.subcategories.length > 0) {
          allIds[c.id] = true;
          collectIds(c.subcategories);
        }
      });
    };
    collectIds(categories);
    setExpandedIds(allIds);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  // Count total subcategories recursively
  const countSubcategories = (cat: AdminCategoryRecord): number => {
    if (!cat.subcategories || cat.subcategories.length === 0) return 0;
    return cat.subcategories.reduce((acc, sub) => acc + 1 + countSubcategories(sub), 0);
  };

  const renderCategoryRow = (cat: AdminCategoryRecord, level = 0): React.ReactNode => {
    const hasChildren = cat.subcategories && cat.subcategories.length > 0;
    const isExpanded = !!expandedIds[cat.id] || !!search.trim();
    const subCount = countSubcategories(cat);

    return (
      <React.Fragment key={cat.id}>
        <tr
          className={`border-b border-[#f4f4f4] hover:bg-[#f9fbfd] transition-colors ${
            level > 0 ? "bg-[#fbfcfd]" : "bg-white"
          }`}
        >
          <td className="px-4 py-3 text-xs text-gray-500 font-mono">#{cat.id}</td>
          <td className="px-4 py-3">
            <div
              className="flex items-center gap-1.5"
              style={{ paddingLeft: `${level * 24}px` }}
            >
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggleExpand(cat.id)}
                  className="p-1 text-[#3c8dbc] hover:text-[#23527c] hover:bg-blue-50 rounded transition-colors focus:outline-none cursor-pointer"
                  title={isExpanded ? "Collapse parts" : "Expand parts (Lihat bagian-bagian)"}
                >
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? "rotate-90 text-[#00a65a]" : ""
                    }`}
                  />
                </button>
              ) : (
                <span className="w-6 inline-block" />
              )}
              {hasChildren ? (
                isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                )
              ) : (
                <span className="w-2 h-2 rounded-full bg-gray-300 mr-1 shrink-0" />
              )}
              <span
                onClick={() => hasChildren && toggleExpand(cat.id)}
                className={`text-[13.5px] ${
                  hasChildren ? "cursor-pointer hover:text-[#3c8dbc]" : ""
                } ${
                  level === 0 ? "font-bold text-[#222222]" : level === 1 ? "font-semibold text-gray-800" : "text-gray-700"
                }`}
              >
                {cat.name}
              </span>
              {hasChildren && (
                <span
                  onClick={() => toggleExpand(cat.id)}
                  className="ml-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
                >
                  {subCount} parts / subcategories
                </span>
              )}
            </div>
          </td>
          <td className="px-4 py-3 text-xs text-gray-600">
            {cat.parentName || <span className="text-gray-400">None (Root)</span>}
          </td>
          <td className="px-4 py-3 text-xs font-semibold text-center">{cat.order}</td>
          <td className="px-4 py-3 text-center">
            {cat.showOnHomepage ? (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[11px] font-bold px-2 py-0.5 rounded">
                <Check className="w-3 h-3" /> Yes
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded">
                No
              </span>
            )}
          </td>
          <td className="px-4 py-3 text-center">
            {cat.visibility ? (
              <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-[11px] font-bold px-2 py-0.5 rounded">
                <Eye className="w-3 h-3" /> Visible
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded">
                <EyeOff className="w-3 h-3" /> Hidden
              </span>
            )}
          </td>
          <td className="px-4 py-3 text-right">
            <div className="flex items-center justify-end gap-1.5">
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors"
                title="Edit Category"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </td>
        </tr>

        {/* Render child rows recursively if expanded */}
        {hasChildren &&
          isExpanded &&
          cat.subcategories!.map((child) => renderCategoryRow(child, level + 1))}
      </React.Fragment>
    );
  };

  const filteredCategories = categories.filter((cat) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const matchesSelf = cat.name.toLowerCase().includes(q) || cat.id.toString().includes(q);
    const matchesChildren = cat.subcategories?.some(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.subcategories?.some((cc) => cc.name.toLowerCase().includes(q))
    );
    return matchesSelf || matchesChildren;
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-sm text-gray-500">Manage categories, subcategories and navigation tree</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Expand All Parts (Buka Semua Bagian)
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Collapse All
          </button>
          <button
            type="button"
            className="px-4 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>
      </div>

      {/* Main Table Panel */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] overflow-hidden">
        {/* Table Filter Topbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-gray-50/50">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#3c8dbc]" />
            <span>Category Tree Explorer</span>
            <span className="text-xs text-gray-500 font-normal">
              (Klik icon panah ▶ untuk melihat bagian-bagian / subkategori secara lengkap)
            </span>
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category or part..."
              className="w-full text-xs bg-white border border-gray-300 rounded px-3 py-1.5 pl-8 outline-none focus:border-[#3c8dbc]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Categories Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#f9fafb] border-b border-gray-200 text-gray-600 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="px-4 py-3 w-16">Id</th>
                <th className="px-4 py-3">Category Name & Sub-Parts</th>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3 text-center w-20">Order</th>
                <th className="px-4 py-3 text-center w-36">Show on Homepage</th>
                <th className="px-4 py-3 text-center w-28">Visibility</th>
                <th className="px-4 py-3 text-right w-24">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat) => renderCategoryRow(cat, 0))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
