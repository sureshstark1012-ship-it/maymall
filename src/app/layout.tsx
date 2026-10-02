import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar/AnnouncementBar";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";
export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = { themeColor: "#531c32" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnnouncementBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
