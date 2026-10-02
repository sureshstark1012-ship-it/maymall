import { ActiveNavigationLink } from "./ActiveNavigationLink";
import { navigation } from "@/data/navigation";
import { ArrowIcon } from "@/components/ui/ArrowIcon/ArrowIcon";
import styles from "./NavigationLinks.module.css";
export function NavigationLinks() {
  return navigation.map((item, index) => (
    <ActiveNavigationLink
      key={item.href}
      href={item.href}
      className={item.featured ? styles["nav-cta"] : undefined}
    >
      <span className={styles.number} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className={styles.label}>{item.label}</span>
      <span className={styles.arrow}>
        <ArrowIcon />
      </span>
    </ActiveNavigationLink>
  ));
}
