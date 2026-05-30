import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Build a Simple Packing List Before Travel",
  description:
    "Learn how to build a practical packing list based on trip length, weather, destination type, laundry access, and travel style.",
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
