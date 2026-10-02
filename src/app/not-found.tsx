import type { Metadata } from "next";
import Link from "next/link";
import { PageMasthead } from "@/components/editorial/PageMasthead/PageMasthead";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import styles from "./not-found.module.css";
export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The requested MayMall page could not be found. Return home or explore the collection themes.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: {
    title: "Page not found | MayMall Madurai",
    description:
      "The requested MayMall page could not be found. Return home or explore the collection themes.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Page not found | MayMall Madurai",
    description:
      "The requested MayMall page could not be found. Return home or explore the collection themes.",
  },
};
export default function NotFound() {
  return (
    <PageMasthead
      eyebrow="404 / PAGE NOT FOUND"
      title={
        <>
          This page
          <br />
          <em>couldn’t be found.</em>
        </>
      }
      introduction="The page you’re looking for is unavailable. Continue with the MayMall story or explore our collection themes."
    >
      <div className={styles.links}>
        <CtaLink href="/">Return home</CtaLink>
        <Link className="text-link" href="/collections">
          Explore collections
        </Link>
      </div>
    </PageMasthead>
  );
}
