import type { Page } from "@playwright/test";

type LabState = {
  lcp: {
    milliseconds: number;
    element: string;
    text: string;
    image: string;
  } | null;
  cls: number;
  longTaskBlockingMs: number;
};
declare global {
  interface Window {
    __maymallLab: LabState;
  }
}
export async function measurePage(page: Page, path: string) {
  const session = await page.context().newCDPSession(page);
  await session.send("Network.enable");
  await session.send("Network.setCacheDisabled", { cacheDisabled: true });
  await session.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: 1_600_000 / 8,
    uploadThroughput: 750_000 / 8,
  });
  await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.__maymallLab = { lcp: null, cls: 0, longTaskBlockingMs: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const paint = entry as PerformanceEntry & {
          element?: Element;
          url?: string;
        };
        window.__maymallLab.lcp = {
          milliseconds: paint.startTime,
          element: paint.element?.tagName ?? "",
          text: paint.element?.textContent?.trim().slice(0, 100) ?? "",
          image: paint.url ?? "",
        };
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!shift.hadRecentInput) window.__maymallLab.cls += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        window.__maymallLab.longTaskBlockingMs += Math.max(
          0,
          entry.duration - 50,
        );
    }).observe({ type: "longtask", buffered: true });
  });
  await page.goto(path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Observe a stable post-load window; no scrolling or input contaminates the sample.
  await page.waitForTimeout(500);
  const metrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType(
      "resource",
    ) as PerformanceResourceTiming[];
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const bytes = (pattern: RegExp) =>
      resources
        .filter((r) => pattern.test(r.name))
        .reduce((n, r) => n + r.encodedBodySize, 0);
    return {
      ...window.__maymallLab,
      totalTransferBytes:
        navigation.transferSize +
        resources.reduce((n, r) => n + r.transferSize, 0),
      javascriptBytes: bytes(/\.js(?:\?|$)/),
      fontBytes: bytes(/\.woff2(?:\?|$)/),
      imageBytes: bytes(/\.(?:svg|png|jpg|webp)(?:\?|$)/),
      resources: resources.map((r) => ({
        url: r.name,
        encodedBytes: r.encodedBodySize,
        transferBytes: r.transferSize,
      })),
      userAgent: navigator.userAgent,
    };
  });
  await session.detach();
  return metrics;
}
