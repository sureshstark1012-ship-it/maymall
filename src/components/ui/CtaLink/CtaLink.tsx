import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon/ArrowIcon";
import styles from "./CtaLink.module.css";
// These calls to action navigate, so they are semantic links rather than buttons.
export function CtaLink({
  variant = "default",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a"> & { variant?: "default" | "light" }) {
  return (
    <a
      className={cx(
        styles.link,
        variant === "light" && styles.light,
        className,
      )}
      {...props}
    >
      {children}
      <span>
        <ArrowIcon />
      </span>
    </a>
  );
}
