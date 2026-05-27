import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paint Calculator",
  description:
    "Estimate how much paint you need based on room dimensions, wall height, coats, doors, windows, and paint coverage.",
};

export default function PaintCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}