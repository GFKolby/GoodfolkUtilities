import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk Rename Tool",
  description:
    "Rename multiple files with prefixes, suffixes, replacement text, or numbered names and download renamed copies as a ZIP.",
};

export default function BulkRenameToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}