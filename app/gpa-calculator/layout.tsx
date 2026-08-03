import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "College GPA Calculator",
  "Calculate your college GPA from course grades and credit hours using a standard 4.0 scale."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
