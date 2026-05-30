"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "HTML Entity Encoder / Decoder",
    "Encode HTML special characters into entities or decode entities back into readable text."
  );

function encodeHtmlEntities(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtmlEntities(value: string) {
  if (typeof document === "undefined") {
    return value;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;

  return textarea.value;
}

export default function HtmlEntityEncoderDecoderPage() {
  const [input, setInput] = useState(
    `<button class="btn" aria-label="Save & continue">Save</button>`
  );

  const results = useMemo(() => {
    const encoded = encodeHtmlEntities(input);
    const decoded = decodeHtmlEntities(input);

    return {
      encoded,
      decoded,
      inputLength: input.length,
      encodedLength: encoded.length,
      decodedLength: decoded.length,
    };
  }, [input]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="HTML Entity Encoder / Decoder"
      description="Encode HTML special characters into entities or decode entities back into readable text."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block">
            <span className="text-sm text-zinc-300">Input</span>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={12}
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
            />
          </label>

          <button
            type="button"
            onClick={() => setInput("")}
            className="mt-5 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
          >
            Clear input
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Encode characters like &lt;, &gt;, &amp;, quotes, and apostrophes
            before placing text inside HTML.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Entity results</h2>

          <div className="mt-6 space-y-4">
            <ResultRow label="Input characters" value={`${results.inputLength}`} />
            <ResultRow
              label="Encoded characters"
              value={`${results.encodedLength}`}
            />
            <ResultRow
              label="Decoded characters"
              value={`${results.decodedLength}`}
            />

            <CopyBlock
              label="Encoded HTML entities"
              value={results.encoded}
              onCopy={copyText}
            />

            <CopyBlock
              label="Decoded text"
              value={results.decoded}
              onCopy={copyText}
            />
          </div>
        </section>
      </div>

      <RelatedTools
        currentHref="/html-entity-encoder-decoder"
        category="developer"
      />
    </ToolPage>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}

function CopyBlock({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-sm font-semibold text-white">{label}</p>
      <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-all text-sm text-zinc-300">
        {value}
      </pre>

      <button
        type="button"
        onClick={() => onCopy(value)}
        className="mt-4 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
      >
        Copy
      </button>
    </div>
  );
}