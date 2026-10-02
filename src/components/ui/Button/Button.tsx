import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon/ArrowIcon";
import styles from "./Button.module.css";
// These calls to action navigate, so they are semantic links rather than buttons.
export function Button({
  variant = "default",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a"> & { variant?: "default" | "light" }) {
  return (
    <a
      className={cx(
        styles.button,
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
