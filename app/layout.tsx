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

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.goodfolkdigital.com"),
  title: {
    default: "Goodfolk Toolbox",
    template: "%s | Goodfolk Toolbox",
  },
  description:
    "Free browser-based tools for office work, file cleanup, text formatting, camping planning, and everyday digital tasks.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Goodfolk Toolbox",
    description:
      "Free browser-based tools for office work, file cleanup, text formatting, camping planning, and everyday digital tasks.",
    url: "https://tools.goodfolkdigital.com",
    siteName: "Goodfolk Toolbox",
    type: "website",
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