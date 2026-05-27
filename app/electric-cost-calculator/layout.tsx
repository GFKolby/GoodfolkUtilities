import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Cost Calculator",
  description:
    "Estimate daily, monthly, and yearly electricity costs based on watts, hours used, days per month, and electric rate.",
};

export default function ElectricCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}