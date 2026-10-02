import { OrnamentIcon } from "@/components/ui/Ornament/OrnamentIcon";
import styles from "./HeritageRibbon.module.css";
export function HeritageRibbon() {
  return (
    <div className={styles["ribbon"]}>
      <span>Silk &amp; heritage</span>
      <b>
        <OrnamentIcon />
      </b>
      <span>Wedding celebrations</span>
      <b>
        <OrnamentIcon />
      </b>
      <span>Style for every generation</span>
      <b>
        <OrnamentIcon />
      </b>
      <span>Made for memorable moments</span>
    </div>
  );
}
