import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    "https://tools.goodfolkdigital.com"
  ),

  title: {
    default: "Goodfolk Toolbox",
    template: "%s | Goodfolk Toolbox",
  },

  description:
    "100 free online tools and calculators.",

  openGraph: {
    title: "Goodfolk Toolbox",
    description:
      "100 free online tools and calculators.",
    siteName: "Goodfolk Toolbox",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Goodfolk Toolbox",
    description:
      "100 free online tools and calculators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<Analytics /></body>
      <GoogleAnalytics gaId="G-G6L5WEM83E" />
    </html>
  );
}