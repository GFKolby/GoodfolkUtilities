"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function BorderRadiusPreviewerPage() {
  const [topLeft, setTopLeft] = useState("16");
  const [topRight, setTopRight] = useState("16");
  const [bottomRight, setBottomRight] = useState("16");
  const [bottomLeft, setBottomLeft] = useState("16");
  const [unit, setUnit] = useState("px");

  const results = useMemo(() => {
    const tl = Number(topLeft);
    const tr = Number(topRight);
    const br = Number(bottomRight);
    const bl = Number(bottomLeft);

    if ([tl, tr, br, bl].some((value) => Number.isNaN(value) || value < 0)) {
      return null;
    }

    const borderRadius = `${tl}${unit} ${tr}${unit} ${br}${unit} ${bl}${unit}`;
    const css = `border-radius: ${borderRadius};`;

    return {
      borderRadius,
      css,
    };
  }, [topLeft, topRight, bottomRight, bottomLeft, unit]);

  function setAllCorners(value: string) {
    setTopLeft(value);
    setTopRight(value);
    setBottomRight(value);
    setBottomLeft(value);
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="Border Radius Previewer"
      description="Preview border radius values on cards and buttons, then copy CSS-ready corner styles."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label={`Top left (${unit})`}
              value={topLeft}
              setValue={setTopLeft}
            />

            <NumberInput
              label={`Top right (${unit})`}
              value={topRight}
              setValue={setTopRight}
            />

            <NumberInput
              label={`Bottom right (${unit})`}
              value={bottomRight}
              setValue={setBottomRight}
            />

            <NumberInput
              label={`Bottom left (${unit})`}
              value={bottomLeft}
              setValue={setBottomLeft}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Unit</span>
              <select
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="px">px</option>
                <option value="rem">rem</option>
                <option value="%">%</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Set all corners</span>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="16"
                onChange={(event) => setAllCorners(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use matching corners for clean cards and buttons, or mix values for
            more playful UI shapes.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Radius preview</h2>

          {results ? (
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl bg-slate-950 p-8">
                <div
                  className="mx-auto max-w-sm border border-slate-700 bg-slate-800 p-6 text-white"
                  style={{ borderRadius: results.borderRadius }}
                >
                  <p className="text-sm font-semibold text-amber-300">
                    Preview card
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">Rounded UI block</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    This card uses your current border radius settings.
                  </p>

                  <button
                    type="button"
                    className="mt-5 bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950"
                    style={{ borderRadius: results.borderRadius }}
                  >
                    Button preview
                  </button>
                </div>
              </div>

              <CopyBlock label="CSS" value={results.css} onCopy={copyText} />
              <CopyBlock
                label="Border radius value"
                value={results.borderRadius}
                onCopy={copyText}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid radius values to preview CSS.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/border-radius-previewer" category="design" />
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