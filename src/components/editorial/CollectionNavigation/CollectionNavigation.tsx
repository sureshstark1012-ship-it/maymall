import { collections } from "@/data/collections";
import type { CollectionSlug } from "@/types/content";
import { Container } from "@/components/ui/Container/Container";
import { CollectionCard } from "@/components/home/Collections/CollectionCard";
import styles from "./CollectionNavigation.module.css";
export function CollectionNavigation({ current }: { current: CollectionSlug }) {
  return (
    <Container
      as="section"
      section
      aria-labelledby="continue-heading"
      className={styles.section}
    >
      <p className="eyebrow">ANOTHER POINT OF VIEW</p>
      <h2 id="continue-heading">Continue exploring.</h2>
      <div className={styles.previews}>
        {collections
          .filter((item) => item.slug !== current)
          .map((item) => (
            <CollectionCard key={item.slug} collection={item} compact />
          ))}
      </div>
    </Container>
  );
}
