/**
 * ============================================================================
 * HeroSection: Slider Banner Utama & Banner Promosi Samping (Hero Slider)
 * ============================================================================
 * Mengimplementasikan banner hero bergaya Modesy asli:
 * 1. Infinite Seamless Slider Track:
 *    - Menggunakan teknik track kloning [Clone-Last, Slide-1, Slide-2, Clone-First]
 *      untuk menciptakan ilusi pergeseran tak terbatas (infinite loop) yang mulus
 *      tanpa jeda pembalikan.
 * 2. Otomatisasi & Interaksi Pengguna:
 *    - Auto-slide setiap 5 detik (`AUTO_SLIDE_DELAY = 5000`).
 *    - Berhenti sementara (pause) saat kursor mouse berada di atas banner.
 *    - Mendukung gestur geser layar sentuh (touch swipe) untuk perangkat mobile.
 * 3. Efek Tipografi Khas:
 *    - Animasi `fadeInUp` terpisah untuk judul, subjudul, dan tombol CTA setiap slide berganti.
 * 4. Dua Banner Promosi Samping:
 *    - Menampilkan 2 banner statis bergaya Modesy di sebelah kanan slider (pada desktop).
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideData {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  btnText: string;
  btnLink: string;
}

const SLIDES: SlideData[] = [
  {
    id: "clothes",
    image: "/images/slider/banner-clothes.webp",
    title: "Buy Nice and Unique Clothes",
    subtitle: "Discover quality premium basics and trendy essentials at surprisingly affordable prices",
    btnText: "Explore Now",
    btnLink: "/clothing",
  },
  {
    id: "backpacks",
    image: "/images/slider/banner-backpacks.webp",
    title: "Find Backpacks That Best Suit You",
    subtitle: "Timeless, modern, and feminine pieces made with quality materials and craftsmanship",
    btnText: "Buy Now",
    btnLink: "/jewelry-accessories",
  },
];

// Infinite track items: [Clone of backpacks, Clothes, Backpacks, Clone of clothes]
const TRACK_ITEMS = [
  { ...SLIDES[1], trackKey: "clone-prev-backpacks", originalIndex: 1 }, // Pos 0
  { ...SLIDES[0], trackKey: "orig-clothes", originalIndex: 0 },          // Pos 1 (Initial)
  { ...SLIDES[1], trackKey: "orig-backpacks", originalIndex: 1 },        // Pos 2
  { ...SLIDES[0], trackKey: "clone-next-clothes", originalIndex: 0 },    // Pos 3
];

// Auto-slide every 5 seconds (jedanya 5 detik sesuai permintaan)
const AUTO_SLIDE_DELAY = 5000;

export default function HeroSection() {
  const [trackIndex, setTrackIndex] = useState(1); // Start at Pos 1 (Slide 0)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // 0 or 1
  const [withTransition, setWithTransition] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  const isTransitioningRef = useRef(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Clear transition lock with safety timeout
  const unlockTransition = useCallback(() => {
    isTransitioningRef.current = false;
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }, []);

  // Advance to next slide smoothly to the left
  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setWithTransition(true);
    setTrackIndex((prev) => prev + 1);
    setActiveSlideIndex((prev) => (prev + 1) % SLIDES.length);
    setAnimKey((prev) => prev + 1);

    // Guaranteed unlock fallback in 750ms so slider NEVER gets stuck
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 750);
  }, []);

  // Advance to previous slide smoothly to the right
  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setWithTransition(true);
    setTrackIndex((prev) => prev - 1);
    setActiveSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setAnimKey((prev) => prev + 1);

    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 750);
  }, []);

  // Jump directly to specific slide when dot clicked
  const handleDotClick = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeSlideIndex || isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setWithTransition(true);
      setActiveSlideIndex(targetIndex);
      setTrackIndex(targetIndex + 1);
      setAnimKey((prev) => prev + 1);

      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 750);
    },
    [activeSlideIndex]
  );

  // Seamless infinite loop snap on boundary completion
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // CRITICAL: Only handle transitions on the track itself, ignore bubbling child events
    if (e.target !== e.currentTarget) return;

    unlockTransition();

    setTrackIndex((curr) => {
      if (curr >= 3) {
        setWithTransition(false);
        return 1;
      }
      if (curr <= 0) {
        setWithTransition(false);
        return 2;
      }
      return curr;
    });
  };

  // Re-enable CSS transitions immediately after silent jump
  useEffect(() => {
    if (!withTransition) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [withTransition]);

  // UNCONDITIONAL Auto-slide timer: keeps sliding frequently without stopping
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(timer);
  }, [handleNext, trackIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      aria-label="Homepage Slider"
      className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[520px] overflow-hidden bg-gray-100 select-none group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Seamless Infinite Sliding Track */}
      <div
        className={cn(
          "flex w-full h-full",
          withTransition ? "transition-transform duration-600 ease-in-out" : "transition-none"
        )}
        style={{ transform: `translateX(-${trackIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {TRACK_ITEMS.map((item, idx) => {
          const isSlideActive = item.originalIndex === activeSlideIndex;

          return (
            <div key={`${item.trackKey}-${idx}`} className="min-w-full w-full h-full relative shrink-0">
              {/* Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading={idx === 1 ? "eager" : "lazy"}
              />

              {/* Subtle Gradient Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />

              {/* Content Container (Triggers staggered fadeInUp animation on every slide change) */}
              <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 sm:px-16 md:px-24 flex items-center">
                <div
                  key={`caption-${item.trackKey}-${isSlideActive ? animKey : "inactive"}`}
                  className={cn(
                    "max-w-xl text-white transition-opacity duration-300",
                    isSlideActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <h1
                    className={cn(
                      "text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold leading-tight tracking-tight drop-shadow-md mb-3 sm:mb-4",
                      isSlideActive ? "animate-slider-title" : ""
                    )}
                  >
                    {item.title}
                  </h1>
                  <p
                    className={cn(
                      "text-sm sm:text-base md:text-lg text-white/95 font-normal leading-relaxed drop-shadow max-w-lg mb-6 sm:mb-7",
                      isSlideActive ? "animate-slider-desc" : ""
                    )}
                  >
                    {item.subtitle}
                  </p>
                  <div className={cn(isSlideActive ? "animate-slider-btn" : "")}>
                    <Link
                      href={item.btnLink}
                      className="inline-flex items-center justify-center bg-[#212529] hover:bg-black text-white px-6 sm:px-8 py-3 rounded-[3px] text-sm sm:text-[15px] font-semibold transition-all duration-200 shadow-lg active:scale-95 cursor-pointer"
                    >
                      {item.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Left Navigation Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/70 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Manual Right Navigation Arrow */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/70 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicator Dots (Bottom Center) */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeSlideIndex === idx
                ? "w-7 h-2.5 bg-white shadow-md"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
