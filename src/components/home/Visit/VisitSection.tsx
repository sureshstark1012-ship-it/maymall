import { Container } from "@/components/ui/Container/Container";
import { FAQ } from "@/components/home/FAQ/FAQ";
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
      <FAQ />
    </Container>
  );
}
