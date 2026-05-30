import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Freelancer Rate Calculator",
  "Estimate freelance hourly, daily, and project rates from income goals, expenses, taxes, and billable time."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
