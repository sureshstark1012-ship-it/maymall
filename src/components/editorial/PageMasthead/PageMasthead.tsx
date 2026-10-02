import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container/Container";
import styles from "./PageMasthead.module.css";
export function PageMasthead({
  eyebrow,
  title,
  introduction,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  introduction: string;
  children?: ReactNode;
}) {
  return (
    <Container as="header" section className={styles.masthead}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.introduction}>{introduction}</p>
      {children}
    </Container>
  );
}
