import { Language } from "@/types/localization";

export const languages: Language[] = [
  { label: "English", code: "EN", flagUrl: "https://flagcdn.com/w20/us.png" },
  { label: "Indonesia", code: "ID", flagUrl: "https://flagcdn.com/w20/id.png" },
  { label: "Español", code: "ES", flagUrl: "https://flagcdn.com/w20/es.png" },
  { label: "Français", code: "FR", flagUrl: "https://flagcdn.com/w20/fr.png" },
  { label: "Türkçe", code: "TR", flagUrl: "https://flagcdn.com/w20/tr.png" },
  { label: "العربية", code: "AR", flagUrl: "https://flagcdn.com/w20/sa.png" }
];

export const DEFAULT_LANGUAGE = languages[0];
