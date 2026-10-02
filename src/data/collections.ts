import type { Collection } from "@/types/content";
export const collections = [
  {
    id: "01",
    category: "heritage",
    title: "The silk edit",
    description:
      "Rich colours, graceful drapes and the enduring charm of traditional silk sarees.",
    artwork: "silk",
  },
  {
    id: "02",
    category: "heritage",
    title: "The celebration edit",
    description:
      "Wedding and festive looks inspired by the moments that bring families together.",
    artwork: "wedding",
  },
  {
    id: "03",
    category: "family",
    title: "The everyday edit",
    description:
      "A vision of comfortable, expressive fashion for women, men and little ones.",
    artwork: "family",
  },
] satisfies readonly Collection[];
