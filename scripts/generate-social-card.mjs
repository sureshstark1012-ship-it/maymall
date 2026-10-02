import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

// Serve only this trusted source and its approved local assets; never expose the checkout.
const assets = new Map([
  ["/", ["scripts/social-card.html", "text/html"]],
  [
    "/newsreader.woff2",
    ["src/app/fonts/newsreader-latin-wght-normal.woff2", "font/woff2"],
  ],
  [
    "/public-sans.woff2",
    ["src/app/fonts/public-sans-latin-wght-normal.woff2", "font/woff2"],
  ],
  ["/silk.svg", ["public/images/silk.svg", "image/svg+xml"]],
  ["/icon.svg", ["src/app/icon.svg", "image/svg+xml"]],
]);
const server = createServer(async (request, response) => {
  const asset = assets.get(request.url);
  if (!asset) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { "Content-Type": asset[1] });
  response.end(await readFile(asset[0]));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
    : {}),
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(`http://127.0.0.1:${server.address().port}/`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => globalThis.document.fonts.ready);
  await mkdir("public/images/brand", { recursive: true });
  await page.screenshot({ path: "public/images/brand/social-card-v1.png" });
  console.log(
    "Generated the 1200×630 MayMall PNG using approved local fonts/artwork.",
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
