import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});
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
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
