import { expect, test, type Page } from "@playwright/test";

const routes = [
  {
    path: "/",
    title: "MayMall Madurai — A new chapter in tradition",
    heading: /Every thread/,
    current: undefined,
    description: /silk sarees/,
  },
  {
    path: "/collections",
    title: "Collections | MayMall Madurai",
    heading: /Three edits/,
    current: "/collections",
    description: /three editorial collection themes/,
  },
  {
    path: "/collections/silk",
    title: "The silk edit | MayMall Madurai",
    heading: /The silk edit/,
    current: "/collections",
    description: /colour, drape/,
  },
  {
    path: "/collections/celebration",
    title: "The celebration edit | MayMall Madurai",
    heading: /The celebration edit/,
    current: "/collections/celebration",
    description: /family gatherings/,
  },
  {
    path: "/collections/everyday",
    title: "The everyday edit | MayMall Madurai",
    heading: /The everyday edit/,
    current: "/collections",
    description: /across generations/,
  },
  {
    path: "/our-story",
    title: "Our Story | MayMall Madurai",
    heading: /The stories/,
    current: "/our-story",
    description: /affiliation has not been announced/,
  },
  {
    path: "/visit",
    title: "Visit | MayMall Madurai",
    heading: /Madurai/,
    current: "/visit",
    description: /exact address have not been announced/,
  },
] as const;
const edits = ["silk", "celebration", "everyday"] as const;

async function loadArtwork(page: Page) {
  for (const image of await page.getByRole("main").getByRole("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0);
    await expect(image).toHaveAttribute("alt", /illustrat/i);
    await expect(image).toHaveAttribute("width", /\d+/);
    await expect(image).toHaveAttribute("height", /\d+/);
  }
}

for (const route of routes) {
  test(`${route.path} has route metadata, one heading, a skip link and correct orientation`, async ({
    page,
  }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      route.heading,
    );
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      route.description,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      route.title,
    );
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", description!);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      "content",
      route.title,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    // Default preview configuration must not produce an invented canonical URL.
    if (!process.env.SITE_URL) {
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
      await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
    }
    const nav = page.getByRole("navigation", {
      name: "Main navigation",
      exact: true,
    });
    if (route.current) {
      const link = nav.locator(`a[href="${route.current}"]`);
      await expect(link).toHaveAttribute(
        "aria-current",
        route.path === route.current ? "page" : "location",
      );
      await expect(nav.locator("[aria-current]")).toHaveCount(1);
    } else await expect(nav.locator("[aria-current]")).toHaveCount(0);
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to main content" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
  });
}

test("desktop route navigation and footer continuations work with the keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  for (const [label, path] of [
    ["Our story", "/our-story"],
    ["Collections", "/collections"],
    ["Celebration edit", "/collections/celebration"],
    ["Visit", "/visit"],
  ]) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(link).toHaveAttribute("aria-current", "page");
  }
  const story = page
    .getByRole("navigation", { name: "Footer navigation" })
    .getByRole("link", { name: "Our story" });
  await story.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/our-story$/);
  await page.getByRole("link", { name: "Back to top" }).click();
  await expect(page).toHaveURL(/\/our-story#?$/);
  const home = page
    .locator("footer")
    .getByRole("link", { name: "MayMall home" });
  await home.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/$/);
});

test("mobile disclosure, Escape and route selection work from every page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  for (const route of routes) {
    await page.goto(route.path);
    const menu = page.getByRole("button", { name: "Menu", exact: true });
    const nav = page.getByRole("navigation", {
      name: "Mobile navigation",
      exact: true,
    });
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    if (route.current)
      await expect(nav.locator(`a[href="${route.current}"]`)).toHaveAttribute(
        "aria-current",
        route.path === route.current ? "page" : "location",
      );
    await page.keyboard.press("Tab");
    await expect(nav.getByRole("link", { name: "Our story" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(nav).toBeHidden();
    await page.keyboard.press("Enter");
    const next = route.path === "/visit" ? "/collections" : "/visit";
    await nav.locator(`a[href="${next}"]`).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${next}$`));
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(nav).toBeHidden();
    expect(
      await page.evaluate(
        () => document.activeElement?.closest("[hidden]") === null,
      ),
    ).toBe(true);
  }
});

test("history transitions reset an open mobile menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/collections");
  const menu = page.getByRole("button", { name: "Menu" });
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await menu.click();
  await nav.getByRole("link", { name: "Visit", exact: true }).click();
  await expect(page).toHaveURL(/\/visit$/);
  await menu.click();
  await page.goBack();
  await expect(page).toHaveURL(/\/collections$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.goForward();
  await expect(page).toHaveURL(/\/visit$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

for (const edit of edits) {
  test(`homepage and collections landing lead to the ${edit} editorial page`, async ({
    page,
  }) => {
    await page.goto("/");
    const preview = page.getByRole("article").filter({
      has: page.getByRole("heading", {
        name: `The ${edit} edit`,
        exact: true,
      }),
    });
    await preview
      .getByRole("link", { name: `The ${edit} edit`, exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`/collections/${edit}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      `The ${edit} edit`,
    );
    const breadcrumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumbs.locator('[aria-current="page"]')).toHaveText(
      `The ${edit} edit`,
    );
    await breadcrumbs
      .getByRole("link", { name: "Collections", exact: true })
      .click();
    await expect(page).toHaveURL(/\/collections$/);
    await page
      .getByRole("link", { name: `Explore The ${edit} edit`, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`/collections/${edit}$`));
    for (const related of edits.filter((item) => item !== edit)) {
      await page
        .getByRole("link", { name: `The ${related} edit`, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`/collections/${related}$`));
      await page.goto(`/collections/${edit}`);
    }
  });
}

