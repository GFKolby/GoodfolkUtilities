"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Color Contrast Checker",
    "Check text and background color contrast, preview the combination, and copy CSS-ready values."
  );

function normalizeHex(input: string) {
  const cleaned = input.trim().replace("#", "");

  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return `#${cleaned
      .split("")
      .map((char) => char + char)
      .join("")
      .toUpperCase()}`;
  }

  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return `#${cleaned.toUpperCase()}`;
  }

  return null;
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex);

  if (!normalized) {
    return null;
  }

  const value = normalized.replace("#", "");

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function getRelativeLuminance({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}) {
  const values = [r, g, b].map((channel) => {
    const srgb = channel / 255;

    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function getContrastRatio(foregroundHex: string, backgroundHex: string) {
  const foregroundRgb = hexToRgb(foregroundHex);
  const backgroundRgb = hexToRgb(backgroundHex);

  if (!foregroundRgb || !backgroundRgb) {
    return null;
  }

  const foregroundLuminance = getRelativeLuminance(foregroundRgb);
  const backgroundLuminance = getRelativeLuminance(backgroundRgb);

  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export default function ColorContrastCheckerPage() {
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("#0F172A");

  const results = useMemo(() => {
    const normalizedText = normalizeHex(textColor);
    const normalizedBackground = normalizeHex(backgroundColor);

    if (!normalizedText || !normalizedBackground) {
      return null;
    }

    const ratio = getContrastRatio(normalizedText, normalizedBackground);

    if (!ratio) {
      return null;
    }

    const passesNormalAA = ratio >= 4.5;
    const passesLargeAA = ratio >= 3;
    const passesNormalAAA = ratio >= 7;
    const passesLargeAAA = ratio >= 4.5;

    let recommendation = "This combination needs more contrast.";
    if (passesNormalAAA) {
      recommendation = "Excellent contrast for most text sizes.";
    } else if (passesNormalAA) {
      recommendation = "Good contrast for normal text.";
    } else if (passesLargeAA) {
      recommendation = "Works for large text, but not normal body text.";
    }

    return {
      textColor: normalizedText,
      backgroundColor: normalizedBackground,
      ratio,
      passesNormalAA,
      passesLargeAA,
      passesNormalAAA,
      passesLargeAAA,
      recommendation,
      cssSnippet: `color: ${normalizedText};\nbackground-color: ${normalizedBackground};`,
    };
  }, [textColor, backgroundColor]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="Color Contrast Checker"
      description="Check text and background color contrast, preview the combination, and copy CSS-ready values."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <ColorInput
              label="Text color"
              value={textColor}
              setValue={setTextColor}
            />

            <ColorInput
              label="Background color"
              value={backgroundColor}
              setValue={setBackgroundColor}
            />
          </div>

          {results ? (
            <div
              className="mt-6 rounded-2xl border border-slate-800 p-6"
              style={{
                color: results.textColor,
                backgroundColor: results.backgroundColor,
              }}
            >
              <p className="text-sm font-semibold">Preview text</p>
              <h2 className="mt-3 text-3xl font-bold">
                Can you read this clearly?
              </h2>
              <p className="mt-3 max-w-xl leading-7">
                This preview shows how your selected text color looks against
                the selected background color.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-red-400/30 bg-slate-950 p-4 text-sm text-zinc-300">
              Enter valid HEX colors to check contrast.
            </div>
          )}

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use 3-digit or 6-digit HEX colors. Contrast guidance is a practical
            accessibility check, but final design should also consider font size,
            weight, and context.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Contrast results</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Contrast ratio"
                value={`${results.ratio.toFixed(2)}:1`}
              />
              <ResultRow
                label="Normal text AA"
                value={results.passesNormalAA ? "Pass" : "Fail"}
              />
              <ResultRow
                label="Large text AA"
                value={results.passesLargeAA ? "Pass" : "Fail"}
              />
              <ResultRow
                label="Normal text AAA"
                value={results.passesNormalAAA ? "Pass" : "Fail"}
              />
              <ResultRow
                label="Large text AAA"
                value={results.passesLargeAAA ? "Pass" : "Fail"}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                {results.recommendation}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm font-semibold text-white">CSS snippet</p>
                <pre className="mt-3 whitespace-pre-wrap text-sm text-zinc-300">
                  {results.cssSnippet}
                </pre>

                <button
                  type="button"
                  onClick={() => copyText(results.cssSnippet)}
                  className="mt-4 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
                >
                  Copy CSS
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid colors to see contrast results.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/color-contrast-checker" category="design" />
    </ToolPage>
  );
}

function ColorInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  const normalized = normalizeHex(value);

  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>

      <div className="mt-2 flex gap-3">
        <input
          type="color"
          value={normalized ?? "#000000"}
          onChange={(event) => setValue(event.target.value)}
          className="h-12 w-14 rounded-lg border border-slate-700 bg-slate-950"
        />

        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
        />
      </div>
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