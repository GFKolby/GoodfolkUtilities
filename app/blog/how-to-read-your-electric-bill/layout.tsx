import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How To Read Your Electric Bill",
  description:
    "Learn how to read electric bill charges, find your kWh usage and rate, and understand fees, billing periods, and meter details.",
};

export default function ReadElectricBillBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
