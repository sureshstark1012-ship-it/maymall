import { Container } from "@/components/ui/Container/Container";
import { collections } from "@/data/collections";
import { CollectionCard } from "./CollectionCard";
import { CollectionFilters } from "./CollectionFilters";
import styles from "./CollectionsSection.module.css";
export function CollectionsSection() {
  return (
    <section
      id="collections"
      tabIndex={-1}
      aria-labelledby="collections-heading"
      className={styles.collections}
    >
      <Container section>
        <div className={styles["section-heading"]}>
          <div>
            <p className="eyebrow">THE COLLECTIONS</p>
            <h2 id="collections-heading">
              For every kind
              <br />
              <em>of beautiful.</em>
            </h2>
          </div>
          <p>
            From treasured traditions to everyday favourites.
            <br />
            Explore the inspiration behind MayMall.
          </p>
        </div>
        <CollectionFilters
          items={collections.map((collection) => ({
            id: collection.id,
            category: collection.category,
            content: <CollectionCard collection={collection} />,
          }))}
        />
        <p className={styles["collection-note"]}>
          Collection themes are a preview of our vision. Store and product
          details will be shared closer to opening.
        </p>
      </Container>
    </section>
  );
}
