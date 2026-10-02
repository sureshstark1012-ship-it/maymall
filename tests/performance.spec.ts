import { test, expect } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { measurePage } from "./support/performance";
// Trace I/O perturbs lab samples; behavioral tests retain failure traces.
test.use({ trace: "off" });
for (const [name, path] of [
  ["home", "/"],
  ["collections", "/collections"],
  ["silk", "/collections/silk"],
  ["visit", "/visit"],
])
  test(`lab performance report: ${name}`, async ({
    browser,
    baseURL,
  }, testInfo) => {
    test.setTimeout(90000);
    const samples = [];
    for (let i = 0; i < 3; i++) {
      const context = await browser.newContext({
        baseURL,
        viewport: { width: 375, height: 900 },
      });
      const page = await context.newPage();
      const sample = await measurePage(page, path);
      samples.push(sample);
      expect(sample.lcp).not.toBeNull();
      expect(sample.totalTransferBytes).toBeGreaterThan(0);
      // Timing values are reports, not flaky merge thresholds.
      await context.close();
    }
    const report = {
      route: path,
      environment:
        "Cold Chromium contexts, 375×900 CSS px, 4× CPU slowdown, 150ms latency, 1.6Mbps download; loopback production Next server",
      limitations:
        "Lab samples, not field Core Web Vitals. Long-task blocking is an observation-window proxy, not INP or a Lighthouse TBT score. Resource totals include automatic Next Link prefetch.",
      samples,
    };
    const output = testInfo.outputPath("performance-" + name + ".json");
    await writeFile(output, JSON.stringify(report, null, 2));
    await testInfo.attach("performance-" + name, {
      path: output,
      contentType: "application/json",
    });
  });
