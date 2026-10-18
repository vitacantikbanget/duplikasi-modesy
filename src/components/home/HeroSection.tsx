"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-slide every 5 seconds (slides from right to left)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

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
      // Swiped left -> next
      nextSlide();
    } else if (distance < -50) {
      // Swiped right -> prev
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      aria-label="Homepage Slider"
      className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[520px] overflow-hidden bg-gray-100 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Track (Continuous right-to-left slide transition) */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {SLIDES.map((slide, idx) => (
          <div key={slide.id} className="min-w-full w-full h-full relative shrink-0">
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading={idx === 0 ? "eager" : "lazy"}
            />

            {/* Subtle Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 sm:px-16 md:px-24 flex items-center">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold leading-tight tracking-tight drop-shadow-md mb-3 sm:mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white/95 font-normal leading-relaxed drop-shadow max-w-lg mb-6 sm:mb-7">
                  {slide.subtitle}
                </p>
                <div>
                  <Link
                    href={slide.btnLink}
                    className="inline-flex items-center justify-center bg-[#212529] hover:bg-black text-white px-6 sm:px-8 py-3 rounded-[3px] text-sm sm:text-[15px] font-semibold transition-all duration-200 shadow-lg active:scale-95 cursor-pointer"
                  >
                    {slide.btnText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Left Navigation Arrow */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/70 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Manual Right Navigation Arrow */}
      <button
        type="button"
        onClick={nextSlide}
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
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === idx
                ? "w-7 h-2.5 bg-white shadow-md"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
