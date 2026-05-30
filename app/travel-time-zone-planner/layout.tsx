import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Travel Time Zone Planner",
  "Compare home and destination time zones, estimate jet lag direction, and plan arrival adjustment."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
