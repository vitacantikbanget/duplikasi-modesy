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
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [location, setLocation] = useState<string>("Location");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("modesy_currency");
      if (saved) {
        const found = currencies.find((c) => c.code === saved);
        if (found) setCurrencyState(found);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("modesy_currency", c.code);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Synchronize document direction and language for RTL (Arabic)
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

  const t = (path: string, fallback?: string): string => {
    const keys = path.split(".");
    let current: any = translations[language.code as LanguageCode];
    if (!current) current = translations.EN;
    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        let enVal: any = translations.EN;
        for (const enKey of keys) {
          if (enVal === undefined || enVal[enKey] === undefined) {
            return fallback !== undefined ? fallback : path;
          }
          enVal = enVal[enKey];
        }
        return enVal;
      }
      current = current[key];
    }
    return current;
  };

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

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
}
