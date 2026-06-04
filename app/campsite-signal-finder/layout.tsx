import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Campsite Signal Finder",
  "Estimate campground signal strength for Verizon, AT&T, and T-Mobile before a Georgia camping trip or remote-work stay."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
