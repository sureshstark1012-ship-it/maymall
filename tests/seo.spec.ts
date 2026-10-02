import { expect, test } from "@playwright/test";

test("unconfigured previews block crawling and publish no sitemap destinations", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  expect(await robots.text()).toMatch(/User-Agent: \*\s+Disallow: \//);
  expect(await robots.text()).not.toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("xml");
  expect(await sitemap.text()).not.toContain("<loc>");
});

test("the generic brand social card is a correctly sized local PNG", async ({
  request,
  page,
}) => {
  const response = await request.get("/images/brand/social-card-v1.png");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
  const png = await response.body();
  expect(
    png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  ).toBe(true);
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  expect(png.length).toBeLessThan(250 * 1024);
  await page.goto("/");
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(0);
});

test("the branded 404 stays noindex with useful mobile continuations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  const response = await page.goto("/collections/not-a-real-edit");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle("Page not found | MayMall Madurai");
  const robots = await page
    .locator('meta[name="robots"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content")));
  expect(robots.length).toBeGreaterThan(0);
  for (const content of robots) expect(content).toMatch(/noindex/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Page not found | MayMall Madurai",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL(/\/$/);
});
