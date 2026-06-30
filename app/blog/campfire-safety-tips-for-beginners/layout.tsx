import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campfire Safety Tips for Beginners",
  description:
    "Learn essential campfire safety tips, how to build and extinguish a campfire safely, and avoid common mistakes while camping.",
};

export default function CampfireSafetyBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
