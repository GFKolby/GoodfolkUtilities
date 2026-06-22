import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Uses The Most Electricity In A Home?",
  description:
    "Learn which appliances and systems usually use the most electricity at home and how to estimate their monthly cost.",
};

export default function HomeElectricityBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}