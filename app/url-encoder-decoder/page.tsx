"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "URL Encoder / Decoder",
    "Encode and decode URLs, query strings, and text for safe use in web addresses."
  );

export default function UrlEncoderDecoderPage() {
  const [input, setInput] = useState(
    "https://goodfolkdigital.com/search?q=small sharp tools&category=developer utilities"
  );
  const [mode, setMode] = useState<"component" | "fullUrl">("component");

  const results = useMemo(() => {
    try {
      const encoded =
        mode === "component" ? encodeURIComponent(input) : encodeURI(input);

      let decoded = "";

      try {
        decoded =
          mode === "component" ? decodeURIComponent(input) : decodeURI(input);
      } catch {
        decoded = "Input could not be decoded. It may already be plain text or contain malformed escape sequences.";
      }

      return {
        valid: true as const,
        encoded,
        decoded,
        inputLength: input.length,
        encodedLength: encoded.length,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to process input.";

      return {
        valid: false as const,
        error: message,
      };
    }
  }, [input, mode]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="URL Encoder / Decoder"
      description="Encode and decode URLs, query strings, and text for safe use in web addresses."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block">
            <span className="text-sm text-zinc-300">Input</span>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={10}
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
            />
          </label>

          <label className="mt-4 block max-w-md">
            <span className="text-sm text-zinc-300">Encoding mode</span>
            <select
              value={mode}
              onChange={(event) =>
                setMode(event.target.value as "component" | "fullUrl")
              }
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
            >
              <option value="component">Component/query value</option>
              <option value="fullUrl">Full URL</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() => setInput("")}
            className="mt-5 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
          >
            Clear input
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use component mode for query parameter values. Use full URL mode when
            you want to preserve URL structure like <code className="text-zinc-200">https://</code>,
            slashes, and question marks.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">URL results</h2>

          {results.valid ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Input characters" value={`${results.inputLength}`} />
              <ResultRow label="Encoded characters" value={`${results.encodedLength}`} />

              <CopyBlock
                label="Encoded"
                value={results.encoded}
                onCopy={copyText}
              />

              <CopyBlock
                label="Decoded"
                value={results.decoded}
                onCopy={copyText}
              />
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-red-400/30 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
              <p className="font-semibold text-red-200">Processing error</p>
              <p className="mt-2">{results.error}</p>
            </div>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/url-encoder-decoder" category="developer" />
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