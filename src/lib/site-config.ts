export function parseSiteConfig(values: {
  SITE_URL?: string;
  SITE_INDEXABLE?: string;
}) {
  const flag = values.SITE_INDEXABLE;
  if (flag && flag !== "true" && flag !== "false") {
    throw new Error("SITE_INDEXABLE must be true or false");
  }
  let origin: URL | undefined;
  if (values.SITE_URL) {
    try {
      origin = new URL(values.SITE_URL);
    } catch {
      throw new Error("SITE_URL must be a valid HTTP(S) origin");
    }
    if (
      !["http:", "https:"].includes(origin.protocol) ||
      origin.username ||
      origin.password ||
      origin.pathname !== "/" ||
      origin.search ||
      origin.hash
    )
      throw new Error(
        "SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment",
      );
  }
  const indexable = flag === "true";
  if (indexable && (!origin || origin.protocol !== "https:")) {
    throw new Error("SITE_INDEXABLE=true requires a verified HTTPS SITE_URL");
  }
  return { origin, indexable };
}

export const siteConfig = parseSiteConfig({
  SITE_URL: process.env.SITE_URL,
  SITE_INDEXABLE: process.env.SITE_INDEXABLE,
});
