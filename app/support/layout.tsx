import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Goodfolk Tools",
  description:
    "Support Goodfolk Tools and help keep the free browser-based toolbox growing.",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}