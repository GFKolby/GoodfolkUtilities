import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Moving Box Calculator",
  "Estimate how many moving boxes you need by room count, storage areas, and packing style, with a breakdown by box size."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
