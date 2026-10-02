import styles from "./AnnouncementBar.module.css";
export function AnnouncementBar() {
  return (
    <div className={styles["announcement"]}>
      <span>A NEW SHOPPING DESTINATION FOR MADURAI</span>
      <span className={styles.separator} aria-hidden="true">
        ·
      </span>
      <span className={styles.status}>COMING SOON</span>
    </div>
  );
}
