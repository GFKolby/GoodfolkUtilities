"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

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
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return {
      h: 0,
      s: 0,
      l: Math.round(lightness * 100),
    };
  }

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let hue = 0;

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  hue /= 6;

  return {
    h: Math.round(hue * 360),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

export default function HexColorConverterPage() {
  const [hexInput, setHexInput] = useState("#3B82F6");

  const results = useMemo(() => {
    const normalizedHex = normalizeHex(hexInput);
    const rgb = hexToRgb(hexInput);

    if (!normalizedHex || !rgb) {
      return null;
    }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const rgbText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const hslText = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    return {
      normalizedHex,
      rgb,
      hsl,
      rgbText,
      hslText,
      cssVariable: `--color-brand: ${normalizedHex};`,
      backgroundCss: `background-color: ${normalizedHex};`,
      textCss: `color: ${normalizedHex};`,
      borderCss: `border-color: ${normalizedHex};`,
    };
  }, [hexInput]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="HEX Color Converter"
      description="Convert HEX colors to RGB and HSL, preview the color, and copy CSS-ready values."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block">
            <span className="text-sm text-zinc-300">HEX color</span>
            <input
              type="text"
              value={hexInput}
              onChange={(event) => setHexInput(event.target.value)}
              placeholder="#3B82F6"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Enter a 3-digit or 6-digit HEX color, with or without the # symbol.
            Example: #3B82F6, 3B82F6, or 3BF.
          </p>

          {results ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <div
                className="h-40"
                style={{ backgroundColor: results.normalizedHex }}
              />
              <div className="p-4">
                <p className="text-sm text-zinc-400">Preview</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {results.normalizedHex}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-red-400/30 bg-slate-950 p-4 text-sm text-zinc-300">
              Enter a valid HEX color to see conversions.
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Color values</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <CopyRow
                label="HEX"
                value={results.normalizedHex}
                onCopy={copyText}
              />
              <CopyRow label="RGB" value={results.rgbText} onCopy={copyText} />
              <CopyRow label="HSL" value={results.hslText} onCopy={copyText} />

              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h3 className="font-semibold text-white">CSS snippets</h3>

                <div className="mt-4 space-y-3">
                  <CopyRow
                    label="CSS variable"
                    value={results.cssVariable}
                    onCopy={copyText}
                  />
                  <CopyRow
                    label="Background"
                    value={results.backgroundCss}
                    onCopy={copyText}
                  />
                  <CopyRow
                    label="Text color"
                    value={results.textCss}
                    onCopy={copyText}
                  />
                  <CopyRow
                    label="Border color"
                    value={results.borderCss}
                    onCopy={copyText}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter a valid color to generate HEX, RGB, HSL, and CSS values.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/hex-color-converter" category="design" />
    </ToolPage>
  );
}

function CopyRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-zinc-400">{label}</p>
        <code className="mt-1 block break-all text-sm text-white">{value}</code>
      </div>

      <button
        type="button"
        onClick={() => onCopy(value)}
        className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
      >
        Copy
      </button>
    </div>
  );
}