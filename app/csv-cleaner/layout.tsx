import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Cleaner",
  description:
    "Clean CSV files by trimming spaces, standardizing headers, removing duplicate rows, and downloading a fresh CSV.",
};

export default function CsvCleanerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}