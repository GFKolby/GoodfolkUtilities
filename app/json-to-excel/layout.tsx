import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Excel Converter",
  description:
    "Convert JSON arrays into downloadable Excel files for free in your browser.",
};

export default function JsonToExcelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}