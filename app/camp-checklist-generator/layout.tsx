import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Checklist Generator",
  description:
    "Generate a camping checklist based on trip nights, camping style, weather, cooking, hiking, and pets.",
};

export default function CampChecklistGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}