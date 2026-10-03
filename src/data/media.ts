import type { CollectionSlug, EditorialImage } from "@/types/content";
export const editorialMedia: Readonly<Record<CollectionSlug, EditorialImage>> =
  {
    silk: {
      kind: "illustration",
      src: "/images/silk.svg",
      alt: "Golden border on a plum silk saree illustration",
      width: 900,
      height: 1100,
      caption: "Illustrative textile study",
    },
    celebration: {
      kind: "illustration",
      src: "/images/celebration.svg",
      alt: "Illustrative plum and gold invitation study on rose woven fabric",
      width: 700,
      height: 900,
      caption: "Illustrative textile study",
    },
    everyday: {
      kind: "illustration",
      src: "/images/everyday.svg",
      alt: "Illustrative folded textiles in sage, ochre and muted rose",
      width: 700,
      height: 900,
      caption: "Illustrative textile study",
    },
  };
export const socialCard = {
  kind: "social",
  src: "/images/brand/social-card-v1.png",
  alt: "MayMall Madurai — a textile-inspired brand card",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;
