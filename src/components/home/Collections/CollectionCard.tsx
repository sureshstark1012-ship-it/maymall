import Link from "next/link";
import type { Collection } from "@/types/content";
import { cx } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon/ArrowIcon";
import styles from "./CollectionCard.module.css";
export function CollectionCard({
  collection,
  compact = false,
}: {
  collection: Collection;
  compact?: boolean;
}) {
  const headingId = `preview-${collection.slug}`;
  return (
    <article
      className={cx(
        styles.card,
        styles[collection.slug],
        compact && styles.compact,
      )}
    >
      <Link
        href={`/collections/${collection.slug}`}
        className={styles.preview}
        aria-labelledby={headingId}
      >
        <div className={styles["card-art"]}>
          <img
            src={collection.artwork.src}
            alt={collection.artwork.alt}
            loading="lazy"
            width={collection.artwork.width}
            height={collection.artwork.height}
          />
          <span aria-hidden="true">{collection.id} / EDIT</span>
        </div>
        <h3 id={headingId} className={styles["card-title"]}>
          {collection.title}
          <ArrowIcon />
        </h3>
        <p>{collection.description}</p>
      </Link>
    </article>
  );
}
