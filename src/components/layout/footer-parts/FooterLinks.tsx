"use client";

import Link from "next/link";

export function FooterLinks() {
  return (
    <>
      {/* Column 2: CATEGORIES */}
      <div>
        <h3 className="text-[#2c333e] font-bold text-xs uppercase tracking-wider mb-4">
          Categories
        </h3>
        <ul className="space-y-2.5 text-xs text-[#6c757d]">
          <li>
            <Link href="/products?category=clothing" className="hover:text-[#00ab97] transition-colors">
              Clothing
            </Link>
          </li>
          <li>
            <Link href="/products?category=shoes" className="hover:text-[#00ab97] transition-colors">
              Shoes
            </Link>
          </li>
          <li>
            <Link href="/products?category=home-living" className="hover:text-[#00ab97] transition-colors">
              Home & Living
            </Link>
          </li>
          <li>
            <Link href="/products?category=jewelry-accessories" className="hover:text-[#00ab97] transition-colors">
              Jewelry & Accessories
            </Link>
          </li>
          <li>
            <Link href="/products?category=toys-entertainment" className="hover:text-[#00ab97] transition-colors">
              Toys & Entertainment
            </Link>
          </li>
          <li>
            <Link href="/products?category=graphics-photos" className="hover:text-[#00ab97] transition-colors">
              Graphics & Photos
            </Link>
          </li>
          <li>
            <Link href="/products?category=video-audio" className="hover:text-[#00ab97] transition-colors">
              Video & Audio
            </Link>
          </li>
          <li>
            <Link href="/products?category=web-templates-code" className="hover:text-[#00ab97] transition-colors">
              Web Templates & Code
            </Link>
          </li>
        </ul>
      </div>

      {/* Column 3: QUICK LINKS & INFORMATION */}
      <div>
        <h3 className="text-[#2c333e] font-bold text-xs uppercase tracking-wider mb-4">
          Quick Links
        </h3>
        <ul className="space-y-2.5 text-xs text-[#6c757d] mb-6">
          <li>
            <Link href="/" className="hover:text-[#00ab97] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-[#00ab97] transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/shops" className="hover:text-[#00ab97] transition-colors">
              Shops
            </Link>
          </li>
          <li>
            <Link href="/help-center" className="hover:text-[#00ab97] transition-colors">
              Help Center
            </Link>
          </li>
        </ul>

        <h3 className="text-[#2c333e] font-bold text-xs uppercase tracking-wider mb-4">
          Information
        </h3>
        <ul className="space-y-2.5 text-xs text-[#6c757d]">
          <li>
            <Link href="/terms-conditions" className="hover:text-[#00ab97] transition-colors">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="hover:text-[#00ab97] transition-colors">
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
