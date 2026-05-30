import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Plan a Trip Budget Without a Spreadsheet",
  description:
    "Learn how to estimate trip costs for transportation, lodging, food, activities, and daily spending without building a spreadsheet.",
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
