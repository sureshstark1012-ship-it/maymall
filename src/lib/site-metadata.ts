import type { Metadata } from "next";
const title = "MayMall Madurai — A new chapter in tradition";
const description =
  "MayMall is coming to Madurai. Discover a vision of silk sarees, wedding wardrobes and family fashion rooted in Tamil tradition.";
// TODO: configure the verified public origin at deployment; never invent a brand URL.
const configuredOrigin = process.env.SITE_URL;
const origin = configuredOrigin ? new URL(configuredOrigin) : undefined;
if (
  origin &&
  (!["http:", "https:"].includes(origin.protocol) ||
    origin.username ||
    origin.password ||
    origin.pathname !== "/" ||
    origin.search ||
    origin.hash)
)
  throw new Error("SITE_URL must be an HTTP(S) origin");
export const siteMetadata: Metadata = {
  title: { default: title, template: "%s | MayMall Madurai" },
  description,
  applicationName: "MayMall Madurai",
  ...(origin ? { metadataBase: origin } : {}),
  robots: { index: process.env.SITE_INDEXABLE === "true", follow: true },
  openGraph: {
    title,
    description,
    siteName: "MayMall Madurai",
    type: "website",
    locale: "en_IN",
    ...(origin ? { url: origin } : {}),
  },
  twitter: { card: "summary", title, description },
};

export function pageMetadata(
  title: string,
  description: string,
  path: `/${string}`,
): Metadata {
  const fullTitle = `${title} | MayMall Madurai`;
  const url = origin ? new URL(path, origin) : undefined;
  return {
    title,
    description,
    openGraph: {
      ...siteMetadata.openGraph,
      title: fullTitle,
      description,
      ...(url ? { url } : {}),
    },
    twitter: { ...siteMetadata.twitter, title: fullTitle, description },
    ...(url ? { alternates: { canonical: url } } : {}),
  };
}
