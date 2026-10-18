"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { useAppContext } from "@/contexts/AppContext";

export interface FeaturedProductItem {
  id: string;
  slug: string;
  title: string;
  vendorName: string;
  rating?: number;
  reviews?: number;
  originalPrice?: number | null;
  price: number | string;
  discount?: number | null;
  imageUrl: string;
  hoverImageUrl?: string;
}

export const initialFeaturedProducts: FeaturedProductItem[] = [
  {
    id: "f1",
    slug: "black-midi-skirt-41",
    title: "Black midi skirt with white flowers",
    vendorName: "Trendshop",
    rating: 4,
    reviews: 0,
    originalPrice: 55,
    price: 48,
    discount: 13,
    imageUrl: "/images/products/black-midi-skirt.webp",
    hoverImageUrl: "/images/products/floral-sundress.webp",
  },
  {
    id: "f2",
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
    id: "f3",
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
    id: "f4",
    slug: "sun-hat-17",
    title: "Sun hat for women protection cap",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    price: 29,
    discount: null,
    imageUrl: "/images/products/sun-hat.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=500&q=80",
  },
  {
    id: "f5",
    slug: "sneaker-shoes-34",
    title: "Sneaker shoes men",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    originalPrice: 100,
    price: 89,
    discount: 11,
    imageUrl: "/images/products/sneaker-shoes.webp",
    hoverImageUrl: "/images/products/black-sneakers-2.webp",
  },
  {
    id: "f6",
    slug: "kipling-handbag-40",
    title: "Women kipling bailey saddle handbag",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 69,
    price: 59,
    discount: 14,
    imageUrl: "/images/products/kipling-handbag.webp",
    hoverImageUrl: "/images/products/kipling-handbag-2.webp",
  },
  {
    id: "f7",
    slug: "cobalt-tshirt-1",
    title: "Cobalt man t-shirt all colors",
    vendorName: "Admin",
    rating: 0,
    reviews: 1,
    price: "Request a Quote",
    discount: null,
    imageUrl: "/images/products/cobalt-tshirt.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
  },
  {
    id: "f8",
    slug: "animal-photo-23",
    title: "Adorable animals photo pack",
    vendorName: "Admin",
    rating: 0,
    reviews: 1,
    price: "Free",
    discount: null,
    imageUrl: "/images/products/animal-photo.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&q=80",
  },
  {
    id: "f9",
    slug: "piano-music-20",
    title: "Moment of inspiration piano music",
    vendorName: "Admin",
    rating: 0,
    reviews: 1,
    originalPrice: 34,
    price: 15,
    discount: null,
    imageUrl: "/images/products/piano-music.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1520523839898-50712825e3a7?w=500&q=80",
  },
  {
    id: "f10",
    slug: "vacation-spots-33",
    title: "Animation of popular vacation spots",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 1,
    originalPrice: 15,
    price: 10,
    discount: null,
    imageUrl: "/images/products/vacation-spots.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80",
  },
  {
    id: "f11",
    slug: "light-blue-shirt-15",
    title: "Light blue women shirt",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 0,
    originalPrice: 69,
    price: 49,
    discount: 29,
    imageUrl: "/images/products/light-blue-shirt.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80",
  },
  {
    id: "f12",
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
];

const extraProducts: FeaturedProductItem[] = [
  {
    id: "f13",
    slug: "animal-colorful-digital-prints-39",
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
    id: "f14",
    slug: "women-lace-blouse-28",
    title: "Women lace blouse with different colors",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 1,
    originalPrice: 79,
    price: 69,
    discount: 13,
    imageUrl: "/images/products/lace-blouse.webp",
    hoverImageUrl: "/images/products/lace-blouse-2.webp",
  },
  {
    id: "f15",
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
    id: "f16",
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
    id: "f17",
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
    id: "f18",
    slug: "womens-ankle-boot-46",
    title: "Women's ankle boot with different colors",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    price: 79,
    discount: null,
    imageUrl: "/images/products/ankle-boot.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
  },
];

export default function FeaturedProducts() {
  const { t } = useAppContext();
  const [products, setProducts] = useState<FeaturedProductItem[]>(initialFeaturedProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts((prev) => [...prev, ...extraProducts]);
      setIsLoading(false);
      setHasMore(false);
    }, 600);
  };

  return (
    <section className="section section-promoted bg-white pb-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header mb-6 pb-2 border-b border-gray-100">
          <h3 className="title text-xl sm:text-2xl font-bold text-[#222222]">
            {t("featured_products", "Featured Products")}
          </h3>
        </div>

        {/* 6-Column Grid */}
        <div id="row_promoted_products" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 3-Dot Bounce Spinner */}
        {isLoading && (
          <div id="load_promoted_spinner" className="col-12 load-more-spinner py-4">
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !isLoading && (
          <div className="promoted-load-more-container flex items-center justify-center mt-10">
            <button
              type="button"
              onClick={handleLoadMore}
              className="button-link link-see-more text-gray-700 hover:text-brand-primary font-semibold text-sm border border-gray-200 hover:border-brand-primary bg-white px-8 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              aria-label="load-more-promoted"
            >
              <span>{t("load_more", "Load More")}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
