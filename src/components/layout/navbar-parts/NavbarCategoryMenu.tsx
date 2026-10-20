/**
 * ============================================================================
 * NavbarCategoryMenu: Mega Menu Navigasi Kategori (Desktop Mega Menu)
 * ============================================================================
 * Menampilkan baris navigasi horizontal seluruh kategori utama Modesy pada desktop:
 * - Kategori Utama: Clothing, Shoes, Home & Living, Jewelry & Accessories,
 *   Toys & Entertainment, Graphics & Photos, Video & Audio, Web Templates & Code.
 * - Desain Mega Menu:
 *   - Saat kursor melayang di atas kategori (hover), dropdown mega menu lebar muncul.
 *   - Kolom Teks: Subkategori terperinci (Women's Clothing, Men's Clothing, Kids, dll).
 *   - Kolom Gambar: Pratinjau visual kategori dengan efek zoom hover.
 */

"use client";

import Link from "next/link";

interface NavbarCategoryMenuProps {
  t: (key: string, fallback?: string) => string;
}

export function NavbarCategoryMenu({ t }: NavbarCategoryMenuProps) {
  return (
    <div className="hidden md:block pb-3.5 border-b border-[#f1f3f5]">
      <div className="max-w-7xl mx-auto px-4 flex justify-center flex-wrap gap-x-7 lg:gap-x-8 text-[13.5px] font-medium text-[#2c333e]">
        {/* CLOTHING */}
        <div className="group relative">
          <Link
            href="/clothing"
            className="hover:text-[#00a699] transition-colors py-1.5 block"
          >
            {t("categories.clothing")}
          </Link>

          {/* Mega Menu */}
          <div className="absolute top-full left-0 -ml-[50px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
            <div className="flex justify-between gap-8">
              {/* Text Columns */}
              <div className="flex gap-16 flex-1">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Women&apos;s Clothing</h4>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Dresses</Link>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Skirts</Link>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Pants &amp; Capris</Link>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sweaters</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Men&apos;s Clothing</h4>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Jackets &amp; Coats</Link>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sweaters</Link>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Pants &amp; Jeans</Link>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Shirts</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Kid&apos;s Clothing</h4>
                  <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Clothing Sets</Link>
                </div>
              </div>

              {/* Images */}
              <div className="w-[320px] grid grid-cols-2 gap-3">
                <Link href="/clothing" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop"
                    alt="Women's Clothing"
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Women&apos;s Clothing</span>
                  </div>
                </Link>
                <Link href="/clothing" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=200&fit=crop"
                    alt="Sweaters"
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Sweaters</span>
                  </div>
                </Link>
                <Link href="/clothing" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&h=200&fit=crop"
                    alt="Men's Clothing"
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Men&apos;s Clothing</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SHOES */}
        <div className="group relative">
          <Link
            href="/shoes"
            className="hover:text-[#00a699] transition-colors py-1.5 block"
          >
            {t("categories.shoes")}
          </Link>
          <div className="absolute top-full left-0 -ml-[50px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
            <div className="flex justify-between gap-8">
              <div className="flex gap-16 flex-1">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Men&apos;s Shoes</h4>
                  <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sneakers</Link>
                  <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Boots</Link>
                  <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Loafers</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Women&apos;s Shoes</h4>
                  <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Heels</Link>
                  <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Flats</Link>
                  <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sneakers</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Kid&apos;s Shoes</h4>
                  <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Boys</Link>
                  <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Girls</Link>
                </div>
              </div>
              <div className="w-[320px] grid grid-cols-2 gap-3">
                <Link href="/shoes" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop" alt="Shoes" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Sneakers</span>
                  </div>
                </Link>
                <Link href="/shoes" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=200&fit=crop" alt="Heels" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Heels</span>
                  </div>
                </Link>
                <Link href="/shoes" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=200&fit=crop" alt="Boots" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Boots</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* HOME & LIVING */}
        <div className="group relative">
          <Link
            href="/home-living"
            className="hover:text-[#00a699] transition-colors py-1.5 block"
          >
            {t("categories.home_living")}
          </Link>
          <div className="absolute top-full left-0 -ml-[150px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
            <div className="flex justify-between gap-8">
              <div className="flex gap-16 flex-1">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Furniture</h4>
                  <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Living Room</Link>
                  <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Bedroom</Link>
                  <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Office</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Decor</h4>
                  <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Pillows</Link>
                  <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Mirrors</Link>
                  <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Art</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Lighting</h4>
                  <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Lamps</Link>
                  <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Ceiling</Link>
                </div>
              </div>
              <div className="w-[320px] grid grid-cols-2 gap-3">
                <Link href="/home-living" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" alt="Living Room" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Living Room</span>
                  </div>
                </Link>
                <Link href="/home-living" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&fit=crop" alt="Decor" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Decor</span>
                  </div>
                </Link>
                <Link href="/home-living" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1507452741499-52219468c4d2?w=300&h=200&fit=crop" alt="Lighting" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Lighting</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* JEWELRY */}
        <div className="group relative">
          <Link
            href="/jewelry-accessories"
            className="hover:text-[#00a699] transition-colors py-1.5 block"
          >
            {t("categories.jewelry")}
          </Link>
          <div className="absolute top-full left-0 -ml-[250px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
            <div className="flex justify-between gap-8">
              <div className="flex gap-16 flex-1">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Fine Jewelry</h4>
                  <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Rings</Link>
                  <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Necklaces</Link>
                  <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Bracelets</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Watches</h4>
                  <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Men&apos;s Watches</Link>
                  <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Women&apos;s Watches</Link>
                  <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Smartwatches</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Accessories</h4>
                  <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Hats</Link>
                  <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Belts</Link>
                </div>
              </div>
              <div className="w-[320px] grid grid-cols-2 gap-3">
                <Link href="/jewelry-accessories" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1599643478524-fb506462a474?w=300&h=200&fit=crop" alt="Rings" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Rings</span>
                  </div>
                </Link>
                <Link href="/jewelry-accessories" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=200&fit=crop" alt="Watches" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Watches</span>
                  </div>
                </Link>
                <Link href="/jewelry-accessories" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=200&fit=crop" alt="Sunglasses" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Sunglasses</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* TOYS */}
        <div className="group relative">
          <Link
            href="/toys-entertainment"
            className="hover:text-[#00a699] transition-colors py-1.5 block"
          >
            {t("categories.toys")}
          </Link>
          <div className="absolute top-full left-0 -ml-[400px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
            <div className="flex justify-between gap-8">
              <div className="flex gap-16 flex-1">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Toys</h4>
                  <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Action Figures</Link>
                  <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Dolls</Link>
                  <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Puzzles</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Video Games</h4>
                  <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">PlayStation</Link>
                  <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Xbox</Link>
                  <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Nintendo</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Movies &amp; Music</h4>
                  <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">DVDs</Link>
                  <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Vinyl</Link>
                </div>
              </div>
              <div className="w-[320px] grid grid-cols-2 gap-3">
                <Link href="/toys-entertainment" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=200&fit=crop" alt="Toys" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Toys</span>
                  </div>
                </Link>
                <Link href="/toys-entertainment" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=300&h=200&fit=crop" alt="Video Games" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Video Games</span>
                  </div>
                </Link>
                <Link href="/toys-entertainment" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300&h=200&fit=crop" alt="Music" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Music</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* GRAPHICS */}
        <div className="group relative">
          <Link
            href="/graphics-photos"
            className="hover:text-[#00a699] transition-colors py-1.5 block"
          >
            {t("categories.graphics")}
          </Link>
          <div className="absolute top-full right-0 -mr-[150px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
            <div className="flex justify-between gap-8">
              <div className="flex gap-16 flex-1">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Vectors</h4>
                  <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Icons</Link>
                  <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Illustrations</Link>
                  <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Backgrounds</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Photos</h4>
                  <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Nature</Link>
                  <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">People</Link>
                  <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Business</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Fonts</h4>
                  <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Serif</Link>
                  <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sans Serif</Link>
                </div>
              </div>
              <div className="w-[320px] grid grid-cols-2 gap-3">
                <Link href="/graphics-photos" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1626785776573-4b799315345d?w=300&h=200&fit=crop" alt="Design" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Design</span>
                  </div>
                </Link>
                <Link href="/graphics-photos" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop" alt="Photography" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Photography</span>
                  </div>
                </Link>
                <Link href="/graphics-photos" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=300&h=200&fit=crop" alt="Typography" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Typography</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div className="group relative">
          <Link
            href="/video-audio"
            className="hover:text-[#00a699] transition-colors py-1.5 block"
          >
            {t("categories.video_audio")}
          </Link>
          <div className="absolute top-full right-0 -mr-[50px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
            <div className="flex justify-between gap-8">
              <div className="flex gap-16 flex-1">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Video Templates</h4>
                  <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">After Effects</Link>
                  <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Premiere Pro</Link>
                  <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">DaVinci Resolve</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Audio</h4>
                  <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Music Tracks</Link>
                  <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sound Effects</Link>
                  <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Logos &amp; Idents</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Stock Footage</h4>
                  <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Nature</Link>
                  <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Urban</Link>
                </div>
              </div>
              <div className="w-[320px] grid grid-cols-2 gap-3">
                <Link href="/video-audio" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop" alt="Video" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Video</span>
                  </div>
                </Link>
                <Link href="/video-audio" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=200&fit=crop" alt="Audio" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Audio</span>
                  </div>
                </Link>
                <Link href="/video-audio" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop" alt="Footage" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Footage</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* WEB TEMPLATES */}
        <div className="group relative">
          <Link
            href="/web-templates-code"
            className="hover:text-[#00a699] transition-colors py-1.5 block"
          >
            {t("categories.web_templates")}
          </Link>
          <div className="absolute top-full right-0 hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
            <div className="flex justify-between gap-8">
              <div className="flex gap-16 flex-1">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">HTML Templates</h4>
                  <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Admin</Link>
                  <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Landing Page</Link>
                  <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Portfolio</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">CMS Themes</h4>
                  <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">WordPress</Link>
                  <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Shopify</Link>
                  <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Magento</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Scripts</h4>
                  <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">PHP</Link>
                  <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">JavaScript</Link>
                </div>
              </div>
              <div className="w-[320px] grid grid-cols-2 gap-3">
                <Link href="/web-templates-code" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop" alt="Code" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Code</span>
                  </div>
                </Link>
                <Link href="/web-templates-code" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop" alt="Web Design" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Web Design</span>
                  </div>
                </Link>
                <Link href="/web-templates-code" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop" alt="Server" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-white text-xs font-bold leading-tight">Server</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
