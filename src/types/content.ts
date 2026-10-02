export type NavigationItem = {
  href: `/${string}`;
  label: string;
  featured?: boolean;
};
export type CollectionSlug = "silk" | "celebration" | "everyday";
export type CollectionCategory = "heritage" | "family";
export type CollectionFilter = "all" | CollectionCategory;
export type EditorialImage = {
  src: `/images/${string}.svg`;
  alt: string;
  width: number;
  height: number;
};
export type Collection = {
  slug: CollectionSlug;
  id: string;
  category: CollectionCategory;
  title: string;
  description: string;
  artwork: EditorialImage;
  eyebrow: string;
  introduction: string;
  statement: string;
  details: readonly { title: string; body: string }[];
  metadataDescription: string;
};
export type FAQItem = {
  question: string;
  answer: string;
  initiallyOpen?: boolean;
};
