/**
 * ============================================================================
 * Definisi Tipe Lokalisasi, Mata Uang, & Bahasa (Localization Types)
 * ============================================================================
 * Modesy mendukung transaksi global dalam berbagai mata uang internasional
 * dan antarmuka multibahasa:
 * - CurrencyCode: Kode mata uang ISO (USD, EUR, IDR, dll) dengan kurs konversi dinamis.
 * - LanguageCode: Kode bahasa ISO (EN, ID, ES, FR, TR, AR).
 */

export type CurrencyCode = "USD" | "EUR" | "BRL" | "GBP" | "IDR" | "INR" | "NGN" | "RUB" | "TRY";

export type LanguageCode = "EN" | "ID" | "ES" | "FR" | "TR" | "AR";

export interface Currency {
  label: string;
  code: CurrencyCode;
  symbol: string;
  rate: number; // Nilai kurs relatif terhadap mata uang dasar (USD = 1.0)
}

export interface Language {
  label: string;
  code: LanguageCode;
  flagUrl: string; // Ikon bendera negara representatif
}
