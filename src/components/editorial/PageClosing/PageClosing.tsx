import { Container } from "@/components/ui/Container/Container";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import styles from "./PageClosing.module.css";
export function PageClosing() {
  return (
    <section className={styles.closing}>
      <Container section className={styles.inner}>
        <div>
          <p className="eyebrow">MADURAI, TAMIL NADU / COMING SOON</p>
          <h2>
            A new chapter.
            <br />
            <em>More to share, in time.</em>
          </h2>
          <p>Opening information will be shared once confirmed.</p>
        </div>
        <CtaLink href="/visit">Visit &amp; launch information</CtaLink>
      </Container>
    </section>
  );
}
