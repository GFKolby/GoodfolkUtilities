import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Employee Cost Calculator",
  "Estimate the total cost of an employee including salary, payroll taxes, benefits, equipment, and overhead."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
