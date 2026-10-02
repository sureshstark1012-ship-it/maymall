import { PageMasthead } from "@/components/editorial/PageMasthead/PageMasthead";
import { EditorialArtwork } from "@/components/editorial/EditorialArtwork/EditorialArtwork";
import { PageClosing } from "@/components/editorial/PageClosing/PageClosing";
import { Container } from "@/components/ui/Container/Container";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import { collections, collectionPreviewNote } from "@/data/collections";
import { pageMetadata } from "@/lib/site-metadata";
import styles from "./page.module.css";
export const metadata = pageMetadata(
  "Collections",
  "Explore MayMall’s three editorial collection themes: silk heritage, celebration dressing and everyday family fashion. These are previews of the MayMall vision.",
  "/collections",
);
export default function CollectionsPage() {
  return (
    <>
      <PageMasthead
        eyebrow="THE COLLECTIONS / AN EDITORIAL PREVIEW"
        title={
          <>
            Three edits.
            <br />
            <em>One family story.</em>
          </>
        }
        introduction="Silk heritage. The anticipation of a celebration. The colour of an ordinary day. Three directions for the MayMall vision, each with its own way of seeing."
      />
      <Container
        as="section"
        aria-label="Collection themes"
        className={styles.edits}
      >
        <p className={styles.note}>{collectionPreviewNote}</p>
        {collections.map((collection) => (
          <section
            key={collection.slug}
            className={styles.edit}
            aria-labelledby={`edit-${collection.slug}`}
          >
            <EditorialArtwork
              artwork={collection.artwork}
              className={styles.artwork}
            />
            <div className={styles.copy}>
              <p className="eyebrow">
                {collection.id} / {collection.eyebrow}
              </p>
              <h2 id={`edit-${collection.slug}`}>{collection.title}</h2>
              <p>{collection.introduction}</p>
              <CtaLink
                href={`/collections/${collection.slug}`}
                aria-label={`Explore ${collection.title}`}
              >
                Explore this edit
              </CtaLink>
            </div>
          </section>
        ))}
      </Container>
      <PageClosing />
    </>
  );
}
