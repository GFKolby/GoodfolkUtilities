import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Project Budget Calculator",
  description:
    "Estimate a home project budget with materials, labor, tools, permits, delivery, and a contingency buffer.",
};

export default function HomeProjectBudgetCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}