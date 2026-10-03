import { businessFacts } from "@/data/business";
import { launchLabel } from "@/lib/business-presentation";
import styles from "./AnnouncementBar.module.css";
export function AnnouncementBar() {
  return (
    <div className={styles["announcement"]}>
      <span>
        {`A new shopping destination for ${businessFacts.city}`.toUpperCase()}
      </span>
      <span className={styles.separator} aria-hidden="true">
        ·
      </span>
      <span className={styles.status}>
        {launchLabel(businessFacts).toUpperCase()}
      </span>
    </div>
  );
}
