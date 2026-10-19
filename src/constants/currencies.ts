import { Currency } from "@/types/localization";

export const currencies: Currency[] = [
  { label: "USD ($)", code: "USD", symbol: "$", rate: 1 },
  { label: "EUR (€)", code: "EUR", symbol: "€", rate: 0.92 },
  { label: "BRL (R$)", code: "BRL", symbol: "R$", rate: 5.2 },
  { label: "GBP (£)", code: "GBP", symbol: "£", rate: 0.79 },
  { label: "IDR (Rp)", code: "IDR", symbol: "Rp", rate: 15800 },
  { label: "INR (₹)", code: "INR", symbol: "₹", rate: 83 },
  { label: "NGN (₦)", code: "NGN", symbol: "₦", rate: 1500 },
  { label: "RUB (₽)", code: "RUB", symbol: "₽", rate: 92 },
  { label: "TRY (₺)", code: "TRY", symbol: "₺", rate: 32.5 },
];

export const DEFAULT_CURRENCY = currencies[0];
