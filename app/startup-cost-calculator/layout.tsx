import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Startup Cost Calculator",
  "Estimate startup costs from legal setup, equipment, software, inventory, marketing, and operating runway."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
