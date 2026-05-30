import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Hotel Cost Splitter",
  "Split hotel or Airbnb costs across people and nights, including taxes, fees, and uneven shares."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
