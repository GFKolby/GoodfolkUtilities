import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Profit Margin and Markup",
  description:
    "Learn the difference between profit margin and markup, and how to use both when pricing products, services, or freelance work.",
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
