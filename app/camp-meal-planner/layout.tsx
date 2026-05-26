import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Meal Planner",
  description:
    "Estimate camping meals, snacks, and calories based on people, days, and meal preferences.",
};

export default function CampMealPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}