import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Travel Insurance Checklist",
  "Create a travel insurance comparison checklist based on trip type, destination, transportation, and coverage concerns."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
