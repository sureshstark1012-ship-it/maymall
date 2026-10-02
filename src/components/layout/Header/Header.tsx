import { Container } from "@/components/ui/Container/Container";
import { Brand } from "@/components/layout/Brand/Brand";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation/DesktopNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation/MobileNavigation";
import { NavigationLinks } from "@/components/layout/NavigationLinks/NavigationLinks";
import styles from "./Header.module.css";
export function Header() {
  return (
    <Container as="header" variant="full" className={styles.header}>
      <Brand />
      <DesktopNavigation />
      <MobileNavigation>
        <NavigationLinks />
      </MobileNavigation>
      <noscript>
        <nav aria-label="Mobile navigation" className={styles.fallback}>
          <NavigationLinks />
        </nav>
      </noscript>
    </Container>
  );
}
