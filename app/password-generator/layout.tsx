import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator",
  description:
    "Generate strong random passwords with custom length, numbers, symbols, uppercase, and lowercase options.",
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}