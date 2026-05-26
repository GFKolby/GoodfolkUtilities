import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Fuel Estimator",
  description:
    "Estimate camping stove fuel usage for meals, coffee, boiling water, cold weather, and windy conditions.",
};

export default function CampFuelEstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}