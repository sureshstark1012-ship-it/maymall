import { defineConfig } from "@playwright/test";
import sharedConfig from "./playwright.config";

// Uses the same suite and browser settings as development, but requires a completed build.
export default defineConfig({
  ...sharedConfig,
  webServer: {
    command: "npm start -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    // Never silently reuse a development server or an outdated production build.
    reuseExistingServer: false,
    timeout: 120000,
  },
});
