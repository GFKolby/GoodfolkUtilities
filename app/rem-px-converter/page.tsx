"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "REM/PX Converter",
    "Convert pixels to rems and rems to pixels using a custom base font size."
  );

export default function RemPxConverterPage() {
  const [pixels, setPixels] = useState("16");
  const [rems, setRems] = useState("1");
  const [baseFontSize, setBaseFontSize] = useState("16");
  const [activeMode, setActiveMode] = useState<"pxToRem" | "remToPx">(
    "pxToRem"
  );

  const results = useMemo(() => {
    const px = Number(pixels);
    const rem = Number(rems);
    const base = Number(baseFontSize);

    if (base <= 0 || px < 0 || rem < 0) {
      return null;
    }

    const pxToRem = px / base;
    const remToPx = rem * base;

    const cssFromPx = `${pxToRem.toFixed(4)}rem`;
    const cssFromRem = `${remToPx.toFixed(2)}px`;

    return {
      pxToRem,
      remToPx,
      cssFromPx,
      cssFromRem,
    };
  }, [pixels, rems, baseFontSize]);

  function handlePixelChange(value: string) {
    setPixels(value);
    setActiveMode("pxToRem");
  }

  function handleRemChange(value: string) {
    setRems(value);
    setActiveMode("remToPx");
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="REM/PX Converter"
      description="Convert pixels to rems and rems to pixels using a custom base font size."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Pixels"
              value={pixels}
              setValue={handlePixelChange}
            />

            <NumberInput
              label="REMs"
              value={rems}
              setValue={handleRemChange}
            />

            <NumberInput
              label="Base font size (px)"
              value={baseFontSize}
              setValue={setBaseFontSize}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Most browsers use 16px as the default root font size. Change the base
            if your project uses a different root size.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Conversion</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="PX to REM"
                value={`${Number(pixels).toFixed(2)}px = ${results.pxToRem.toFixed(4)}rem`}
              />
              <ResultRow
                label="REM to PX"
                value={`${Number(rems).toFixed(4)}rem = ${results.remToPx.toFixed(2)}px`}
              />

              <CopyBlock
                label={
                  activeMode === "pxToRem"
                    ? "Recommended CSS value"
                    : "PX result"
                }
                value={
                  activeMode === "pxToRem"
                    ? results.cssFromPx
                    : results.cssFromRem
                }
                onCopy={copyText}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                REM values scale with the root font size, which can make layouts
                and typography more flexible for responsive design.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid values to convert PX and REM units.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/rem-px-converter" category="design" />
    </ToolPage>
  );
}

function NumberInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
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
      <pre className="mt-3 whitespace-pre-wrap break-all text-sm text-zinc-300">
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