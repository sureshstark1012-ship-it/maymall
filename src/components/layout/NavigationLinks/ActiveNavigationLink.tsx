"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { navigation } from "@/data/navigation";
export function ActiveNavigationLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const exact = pathname === href;
  const inCollections =
    href === "/collections" &&
    pathname.startsWith("/collections/") &&
    !navigation.some((item) => item.href === pathname);
  return (
    <Link
      href={href}
      className={className}
      aria-current={exact ? "page" : inCollections ? "location" : undefined}
    >
      {children}
    </Link>
  );
}
