import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { execFileSync } from "node:child_process";
import { openBusiness } from "./fixtures-business";

test("prelaunch Visit publishes unknown facts without fake contacts, maps or schema", async ({
  page,
}) => {
  await page.goto("/visit");
  await expect(
    page.getByRole("heading", { name: "Coming soon.", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("definition").filter({ hasText: "Not yet announced" }),
  ).toHaveCount(2);
  await expect(
    page.locator(
      'a[href^="tel:"], a[href^="mailto:"], a[href*="maps"], script[type="application/ld+json"], [itemprop="streetAddress"], time',
    ),
  ).toHaveCount(0);
  await expect(
    page.getByText("An official affiliation has not been announced.", {
      exact: false,
    }),
  ).toBeAttached();
  await expect(page.getByRole("main")).not.toContainText(
    /Example Road|00000|example\.invalid/,
  );
});
test("confirmed server-rendered fixture facts wrap safely in the existing Visit layout", async ({
  page,
}) => {
  for (const width of [375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/visit");
    const className = await page.locator("dl").getAttribute("class");
    // Render the real server component with test-only props. No fixture enters an app build.
    const markup = execFileSync(
      process.execPath,
      ["--import", "tsx", "tests/render-business-fixture.ts", className ?? ""],
      { encoding: "utf8" },
    );
    await page.locator("dl").evaluate((node, html) => {
      node.outerHTML = html;
    }, markup);
    await expect(
      page.getByRole("definition").filter({ hasText: openBusiness.address! }),
    ).toBeVisible();
    await expect(
      page.getByRole("definition").filter({ hasText: openBusiness.hours! }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width === 375) {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  }
});
test("Visit mobile review capture preserves current business-data presentation", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.goto("/visit");
  await page.evaluate(() => document.fonts.ready);
  const path = testInfo.outputPath("review-visit-375.png");
  await page.screenshot({ path, fullPage: true });
  await testInfo.attach("review-visit-375", { path, contentType: "image/png" });
});
