import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campfire Safety Checklist",
  description:
    "Generate a campfire safety checklist for campground fire rings, wind, dry conditions, cooking, kids, pets, and overnight fire safety.",
};

export default function CampfireSafetyChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}