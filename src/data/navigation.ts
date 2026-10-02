import type { NavigationItem } from "@/types/content";
export const navigation = [
  { href: "/our-story", label: "Our story" },
  { href: "/collections", label: "Collections" },
  { href: "/collections/celebration", label: "Celebration edit" },
  { href: "/visit", label: "Visit", featured: true },
] satisfies readonly NavigationItem[];
