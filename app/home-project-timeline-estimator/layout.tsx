import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Home Project Timeline Estimator",
  "Estimate a rough project timeline based on project type, complexity, DIY level, and buffer time."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
