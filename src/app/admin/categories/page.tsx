"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Upload,
  RefreshCw,
  Trash2,
  X,
  CheckCircle,
  Percent,
  Check,
} from "lucide-react";

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  parentName?: string;
  order: number;
  commissionRate?: number;
  isFeatured?: boolean;
  isActive: boolean;
  showOnHomepage?: boolean;
  subcategories?: CategoryItem[];
}

const INITIAL_CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 1,
    name: "Clothing",
    slug: "clothing",
    parentId: null,
    order: 1,
    commissionRate: 10,
    isFeatured: true,
    isActive: true,
    showOnHomepage: true,
    subcategories: [
      {
        id: 101,
        name: "Women's Clothing",
        slug: "womens-clothing",
        parentId: 1,
        parentName: "Clothing",
        order: 1,
        isActive: true,
        showOnHomepage: true,
        subcategories: [
          {
            id: 1011,
            name: "Dresses",
            slug: "dresses",
            parentId: 101,
            parentName: "Women's Clothing",
            order: 1,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1012,
            name: "Skirts",
            slug: "skirts",
            parentId: 101,
            parentName: "Women's Clothing",
            order: 2,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1013,
            name: "Pants & Capris",
            slug: "pants-capris",
            parentId: 101,
            parentName: "Women's Clothing",
            order: 3,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1014,
            name: "Sweaters & Cardigans",
            slug: "sweaters-cardigans",
            parentId: 101,
            parentName: "Women's Clothing",
            order: 4,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1015,
            name: "Tops & T-Shirts",
            slug: "tops-tshirts",
            parentId: 101,
            parentName: "Women's Clothing",
            order: 5,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1016,
            name: "Jackets & Coats",
            slug: "jackets-coats",
            parentId: 101,
            parentName: "Women's Clothing",
            order: 6,
            isActive: true,
            showOnHomepage: true,
          },
        ],
      },
      {
        id: 102,
        name: "Men's Clothing",
        slug: "mens-clothing",
        parentId: 1,
        parentName: "Clothing",
        order: 2,
        isActive: true,
        showOnHomepage: true,
        subcategories: [
          {
            id: 1021,
            name: "Shirts",
            slug: "shirts",
            parentId: 102,
            parentName: "Men's Clothing",
            order: 1,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1022,
            name: "T-Shirts & Polos",
            slug: "tshirts-polos",
            parentId: 102,
            parentName: "Men's Clothing",
            order: 2,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1023,
            name: "Pants & Jeans",
            slug: "pants-jeans",
            parentId: 102,
            parentName: "Men's Clothing",
            order: 3,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1024,
            name: "Jackets & Coats",
            slug: "jackets-coats-men",
            parentId: 102,
            parentName: "Men's Clothing",
            order: 4,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1025,
            name: "Sweaters & Hoodies",
            slug: "sweaters-hoodies",
            parentId: 102,
            parentName: "Men's Clothing",
            order: 5,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1026,
            name: "Suits & Blazers",
            slug: "suits-blazers",
            parentId: 102,
            parentName: "Men's Clothing",
            order: 6,
            isActive: true,
            showOnHomepage: true,
          },
        ],
      },
      {
        id: 103,
        name: "Kid's Clothing",
        slug: "kids-clothing",
        parentId: 1,
        parentName: "Clothing",
        order: 3,
        isActive: true,
        showOnHomepage: true,
        subcategories: [
          {
            id: 1031,
            name: "Boys Clothing",
            slug: "boys-clothing",
            parentId: 103,
            parentName: "Kid's Clothing",
            order: 1,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1032,
            name: "Girls Clothing",
            slug: "girls-clothing",
            parentId: 103,
            parentName: "Kid's Clothing",
            order: 2,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 1033,
            name: "Baby & Toddler",
            slug: "baby-toddler",
            parentId: 103,
            parentName: "Kid's Clothing",
            order: 3,
            isActive: true,
            showOnHomepage: true,
          },
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
    isActive: true,
    showOnHomepage: true,
    subcategories: [
      {
        id: 201,
        name: "Men's Shoes",
        slug: "mens-shoes",
        parentId: 2,
        parentName: "Shoes",
        order: 1,
        isActive: true,
        showOnHomepage: true,
        subcategories: [
          {
            id: 2011,
            name: "Sneakers",
            slug: "sneakers-men",
            parentId: 201,
            parentName: "Men's Shoes",
            order: 1,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 2012,
            name: "Boots",
            slug: "boots-men",
            parentId: 201,
            parentName: "Men's Shoes",
            order: 2,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 2013,
            name: "Formal Shoes",
            slug: "formal-shoes",
            parentId: 201,
            parentName: "Men's Shoes",
            order: 3,
            isActive: true,
            showOnHomepage: true,
          },
        ],
      },
      {
        id: 202,
        name: "Women's Shoes",
        slug: "womens-shoes",
        parentId: 2,
        parentName: "Shoes",
        order: 2,
        isActive: true,
        showOnHomepage: true,
        subcategories: [
          {
            id: 2021,
            name: "Heels & Pumps",
            slug: "heels",
            parentId: 202,
            parentName: "Women's Shoes",
            order: 1,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 2022,
            name: "Flats & Loafers",
            slug: "flats",
            parentId: 202,
            parentName: "Women's Shoes",
            order: 2,
            isActive: true,
            showOnHomepage: true,
          },
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
    commissionRate: 15,
    isFeatured: true,
    isActive: true,
    showOnHomepage: true,
    subcategories: [
      {
        id: 301,
        name: "Home Decor",
        slug: "home-decor",
        parentId: 3,
        parentName: "Home & Living",
        order: 1,
        isActive: true,
        showOnHomepage: true,
        subcategories: [
          {
            id: 3011,
            name: "Decorative Pillows",
            slug: "decorative-pillows",
            parentId: 301,
            parentName: "Home Decor",
            order: 1,
            isActive: true,
            showOnHomepage: true,
          },
          {
            id: 3012,
            name: "Wall Art & Paintings",
            slug: "wall-art",
            parentId: 301,
            parentName: "Home Decor",
            order: 2,
            isActive: true,
            showOnHomepage: true,
          },
        ],
      },
      {
        id: 302,
        name: "Living Room Furniture",
        slug: "living-room-furniture",
        parentId: 3,
        parentName: "Home & Living",
        order: 2,
        isActive: true,
        showOnHomepage: true,
      },
      {
        id: 303,
        name: "Kitchen & Dining",
        slug: "kitchen-dining",
        parentId: 3,
        parentName: "Home & Living",
        order: 3,
        isActive: true,
        showOnHomepage: true,
      },
    ],
  },
  {
    id: 4,
    name: "Jewelry & Accessories",
    slug: "jewelry-accessories",
    parentId: null,
    order: 4,
    isActive: true,
    showOnHomepage: true,
    subcategories: [
      {
        id: 401,
        name: "Fine Jewelry",
        slug: "fine-jewelry",
        parentId: 4,
        parentName: "Jewelry & Accessories",
        order: 1,
        isActive: true,
        showOnHomepage: true,
      },
      {
        id: 402,
        name: "Watches",
        slug: "watches",
        parentId: 4,
        parentName: "Jewelry & Accessories",
        order: 2,
        isActive: true,
        showOnHomepage: true,
      },
      {
        id: 403,
        name: "Bags & Backpacks",
        slug: "bags-backpacks",
        parentId: 4,
        parentName: "Jewelry & Accessories",
        order: 3,
        isActive: true,
        showOnHomepage: true,
      },
    ],
  },
  {
    id: 5,
    name: "Toys & Entertainment",
    slug: "toys-entertainment",
    parentId: null,
    order: 5,
    isFeatured: true,
    isActive: true,
    showOnHomepage: true,
    subcategories: [
      {
        id: 501,
        name: "Action Figures & Collectibles",
        slug: "action-figures",
        parentId: 5,
        parentName: "Toys & Entertainment",
        order: 1,
        isActive: true,
        showOnHomepage: true,
      },
      {
        id: 502,
        name: "Puzzles & Board Games",
        slug: "puzzles-games",
        parentId: 5,
        parentName: "Toys & Entertainment",
        order: 2,
        isActive: true,
        showOnHomepage: true,
      },
    ],
  },
  {
    id: 6,
    name: "Graphics & Photos",
    slug: "graphics-photos",
    parentId: null,
    order: 6,
    isActive: true,
    showOnHomepage: true,
    subcategories: [
      {
        id: 601,
        name: "Vectors & Illustrations",
        slug: "vectors-illustrations",
        parentId: 6,
        parentName: "Graphics & Photos",
        order: 1,
        isActive: true,
        showOnHomepage: true,
      },
      {
        id: 602,
        name: "Stock Photos",
        slug: "stock-photos",
        parentId: 6,
        parentName: "Graphics & Photos",
        order: 2,
        isActive: true,
        showOnHomepage: true,
      },
    ],
  },
  {
    id: 7,
    name: "Video & Audio",
    slug: "video-audio",
    parentId: null,
    order: 7,
    isActive: true,
    showOnHomepage: true,
    subcategories: [
      {
        id: 701,
        name: "Music Tracks & Sound FX",
        slug: "music-sound",
        parentId: 7,
        parentName: "Video & Audio",
        order: 1,
        isActive: true,
        showOnHomepage: true,
      },
      {
        id: 702,
        name: "Stock Footage",
        slug: "stock-footage",
        parentId: 7,
        parentName: "Video & Audio",
        order: 2,
        isActive: true,
        showOnHomepage: true,
      },
    ],
  },
  {
    id: 8,
    name: "Web Templates & Code",
    slug: "web-templates-code",
    parentId: null,
    order: 8,
    isActive: true,
    showOnHomepage: true,
    subcategories: [
      {
        id: 801,
        name: "HTML Templates",
        slug: "html-templates",
        parentId: 8,
        parentName: "Web Templates & Code",
        order: 1,
        isActive: true,
        showOnHomepage: true,
      },
      {
        id: 802,
        name: "WordPress Themes",
        slug: "wordpress-themes",
        parentId: 8,
        parentName: "Web Templates & Code",
        order: 2,
        isActive: true,
        showOnHomepage: true,
      },
      {
        id: 803,
        name: "Scripts & Code",
        slug: "scripts-code",
        parentId: 8,
        parentName: "Web Templates & Code",
        order: 3,
        isActive: true,
        showOnHomepage: true,
      },
    ],
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(
    INITIAL_CATEGORIES_DATA
  );
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");

  // Settings card states matching screenshot
  const [sortOption, setSortOption] = useState<
    "by Category Order" | "by Date" | "by Date (DESC)" | "Alphabetically"
  >("by Category Order");
  const [sortParentCategories, setSortParentCategories] =
    useState<boolean>(true);

  // Modals & Feedback
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(
    null
  );
  const [notification, setNotification] = useState<string | null>(null);

  // Add / Edit form states
  const [formName, setFormName] = useState<string>("");
  const [formSlug, setFormSlug] = useState<string>("");
  const [formParentId, setFormParentId] = useState<number | "none">("none");
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formCommission, setFormCommission] = useState<string>("");
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [formActive, setFormActive] = useState<boolean>(true);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchInput.trim().toLowerCase());
  };

  const handleRebuildPaths = () => {
    setNotification("Category paths have been rebuilt successfully.");
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveSettings = () => {
    setNotification("Category settings updated successfully.");
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteCategory = (item: CategoryItem) => {
    const confirmed = confirm(
      `Are you sure you want to delete category "${item.name}" (Id: ${item.id})?`
    );
    if (confirmed) {
      const deleteRecursive = (list: CategoryItem[]): CategoryItem[] => {
        return list
          .filter((cat) => cat.id !== item.id)
          .map((cat) => ({
            ...cat,
            subcategories: cat.subcategories
              ? deleteRecursive(cat.subcategories)
              : undefined,
          }));
      };

      setCategories((prev) => deleteRecursive(prev));
      setNotification(`Category "${item.name}" has been deleted.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleOpenEdit = (item: CategoryItem) => {
    setEditingCategory(item);
    setFormName(item.name);
    setFormSlug(item.slug);
    setFormParentId(item.parentId !== null ? item.parentId : "none");
    setFormOrder(item.order);
    setFormCommission(
      item.commissionRate !== undefined ? item.commissionRate.toString() : ""
    );
    setFormFeatured(!!item.isFeatured);
    setFormActive(item.isActive);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    const updatedItem: CategoryItem = {
      ...editingCategory,
      name: formName,
      slug:
        formSlug.trim() ||
        formName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      parentId: formParentId === "none" ? null : Number(formParentId),
      order: Number(formOrder),
      commissionRate: formCommission.trim()
        ? Number(formCommission)
        : undefined,
      isFeatured: formFeatured,
      isActive: formActive,
    };

    const updateRecursive = (list: CategoryItem[]): CategoryItem[] => {
      return list.map((cat) => {
        if (cat.id === updatedItem.id) {
          return {
            ...updatedItem,
            subcategories: cat.subcategories,
          };
        }
        if (cat.subcategories && cat.subcategories.length > 0) {
          return {
            ...cat,
            subcategories: updateRecursive(cat.subcategories),
          };
        }
        return cat;
      });
    };

    setCategories((prev) => updateRecursive(prev));
    setEditingCategory(null);
    setNotification(`Category "${formName}" updated successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newId = Date.now() % 10000;
    const newCategory: CategoryItem = {
      id: newId,
      name: formName.trim(),
      slug:
        formSlug.trim() ||
        formName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      parentId: formParentId === "none" ? null : Number(formParentId),
      order: Number(formOrder) || 1,
      commissionRate: formCommission.trim()
        ? Number(formCommission)
        : undefined,
      isFeatured: formFeatured,
      isActive: formActive,
      showOnHomepage: true,
      subcategories: [],
    };

    if (formParentId === "none") {
      setCategories((prev) => [...prev, newCategory]);
    } else {
      const addToParent = (list: CategoryItem[]): CategoryItem[] => {
        return list.map((cat) => {
          if (cat.id === formParentId) {
            return {
              ...cat,
              subcategories: [...(cat.subcategories || []), newCategory],
            };
          }
          if (cat.subcategories && cat.subcategories.length > 0) {
            return {
              ...cat,
              subcategories: addToParent(cat.subcategories),
            };
          }
          return cat;
        });
      };
      setCategories((prev) => addToParent(prev));
      setExpandedIds((prev) => ({ ...prev, [Number(formParentId)]: true }));
    }

    setIsAddModalOpen(false);
    setFormName("");
    setFormSlug("");
    setFormCommission("");
    setNotification(`Category "${newCategory.name}" added successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  // Filter categories by search
  const filteredCategories = useMemo(() => {
    if (!appliedSearch) return categories;

    const filterList = (list: CategoryItem[]): CategoryItem[] => {
      return list
        .map((cat) => {
          const matches =
            cat.name.toLowerCase().includes(appliedSearch) ||
            cat.id.toString().includes(appliedSearch);
          const filteredSubs = cat.subcategories
            ? filterList(cat.subcategories)
            : [];
          if (matches || filteredSubs.length > 0) {
            return {
              ...cat,
              subcategories: filteredSubs,
            };
          }
          return null;
        })
        .filter(Boolean) as CategoryItem[];
    };

    return filterList(categories);
  }, [categories, appliedSearch]);

  // Flattened list of root categories for parent dropdown
  const rootCategories = categories.filter((c) => c.parentId === null);

  // Render Category Row recursively matching screenshot
  const renderCategoryItem = (item: CategoryItem, level = 0) => {
    const hasChildren = item.subcategories && item.subcategories.length > 0;
    const isExpanded = !!expandedIds[item.id] || !!appliedSearch;

    return (
      <div key={item.id} className="w-full">
        {/* Category Row */}
        <div
          className={`flex items-center justify-between py-2.5 px-4 border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors select-none ${
            level > 0 ? "bg-gray-50/30" : "bg-white"
          }`}
          style={{ paddingLeft: `${Math.max(16, level * 28 + 16)}px` }}
        >
          {/* Left: Triangle Caret + Name + (Id: X) */}
          <div
            onClick={() => hasChildren && toggleExpand(item.id)}
            className={`flex items-center gap-1.5 ${
              hasChildren ? "cursor-pointer" : ""
            }`}
          >
            {hasChildren ? (
              <span
                className={`inline-block text-[#555] text-[10px] w-3 text-center transition-transform duration-150 ${
                  isExpanded ? "rotate-90 text-[#333]" : ""
                }`}
              >
                ▸
              </span>
            ) : (
              <span className="inline-block text-transparent text-[10px] w-3">
                •
              </span>
            )}

            <span className="text-[13.5px] font-medium text-[#333333] hover:text-[#0088cc] transition-colors">
              {item.name}
            </span>
            <span className="text-[12.5px] text-[#777777] font-normal ml-0.5">
              (Id: {item.id})
            </span>
          </div>

          {/* Right: Badges + Edit Button + Delete Button */}
          <div className="flex items-center gap-2">
            {/* Commission Rate Badge (Orange) */}
            {item.commissionRate !== undefined && (
              <span className="inline-flex items-center gap-0.5 bg-[#f39c12] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[3px] shadow-2xs">
                <Percent className="w-2.5 h-2.5 stroke-[2.5]" />
                <span>{item.commissionRate}%</span>
              </span>
            )}

            {/* Featured Badge (Cyan) */}
            {item.isFeatured && (
              <span className="inline-block bg-[#00c0ef] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[3px] shadow-2xs">
                Featured
              </span>
            )}

            {/* Status Badge (Active - Green) */}
            {item.isActive ? (
              <span className="inline-block bg-[#00a65a] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[3px] shadow-2xs">
                Active
              </span>
            ) : (
              <span className="inline-block bg-[#777] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[3px] shadow-2xs">
                Inactive
              </span>
            )}

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => handleOpenEdit(item)}
              className="h-[26px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#444] hover:text-[#000] text-[12px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDeleteCategory(item)}
              className="h-[26px] w-[28px] border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#777] hover:text-red-600 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              title="Delete Category"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Nested Child Categories */}
        {hasChildren &&
          isExpanded &&
          item.subcategories!.map((child) => renderCategoryItem(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Top Header Row with Action Buttons matching Screenshot 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        {/* Page Title */}
        <h1 className="text-[24px] font-normal text-[#333333]">Categories</h1>

        {/* Top-Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* + Add Category (Green) */}
          <button
            type="button"
            onClick={() => {
              setFormName("");
              setFormSlug("");
              setFormParentId("none");
              setFormOrder(1);
              setFormCommission("");
              setFormFeatured(false);
              setFormActive(true);
              setIsAddModalOpen(true);
            }}
            className="h-[34px] px-3.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>

          {/* Bulk Category Upload (Cyan) */}
          <button
            type="button"
            onClick={() => setIsBulkModalOpen(true)}
            className="h-[34px] px-3.5 bg-[#00c0ef] hover:bg-[#00a7d0] active:bg-[#0090b2] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Upload className="w-4 h-4" />
            <span>Bulk Category Upload</span>
          </button>

          {/* Rebuild Category Paths (Red) */}
          <button
            type="button"
            onClick={handleRebuildPaths}
            className="h-[34px] px-3.5 bg-[#dd4b39] hover:bg-[#d73925] active:bg-[#ac2925] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rebuild Category Paths</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
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

      {/* Main Categories Card (White Box) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5 mb-6">
        {/* Search Row */}
        <form onSubmit={handleSearchSubmit} className="mb-5">
          <label className="block text-[13px] text-[#333333] font-normal mb-1">
            Search
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-[34px] w-[200px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] placeholder-gray-400 outline-none focus:border-[#3c8dbc]"
            />
            <button
              type="submit"
              className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#534f96] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
            >
              Filter
            </button>
          </div>
        </form>

        {/* Categories Tree List matching Screenshot 1 */}
        <div className="border border-[#e9ecef] rounded-[3px] overflow-hidden">
          {filteredCategories.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-[13px]">
              No categories found.
            </div>
          ) : (
            filteredCategories.map((cat) => renderCategoryItem(cat, 0))
          )}
        </div>
      </div>

      {/* Settings Card matching Screenshot 2 */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-6 mb-6">
        <h2 className="text-[17px] font-normal text-[#333333] mb-4">Settings</h2>

        <div className="mb-4">
          <label className="block text-[13px] text-[#333333] font-normal mb-3">
            Sort Categories
          </label>

          {/* Radio Options Grid */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-5">
            {[
              { id: "by Category Order", label: "by Category Order" },
              { id: "by Date", label: "by Date" },
              { id: "by Date (DESC)", label: "by Date (DESC)" },
              { id: "Alphabetically", label: "Alphabetically" },
            ].map((opt) => (
              <label
                key={opt.id}
                onClick={() =>
                  setSortOption(
                    opt.id as
                      | "by Category Order"
                      | "by Date"
                      | "by Date (DESC)"
                      | "Alphabetically"
                  )
                }
                className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#333333]"
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    sortOption === opt.id
                      ? "border-[#605ca8] bg-[#605ca8]"
                      : "border-gray-400 bg-white"
                  }`}
                >
                  {sortOption === opt.id && (
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  )}
                </div>
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Checkbox: Sort Parent Categories by Category Order */}
          <div className="mb-6">
            <label
              onClick={() => setSortParentCategories(!sortParentCategories)}
              className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#333333]"
            >
              <div
                className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                  sortParentCategories
                    ? "border-[#605ca8] bg-[#605ca8]"
                    : "border-gray-400 bg-white"
                }`}
              >
                {sortParentCategories && (
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                )}
              </div>
              <span>Sort Parent Categories by Category Order</span>
            </label>
          </div>

          {/* Save Changes Button (Bottom Right) */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveSettings}
              className="h-[34px] px-5 bg-[#0073b7] hover:bg-[#005a92] active:bg-[#004e7c] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Warning Alert Box matching Screenshot 2 */}
      <div className="bg-[#d9edf7] border border-[#bce8f1] text-[#31708f] p-4 rounded-[3px] text-[13px] leading-relaxed shadow-xs">
        <span className="font-bold">Warning!</span> Sorting with drag and drop
        will be active only when the &quot;by Category Order&quot; option is
        selected.
      </div>

      {/* ADD CATEGORY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Add Category
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleAddCategory}>
              <div className="p-6 space-y-4 text-[13.5px]">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fashion & Accessories"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Slug (URL Key)
                  </label>
                  <input
                    type="text"
                    placeholder="Optional (auto-generated if empty)"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                {/* Parent Category */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Parent Category
                  </label>
                  <select
                    value={formParentId}
                    onChange={(e) =>
                      setFormParentId(
                        e.target.value === "none"
                          ? "none"
                          : Number(e.target.value)
                      )
                    }
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                  >
                    <option value="none">None (Root Category)</option>
                    {rootCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} (Id: {c.id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Order & Commission Rate */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Order Index
                    </label>
                    <input
                      type="number"
                      value={formOrder}
                      onChange={(e) => setFormOrder(Number(e.target.value))}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 10"
                      value={formCommission}
                      onChange={(e) => setFormCommission(e.target.value)}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                    />
                  </div>
                </div>

                {/* Options Checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 text-[#00c0ef] rounded border-gray-300"
                    />
                    <span>Mark as Featured Category</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={formActive}
                      onChange={(e) => setFormActive(e.target.checked)}
                      className="w-4 h-4 text-[#00a65a] rounded border-gray-300"
                    />
                    <span>Active Status</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Edit Category (Id: {editingCategory.id})
              </h3>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4 text-[13.5px]">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Slug (URL Key)
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                {/* Parent Category */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Parent Category
                  </label>
                  <select
                    value={formParentId}
                    onChange={(e) =>
                      setFormParentId(
                        e.target.value === "none"
                          ? "none"
                          : Number(e.target.value)
                      )
                    }
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                  >
                    <option value="none">None (Root Category)</option>
                    {rootCategories
                      .filter((c) => c.id !== editingCategory.id)
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} (Id: {c.id})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Order & Commission Rate */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Order Index
                    </label>
                    <input
                      type="number"
                      value={formOrder}
                      onChange={(e) => setFormOrder(Number(e.target.value))}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 10"
                      value={formCommission}
                      onChange={(e) => setFormCommission(e.target.value)}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                    />
                  </div>
                </div>

                {/* Options Checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 text-[#00c0ef] rounded border-gray-300"
                    />
                    <span>Mark as Featured Category</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={formActive}
                      onChange={(e) => setFormActive(e.target.checked)}
                      className="w-4 h-4 text-[#00a65a] rounded border-gray-300"
                    />
                    <span>Active Status</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK CATEGORY UPLOAD MODAL */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Bulk Category Upload
              </h3>
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-[13px]">
              <p className="text-gray-600">
                You can upload categories in bulk using a CSV file. Download the
                sample CSV template to ensure correct format.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-[4px] p-6 text-center hover:border-[#00c0ef] transition-colors cursor-pointer bg-gray-50/50">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-500 font-medium block mb-1">
                  Click or drag and drop CSV file here
                </span>
                <span className="text-[11px] text-gray-400 block">
                  Accepted format: .csv, max 10MB
                </span>
              </div>

              <div className="pt-2">
                <a
                  href="#download-sample"
                  onClick={(e) => {
                    e.preventDefault();
                    setNotification("Sample CSV file downloaded.");
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="text-xs text-[#0088cc] hover:underline font-medium inline-block"
                >
                  Download Sample CSV Template
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsBulkModalOpen(false);
                  setNotification("Categories uploaded successfully.");
                  setTimeout(() => setNotification(null), 4000);
                }}
                className="h-[34px] px-5 bg-[#00c0ef] hover:bg-[#00a7d0] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
