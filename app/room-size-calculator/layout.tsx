import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Size Calculator",
  description:
    "Calculate room square footage, square yards, perimeter, flooring needs, and estimated flooring cost.",
};

export default function RoomSizeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}