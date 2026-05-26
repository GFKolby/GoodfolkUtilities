import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word & Character Counter",
  description:
    "Count words, characters, sentences, paragraphs, and estimated reading time for pasted text.",
};

export default function WordCharacterCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}