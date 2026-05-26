import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Previewer",
  description:
    "Write Markdown and preview formatted headings, lists, links, bold text, and italic text instantly.",
};

export default function MarkdownPreviewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}