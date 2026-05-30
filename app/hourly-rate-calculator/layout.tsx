import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Hourly Rate Calculator",
  "Calculate an hourly rate from salary goals, billable hours, expenses, taxes, and desired profit."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
