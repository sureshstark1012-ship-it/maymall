import { defineConfig } from "@playwright/test";
import production from "./playwright.production.config";
export default defineConfig({
  ...production,
  testMatch: "**/configured-seo.spec.ts",
  testIgnore: [],
  outputDir:
    process.env.SITE_INDEXABLE === "true"
      ? "test-results/indexable"
      : "test-results/configured-preview",
});
