import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Water Planner",
  description:
    "Estimate how much water to bring for a camping trip based on people, days, hiking level, cooking, and hot weather.",
};

export default function CampWaterPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}