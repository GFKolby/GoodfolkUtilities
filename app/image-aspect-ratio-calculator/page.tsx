"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function ImageAspectRatioCalculatorPage() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [newWidth, setNewWidth] = useState("1280");
  const [newHeight, setNewHeight] = useState("");

  const results = useMemo(() => {
    const originalWidth = Number(width);
    const originalHeight = Number(height);
    const targetWidth = Number(newWidth);
    const targetHeight = Number(newHeight);

    if (originalWidth <= 0 || originalHeight <= 0) {
      return null;
    }

    const gcd = (a: number, b: number): number => {
      if (!b) return a;
      return gcd(b, a % b);
    };

    const divisor = gcd(originalWidth, originalHeight);
    const ratioWidth = originalWidth / divisor;
    const ratioHeight = originalHeight / divisor;
    const decimalRatio = originalWidth / originalHeight;

    let calculatedWidth: number | null = null;
    let calculatedHeight: number | null = null;

    if (targetWidth > 0 && (!targetHeight || targetHeight <= 0)) {
      calculatedHeight = targetWidth / decimalRatio;
    }

    if (targetHeight > 0 && (!targetWidth || targetWidth <= 0)) {
      calculatedWidth = targetHeight * decimalRatio;
    }

    if (targetWidth > 0 && targetHeight > 0) {
      calculatedWidth = targetWidth;
      calculatedHeight = targetHeight;
    }

    const cssAspectRatio = `${ratioWidth} / ${ratioHeight}`;
    const paddingPercent = (ratioHeight / ratioWidth) * 100;

    let commonName = "Custom";
    const ratioText = `${ratioWidth}:${ratioHeight}`;

    if (ratioText === "16:9") commonName = "Widescreen / video";
    if (ratioText === "4:3") commonName = "Standard";
    if (ratioText === "1:1") commonName = "Square";
    if (ratioText === "3:2") commonName = "Photo";
    if (ratioText === "9:16") commonName = "Vertical video";
    if (ratioText === "21:9") commonName = "Ultrawide";

    return {
      ratioWidth,
      ratioHeight,
      ratioText,
      decimalRatio,
      commonName,
      calculatedWidth,
      calculatedHeight,
      cssAspectRatio,
      paddingPercent,
      cssSnippet: `aspect-ratio: ${cssAspectRatio};`,
    };
  }, [width, height, newWidth, newHeight]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="Image Aspect Ratio Calculator"
      description="Calculate aspect ratios, missing dimensions, scaled image sizes, and CSS aspect-ratio values."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Original dimensions
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberInput label="Width (px)" value={width} setValue={setWidth} />
            <NumberInput
              label="Height (px)"
              value={height}
              setValue={setHeight}
            />
          </div>

          <h2 className="mt-8 text-xl font-semibold text-white">
            Scale dimensions
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="New width (px)"
              value={newWidth}
              setValue={setNewWidth}
            />
            <NumberInput
              label="New height (px)"
              value={newHeight}
              setValue={setNewHeight}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Enter original dimensions to find the ratio. Enter only a new width
            or only a new height to calculate the missing scaled dimension.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-6">
            {results ? (
              <div
                className="mx-auto flex max-w-full items-center justify-center rounded-xl border border-amber-300/40 bg-slate-800 text-sm font-semibold text-white"
                style={{
                  aspectRatio: results.cssAspectRatio,
                  width: "100%",
                  maxWidth: "360px",
                }}
              >
                {results.ratioText}
              </div>
            ) : (
              <p className="text-sm text-zinc-300">
                Enter valid dimensions to preview the ratio.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Aspect ratio results</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Aspect ratio" value={results.ratioText} />
              <ResultRow label="Ratio type" value={results.commonName} />
              <ResultRow
                label="Decimal ratio"
                value={results.decimalRatio.toFixed(4)}
              />
              <ResultRow
                label="CSS aspect-ratio"
                value={results.cssAspectRatio}
              />
              <ResultRow
                label="Padding fallback"
                value={`${results.paddingPercent.toFixed(2)}%`}
              />

              {results.calculatedWidth !== null && (
                <ResultRow
                  label="Calculated width"
                  value={`${results.calculatedWidth.toFixed(0)}px`}
                />
              )}

              {results.calculatedHeight !== null && (
                <ResultRow
                  label="Calculated height"
                  value={`${results.calculatedHeight.toFixed(0)}px`}
                />
              )}

              <CopyBlock
                label="CSS snippet"
                value={results.cssSnippet}
                onCopy={copyText}
              />

              <CopyBlock
                label="Padding fallback"
                value={`padding-top: ${results.paddingPercent.toFixed(2)}%;`}
                onCopy={copyText}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid image dimensions to calculate aspect ratio.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/image-aspect-ratio-calculator"
        category="design"
      />
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
        step="1"
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