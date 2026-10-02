"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/utils";
import styles from "./MobileNavigation.module.css";
export function MobileNavigation({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 701px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  return (
    <div className={styles.mobile}>
      <button
        type="button"
        ref={trigger}
        className={styles["menu-toggle"]}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        Menu <span aria-hidden="true">☰</span>
      </button>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={cx(styles["mobile-navigation"], open && styles.open)}
        hidden={!open}
        onClick={(event) => {
          const target = event.target;
          if (target instanceof Element) {
            const link = target.closest("a");
            if (link) {
              setOpen(false);
              const id = link.hash.slice(1);
              const destination = document.getElementById(id);
              destination?.focus({ preventScroll: true });
            }
          }
        }}
      >
        {children}
      </nav>
    </div>
  );
}
