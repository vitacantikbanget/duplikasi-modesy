"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookiesWarning() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem("modesy_cookies_accepted");
      if (!accepted) {
        setVisible(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("modesy_cookies_accepted", "true");
    } catch (e) {
      console.error(e);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm w-[calc(100%-2rem)] bg-white border border-gray-200 shadow-xl rounded-md p-4 animate-fade-in-up">
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="text-xs text-gray-600 pr-5 leading-relaxed">
        <p>
          This site uses cookies. By continuing to browse the site, you are agreeing to our use of cookies.{" "}
          <Link href="/cookie-policy" className="text-blue-600 underline hover:text-blue-800">
            Cookie Policy
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={handleAccept}
        className="mt-3 w-full py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition-colors cursor-pointer shadow-xs"
      >
        Accept Cookies
      </button>
    </div>
  );
}
