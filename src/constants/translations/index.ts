import { en } from "./en";
import { id } from "./id";
import { es } from "./es";
import { fr } from "./fr";
import { tr } from "./tr";
import { ar } from "./ar";
import { LanguageCode } from "@/types/localization";

export const translations: Record<LanguageCode, any> = {
  EN: en,
  ID: id,
  ES: es,
  FR: fr,
  TR: tr,
  AR: ar,
};

export { en, id, es, fr, tr, ar };
