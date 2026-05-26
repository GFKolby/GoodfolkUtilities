"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

import ToolPage from "@/components/ToolPage";
import FilePicker from "@/components/FilePicker";
import RelatedTools from "@/components/RelatedTools";

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
     <ToolPage
              line="Goodfolk Office Utilities"
              title="PDF Splitter"
              description="Upload a PDF and split each page into its own PDF file."
    >
        <div className="grid gap-5 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <FilePicker
  accept="application/pdf"
  fileName={file?.name}
  onChange={(files) => {
    const selected = files[0];
    if (selected) loadPdf(selected);
  }}
/>

          {file && (
            <div className="bg-white text-black rounded-2xl p-6">
              <p className="font-semibold">Selected PDF</p>
              <p className="text-slate-700 mt-2">{file.name}</p>

              {pageCount !== null && (
                <p className="text-slate-700">
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
        <RelatedTools currentHref="/pdf-splitter" line="office" />
     </ToolPage>
  );
}