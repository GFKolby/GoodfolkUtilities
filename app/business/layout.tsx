import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Utilities",
  description:
    "Free business tools for profit margins, pricing, invoices, break-even planning, meetings, and startup costs.",
};

export default function BusinessUtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}