import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Electricity Cost Calculator",
  "Use this electric bill estimator to calculate appliance energy costs from watts, hours used, days per month, and your price per kWh."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
