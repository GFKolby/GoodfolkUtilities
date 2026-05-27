import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance Utilities",
  description:
    "Free finance tools for budgeting, savings goals, debt payoff, subscriptions, and income planning.",
};

export default function FinanceUtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}