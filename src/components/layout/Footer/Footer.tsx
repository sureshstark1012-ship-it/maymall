import Link from "next/link";
import { navigation } from "@/data/navigation";
import { Container } from "@/components/ui/Container/Container";
import { Brand } from "@/components/layout/Brand/Brand";
import styles from "./Footer.module.css";
// This year is stamped during static generation; refresh it with the next deployment.
export function Footer() {
  return (
    <Container as="footer" variant="full" className={styles.footer}>
      <div className={styles["footer-top"]}>
        <Brand light />
        <p>Tradition woven into tomorrow.</p>
        <a href="#">Back to top ↑</a>
      </div>
      <nav aria-label="Footer navigation" className={styles.navigation}>
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles["footer-bottom"]}>
        <span>© {new Date().getFullYear()} MayMall. All rights reserved.</span>
        <span>Made for Madurai. Inspired by tradition.</span>
      </div>
    </Container>
  );
}
