"use client";

import Link from "next/link";
import { ChevronUp } from "lucide-react";

export function FooterBottom() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-[#f1f3f5] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6c757d]">
        <p>Copyright 2025 Modesy - All Rights Reserved.</p>

        <div className="flex items-center gap-5">
          <Link href="/privacy-policy" className="hover:text-[#00a99d] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="hover:text-[#00a99d] transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>

      {/* Official Modesy Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-9 h-9 bg-[#222] hover:bg-black text-white rounded-[2px] flex items-center justify-center shadow-md transition-colors cursor-pointer"
        title="Scroll to Top"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </>
  );
}
