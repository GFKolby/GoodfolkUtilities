import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Wallpaper Calculator",
  "Estimate wallpaper rolls needed based on wall size, roll coverage, pattern waste, and cost."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
