import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "HEX Color Converter",
  "Convert HEX colors to RGB and HSL, preview the color, and copy CSS-friendly values."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
