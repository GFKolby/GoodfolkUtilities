import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How To Calculate GPA In College",
  description:
    "Learn how college GPA is calculated using grades, credit hours, quality points, and semester totals.",
};

export default function GpaBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}