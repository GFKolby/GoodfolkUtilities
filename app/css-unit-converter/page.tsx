"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";
import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "CSS Unit Converter",
    "Convert common CSS units like px, rem, em, vw, and vh for front-end development."
  );

type CssUnit = "px" | "rem" | "em" | "vw" | "vh";

const unitLabels: Record<CssUnit, string> = {
  px: "Pixels",
  rem: "REM",
  em: "EM",
  vw: "Viewport width",
  vh: "Viewport height",
};

export default function CssUnitConverterPage() {
  const [value, setValue] = useState("16");
  const [fromUnit, setFromUnit] = useState<CssUnit>("px");
  const [baseFontSize, setBaseFontSize] = useState("16");
  const [parentFontSize, setParentFontSize] = useState("16");
  const [viewportWidth, setViewportWidth] = useState("1440");
  const [viewportHeight, setViewportHeight] = useState("900");

  const results = useMemo(() => {
    const inputValue = Number(value);
    const rootSize = Number(baseFontSize);
    const parentSize = Number(parentFontSize);
    const vw = Number(viewportWidth);
    const vh = Number(viewportHeight);

    if (
      inputValue < 0 ||
      rootSize <= 0 ||
      parentSize <= 0 ||
      vw <= 0 ||
      vh <= 0
    ) {
      return null;
    }

    let pixels = inputValue;

    if (fromUnit === "rem") {
      pixels = inputValue * rootSize;
    }

    if (fromUnit === "em") {
      pixels = inputValue * parentSize;
    }

    if (fromUnit === "vw") {
      pixels = (inputValue / 100) * vw;
    }

    if (fromUnit === "vh") {
      pixels = (inputValue / 100) * vh;
    }

    const rem = pixels / rootSize;
    const em = pixels / parentSize;
    const vwValue = (pixels / vw) * 100;
    const vhValue = (pixels / vh) * 100;

    const cssVariables = [
      `--size-px: ${pixels.toFixed(2)}px;`,
      `--size-rem: ${rem.toFixed(4)}rem;`,
      `--size-em: ${em.toFixed(4)}em;`,
      `--size-vw: ${vwValue.toFixed(4)}vw;`,
      `--size-vh: ${vhValue.toFixed(4)}vh;`,
    ].join("\n");

    return {
      pixels,
      rem,
      em,
      vwValue,
      vhValue,
      cssVariables,
    };
  }, [
    value,
    fromUnit,
    baseFontSize,
    parentFontSize,
    viewportWidth,
    viewportHeight,
  ]);

  async function copyText(valueToCopy: string) {
    await navigator.clipboard.writeText(valueToCopy);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="CSS Unit Converter"
      description="Convert common CSS units like px, rem, em, vw, and vh for front-end development."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Value" value={value} setValue={setValue} />

            <label className="block">
              <span className="text-sm text-zinc-300">From unit</span>
              <select
                value={fromUnit}
                onChange={(event) => setFromUnit(event.target.value as CssUnit)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                {Object.entries(unitLabels).map(([unit, label]) => (
                  <option key={unit} value={unit}>
                    {label} ({unit})
                  </option>
                ))}
              </select>
            </label>

            <NumberInput
              label="Root font size (px)"
              value={baseFontSize}
              setValue={setBaseFontSize}
            />

            <NumberInput
              label="Parent font size (px)"
              value={parentFontSize}
              setValue={setParentFontSize}
            />

            <NumberInput
              label="Viewport width (px)"
              value={viewportWidth}
              setValue={setViewportWidth}
            />

            <NumberInput
              label="Viewport height (px)"
              value={viewportHeight}
              setValue={setViewportHeight}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            REM is based on the root font size. EM is based on the parent font
            size. VW and VH are based on the viewport dimensions.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Converted units</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Pixels" value={`${results.pixels.toFixed(2)}px`} />
              <ResultRow label="REM" value={`${results.rem.toFixed(4)}rem`} />
              <ResultRow label="EM" value={`${results.em.toFixed(4)}em`} />
              <ResultRow label="VW" value={`${results.vwValue.toFixed(4)}vw`} />
              <ResultRow label="VH" value={`${results.vhValue.toFixed(4)}vh`} />

              <CopyBlock
                label="CSS variables"
                value={results.cssVariables}
                onCopy={copyText}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Use rem for scalable typography and spacing, px for fixed
                precision, and viewport units for responsive sizing tied to the
                browser window.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid CSS unit values to convert.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/css-unit-converter" category="developer" />
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