import { expect, test } from "@playwright/test";
const origin = "https://deployment.example"; // Reserved test fixture, never a MayMall production domain.
const paths = [
  "/",
  "/collections",
  "/collections/silk",
  "/collections/celebration",
  "/collections/everyday",
  "/our-story",
  "/visit",
];
const indexable = process.env.SITE_INDEXABLE === "true";
test.beforeAll(() => {
  expect(process.env.SITE_URL).toBe(origin);
  expect(["true", "false"]).toContain(process.env.SITE_INDEXABLE);
});
for (const path of paths)
  test(`configured ${path} has canonical, sharing URLs and explicit indexing`, async ({
    page,
  }) => {
    await page.goto(path);
    const url = new URL(path, origin).href;
    // Next normalizes a bare-origin metadata URL without a trailing slash.
    // URL parsing still asserts the exact absolute origin, path, query and hash.
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    const ogUrl = await page
      .locator('meta[property="og:url"]')
      .getAttribute("content");
    expect(canonical).not.toBeNull();
    expect(ogUrl).not.toBeNull();
    expect(new URL(canonical!).href).toBe(url);
    expect(new URL(ogUrl!).href).toBe(url);
    const title = await page.title();
    expect(title).not.toContain("MayMall Madurai | MayMall Madurai");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      title,
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      "content",
      title,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      indexable ? "index, follow" : "noindex, follow",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      origin + "/images/brand/social-card-v1.png",
    );
    await expect(
      page.locator('meta[property="og:image:type"]'),
    ).toHaveAttribute("content", "image/png");
    await expect(
      page.locator('meta[property="og:image:width"]'),
    ).toHaveAttribute("content", "1200");
    await expect(
      page.locator('meta[property="og:image:height"]'),
    ).toHaveAttribute("content", "630");
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      /MayMall Madurai/,
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      origin + "/images/brand/social-card-v1.png",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });
test("robots and sitemap follow the explicit build configuration", async ({
  request,
  page,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const txt = await robots.text();
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const locations = await page.evaluate(
    (xml) =>
      Array.from(
        new DOMParser()
          .parseFromString(xml, "application/xml")
          .getElementsByTagName("loc"),
        (node) => node.textContent,
      ),
    xml,
  );
  if (indexable) {
    expect(txt).toMatch(/Allow: \//);
    expect(txt).not.toContain("Disallow:");
    expect(txt).toContain("Sitemap: " + origin + "/sitemap.xml");
    expect(locations).toEqual(paths.map((path) => new URL(path, origin).href));
  } else {
    expect(txt).toMatch(/Disallow: \//);
    expect(txt).not.toContain("Sitemap:");
    expect(locations).toEqual([]);
  }
  expect(xml).not.toMatch(/not-found|api\/|_next/);
  expect(
    locations.every(
      (url) => url !== null && !new URL(url).search && !new URL(url).hash,
    ),
  ).toBe(true);
});
test("404 does not inherit an indexable homepage canonical", async ({
  page,
}) => {
  const response = await page.goto("/missing-page");
  expect(response?.status()).toBe(404);
  const robots = await page
    .locator('meta[name="robots"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content")));
  expect(robots.length).toBeGreaterThan(0);
  for (const content of robots) expect(content).toMatch(/noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});
