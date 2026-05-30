"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

const sampleResponse = `{
  "status": 200,
  "message": "OK",
  "data": {
    "id": "tool_123",
    "name": "Goodfolk Toolbox",
    "active": true,
    "categories": ["office", "camp", "home", "finance", "student", "design", "developer"]
  },
  "meta": {
    "requestId": "abc-123",
    "durationMs": 42
  }
}`;

function countKeys(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countKeys(item), 0);
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce(
      (sum, [, item]) => sum + 1 + countKeys(item),
      0
    );
  }

  return 0;
}

function getStatusLabel(statusCode: number | null) {
  if (!statusCode) return "Not detected";
  if (statusCode >= 200 && statusCode < 300) return "Success";
  if (statusCode >= 300 && statusCode < 400) return "Redirect";
  if (statusCode >= 400 && statusCode < 500) return "Client error";
  if (statusCode >= 500) return "Server error";
  return "Informational/unknown";
}

export default function ApiResponseFormatterPage() {
  const [input, setInput] = useState(sampleResponse);
  const [statusCode, setStatusCode] = useState("200");
  const [indentSize, setIndentSize] = useState("2");

  const results = useMemo(() => {
    const indent = Number(indentSize);
    const manualStatus = Number(statusCode);

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

      const responseStatus =
        parsed &&
        typeof parsed === "object" &&
        "status" in parsed &&
        typeof parsed.status === "number"
          ? parsed.status
          : !Number.isNaN(manualStatus) && manualStatus > 0
            ? manualStatus
            : null;

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
        statusCode: responseStatus,
        statusLabel: getStatusLabel(responseStatus),
        rootType,
        topLevelItems,
        keyCount: countKeys(parsed),
        inputCharacters: input.length,
        outputCharacters: formatted.length,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid JSON response.";

      return {
        valid: false as const,
        error: message,
      };
    }
  }, [input, statusCode, indentSize]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="API Response Formatter"
      description="Format API response JSON, inspect status details, and copy clean output for debugging."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">
                HTTP status code, optional
              </span>
              <input
                type="number"
                min="100"
                max="599"
                step="1"
                value={statusCode}
                onChange={(event) => setStatusCode(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
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
          </div>

          <label className="mt-4 block">
            <span className="text-sm text-zinc-300">API response JSON</span>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={16}
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
            />
          </label>

          <button
            type="button"
            onClick={() => setInput("")}
            className="mt-5 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
          >
            Clear response
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Paste a JSON API response to format it, inspect the structure, and
            copy clean output for debugging notes, tickets, or docs.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Response details</h2>

          {results.valid ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Status"
                value={
                  results.statusCode
                    ? `${results.statusCode} — ${results.statusLabel}`
                    : results.statusLabel
                }
              />
              <ResultRow label="Root type" value={results.rootType} />
              <ResultRow
                label="Top-level items"
                value={`${results.topLevelItems}`}
              />
              <ResultRow label="Estimated keys" value={`${results.keyCount}`} />
              <ResultRow
                label="Input characters"
                value={`${results.inputCharacters}`}
              />
              <ResultRow
                label="Formatted characters"
                value={`${results.outputCharacters}`}
              />

              <CopyBlock
                label="Formatted response"
                value={results.formatted}
                onCopy={copyText}
              />

              <CopyBlock
                label="Minified response"
                value={results.minified}
                onCopy={copyText}
              />
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-red-400/30 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
              <p className="font-semibold text-red-200">Invalid response JSON</p>
              <p className="mt-2">{results.error}</p>
            </div>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/api-response-formatter" category="developer" />
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