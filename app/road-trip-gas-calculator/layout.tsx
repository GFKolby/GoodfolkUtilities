import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Road Trip Gas Calculator",
  "Estimate road trip fuel cost from distance, MPG, gas price, and one-way or round-trip travel."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
