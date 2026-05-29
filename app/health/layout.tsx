import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Utilities",
  description:
    "Free health tools for BMI, calories, water intake, protein, walking, macros, sleep, heart rate zones, and weight planning.",
};

export default function HealthUtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}