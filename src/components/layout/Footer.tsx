"use client";

import Link from "next/link";
import {
  FooterSocialLinks,
  FooterLinks,
  FooterNewsletter,
  FooterBottom,
} from "./footer-parts";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#f1f3f5] pt-16 pb-8 font-sans text-[#495057]">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* 4 Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info & Social Icons */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Modesy"
                width={160}
                height={60}
                className="w-[150px] h-auto object-contain"
              />
            </Link>

            <p className="text-xs text-[#6c757d] leading-relaxed max-w-sm">
              Modesy is a modern e-commerce marketplace where buyers and sellers
              connect with ease. Whether you are looking to shop for unique
              items or grow your business by selling online, Modesy is here to
              help you every step of the way.
            </p>

            <FooterSocialLinks />
          </div>

          {/* Columns 2 & 3: Categories & Quick Links / Information */}
          <FooterLinks />

          {/* Column 4: Newsletter & Payments */}
          <FooterNewsletter />
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <FooterBottom />
      </div>
    </footer>
  );
}
