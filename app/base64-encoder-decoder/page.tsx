"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";
function encodeBase64(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(value: string) {
  return decodeURIComponent(escape(atob(value)));
}

export default function Base64EncoderDecoderPage() {
  const [input, setInput] = useState(
    "Goodfolk Toolbox makes small, sharp tools."
  );

  const results = useMemo(() => {
    let encoded = "";
    let decoded = "";
    let decodeError = "";

    try {
      encoded = encodeBase64(input);
    } catch {
      encoded = "Unable to encode input.";
    }

    try {
      decoded = decodeBase64(input);
    } catch {
      decodeError =
        "Input could not be decoded. It may not be valid Base64 text.";
    }

    return {
      encoded,
      decoded,
      decodeError,
      inputLength: input.length,
      encodedLength: encoded.length,
    };
  }, [input]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 or decode Base64 back into readable text."
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

          <button
            type="button"
            onClick={() => setInput("")}
            className="mt-5 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
          >
            Clear input
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Base64 is commonly used to safely represent text or binary data in
            places that expect plain text. This tool is intended for text
            strings, not large files.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Base64 results</h2>

          <div className="mt-6 space-y-4">
            <ResultRow label="Input characters" value={`${results.inputLength}`} />
            <ResultRow
              label="Encoded characters"
              value={`${results.encodedLength}`}
            />

            <CopyBlock
              label="Encoded Base64"
              value={results.encoded}
              onCopy={copyText}
            />

            {results.decodeError ? (
              <div className="rounded-xl border border-red-400/30 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                <p className="font-semibold text-red-200">Decode note</p>
                <p className="mt-2">{results.decodeError}</p>
              </div>
            ) : (
              <CopyBlock
                label="Decoded text"
                value={results.decoded}
                onCopy={copyText}
              />
            )}
          </div>
        </section>
      </div>

      <RelatedTools currentHref="/base64-encoder-decoder" category="developer" />
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