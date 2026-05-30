import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Much Water Should You Drink Per Day?",
  description:
    "Learn what affects daily water needs and use a simple hydration estimate for weight, activity, weather, and caffeine or alcohol intake.",
};

export default function WaterIntakeBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}