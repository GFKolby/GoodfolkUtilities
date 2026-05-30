import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Grade Needed Calculator",
  "Calculate the grade you need on a final exam or remaining assignment to reach your target course grade."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
