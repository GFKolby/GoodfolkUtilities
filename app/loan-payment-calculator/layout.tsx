import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Loan Payment Calculator",
  "Estimate monthly loan payments, total interest, and total repayment based on loan amount, APR, and term."
);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
