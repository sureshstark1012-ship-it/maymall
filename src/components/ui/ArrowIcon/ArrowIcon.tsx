import styles from "./ArrowIcon.module.css";
export function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
