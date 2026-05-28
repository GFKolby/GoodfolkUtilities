import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Utilities",
  description:
    "Free travel tools for trip budgets, packing, hotels, gas, layovers, attractions, and travel planning.",
};

export default function TravelUtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}