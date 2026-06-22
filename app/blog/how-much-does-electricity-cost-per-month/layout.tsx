import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Much Does Electricity Cost Per Month?",
  description:
    "Learn what affects your electric bill, how electricity costs are calculated, and how to estimate monthly energy expenses.",
};

export default function ElectricityCostBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}