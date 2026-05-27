import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tent Footprint Calculator",
  description:
    "Calculate a recommended tent footprint or groundsheet size based on your tent floor dimensions and edge inset.",
};

export default function TentFootprintCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}