import type { Collection } from "@/types/content";
import { cx } from "@/lib/utils";
import { OrnamentIcon } from "@/components/ui/Ornament/OrnamentIcon";
import { ArrowIcon } from "@/components/ui/ArrowIcon/ArrowIcon";
import styles from "./CollectionCard.module.css";
export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <article className={styles.card}>
      <div className={cx(styles["card-art"], styles[collection.artwork])}>
        {collection.artwork === "silk" ? (
          <img
            src="/images/silk.svg"
            alt="Golden border on a plum silk saree illustration"
            loading="lazy"
          />
        ) : collection.artwork === "wedding" ? (
          <div className={styles.arch} aria-hidden="true">
            <span>
              <OrnamentIcon />
            </span>
          </div>
        ) : (
          <>
            <div className={styles.fabric} aria-hidden="true" />
            <div
              className={cx(styles.fabric, styles["fabric-two"])}
              aria-hidden="true"
            />
            <div
              className={cx(styles.fabric, styles["fabric-three"])}
              aria-hidden="true"
            />
          </>
        )}
        <span aria-hidden="true">{collection.id}</span>
      </div>
      <div className={styles["card-title"]}>
        <h3>{collection.title}</h3>
        <span>
          <ArrowIcon />
        </span>
      </div>
      <p>{collection.description}</p>
    </article>
  );
}
