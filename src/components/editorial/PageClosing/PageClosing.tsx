import { businessFacts } from "@/data/business";
import { launchLabel } from "@/lib/business-presentation";
import { Container } from "@/components/ui/Container/Container";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import styles from "./PageClosing.module.css";
export function PageClosing() {
  return (
    <section className={styles.closing}>
      <Container section className={styles.inner}>
        <div>
          <p className="eyebrow">
            {`${businessFacts.city}, ${businessFacts.state} / ${launchLabel(businessFacts)}`.toUpperCase()}
          </p>
          <h2>
            A new chapter.
            <br />
            <em>More to share, in time.</em>
          </h2>
          <p>
            {businessFacts.launchStatus !== "prelaunch"
              ? "Find the current visit information."
              : "Opening information will be shared once confirmed."}
          </p>
        </div>
        <CtaLink href="/visit">Visit &amp; launch information</CtaLink>
      </Container>
    </section>
  );
}
