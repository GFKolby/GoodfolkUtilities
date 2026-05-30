import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Sleep Calculator",
  "Estimate bedtime or wake-up time using sleep cycles, time to fall asleep, and desired rest."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
