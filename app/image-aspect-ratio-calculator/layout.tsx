import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Image Aspect Ratio Calculator",
  "Calculate missing image dimensions, aspect ratios, and scaled sizes for UI layouts and media."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
