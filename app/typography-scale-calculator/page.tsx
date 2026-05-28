"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

const ratioOptions = {
  minorSecond: { label: "Minor second — 1.067", value: 1.067 },
  majorSecond: { label: "Major second — 1.125", value: 1.125 },
  minorThird: { label: "Minor third — 1.2", value: 1.2 },
  majorThird: { label: "Major third — 1.25", value: 1.25 },
  perfectFourth: { label: "Perfect fourth — 1.333", value: 1.333 },
  goldenRatio: { label: "Golden ratio — 1.618", value: 1.618 },
};

type RatioKey = keyof typeof ratioOptions;

export default function TypographyScaleCalculatorPage() {
  const [baseFontSize, setBaseFontSize] = useState("16");
  const [baseRemSize, setBaseRemSize] = useState("16");
  const [ratioKey, setRatioKey] = useState<RatioKey>("majorThird");
  const [stepsUp, setStepsUp] = useState("5");
  const [stepsDown, setStepsDown] = useState("2");

  const results = useMemo(() => {
    const base = Number(baseFontSize);
    const remBase = Number(baseRemSize);
    const up = Number(stepsUp);
    const down = Number(stepsDown);
    const ratio = ratioOptions[ratioKey].value;

    if (
      base <= 0 ||
      remBase <= 0 ||
      up < 0 ||
      down < 0 ||
      up > 12 ||
      down > 8
    ) {
      return null;
    }

    const scale = [];

    for (let step = down * -1; step <= up; step += 1) {
      const px = base * Math.pow(ratio, step);
      const rem = px / remBase;

      scale.push({
        step,
        name: step === 0 ? "base" : step > 0 ? `plus-${step}` : `minus-${Math.abs(step)}`,
        px,
        rem,
      });
    }

    const cssVariables = scale
      .map(
        (item) =>
          `--font-size-${item.name}: ${item.rem.toFixed(3)}rem; /* ${item.px.toFixed(
            2
          )}px */`
      )
      .join("\n");

    return {
      ratio,
      ratioLabel: ratioOptions[ratioKey].label,
      scale,
      cssVariables,
    };
  }, [baseFontSize, baseRemSize, ratioKey, stepsUp, stepsDown]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="Typography Scale Calculator"
      description="Generate a consistent typography scale from a base font size and ratio."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Base font size (px)"
              value={baseFontSize}
              setValue={setBaseFontSize}
            />

            <NumberInput
              label="Root font size for rem (px)"
              value={baseRemSize}
              setValue={setBaseRemSize}
            />

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Scale ratio</span>
              <select
                value={ratioKey}
                onChange={(event) => setRatioKey(event.target.value as RatioKey)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                {Object.entries(ratioOptions).map(([key, option]) => (
                  <option key={key} value={key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <NumberInput
              label="Steps above base"
              value={stepsUp}
              setValue={setStepsUp}
            />

            <NumberInput
              label="Steps below base"
              value={stepsDown}
              setValue={setStepsDown}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Smaller ratios create subtle scales. Larger ratios create stronger
            heading jumps. Major third is a solid default for many interfaces.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Type scale</h2>

          {results ? (
            <div className="mt-6 space-y-5">
              <ResultRow label="Ratio" value={results.ratioLabel} />

              <div className="max-h-80 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="space-y-4">
                  {results.scale.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg border border-slate-800 bg-slate-900 p-4"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-semibold text-amber-300">
                          {item.name}
                        </p>
                        <p className="text-sm text-zinc-300">
                          {item.px.toFixed(2)}px · {item.rem.toFixed(3)}rem
                        </p>
                      </div>

                      <p
                        className="mt-3 font-semibold text-white"
                        style={{ fontSize: `${Math.max(item.px, 10)}px` }}
                      >
                        The quick brown fox jumps.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <CopyBlock
                label="CSS variables"
                value={results.cssVariables}
                onCopy={copyText}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid typography values to generate a scale.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/typography-scale-calculator"
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