import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moving Box Calculator",
  description:
    "Estimate how many moving boxes you need based on rooms, home areas, and packing style.",
};

export default function MovingBoxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}