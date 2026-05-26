import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Battery Estimator",
  description:
    "Estimate camping battery needs for phones, fans, lights, extra devices, and trip length.",
};

export default function CampBatteryEstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}