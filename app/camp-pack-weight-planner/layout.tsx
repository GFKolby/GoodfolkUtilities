import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Pack Weight Planner",
  description:
    "Add camping gear items and calculate your estimated total pack weight in pounds.",
};

export default function CampPackWeightPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}