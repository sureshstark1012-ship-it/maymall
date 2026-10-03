import { businessFacts } from "@/data/business";
import { BusinessFactsList } from "@/components/business/BusinessFactsList";
import { launchLabel, visitDescription } from "@/lib/business-presentation";
import { PageMasthead } from "@/components/editorial/PageMasthead/PageMasthead";
import { FAQ } from "@/components/home/FAQ/FAQ";
import { Container } from "@/components/ui/Container/Container";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import { collectionPreviewNote } from "@/data/collections";
import { pageMetadata } from "@/lib/site-metadata";
import styles from "./page.module.css";
export const metadata = pageMetadata(
  "Visit",
  visitDescription(businessFacts),
  "/visit",
);
export default function VisitPage() {
  return (
    <>
      <PageMasthead
        eyebrow="VISIT / OUR NEXT CHAPTER"
        title={
          <>
            {businessFacts.city},
            <br />
            <em>
              {businessFacts.launchStatus === "open"
                ? "we’re here."
                : "we’re coming home."}
            </em>
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
          <p className="eyebrow">
            {`${businessFacts.city}, ${businessFacts.state}`.toUpperCase()}
          </p>
          <h2 id="launch-heading">{launchLabel(businessFacts)}.</h2>
          <BusinessFactsList facts={businessFacts} className={styles.facts} />
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
