import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Case Converter",
  description:
    "Convert text into uppercase, lowercase, title case, sentence case, kebab-case, snake_case, or camelCase.",
};

export default function TextCaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}