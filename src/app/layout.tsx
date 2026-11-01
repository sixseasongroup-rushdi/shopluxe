import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreOverlays } from "@/components/StoreOverlays";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "SHOPLUXE — Everything. For Everyone.",
  description:
    "Discover your next everyday favorite. Shop a thoughtfully curated collection of accessories, electronics, home essentials, fashion, beauty, and more at SHOPLUXE.",
  applicationName: "SHOPLUXE",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div id="home">
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <AnnouncementBar />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <StoreOverlays />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
