import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Utilities",
  description:
    "Free design tools for colors, contrast, gradients, shadows, spacing, typography, and UI layout.",
};

export default function DesignUtilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}