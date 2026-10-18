"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { useAppContext } from "@/contexts/AppContext";

export const newArrivals = [
  {
    id: "n1",
    slug: "colorful-women-scarves-47",
    title: "Colorful women scarves",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    originalPrice: 45,
    price: 40,
    discount: 11,
    imageUrl: "/images/products/scarves.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80",
  },
  {
    id: "n2",
    slug: "womens-ankle-boot-46",
    title: "Women's ankle boot with different colors",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 89,
    price: 79,
    discount: 11,
    imageUrl: "/images/products/ankle-boot.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
  },
  {
    id: "n3",
    slug: "navy-polka-dot-dress-45",
    title: "Navy polka dot dress",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 1,
    originalPrice: 150,
    price: 130,
    discount: 13,
    imageUrl: "/images/products/navy-polka-dress.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&q=80",
  },
  {
    id: "n4",
    slug: "modern-grey-couch-44",
    title: "Modern grey couch and pillows",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    price: "Request a Quote",
    discount: null,
    imageUrl: "/images/products/modern-couch.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
  },
  {
    id: "n5",
    slug: "black-fashion-women-backpack-43",
    title: "Black fashion women backpack",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    price: "Request a Quote",
    discount: null,
    imageUrl: "/images/products/black-backpack.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: "n6",
    slug: "decorative-pillow-42",
    title: "Handcrafted decorative pillow for a luxurious touch",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 69,
    price: 59,
    discount: 14,
    imageUrl: "/images/products/decorative-pillow.webp",
    hoverImageUrl: "/images/products/decorative-pillow-2.webp",
  },
  {
    id: "n7",
    slug: "animal-prints-39",
    title: "Animal colorful digital prints",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 0,
    originalPrice: 39,
    price: 29,
    discount: 25,
    imageUrl: "/images/products/animal-prints.webp",
    hoverImageUrl: "/images/products/animal-prints-2.webp",
  },
  {
    id: "n8",
    slug: "summer-top-13",
    title: "Summer fashion top lace",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 1,
    originalPrice: 79,
    price: 65,
    discount: 17,
    imageUrl: "/images/products/summer-top.webp",
    hoverImageUrl: "/images/products/summer-top-2.webp",
  },
  {
    id: "n9",
    slug: "lace-blouse-28",
    title: "Women lace blouse with different colors",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 1,
    originalPrice: 79,
    price: 69,
    discount: 12,
    imageUrl: "/images/products/lace-blouse.webp",
    hoverImageUrl: "/images/products/lace-blouse-2.webp",
  },
  {
    id: "n10",
    slug: "floral-sundress-38",
    title: "Floral women sundress",
    vendorName: "Admin",
    rating: 4,
    reviews: 0,
    originalPrice: 89,
    price: 80,
    discount: 10,
    imageUrl: "/images/products/floral-sundress.webp",
    hoverImageUrl: "/images/products/floral-sundress-2.webp",
  },
  {
    id: "n11",
    slug: "gucci-smart-backpack-7",
    title: "Gucci nylon fabric smart backpack",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 69,
    price: 55,
    discount: 20,
    imageUrl: "/images/products/gucci-backpack.webp",
    hoverImageUrl: "/images/products/gucci-backpack-2.webp",
  },
  {
    id: "n12",
    slug: "sneaker-shoes-34",
    title: "Black sneakers with white sole",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 89,
    price: 69,
    discount: 22,
    imageUrl: "/images/products/sneaker-shoes.webp",
    hoverImageUrl: "/images/products/black-sneakers-2.webp",
  },
];

export default function NewArrivals() {
  const { t } = useAppContext();

  return (
    <section className="section section-latest-products bg-white pb-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="section-header flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
          <h3 className="title text-xl sm:text-2xl font-bold text-[#222222]">
            <Link href="/products" className="hover:text-brand-primary transition-colors">
              {t("new_arrivals", "New Arrivals")}
            </Link>
          </h3>

          <Link
            href="/products"
            className="font-semibold text-sm text-[#222222] hover:text-brand-primary flex items-center gap-1.5 transition-colors group"
          >
            <span>{t("view_all", "View All")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 12-Product 6-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
