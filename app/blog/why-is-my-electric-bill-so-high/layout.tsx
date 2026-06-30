import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Is My Electric Bill So High?",
  description:
    "Learn the most common reasons electric bills increase, from seasonal weather to inefficient appliances, and how to estimate your energy costs.",
};

export default function ElectricBillBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
