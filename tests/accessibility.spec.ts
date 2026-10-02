import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
async function audit(page: Page, testInfo: TestInfo, name: string) {
  const results = await new AxeBuilder({ page }).withTags(tags).analyze();
  await testInfo.attach("accessibility-" + name, {
    body: JSON.stringify(
      {
        route: page.url(),
        tags,
        engine: results.testEngine,
        violations: results.violations,
        incomplete: results.incomplete,
        passes: results.passes.map((rule) => rule.id),
      },
      null,
      2,
    ),
    contentType: "application/json",
  });
  // Also retain predictable filenames for the CI human-review artifact.
  const { writeFile } = await import("node:fs/promises");
  await writeFile(
    testInfo.outputPath("accessibility-" + name + ".json"),
    JSON.stringify(
      {
        route: page.url(),
        tags,
        engine: results.testEngine,
        violations: results.violations,
        incomplete: results.incomplete,
        passes: results.passes.map((rule) => rule.id),
      },
      null,
      2,
    ),
  );
  expect(results.violations).toEqual([]);
}
for (const [name, path] of [
  ["home", "/"],
  ["collections", "/collections"],
  ["silk", "/collections/silk"],
  ["celebration", "/collections/celebration"],
  ["everyday", "/collections/everyday"],
  ["story", "/our-story"],
  ["visit", "/visit"],
])
  test(`WCAG engine checks ${name}`, async ({ page }, testInfo) => {
    await page.goto(path);
    await audit(page, testInfo, name);
  });
test("WCAG engine checks open mobile navigation", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await audit(page, testInfo, "mobile-menu");
});
test("WCAG engine checks filtered collection previews", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Family fashion", exact: true })
    .click();
  await audit(page, testInfo, "filtered");
});
test("WCAG engine checks expanded Visit disclosures", async ({
  page,
}, testInfo) => {
  await page.goto("/visit");
  await page.locator("details").last().locator("summary").click();
  await audit(page, testInfo, "faq");
});
for (const width of [640, 320])
  test(`reflow at an effective ${width}px preserves normal content`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/collections/silk", "/visit"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.getByRole("button", { name: "Menu" }).click();
      await expect(
        page.getByRole("navigation", { name: "Mobile navigation" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
    }
  });
test("forced colors preserve keyboard focus and the selected filter state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toHaveCSS("outline-style", "solid");
  const selected = page.getByRole("button", {
    name: "Family fashion",
    exact: true,
  });
  await selected.click();
  await page.getByRole("button", { name: "Menu" }).focus();
  await expect(selected).toHaveAttribute("aria-pressed", "true");
  await expect(selected).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Menu" })).toHaveCSS(
    "outline-style",
    "solid",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
});
