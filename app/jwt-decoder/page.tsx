"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

const sampleJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikdvb2Rmb2xrIFRvb2xib3giLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTcwMDA4NjQwMH0.signature";

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const decoded = atob(padded);

  return decodeURIComponent(
    decoded
      .split("")
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join("")
  );
}

function formatTimestamp(value: unknown) {
  if (typeof value !== "number") {
    return null;
  }

  const date = new Date(value * 1000);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleString();
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState(sampleJwt);

  const results = useMemo(() => {
    const parts = token.trim().split(".");

    if (parts.length !== 3) {
      return {
        valid: false as const,
        error: "A JWT should have three parts separated by dots: header.payload.signature.",
      };
    }

    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      return {
        valid: true as const,
        header,
        payload,
        signature: parts[2],
        algorithm: header.alg ?? "Unknown",
        type: header.typ ?? "Unknown",
        issuedAt: formatTimestamp(payload.iat),
        expiresAt: formatTimestamp(payload.exp),
        subject: payload.sub ?? "Not provided",
        headerJson: JSON.stringify(header, null, 2),
        payloadJson: JSON.stringify(payload, null, 2),
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to decode JWT.";

      return {
        valid: false as const,
        error: message,
      };
    }
  }, [token]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="JWT Decoder"
      description="Decode JWT headers and payloads locally in your browser for quick inspection."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block">
            <span className="text-sm text-zinc-300">JWT token</span>
            <textarea
              value={token}
              onChange={(event) => setToken(event.target.value)}
              rows={12}
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
            />
          </label>

          <button
            type="button"
            onClick={() => setToken("")}
            className="mt-5 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
          >
            Clear token
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This decoder runs locally in the browser and does not verify the
            token signature. Avoid pasting sensitive production tokens into
            random tools.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Decoded JWT</h2>

          {results.valid ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Algorithm" value={`${results.algorithm}`} />
              <ResultRow label="Type" value={`${results.type}`} />
              <ResultRow label="Subject" value={`${results.subject}`} />
              <ResultRow
                label="Issued at"
                value={results.issuedAt ?? "Not provided"}
              />
              <ResultRow
                label="Expires at"
                value={results.expiresAt ?? "Not provided"}
              />

              <CopyBlock
                label="Header JSON"
                value={results.headerJson}
                onCopy={copyText}
              />

              <CopyBlock
                label="Payload JSON"
                value={results.payloadJson}
                onCopy={copyText}
              />

              <CopyBlock
                label="Signature"
                value={results.signature}
                onCopy={copyText}
              />
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-red-400/30 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
              <p className="font-semibold text-red-200">Invalid JWT</p>
              <p className="mt-2">{results.error}</p>
            </div>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/jwt-decoder" category="developer" />
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