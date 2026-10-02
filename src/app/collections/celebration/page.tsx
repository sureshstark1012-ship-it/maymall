import { Breadcrumbs } from "@/components/editorial/Breadcrumbs/Breadcrumbs";
import { EditorialArtwork } from "@/components/editorial/EditorialArtwork/EditorialArtwork";
import { EditorialDetails } from "@/components/editorial/EditorialDetails/EditorialDetails";
import { CollectionNavigation } from "@/components/editorial/CollectionNavigation/CollectionNavigation";
import { PageClosing } from "@/components/editorial/PageClosing/PageClosing";
import { Container } from "@/components/ui/Container/Container";
import { collectionBySlug, collectionPreviewNote } from "@/data/collections";
import { pageMetadata } from "@/lib/site-metadata";
import styles from "./page.module.css";
const collection = collectionBySlug.celebration;
export const metadata = pageMetadata(
  collection.title,
  collection.metadataDescription,
  "/collections/celebration",
);
export default function CelebrationPage() {
  return (
    <>
      <Breadcrumbs title={collection.title} />
      <section className={styles.field}>
        <Container section>
          <header className={styles.masthead}>
            <p className="eyebrow">
              {collection.id} / {collection.eyebrow}
            </p>
            <h1>{collection.title}</h1>
            <p className={styles.statement}>{collection.statement}</p>
          </header>
          <div className={styles.spread}>
            <EditorialArtwork
              artwork={collection.artwork}
              className={styles.artwork}
            />
            <div className={styles.copy}>
              <h2>
                The moments
                <br />
                <em>around the moment.</em>
              </h2>
              <p>{collection.introduction}</p>
              <p className={styles.note}>{collectionPreviewNote}</p>
            </div>
          </div>
        </Container>
      </section>
      <EditorialDetails
        heading="Before, together, afterwards."
        details={collection.details}
        layout="steps"
      />
      <CollectionNavigation current="celebration" />
      <PageClosing />
    </>
  );
}
