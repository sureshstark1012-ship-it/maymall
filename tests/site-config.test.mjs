import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSiteConfig } from "../src/lib/site-config.ts";

test("local and preview configurations default to no indexing", () => {
  assert.deepEqual(parseSiteConfig({}), {
    origin: undefined,
    indexable: false,
  });
  assert.equal(
    parseSiteConfig({
      SITE_URL: "https://deployment.example",
      SITE_INDEXABLE: "false",
    }).indexable,
    false,
  );
});
test("indexing requires an explicit HTTPS origin", () => {
  assert.equal(
    parseSiteConfig({
      SITE_URL: "https://deployment.example",
      SITE_INDEXABLE: "true",
    }).origin.href,
    "https://deployment.example/",
  );
  for (const SITE_URL of [undefined, "", "http://deployment.example"])
    assert.throws(
      () => parseSiteConfig({ SITE_URL, SITE_INDEXABLE: "true" }),
      /requires a verified HTTPS/,
    );
});
test("malformed, unsafe and non-origin URLs fail clearly", () => {
  for (const SITE_URL of [
    "not a URL",
    "ftp://deployment.example",
    "https://user:password@deployment.example",
    "https://deployment.example/path",
    "https://deployment.example/?query=1",
    "https://deployment.example/#fragment",
  ])
    assert.throws(() => parseSiteConfig({ SITE_URL }), /SITE_URL/);
});
test("indexing configuration rejects accidental boolean spellings", () => {
  for (const SITE_INDEXABLE of ["TRUE", "yes", "1", "FALSE"])
    assert.throws(
      () => parseSiteConfig({ SITE_INDEXABLE }),
      /SITE_INDEXABLE must/,
    );
});

test("current local media and font payloads stay within coarse static budgets", async () => {
  const { readdir, stat } = await import("node:fs/promises");
  const fontFiles = (await readdir("src/app/fonts")).filter((name) =>
    name.endsWith(".woff2"),
  );
  const fontSizes = await Promise.all(
    fontFiles.map((name) => stat("src/app/fonts/" + name)),
  );
  assert.ok(
    fontSizes.reduce((total, file) => total + file.size, 0) <= 220 * 1024,
    "Vendored font budget: 220 KiB",
  );
  for (const name of (await readdir("public/images")).filter((name) =>
    name.endsWith(".svg"),
  ))
    assert.ok(
      (await stat("public/images/" + name)).size <= 5 * 1024,
      "Illustrative SVG budget: 5 KiB each",
    );
  assert.ok(
    (await stat("public/images/brand/social-card-v1.png")).size <= 250 * 1024,
    "Social PNG budget: 250 KiB",
  );
});
