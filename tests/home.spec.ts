import { expect, test } from "@playwright/test";

test("mobile navigation supports keyboard, Escape, focus restoration and link selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu" });
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu).toHaveAttribute("aria-controls", "mobile-navigation");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(nav).toBeHidden();
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(nav).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Our story" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(menu).toBeFocused();
  await menu.click();
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await nav.getByRole("link", { name: "Collections", exact: true }).click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/\/collections$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Three edits.",
  );
  await expect(nav).toBeHidden();
});

test("mobile menu resets when moving to the desktop layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(
    page.getByRole("navigation", { name: "Main navigation", exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 375, height: 900 });
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("collection filters expose their state and show the matching content", async ({
  page,
}) => {
  await page.goto("/");
  const articles = page.getByRole("article");
  const filters = page.getByRole("group", {
    name: "Filter collection inspirations",
  });
  await expect(articles).toHaveCount(3);
  await filters.getByRole("button", { name: "Family fashion" }).click();
  await expect(articles).toHaveCount(1);
  await expect(articles.getByRole("heading")).toHaveText("The everyday edit");
  await expect(
    filters.getByRole("button", { name: "Family fashion" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    filters.getByRole("button", { name: "All collections" }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByRole("status")).toHaveText("1 collection shown");
  const heritage = filters.getByRole("button", {
    name: "Silks & occasion wear",
  });
  await heritage.focus();
  await page.keyboard.press("Space");
  await expect(articles).toHaveCount(2);
  await expect(articles.getByRole("heading")).toHaveText([
    "The silk edit",
    "The celebration edit",
  ]);
  await filters.getByRole("button", { name: "All collections" }).click();
  await expect(articles).toHaveCount(3);
});

test("native FAQ supports keyboard toggling and preserves cautious brand copy", async ({
  page,
}) => {
  await page.goto("/visit");
  const first = page.locator("details").first();
  await expect(first).toHaveAttribute("open", "");
  const location = page
    .locator("details")
    .filter({ hasText: "Where in Madurai will it be?" });
  await location.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(location.locator("p")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(location.locator("p")).toBeHidden();
  const affiliation = page.locator("details").last();
  await affiliation.locator("summary").click();
  await expect(affiliation.locator("p")).toContainText(
    "An official affiliation has not been announced.",
  );
});

test("skip link, headings, artwork, language and year are accessible", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('[lang="ta"]')).toHaveText("வணக்கம் மதுரை");
  await expect(page.getByRole("main").getByRole("img")).toHaveCount(4);
  await expect(page.locator("footer")).toContainText(
    `© ${new Date().getFullYear()} MayMall`,
  );
  await expect(
    page.locator(
      'main svg:not([aria-hidden="true"]), header svg:not([aria-hidden="true"]), footer svg:not([aria-hidden="true"])',
    ),
  ).toHaveCount(0);
});

for (const width of [375, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px has no overflow or browser errors`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const smallTargets = await page
      .locator("a, button, summary")
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            const box = element.getBoundingClientRect();
            return box.width > 0 && box.height > 0 && box.height < 44;
          })
          .map((element) => element.textContent?.trim()),
      );
    expect(smallTargets).toEqual([]);
    const mobile = width <= 900;
    if (mobile)
      await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
    else
      await expect(
        page.getByRole("navigation", { name: "Main navigation", exact: true }),
      ).toBeVisible();
    // Scroll each lazy artwork into view before assessing image health or capturing.
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const artwork of await page.getByRole("main").getByRole("img").all()) {
      await artwork.scrollIntoViewIfNeeded();
      await expect(artwork).toHaveJSProperty("complete", true);
      expect(
        await artwork.evaluate((image: HTMLImageElement) => image.naturalWidth),
      ).toBeGreaterThan(0);
    }
    await page.evaluate(() => document.fonts.ready);
    if (width === 375 || width === 1440) {
      await page.evaluate(() => window.scrollTo(0, 0));
      const path = testInfo.outputPath(`homepage-${width}.png`);
      await page.screenshot({ path, fullPage: true });
      await testInfo.attach(`Homepage ${width}px`, {
        path,
        contentType: "image/png",
      });
    }
    expect(errors).toEqual([]);
  });
}

test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
  await page.getByRole("article").first().hover();
  expect(
    await page
      .getByRole("article")
      .first()
      .getByRole("img")
      .evaluate((element) => getComputedStyle(element).transitionDuration),
  ).toBe("0s");
});

test("mobile routes, collections and FAQ remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(3);
  await nav.getByRole("link", { name: "Collections", exact: true }).click();
  await expect(page).toHaveURL(/\/collections$/);
  await expect(
    page.getByRole("link", { name: /Explore The silk edit/i }),
  ).toBeVisible();
  await nav.getByRole("link", { name: "Visit", exact: true }).click();
  await expect(page).toHaveURL(/\/visit$/);
  const location = page.locator("details").nth(1);
  await location.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(location.locator("p")).toBeVisible();
  await context.close();
});

test("metadata is present without fabricated production URLs", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    "MayMall Madurai — A new chapter in tradition",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /silk sarees/,
  );
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
    "content",
    "MayMall Madurai",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("baseline HTTP security headers protect the page and public artwork", async ({
  request,
}) => {
  for (const path of ["/", "/images/silk.svg"]) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toBe(
      "camera=(), microphone=(), geolocation=()",
    );
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-powered-by"]).toBeUndefined();
  }
});
