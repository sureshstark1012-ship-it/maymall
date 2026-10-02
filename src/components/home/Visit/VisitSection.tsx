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
          Madurai,
          <br />
          <em>we’re coming home.</em>
        </h2>
        <p>
          A fresh destination. A familiar love for tradition.
          <br />
          We can’t wait to be part of your story.
        </p>
        <span className={styles["opening"]}>
          <span></span> COMING SOON · MADURAI, TAMIL NADU
        </span>
      </div>
      <div className={styles["launch-note"]}>
        <p className="eyebrow">OPENING INFORMATION</p>
        <h3>Our next chapter, as it unfolds.</h3>
        <p>
          The opening date and exact address have not yet been announced. Find
          current launch information and answers to your questions.
        </p>
        <CtaLink href="/visit">Visit information</CtaLink>
      </div>
    </Container>
  );
}
