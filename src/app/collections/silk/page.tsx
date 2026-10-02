import { Breadcrumbs } from "@/components/editorial/Breadcrumbs/Breadcrumbs";
import { EditorialArtwork } from "@/components/editorial/EditorialArtwork/EditorialArtwork";
import { EditorialDetails } from "@/components/editorial/EditorialDetails/EditorialDetails";
import { CollectionNavigation } from "@/components/editorial/CollectionNavigation/CollectionNavigation";
import { PageClosing } from "@/components/editorial/PageClosing/PageClosing";
import { Container } from "@/components/ui/Container/Container";
import { collectionBySlug, collectionPreviewNote } from "@/data/collections";
import { pageMetadata } from "@/lib/site-metadata";
import styles from "./page.module.css";
const collection = collectionBySlug.silk;
export const metadata = pageMetadata(
  collection.title,
  collection.metadataDescription,
  "/collections/silk",
);
export default function SilkPage() {
  return (
    <>
      <Breadcrumbs title={collection.title} />
      <Container as="header" section className={styles.masthead}>
        <div className={styles.copy}>
          <p className="eyebrow">
            {collection.id} / {collection.eyebrow}
          </p>
          <h1>{collection.title}</h1>
          <p className={styles.intro}>{collection.introduction}</p>
          <p className={styles.note}>{collectionPreviewNote}</p>
        </div>
        <EditorialArtwork
          artwork={collection.artwork}
          priority
          className={styles.artwork}
        />
      </Container>
      <section className={styles.statement}>
        <Container>
          <p>{collection.statement}</p>
        </Container>
      </section>
      <EditorialDetails
        heading="A closer look at the thread."
        details={collection.details}
      />
      <CollectionNavigation current="silk" />
      <PageClosing />
    </>
  );
}
