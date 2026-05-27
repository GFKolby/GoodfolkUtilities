import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description:
    "Create a free downloadable QR code from a URL, email address, phone number, or short text.",
};

export default function QrCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}