import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Monthly Budget Calculator",
  "Estimate monthly income, expenses, savings, and leftover money with a simple budget breakdown."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
