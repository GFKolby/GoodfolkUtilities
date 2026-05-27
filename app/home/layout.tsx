import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Utilities",
  description:
    "Free home utilities for paint planning, room size calculations, electricity costs, moving boxes, and project budgets.",
};

export default function HomeUtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}