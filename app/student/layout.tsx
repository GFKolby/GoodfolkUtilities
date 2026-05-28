import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Utilities",
  description:
    "Free student tools for grades, GPA, study planning, assignments, writing, and semester workload.",
};

export default function StudentUtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}