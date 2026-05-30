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

export default function CssGradientGeneratorPage() {
  const [startColor, setStartColor] = useState("#3B82F6");
  const [endColor, setEndColor] = useState("#9333EA");
  const [direction, setDirection] = useState("135deg");
  const [startPosition, setStartPosition] = useState("0");
  const [endPosition, setEndPosition] = useState("100");

  const results = useMemo(() => {
    const normalizedStart = normalizeHex(startColor);
    const normalizedEnd = normalizeHex(endColor);
    const start = Number(startPosition);
    const end = Number(endPosition);

    if (
      !normalizedStart ||
      !normalizedEnd ||
      Number.isNaN(start) ||
      Number.isNaN(end)
    ) {
      return null;
    }

    const gradient = `linear-gradient(${direction}, ${normalizedStart} ${start}%, ${normalizedEnd} ${end}%)`;
    const css = `background: ${gradient};`;

    return {
      normalizedStart,
      normalizedEnd,
      gradient,
      css,
    };
  }, [startColor, endColor, direction, startPosition, endPosition]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="CSS Gradient Generator"
      description="Create a linear CSS gradient, preview it, and copy ready-to-use CSS."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <ColorInput
              label="Start color"
              value={startColor}
              setValue={setStartColor}
            />

            <ColorInput
              label="End color"
              value={endColor}
              setValue={setEndColor}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Direction</span>
              <select
                value={direction}
                onChange={(event) => setDirection(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="to right">Left to right</option>
                <option value="to left">Right to left</option>
                <option value="to bottom">Top to bottom</option>
                <option value="to top">Bottom to top</option>
                <option value="45deg">45 degrees</option>
                <option value="90deg">90 degrees</option>
                <option value="135deg">135 degrees</option>
                <option value="180deg">180 degrees</option>
              </select>
            </label>

            <NumberInput
              label="Start position (%)"
              value={startPosition}
              setValue={setStartPosition}
            />

            <NumberInput
              label="End position (%)"
              value={endPosition}
              setValue={setEndPosition}
            />
          </div>

          {results ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <div
                className="h-56"
                style={{ background: results.gradient }}
              />
              <div className="p-4">
                <p className="text-sm text-zinc-400">Preview</p>
                <p className="mt-1 text-sm text-zinc-300">
                  {results.normalizedStart} → {results.normalizedEnd}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-red-400/30 bg-slate-950 p-4 text-sm text-zinc-300">
              Enter valid colors and positions to preview the gradient.
            </div>
          )}

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use this for buttons, hero backgrounds, cards, badges, or quick UI
            experiments.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Gradient CSS</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <CopyBlock
                label="CSS background"
                value={results.css}
                onCopy={copyText}
              />

              <CopyBlock
                label="Gradient value"
                value={results.gradient}
                onCopy={copyText}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Paste the background rule into a CSS class, inline style, or
                design prototype.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid values to generate CSS.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/css-gradient-generator" category="design" />
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
        max="100"
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