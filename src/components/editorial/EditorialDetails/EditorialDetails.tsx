import type { Collection } from "@/types/content";
import { Container } from "@/components/ui/Container/Container";
import { cx } from "@/lib/utils";
import styles from "./EditorialDetails.module.css";
export function EditorialDetails({
  heading,
  details,
  layout = "rows",
}: {
  heading: string;
  details: Collection["details"];
  layout?: "rows" | "steps" | "columns";
}) {
  return (
    <Container
      as="section"
      section
      aria-labelledby="details-heading"
      className={cx(styles.section, styles[layout])}
    >
      <p className="eyebrow">THE EDITORIAL DIRECTION</p>
      <h2 id="details-heading">{heading}</h2>
      <div className={styles.entries}>
        {details.map((detail, index) => (
          <div key={detail.title} className={styles.entry}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{detail.title}</h3>
            <p>{detail.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
