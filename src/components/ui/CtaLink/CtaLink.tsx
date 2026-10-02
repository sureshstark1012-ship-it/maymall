import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon/ArrowIcon";
import styles from "./CtaLink.module.css";
// These calls to action navigate, so they are semantic links rather than buttons.
export function CtaLink({
  variant = "default",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: "default" | "light" }) {
  return (
    <Link
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
    </Link>
  );
}
