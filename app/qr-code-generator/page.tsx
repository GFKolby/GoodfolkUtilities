"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://goodfolkdigital.com");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generateQrCode = async () => {
      if (!text.trim()) {
        setQrDataUrl("");
        return;
      }

      const dataUrl = await QRCode.toDataURL(text, {
        width: 512,
        margin: 2,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      });

      setQrDataUrl(dataUrl);
    };

    generateQrCode();
  }, [text]);

  const downloadQrCode = () => {
    if (!qrDataUrl) return;

    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "goodfolk-qr-code.png";
    a.click();
  };

  const copyText = async () => {
    if (!text.trim()) return;

    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <ToolPage
      line="Goodfolk Office Utilities"
      title="QR Code Generator"
      description="Create a downloadable QR code from a link, email address, phone number, or any short text."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Text or URL
          </span>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className="h-40 w-full rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-white outline-none focus:border-amber-300"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={downloadQrCode}
            disabled={!qrDataUrl}
            className="rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 disabled:opacity-50"
          >
            Download QR Code
          </button>

          <button
            onClick={copyText}
            disabled={!text.trim()}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-200 transition hover:bg-slate-800 disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          QR Code Preview
        </p>

        <div className="mt-5 flex justify-center rounded-2xl bg-amber-50 p-6">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Generated QR code"
              className="h-64 w-64 rounded-xl bg-white p-3"
            />
          ) : (
            <p className="text-slate-700">
              Add text or a URL to generate a QR code.
            </p>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        QR codes are generated in your browser. Use them for links, forms, menus,
        contact info, event pages, or quick sharing.
      </p>

      <RelatedTools currentHref="/qr-code-generator" category="office" />
    </ToolPage>
  );
}