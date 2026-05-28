"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

function generateUuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (char) =>
    (
      Number(char) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(char) / 4)))
    ).toString(16)
  );
}

export default function UuidGeneratorPage() {
  const [count, setCount] = useState("5");
  const [uppercase, setUppercase] = useState("no");
  const [uuids, setUuids] = useState<string[]>([
    generateUuid(),
    generateUuid(),
    generateUuid(),
    generateUuid(),
    generateUuid(),
  ]);

  const formattedUuids = useMemo(() => {
    return uuids.map((uuid) => (uppercase === "yes" ? uuid.toUpperCase() : uuid));
  }, [uuids, uppercase]);

  const outputText = formattedUuids.join("\n");

  function generateUuids() {
    const amount = Number(count);

    if (amount <= 0 || amount > 100) {
      return;
    }

    setUuids(Array.from({ length: amount }, () => generateUuid()));
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="UUID Generator"
      description="Generate random UUIDs for testing, mock data, database records, and development workflows."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Number of UUIDs</span>
              <input
                type="number"
                min="1"
                max="100"
                step="1"
                value={count}
                onChange={(event) => setCount(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Letter casing</span>
              <select
                value={uppercase}
                onChange={(event) => setUppercase(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="no">Lowercase</option>
                <option value="yes">Uppercase</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={generateUuids}
            className="mt-5 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Generate UUIDs
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            UUIDs are useful for test records, mock payloads, seed data, local
            development, and quick identifiers.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Generated UUIDs</h2>

          <div className="mt-6 space-y-4">
            <ResultRow label="UUID count" value={`${formattedUuids.length}`} />

            <div className="max-h-96 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="space-y-3">
                {formattedUuids.map((uuid, index) => (
                  <div
                    key={`${uuid}-${index}`}
                    className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <code className="break-all text-sm text-white">{uuid}</code>

                    <button
                      type="button"
                      onClick={() => copyText(uuid)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyText(outputText)}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
            >
              Copy all
            </button>
          </div>
        </section>
      </div>

      <RelatedTools currentHref="/uuid-generator" category="developer" />
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