test("gateway CTAs lead to their intended continuation", async ({ page }) => {
  for (const [label, path] of [
    ["Explore the collections", "/collections"],
    ["Our Madurai chapter", "/our-story"],
    ["Discover occasion wear", "/collections/celebration"],
    ["Visit information", "/visit"],
  ]) {
    await page.goto("/");
    await page.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  }
});

test("unknown routes and unknown collection slugs return the branded 404", async ({
  page,
}) => {
  for (const path of ["/missing-page", "/collections/unknown-edit"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "couldn’t be found",
    );
    await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
    await page
      .getByRole("main")
      .getByRole("link", { name: "Explore collections" })
      .click();
    await expect(page).toHaveURL(/\/collections$/);
  }
});

test("affiliation and launch copy stay cautious where they appear", async ({
  page,
}) => {
  for (const path of ["/", "/our-story"]) {
    await page.goto(path);
    await expect(page.getByRole("main")).toContainText(
      "Inspired by the silk and family-shopping traditions associated with Chennai Silks",
    );
    await expect(page.getByRole("main")).toContainText(
      "An official affiliation has not been announced.",
    );
  }
  await page.goto("/visit");
  await expect(
    page.getByRole("definition").filter({ hasText: "Not yet announced" }),
  ).toHaveCount(2);
  await page.locator("details").last().locator("summary").click();
  await expect(page.locator("details").last().locator("p")).toContainText(
    "An official affiliation has not been announced.",
  );
  await expect(page.getByRole("main")).toContainText(
    "Collection themes are a preview of our vision.",
  );
});

for (const width of [375, 390, 430, 768, 900, 1024, 1280, 1440, 1600]) {
  test(`all routes at ${width}px preserve layout, artwork and touch targets`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const route of routes) {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await loadArtwork(page);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route.path,
      ).toBe(true);
      expect(
        await page.locator("a, button, summary").evaluateAll((elements) =>
          elements
            .filter((element) => {
              const box = element.getBoundingClientRect();
              return box.width > 0 && box.height > 0 && box.height < 44;
            })
            .map((element) => element.textContent?.trim()),
        ),
        route.path,
      ).toEqual([]);
      if (width <= 900)
        await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
      else
        await expect(
          page.getByRole("navigation", {
            name: "Main navigation",
            exact: true,
          }),
        ).toBeVisible();
      await expect(
        page.locator('main svg:not([aria-hidden="true"])'),
      ).toHaveCount(0);
    }
    expect(errors).toEqual([]);
  });
}

for (const [name, path, width] of [
  ["collections", "/collections", 375],
  ["collections", "/collections", 1440],
  ["silk", "/collections/silk", 375],
  ["silk", "/collections/silk", 1440],
  ["visit", "/visit", 1440],
] as const) {
  test(`review screenshot for ${name} at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await loadArtwork(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    const output = testInfo.outputPath(`review-${name}-${width}.png`);
    await page.screenshot({ path: output, fullPage: true });
    await testInfo.attach(`${name} ${width}px`, {
      path: output,
      contentType: "image/png",
    });
  });
}

test("primary collection artwork loads eagerly with high priority", async ({
  page,
}) => {
  await page.goto("/collections/silk");
  const artwork = page.getByRole("main").getByRole("img", {
    name: "Golden border on a plum silk saree illustration",
    exact: true,
  });
  await expect(artwork).toHaveAttribute("loading", "eager");
  await expect(artwork).toHaveAttribute("fetchpriority", "high");
});

test("ordinary story artwork defaults to lazy loading and automatic priority", async ({
  page,
}) => {
  await page.goto("/our-story");
  const artwork = page.getByRole("main").getByRole("img", {
    name: "Golden border on a plum silk saree illustration",
    exact: true,
  });
  await expect(artwork).toHaveAttribute("loading", "lazy");
  await expect(artwork).toHaveAttribute("fetchpriority", "auto");
});
