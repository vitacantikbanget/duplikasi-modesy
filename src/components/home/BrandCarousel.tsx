"use client";

import Link from "next/link";

const brands = [
  { name: "Adidas", image: "/images/brands/adidas.webp" },
  { name: "Armani", image: "/images/brands/armani.webp" },
  { name: "Burberry", image: "/images/brands/burberry.webp" },
  { name: "Diesel", image: "/images/brands/diesel.webp" },
  { name: "Dockers", image: "/images/brands/dockers.webp" },
  { name: "Gucci", image: "/images/brands/gucci.webp" },
  { name: "H & M", image: "/images/brands/hm.webp" },
  { name: "Hugo Boss", image: "/images/brands/hugoboss.webp" },
  { name: "Lacoste", image: "/images/brands/lacoste.webp" },
  { name: "Lee Cooper", image: "/images/brands/leecooper.webp" },
  { name: "Levi's", image: "/images/brands/levis.webp" },
  { name: "Mango", image: "/images/brands/mango.webp" },
  { name: "Nike", image: "/images/brands/nike.webp" },
  { name: "Puma", image: "/images/brands/puma.webp" },
  { name: "Tommy Hilfiger", image: "/images/brands/tommyhilfiger.webp" },
  { name: "U.S. Polo Assn", image: "/images/brands/uspolo.webp" },
];

export default function BrandCarousel() {
  return (
    <section className="bg-white pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="border border-gray-100 rounded-[4px] p-4 bg-white shadow-2xs">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 gap-4 items-center justify-items-center">
            {brands.map((brand, i) => (
              <Link
                key={i}
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="w-full h-14 flex items-center justify-center p-2 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-10 max-w-full object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
