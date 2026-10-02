import { Breadcrumbs } from "@/components/editorial/Breadcrumbs/Breadcrumbs";
import { EditorialArtwork } from "@/components/editorial/EditorialArtwork/EditorialArtwork";
import { EditorialDetails } from "@/components/editorial/EditorialDetails/EditorialDetails";
import { CollectionNavigation } from "@/components/editorial/CollectionNavigation/CollectionNavigation";
import { PageClosing } from "@/components/editorial/PageClosing/PageClosing";
import { Container } from "@/components/ui/Container/Container";
import { collectionBySlug, collectionPreviewNote } from "@/data/collections";
import { pageMetadata } from "@/lib/site-metadata";
import styles from "./page.module.css";
const collection = collectionBySlug.everyday;
export const metadata = pageMetadata(
  collection.title,
  collection.metadataDescription,
  "/collections/everyday",
);
export default function EverydayPage() {
  return (
    <>
      <Breadcrumbs title={collection.title} />
      <Container as="header" section className={styles.masthead}>
        <p className="eyebrow">
          {collection.id} / {collection.eyebrow}
        </p>
        <h1>{collection.title}</h1>
        <div className={styles.introduction}>
          <p className={styles.statement}>{collection.statement}</p>
          <p>{collection.introduction}</p>
        </div>
        <EditorialArtwork
          artwork={collection.artwork}
          priority
          className={styles.artwork}
        />
        <p className={styles.note}>{collectionPreviewNote}</p>
      </Container>
      <div className={styles.details}>
        <EditorialDetails
          heading="Everyday, in your own way."
          details={collection.details}
          layout="columns"
        />
      </div>
      <CollectionNavigation current="everyday" />
      <PageClosing />
    </>
  );
}
