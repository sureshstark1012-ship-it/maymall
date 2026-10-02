import { NavigationLinks } from "@/components/layout/NavigationLinks/NavigationLinks";
import styles from "./DesktopNavigation.module.css";
export function DesktopNavigation() {
  return (
    <nav aria-label="Main navigation" className={styles.navigation}>
      <NavigationLinks />
    </nav>
  );
}
