import type { Collection } from "@/types/content";
import { cx } from "@/lib/utils";
import styles from "./CollectionCard.module.css";
const artworks = {
  silk: {
    src: "/images/silk.svg",
    alt: "Golden border on a plum silk saree illustration",
  },
  wedding: {
    src: "/images/celebration.svg",
    alt: "Illustrative plum and gold invitation study on rose woven fabric",
  },
  family: {
    src: "/images/everyday.svg",
    alt: "Illustrative folded textiles in sage, ochre and muted rose",
  },
} satisfies Record<Collection["artwork"], { src: string; alt: string }>;
export function CollectionCard({ collection }: { collection: Collection }) {
  const artwork = artworks[collection.artwork];
  return (
    <article className={cx(styles.card, styles[collection.artwork])}>
      <div className={styles["card-art"]}>
        <img
          src={artwork.src}
          alt={artwork.alt}
          loading="lazy"
          width="700"
          height="900"
        />
        <span aria-hidden="true">{collection.id} / EDIT</span>
      </div>
      <h3 className={styles["card-title"]}>{collection.title}</h3>
      <p>{collection.description}</p>
    </article>
  );
}
