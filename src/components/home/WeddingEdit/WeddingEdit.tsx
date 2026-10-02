import { OrnamentIcon } from "@/components/ui/Ornament/OrnamentIcon";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import styles from "./WeddingEdit.module.css";
export function WeddingEdit() {
  return (
    <section
      id="weddings"
      tabIndex={-1}
      aria-labelledby="weddings-heading"
      className={styles["wedding-section"]}
    >
      <div className={styles["wedding-pattern"]} aria-hidden="true">
        <div>
          <OrnamentIcon />
        </div>
        <span>THE WEDDING EDIT</span>
      </div>
      <div className={styles["wedding-copy"]}>
        <p className="eyebrow">A CELEBRATION OF TOGETHERNESS</p>
        <h2 id="weddings-heading">
          One occasion.
          <br />A thousand memories.
          <br />
          <em>Dress for all of them.</em>
        </h2>
        <p>
          From the first family gathering to the big day, every celebration has
          its own colour. Imagine wedding silks, festive ensembles and
          thoughtful looks for everyone in your story.
        </p>
        <CtaLink href="#collections" variant="light">
          Discover occasion wear
        </CtaLink>
      </div>
    </section>
  );
}
