import styles from "./OrnamentIcon.module.css";
export function OrnamentIcon() {
  return (
    <svg
      className={styles.ornament}
      data-ornament
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="28"
            rx="9"
            ry="22"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}
