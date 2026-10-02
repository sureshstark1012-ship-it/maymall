import { navigation } from "@/data/navigation";
import { ArrowIcon } from "@/components/ui/ArrowIcon/ArrowIcon";
import styles from "./NavigationLinks.module.css";
export function NavigationLinks() {
  return navigation.map((item) => (
    <a
      key={item.href}
      href={item.href}
      className={item.featured ? styles["nav-cta"] : undefined}
    >
      {item.label}
      {item.featured && (
        <span>
          <ArrowIcon />
        </span>
      )}
    </a>
  ));
}
