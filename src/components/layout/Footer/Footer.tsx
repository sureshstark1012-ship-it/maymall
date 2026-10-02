import { Container } from "@/components/ui/Container/Container";
import { Brand } from "@/components/layout/Brand/Brand";
import styles from "./Footer.module.css";
export function Footer() {
  return (
    <Container as="footer" variant="full" className={styles.footer}>
      <div className={styles["footer-top"]}>
        <Brand />
        <p>Tradition woven into tomorrow.</p>
        <a href="#">Back to top ↑</a>
      </div>
      <div className={styles["footer-bottom"]}>
        <span>© {new Date().getFullYear()} MayMall. All rights reserved.</span>
        <span>Made for Madurai. Inspired by tradition.</span>
      </div>
    </Container>
  );
}
