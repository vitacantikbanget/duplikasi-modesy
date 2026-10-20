"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { ALL_PRODUCTS, ProductItem } from "@/lib/products-data";
import { useClickOutside } from "@/hooks/useClickOutside";

interface NavbarSearchProps {
  placeholder?: string;
  mobileSearchOpen: boolean;
  onCloseMobileSearch: () => void;
}

export function NavbarSearch({
  placeholder = "Search for products, categories or brands",
  mobileSearchOpen,
  onCloseMobileSearch,
}: NavbarSearchProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<ProductItem[]>([]);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchContainerRef, () => {
    setSearchDropdownOpen(false);
  });

  useClickOutside(mobileSearchRef, () => {
    onCloseMobileSearch();
  });

  // Debounced live search autocomplete matching Modesy
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length >= 2) {
      const filtered = ALL_PRODUCTS.filter((p) => {
        const matchesQuery =
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q));

        if (searchCategory === "all") return matchesQuery;
        return (
          matchesQuery &&
          p.categorySlug.toLowerCase() === searchCategory.toLowerCase()
        );
      });
      setSearchResults(filtered.slice(0, 6));
      setSearchDropdownOpen(true);
    } else {
      setSearchResults([]);
      setSearchDropdownOpen(false);
    }
  }, [searchQuery, searchCategory]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchDropdownOpen(false);
    onCloseMobileSearch();
    const catParam =
      searchCategory !== "all" ? `&category=${searchCategory}` : "";
    router.push(
      `/products?search=${encodeURIComponent(searchQuery.trim())}${catParam}`
    );
  };

  return (
    <>
      {/* Desktop Search Bar */}
      <div ref={searchContainerRef} className="flex-1 max-w-2xl hidden md:block relative">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center w-full bg-[#f4f5f7] rounded-[4px] px-4 h-11 border border-transparent focus-within:border-[#00a699] focus-within:bg-white transition-all relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim().length >= 2) setSearchDropdownOpen(true);
            }}
            placeholder={placeholder}
            className="flex-1 text-[13.5px] bg-transparent outline-none text-[#2c333e] placeholder:text-[#888888] font-normal"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="px-1 text-gray-400 hover:text-gray-600 transition-colors mr-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="text-gray-400 hover:text-[#00a699] transition-colors flex items-center justify-center p-1 cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4 text-[#888888]" />
          </button>
        </form>

        {/* Live Search AJAX Dropdown (#response_search_results) */}
        {searchDropdownOpen && (
          <div
            id="response_search_results"
            className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#dcdfe3] rounded-[3px] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            {searchResults.length > 0 ? (
              <div>
                <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 flex justify-between items-center">
                  <span>Products</span>
                  <span>
                    {searchResults.length} match{searchResults.length > 1 ? "es" : ""}
                  </span>
                </div>
                <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      onClick={() => setSearchDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f9fa] transition-colors group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.images?.[0] || "/images/products/placeholder.webp"}
                        alt={item.title}
                        className="w-10 h-10 rounded-[2px] object-cover border border-gray-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-800 group-hover:text-[#00a699] truncate transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-gray-400">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#00a699] shrink-0">
                        ${typeof item.price === "number" ? item.price : 49}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 bg-gray-50/70">
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit()}
                    className="w-full text-center text-xs font-semibold text-[#00a699] hover:underline py-1 cursor-pointer"
                  >
                    See all results for &quot;{searchQuery}&quot; →
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-xs text-gray-500">
                No products found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Drawer */}
      {mobileSearchOpen && (
        <div
          ref={mobileSearchRef}
          className="md:hidden px-4 pb-3 bg-white border-b border-gray-200"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full bg-[#f4f4f4] rounded-[3px] border border-[#dcdfe3] h-10 overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 text-xs bg-transparent outline-none text-gray-700"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 bg-[#00a99d] text-white flex items-center justify-center cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile live search dropdown */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  onClick={() => onCloseMobileSearch()}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 text-xs"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.images?.[0] || "/images/products/placeholder.webp"}
                    alt={item.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="flex-1 truncate font-medium text-gray-800">
                    {item.title}
                  </span>
                  <span className="font-bold text-[#00a99d]">
                    ${typeof item.price === "number" ? item.price : 49}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
