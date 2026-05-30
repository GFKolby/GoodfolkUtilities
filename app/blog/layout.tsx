import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Goodfolk Toolbox",
  description:
    "Helpful guides, examples, and practical planning tips for using Goodfolk Toolbox calculators and utilities.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}