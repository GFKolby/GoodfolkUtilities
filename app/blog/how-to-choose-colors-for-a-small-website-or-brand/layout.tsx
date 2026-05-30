import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Choose Colors for a Small Website or Brand",
  description:
    "Learn a simple way to choose brand or website colors using a base color, contrast, palette balance, and reusable CSS values.",
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
