import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Utilities",
  description:
    "Free developer tools for colors, JSON, encoding, timestamps, IDs, CSS, regex, and everyday coding tasks.",
};

export default function DeveloperUtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}