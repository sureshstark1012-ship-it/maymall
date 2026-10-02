import Link from "next/link";
import { Container } from "@/components/ui/Container/Container";
import styles from "./Breadcrumbs.module.css";
export function Breadcrumbs({ title }: { title: string }) {
  return (
    <Container>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span aria-hidden="true">/</span>
            <Link href="/collections">Collections</Link>
          </li>
          <li>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </li>
        </ol>
      </nav>
    </Container>
  );
}
