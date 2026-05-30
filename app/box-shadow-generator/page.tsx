"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";
import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Box Shadow Generator",
    "Create CSS box shadows, preview them, and copy ready-to-use shadow styles."
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

export default function BoxShadowGeneratorPage() {
  const [xOffset, setXOffset] = useState("0");
  const [yOffset, setYOffset] = useState("12");
  const [blur, setBlur] = useState("30");
  const [spread, setSpread] = useState("-10");
  const [shadowColor, setShadowColor] = useState("#000000");
  const [opacity, setOpacity] = useState("35");

  const results = useMemo(() => {
    const x = Number(xOffset);
    const y = Number(yOffset);
    const blurValue = Number(blur);
    const spreadValue = Number(spread);
    const opacityValue = Number(opacity);
    const rgb = hexToRgb(shadowColor);
    const normalizedColor = normalizeHex(shadowColor);

    if (
      Number.isNaN(x) ||
      Number.isNaN(y) ||
      Number.isNaN(blurValue) ||
      Number.isNaN(spreadValue) ||
      Number.isNaN(opacityValue) ||
      opacityValue < 0 ||
      opacityValue > 100 ||
      !rgb ||
      !normalizedColor
    ) {
      return null;
    }

    const alpha = opacityValue / 100;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(2)})`;
    const boxShadow = `${x}px ${y}px ${blurValue}px ${spreadValue}px ${rgba}`;
    const css = `box-shadow: ${boxShadow};`;

    return {
      normalizedColor,
      rgba,
      boxShadow,
      css,
    };
  }, [xOffset, yOffset, blur, spread, shadowColor, opacity]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="Box Shadow Generator"
      description="Create CSS box shadows, preview them, and copy ready-to-use shadow styles."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="X offset (px)" value={xOffset} setValue={setXOffset} />
            <NumberInput label="Y offset (px)" value={yOffset} setValue={setYOffset} />
            <NumberInput label="Blur radius (px)" value={blur} setValue={setBlur} />
            <NumberInput label="Spread radius (px)" value={spread} setValue={setSpread} />

            <label className="block">
              <span className="text-sm text-zinc-300">Shadow color</span>
              <div className="mt-2 flex gap-3">
                <input
                  type="color"
                  value={normalizeHex(shadowColor) ?? "#000000"}
                  onChange={(event) => setShadowColor(event.target.value)}
                  className="h-12 w-14 rounded-lg border border-slate-700 bg-slate-950"
                />
                <input
                  type="text"
                  value={shadowColor}
                  onChange={(event) => setShadowColor(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
                />
              </div>
            </label>

            <NumberInput label="Opacity (%)" value={opacity} setValue={setOpacity} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Softer shadows usually use higher blur, lower opacity, and a small negative spread.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Shadow preview</h2>

          {results ? (
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl bg-slate-950 p-10">
                <div
                  className="mx-auto flex h-40 max-w-sm items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-center text-sm font-semibold text-white"
                  style={{ boxShadow: results.boxShadow }}
                >
                  Preview card
                </div>
              </div>

              <CopyBlock label="CSS" value={results.css} onCopy={copyText} />
              <CopyBlock
                label="Box shadow value"
                value={results.boxShadow}
                onCopy={copyText}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid shadow values to preview CSS.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/box-shadow-generator" category="design" />
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
        step="1"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
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