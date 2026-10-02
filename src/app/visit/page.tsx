import { PageMasthead } from "@/components/editorial/PageMasthead/PageMasthead";
import { FAQ } from "@/components/home/FAQ/FAQ";
import { Container } from "@/components/ui/Container/Container";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import { collectionPreviewNote } from "@/data/collections";
import { pageMetadata } from "@/lib/site-metadata";
import styles from "./page.module.css";
export const metadata = pageMetadata(
  "Visit",
  "MayMall is coming soon to Madurai, Tamil Nadu. The opening date and exact address have not been announced. Find current launch information and answers to common questions.",
  "/visit",
);
export default function VisitPage() {
  return (
    <>
      <PageMasthead
        eyebrow="VISIT / OUR NEXT CHAPTER"
        title={
          <>
            Madurai,
            <br />
            <em>we’re coming home.</em>
          </>
        }
        introduction="A fresh destination. A familiar love for tradition. We can’t wait to be part of your story."
      />
      <Container
        as="section"
        section
        className={styles.practical}
        aria-labelledby="launch-heading"
      >
        <div className={styles.launch}>
          <p className="eyebrow">MADURAI, TAMIL NADU</p>
          <h2 id="launch-heading">Coming soon.</h2>
          <dl className={styles.facts}>
            <div>
              <dt>Opening date</dt>
              <dd>Not yet announced</dd>
            </div>
            <div>
              <dt>Exact address</dt>
              <dd>Not yet announced</dd>
            </div>
            <div>
              <dt>Collection themes</dt>
              <dd>Editorial previews of our vision</dd>
            </div>
          </dl>
          <p className={styles.note}>{collectionPreviewNote}</p>
          <CtaLink href="/collections">Explore the collection themes</CtaLink>
        </div>
        <div>
          <h2 className={styles.faqHeading}>Before your visit.</h2>
          <FAQ />
        </div>
      </Container>
    </>
  );
}
