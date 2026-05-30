import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Subscription Cost Calculator",
  "Estimate monthly and yearly subscription costs, including optional annual savings from canceling unused services."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
