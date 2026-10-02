import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import next from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";

// Direct maintained plugins avoid legacy React/import plugins that do not support ESLint 10.
export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "dist/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "@next/next": next, "react-hooks": reactHooks },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
      ...reactHooks.configs.flat.recommended.rules,
    },
  },
  {
    // Local SVG artwork benefits from neither rasterization nor image optimization.
    files: [
      "src/components/home/Hero/Hero.tsx",
      "src/components/home/Collections/CollectionCard.tsx",
    ],
    rules: { "@next/next/no-img-element": "off" },
  },
]);
