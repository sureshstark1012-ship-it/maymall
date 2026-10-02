import type { Collection, CollectionSlug } from "@/types/content";
export const collectionPreviewNote =
  "Collection themes are a preview of our vision. Store and product details will be shared closer to opening.";
export const collectionBySlug = {
  silk: {
    slug: "silk",
    id: "01",
    category: "heritage",
    title: "The silk edit",
    description:
      "Rich colours, graceful drapes and the enduring charm of traditional silk sarees.",
    artwork: {
      src: "/images/silk.svg",
      alt: "Golden border on a plum silk saree illustration",
      width: 900,
      height: 1100,
    },
    eyebrow: "HERITAGE / COLOUR / DRAPE",
    introduction:
      "A border catches the light. A fold holds a deeper colour. The Silk Edit is an editorial direction inspired by the quiet drama of silk dressing and the textile traditions we return to for meaningful occasions.",
    statement: "Colour in every fold. Memory in every occasion.",
    details: [
      {
        title: "The colour",
        body: "Our vision begins with depth: plum, warm gold and shades that find a different expression as they sit beside one another. The palette is a starting point for the MayMall vision.",
      },
      {
        title: "The border",
        body: "Zari-inspired lines guide the artwork: a fine edge, a repeated rhythm, a little light against a rich field. The focus is on the visual rhythm of textile detail.",
      },
      {
        title: "The drape",
        body: "An editorial appreciation of movement, folds and personal expression. We imagine occasion dressing that leaves room for the person wearing it, and for the memory they make.",
      },
    ],
    metadataDescription:
      "Explore MayMall’s Silk Edit: an editorial direction inspired by colour, drape and Tamil textile heritage. Collection themes are previews, not confirmed products.",
  },
  celebration: {
    slug: "celebration",
    id: "02",
    category: "heritage",
    title: "The celebration edit",
    description:
      "Wedding and festive looks inspired by the moments that bring families together.",
    artwork: {
      src: "/images/celebration.svg",
      alt: "Illustrative plum and gold invitation study on rose woven fabric",
      width: 700,
      height: 900,
    },
    eyebrow: "GATHERINGS / FESTIVE DAYS / FAMILY",
    introduction:
      "Before the occasion comes the anticipation: choosing a colour, sharing an idea, imagining everyone together. The Celebration Edit looks towards wedding and festive dressing through the people and moments around it.",
    statement: "One gathering. Many ways to belong.",
    details: [
      {
        title: "Before the day",
        body: "A first gathering, a conversation about colour, the beginning of a shared plan. Our editorial vision makes room for the smaller moments around a celebration.",
      },
      {
        title: "Together, in colour",
        body: "Imagine a family connected by a colour story, with space for each person’s expression. We imagine a colour story shared in different ways.",
      },
      {
        title: "After the occasion",
        body: "The clothes stay in photographs; the feeling stays with the people. This edit takes its direction from the memories a celebration can hold, and from the people at its centre.",
      },
    ],
    metadataDescription:
      "The Celebration Edit explores MayMall’s future-looking vision for wedding wardrobes, festive colour and family gatherings. No product range has been announced.",
  },
  everyday: {
    slug: "everyday",
    id: "03",
    category: "family",
    title: "The everyday edit",
    description:
      "A vision of comfortable, expressive fashion for women, men and little ones.",
    artwork: {
      src: "/images/everyday.svg",
      alt: "Illustrative folded textiles in sage, ochre and muted rose",
      width: 700,
      height: 900,
    },
    eyebrow: "DAILY COLOUR / PERSONAL EXPRESSION / FAMILY",
    introduction:
      "Not every day asks for an occasion. Some simply leave space to be yourself. The Everyday Edit imagines family fashion through comfortable rhythms, expressive colour and the different ways generations choose to dress.",
    statement: "A little colour. A little room to be yourself.",
    details: [
      {
        title: "Room for expression",
        body: "Our vision welcomes different tastes across women, men and younger generations. A shared destination need not mean a single way of dressing.",
      },
      {
        title: "An easier rhythm",
        body: "Comfort is part of the inspiration: the freedom to move through an ordinary day and make it your own. The edit takes its direction from that feeling of ease.",
      },
      {
        title: "Colour, close to home",
        body: "Sage, ochre and muted rose give this illustrative study a relaxed rhythm. A colour study for the many ways a family expresses itself.",
      },
    ],
    metadataDescription:
      "MayMall’s Everyday Edit is a vision of expressive, comfortable family fashion across generations. Explore the editorial inspiration ahead of confirmed store details.",
  },
} satisfies Record<CollectionSlug, Collection>;
export const collections = [
  collectionBySlug.silk,
  collectionBySlug.celebration,
  collectionBySlug.everyday,
] satisfies readonly Collection[];
