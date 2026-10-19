export type CurrencyCode = "USD" | "EUR" | "BRL" | "GBP" | "IDR" | "INR" | "NGN" | "RUB" | "TRY";

export type LanguageCode = "EN" | "ID" | "ES" | "FR" | "TR" | "AR";

export interface Currency {
  label: string;
  code: CurrencyCode;
  symbol: string;
  rate: number;
}

export interface Language {
  label: string;
  code: LanguageCode;
  flagUrl: string;
}
