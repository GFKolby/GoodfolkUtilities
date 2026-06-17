import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Many Moving Boxes Do I Need?",
  description:
    "Estimate how many moving boxes you need based on home size, room count, and belongings before your next move.",
};

export default function MovingBoxesBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}