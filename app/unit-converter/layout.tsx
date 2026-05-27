import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter",
  description:
    "Convert common length, weight, temperature, and volume units for free in your browser.",
};

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}