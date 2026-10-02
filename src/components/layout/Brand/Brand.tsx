import { OrnamentIcon } from "@/components/ui/Ornament/OrnamentIcon";
import styles from "./Brand.module.css";
export function Brand() {
  return (
    <a className={styles.brand} href="#" aria-label="MayMall home">
      <span className={styles["brand-icon"]}>
        <OrnamentIcon />
      </span>
      <span>
        MayMall<small>M A D U R A I</small>
      </span>
    </a>
  );
}
