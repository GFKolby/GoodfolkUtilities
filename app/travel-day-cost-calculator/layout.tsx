import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Travel Day Cost Calculator",
  "Estimate the cost of a single travel day from meals, transit, activities, snacks, and buffer."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
