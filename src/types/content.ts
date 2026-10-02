export type NavigationItem = {
  href: `#${string}`;
  label: string;
  featured?: boolean;
};
export type CollectionCategory = "heritage" | "family";
export type CollectionFilter = "all" | CollectionCategory;
export type Collection = {
  id: string;
  category: CollectionCategory;
  title: string;
  description: string;
  artwork: "silk" | "wedding" | "family";
};
export type FAQItem = {
  question: string;
  answer: string;
  initiallyOpen?: boolean;
};
