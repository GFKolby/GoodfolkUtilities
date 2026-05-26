"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const loadPdf = async (selectedFile: File) => {
    setFile(selectedFile);

    const bytes = await selectedFile.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    setPageCount(pdf.getPageCount());
  };

  const splitPdf = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const bytes = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes);
      const zip = new JSZip();

      const baseName = file.name.replace(/\.pdf$/i, "");

      for (let i = 0; i < sourcePdf.getPageCount(); i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(sourcePdf, [i]);

        newPdf.addPage(page);

        const pdfBytes = await newPdf.save();

        zip.file(`${baseName}-page-${i + 1}.pdf`, pdfBytes);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${baseName}-split-pages.zip`;
      a.click();

      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-zinc-400 mb-2">Goodfolk Office Utilities</p>

        <h1 className="text-4xl font-bold mb-4">PDF Splitter</h1>

        <p className="text-zinc-400 mb-8">
          Upload a PDF and split each page into its own PDF file.
        </p>

        <div className="grid gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) loadPdf(selected);
            }}
            className="block w-full text-sm text-zinc-300"
          />

          {file && (
            <div className="bg-white text-black rounded-2xl p-6">
              <p className="font-semibold">Selected PDF</p>
              <p className="text-zinc-700 mt-2">{file.name}</p>

              {pageCount !== null && (
                <p className="text-zinc-700">
                  Pages detected: <strong>{pageCount}</strong>
                </p>
              )}

              <button
                onClick={splitPdf}
                disabled={loading}
                className="mt-5 rounded-xl bg-black text-white font-semibold px-5 py-3 hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Splitting..." : "Download Split Pages"}
              </button>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm mt-6">
          Your PDF stays in your browser. Split pages are packaged into a ZIP for download.
        </p>
      </div>
    </main>
  );
}