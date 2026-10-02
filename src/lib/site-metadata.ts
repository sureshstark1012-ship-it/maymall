import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
const title = "MayMall Madurai — A new chapter in tradition";
const description =
  "MayMall is coming to Madurai. Discover a vision of silk sarees, wedding wardrobes and family fashion rooted in Tamil tradition.";
// TODO: configure the verified public origin at deployment; never invent a brand URL.
const { origin, indexable } = siteConfig;
const socialImage = origin
  ? {
      url: new URL("/images/brand/social-card-v1.png", origin),
      width: 1200,
      height: 630,
      type: "image/png",
      alt: "MayMall Madurai — a textile-inspired brand card",
    }
  : undefined;
export const siteMetadata: Metadata = {
  title: { default: title, template: "%s | MayMall Madurai" },
  description,
  applicationName: "MayMall Madurai",
  ...(origin
    ? { metadataBase: origin, alternates: { canonical: new URL("/", origin) } }
    : {}),
  robots: { index: indexable, follow: true },
  openGraph: {
    title,
    description,
    siteName: "MayMall Madurai",
    type: "website",
    locale: "en_IN",
    ...(origin ? { url: new URL("/", origin) } : {}),
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  twitter: {
    card: socialImage ? "summary_large_image" : "summary",
    title,
    description,
    ...(socialImage
      ? { images: [{ url: socialImage.url, alt: socialImage.alt }] }
      : {}),
  },
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
