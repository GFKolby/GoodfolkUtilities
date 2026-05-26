import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Weather Comfort Calculator",
  description:
    "Estimate camping comfort based on daytime temperature, overnight lows, rain chance, wind, and humidity.",
};

export default function CampWeatherComfortLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}