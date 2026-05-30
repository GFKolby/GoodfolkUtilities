"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

const sampleJson = `{
  "name": "Goodfolk Toolbox",
  "category": "Developer Utilities",
  "tools": ["JSON Formatter", "URL Encoder", "Base64 Encoder"],
  "active": true
}`;

function countJsonNodes(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countJsonNodes(item), 0);
  }

  if (value && typeof value === "object") {
    return Object.values(value).reduce(
      (sum, item) => sum + countJsonNodes(item),
      Object.keys(value).length
    );
  }

  return 1;
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState(sampleJson);
  const [indentSize, setIndentSize] = useState("2");

  const results = useMemo(() => {
    const indent = Number(indentSize);

    if (indent < 0 || indent > 8) {
      return {
        valid: false as const,
        error: "Indent size must be between 0 and 8.",
      };
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      const minified = JSON.stringify(parsed);
      const rootType = Array.isArray(parsed) ? "Array" : typeof parsed;
      const topLevelItems =
        parsed && typeof parsed === "object"
          ? Array.isArray(parsed)
            ? parsed.length
            : Object.keys(parsed).length
          : 1;

      return {
        valid: true as const,
        formatted,
        minified,
        rootType,
        topLevelItems,
        characterCount: input.length,
        outputCharacterCount: formatted.length,
        nodeCount: countJsonNodes(parsed),
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid JSON input.";

      return {
        valid: false as const,
        error: message,
      };
    }
  }, [input, indentSize]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="JSON Formatter"
      description="Format, validate, and minify JSON with copy-ready output."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block">
            <span className="text-sm text-zinc-300">JSON input</span>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={18}
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
            />
          </label>

          <label className="mt-4 block max-w-xs">
            <span className="text-sm text-zinc-300">Indent size</span>
            <select
              value={indentSize}
              onChange={(event) => setIndentSize(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="0">No spaces</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() => setInput("")}
            className="mt-5 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
          >
            Clear input
          </button>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">JSON output</h2>

          {results.valid ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Status" value="Valid JSON" />
              <ResultRow label="Root type" value={results.rootType} />
              <ResultRow
                label="Top-level items"
                value={`${results.topLevelItems}`}
              />
              <ResultRow label="Estimated nodes" value={`${results.nodeCount}`} />
              <ResultRow
                label="Input characters"
                value={`${results.characterCount}`}
              />
              <ResultRow
                label="Formatted characters"
                value={`${results.outputCharacterCount}`}
              />

              <CopyBlock
                label="Formatted JSON"
                value={results.formatted}
                onCopy={copyText}
              />

              <CopyBlock
                label="Minified JSON"
                value={results.minified}
                onCopy={copyText}
              />
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-red-400/30 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
              <p className="font-semibold text-red-200">Invalid JSON</p>
              <p className="mt-2">{results.error}</p>
            </div>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/json-formatter" category="developer" />
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