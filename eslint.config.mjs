/**
 * ============================================================================
 * Konfigurasi ESLint (Next.js 16 + TypeScript Flat Config)
 * ============================================================================
 * Menggunakan format Flat Config ESLint 9 terbaru yang direkomendasikan Next.js:
 * - nextVitals: Aturan optimasi performa web vital bawaan Next.js.
 * - nextTs: Aturan penulisan TypeScript terstandar.
 * - Penyesuaian aturan: Mengubah aturan tipe 'any' dan compiler experimental menjadi 'warn'
 *   agar pengembangan prototipe UI berjalan fleksibel tanpa menghambat proses linting.
 */

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
  // Abaikan berkas hasil build dan internal cache Next.js
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
