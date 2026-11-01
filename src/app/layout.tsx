import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}
