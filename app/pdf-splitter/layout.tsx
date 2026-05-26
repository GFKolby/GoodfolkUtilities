import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Splitter",
  description:
    "Split a PDF into individual page files and download the results as a ZIP.",
};

export default function PdfSplitterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}