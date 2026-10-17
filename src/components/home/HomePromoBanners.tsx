import Link from "next/link";

const banners = [
  {
    id: "bn1",
    image: "/images/banners/banner-bottom-1.webp",
    link: "/category/home-living",
    alt: "Home & Living Promotion",
  },
  {
    id: "bn2",
    image: "/images/banners/banner-bottom-2.webp",
    link: "/category/shoes",
    alt: "Shoes Promotion",
  },
  {
    id: "bn3",
    image: "/images/banners/banner-bottom-3.webp",
    link: "/category/clothing",
    alt: "Special Offers Promotion",
  },
];

export default function HomePromoBanners() {
  return (
    <section className="bg-white pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {banners.map((b) => (
            <Link
              key={b.id}
              href={b.link}
              className="block rounded-[4px] overflow-hidden group shadow-2xs hover:shadow-md transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.image}
                alt={b.alt}
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
