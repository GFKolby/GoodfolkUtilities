import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Meeting Cost Calculator",
  "Estimate the cost of a meeting based on attendees, hourly rates, duration, and prep time."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
