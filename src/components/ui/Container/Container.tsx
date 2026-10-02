import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "@/lib/utils";
import styles from "./Container.module.css";
type ContainerProps<T extends ElementType> = {
  as?: T;
  variant?: "normal" | "wide" | "full";
  section?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;
export function Container<T extends ElementType = "div">({
  as,
  variant = "wide",
  section = false,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cx(
        styles.container,
        styles[variant],
        section && styles.section,
        className,
      )}
      {...props}
    />
  );
}
