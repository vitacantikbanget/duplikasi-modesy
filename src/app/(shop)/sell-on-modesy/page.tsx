"use client";

import Link from "next/link";

export default function SellOnModesyPage() {
  return (
    <div className="bg-white font-sans py-5">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb matching exact Modesy style */}
        <nav className="text-[12.5px] text-[#777] mb-4">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-[#333] font-normal">Sell on Modesy</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[24px] font-bold text-[#222] mb-6">Sell on Modesy</h1>

        {/* Content Paragraphs matching exact text from screenshot */}
        <div className="text-[13.5px] text-[#444] leading-relaxed space-y-4 mb-14">
          <p>
            At Modesy, we make it easy and hassle-free for you to sell your products to
            customers all over the world. Whether you are a professional seller or just
            looking to make some extra cash, Modesy provides you with the perfect platform
            to showcase your products and reach a wider audience.
          </p>
          <p>
            Our platform is designed to provide you with the tools and support you need to
            create a successful online business. With a user-friendly interface and
            powerful features, you can easily list your products, manage your inventory,
            and process orders.
          </p>
          <p>
            At Modesy, we understand that selling online can be a daunting task.
            That&#39;s why we offer a range of resources to help you succeed. From seller
            guides and tutorials to customer support and seller forums, we are committed to
            helping you grow your business and achieve your goals.
          </p>
          <p>
            With Modesy, you can sell a wide range of products, including fashion, beauty,
            home and garden, electronics, and more. Our platform is designed to provide
            you with maximum exposure and reach, so you can connect with customers from all
            over the world.
          </p>
          <p>
            Join the Modesy community today and start selling your products to a global
            audience. With our powerful platform and dedicated support team, the sky is the
            limit for your online business.
          </p>
        </div>
      </div>
    </div>
  );
}
