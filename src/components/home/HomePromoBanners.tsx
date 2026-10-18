import Link from "next/link";

const banners = [
  {
    id: "bn1",
    className: "index_bn_3",
    image: "/images/banners/banner-bottom-1.webp",
    link: "/home-living",
    alt: "Home & Living Promotion",
  },
  {
    id: "bn2",
    className: "index_bn_5",
    image: "/images/banners/banner-bottom-2.webp",
    link: "/shoes",
    alt: "Shoes Promotion",
  },
  {
    id: "bn3",
    className: "index_bn_4",
    image: "/images/banners/banner-bottom-3.webp",
    link: "/clothing",
    alt: "Special Offers Promotion",
  },
];

export default function HomePromoBanners() {
  return (
    <section className="section section-index-bn bg-white pb-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {banners.map((b) => (
            <Link
              key={b.id}
              href={b.link}
              className={`col-index-bn ${b.className} block rounded-[4px] overflow-hidden group shadow-2xs hover:shadow-md transition-all`}
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
