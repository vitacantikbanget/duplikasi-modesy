/**
 * ============================================================================
 * LocalizationContext: Multi-Bahasa, Multi-Mata Uang, & Format Harga
 * ============================================================================
 * Mengelola aspek internasionalisasi (i18n & l10n) Modesy:
 * 1. Multi-Mata Uang (Currency):
 *    - Menyimpan mata uang terpilih (USD, EUR, IDR, dll) ke `localStorage`.
 *    - `formatPrice`: Mengonversi nilai numerik dasar USD menggunakan kurs (`rate`)
 *      dan memformat simbol secara lokal (misal: "Rp 150.000" untuk IDR atau "$10.50" untuk USD).
 * 2. Multi-Bahasa (Languages & Translations):
 *    - Mendukung EN, ID, ES, FR, TR, dan AR (Arab).
 *    - Dukungan RTL (Right-to-Left): Otomatis menyetel atribut `dir="rtl"` pada HTML
 *      ketika bahasa Arab dipilih, dan `dir="ltr"` untuk bahasa lainnya.
 *    - Fungsi terjemahan `t(key, fallback)`: Membaca teks terjemahan bersarang (dot notation).
 * 3. Filter Lokasi Geografis (Location):
 *    - Menyimpan pilihan negara / kota yang dipilih melalui modal lokasi navbar.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Currency, Language, LanguageCode } from "@/types/localization";
import { currencies, DEFAULT_CURRENCY } from "@/constants/currencies";
import { languages, DEFAULT_LANGUAGE } from "@/constants/languages";
import { translations } from "@/constants/translations";

export interface LocalizationContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  location: string;
  setLocation: (loc: string) => void;
  t: (key: string, fallback?: string) => string;
  formatPrice: (priceVal: number) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY);
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [location, setLocation] = useState<string>("Location");

  // Pulihkan preferensi bahasa & mata uang yang tersimpan di localStorage (default English)
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("modesy_language");
      if (savedLang) {
        const foundLang = languages.find((l) => l.code === savedLang);
        if (foundLang) setLanguageState(foundLang);
      } else {
        setLanguageState(DEFAULT_LANGUAGE);
      }

      const saved = localStorage.getItem("modesy_currency");
      if (saved) {
        const found = currencies.find((c) => c.code === saved);
        if (found) setCurrencyState(found);
      }
    } catch (e) {
      console.error("Gagal memuat preferensi:", e);
    }
  }, []);

  /**
   * Mengubah bahasa aktif dan menyimpannya ke localStorage
   */
  const setLanguage = (l: Language) => {
    setLanguageState(l);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("modesy_language", l.code);
      } catch (e) {
        console.error("Gagal menyimpan bahasa ke localStorage:", e);
      }
    }
  };

  /**
   * Mengubah mata uang aktif dan menyimpannya ke localStorage
   */
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("modesy_currency", c.code);
      } catch (e) {
        console.error("Gagal menyimpan mata uang ke localStorage:", e);
      }
    }
  };

  /**
   * Sinkronisasi arah teks dokumen (RTL/LTR) untuk Bahasa Arab
   */
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (language.code === "AR") {
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "ar");
      } else {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", language.code.toLowerCase());
      }
    }
  }, [language]);

  /**
   * Mengambil teks terjemahan berdasarkan path dot-notation (misal: 'common.save')
   * Jika kata belum diterjemahkan dalam bahasa terpilih, fallback otomatis ke bahasa Inggris (EN).
   */
  const t = (path: string, fallback?: string): string => {
    const keys = path.split(".");
    let current: unknown = translations[language.code as LanguageCode] || translations.EN;
    for (const key of keys) {
      if (current === undefined || typeof current !== "object" || current === null || (current as Record<string, unknown>)[key] === undefined) {
        let enVal: unknown = translations.EN;
        for (const enKey of keys) {
          if (enVal === undefined || typeof enVal !== "object" || enVal === null || (enVal as Record<string, unknown>)[enKey] === undefined) {
            return fallback !== undefined ? fallback : path;
          }
          enVal = (enVal as Record<string, unknown>)[enKey];
        }
        return typeof enVal === "string" ? enVal : fallback !== undefined ? fallback : path;
      }
      current = (current as Record<string, unknown>)[key];
    }
    return typeof current === "string" ? current : fallback !== undefined ? fallback : path;
  };

  /**
   * Format harga dengan kurs mata uang dan simbol yang tepat
   */
  const formatPrice = (priceVal: number) => {
    const converted = priceVal * currency.rate;
    if (currency.code === "IDR") {
      return `Rp ${Math.round(converted).toLocaleString("id-ID")}`;
    }
    if (Number.isInteger(converted)) {
      return `${currency.symbol}${converted}`;
    }
    return `${currency.symbol}${converted.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <LocalizationContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        location,
        setLocation,
        t,
        formatPrice,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

/**
 * Custom Hook useLocalization:
 * Digunakan oleh komponen untuk memformat harga atau menerjemahkan teks
 */
export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
}
