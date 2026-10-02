import Link from "next/link";
import { OrnamentIcon } from "@/components/ui/Ornament/OrnamentIcon";
import { cx } from "@/lib/utils";
import styles from "./Brand.module.css";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={cx(styles.brand, light && styles.light)}
      href="/"
      aria-label="MayMall home"
    >
      <span className={styles["brand-icon"]}>
        <OrnamentIcon />
      </span>
      <span>
        MayMall<small>M A D U R A I</small>
      </span>
    </Link>
  );
}
