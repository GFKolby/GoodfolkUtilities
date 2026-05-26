import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Trip Cost Calculator",
  description:
    "Estimate camping trip costs including campsite fees, gas, food, gear, permits, and per-person cost.",
};

export default function CampTripCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}