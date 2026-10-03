import { businessFacts } from "@/data/business";
import { launchLabel, launchSummary } from "@/lib/business-presentation";
import { Container } from "@/components/ui/Container/Container";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import styles from "./VisitSection.module.css";
export function VisitSection() {
  return (
    <Container
      as="section"
      section
      id="visit"
      tabIndex={-1}
      aria-labelledby="visit-heading"
      className={styles["visit"]}
    >
      <div>
        <p className="eyebrow">OUR NEXT CHAPTER</p>
        <h2 id="visit-heading">
          {businessFacts.city},
          <br />
          <em>
            {businessFacts.launchStatus === "open"
              ? "we’re here."
              : "we’re coming home."}
          </em>
        </h2>
        <p>
          A fresh destination. A familiar love for tradition.
          <br />
          We can’t wait to be part of your story.
        </p>
        <span className={styles["opening"]}>
          <span></span>{" "}
          {`${launchLabel(businessFacts)} · ${businessFacts.city}, ${businessFacts.state}`.toUpperCase()}
        </span>
      </div>
      <div className={styles["launch-note"]}>
        <p className="eyebrow">OPENING INFORMATION</p>
        <h3>Our next chapter, as it unfolds.</h3>
        <p>{launchSummary(businessFacts)}</p>
        <CtaLink href="/visit">Visit information</CtaLink>
      </div>
    </Container>
  );
}
