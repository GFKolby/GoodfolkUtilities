import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Flight Layover Calculator",
  "Estimate whether a flight layover gives enough time for customs, bags, terminal changes, and airport size."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
