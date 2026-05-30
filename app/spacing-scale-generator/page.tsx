"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Spacing Scale Generator",
    "Generate consistent spacing values in pixels and rems for UI layouts, CSS variables, and design systems."
  );

export default function SpacingScaleGeneratorPage() {
  const [baseStep, setBaseStep] = useState("4");
  const [baseFontSize, setBaseFontSize] = useState("16");
  const [steps, setSteps] = useState("12");
  const [prefix, setPrefix] = useState("space");

  const results = useMemo(() => {
    const step = Number(baseStep);
    const fontSize = Number(baseFontSize);
    const stepCount = Number(steps);

    if (step <= 0 || fontSize <= 0 || stepCount <= 0 || stepCount > 30) {
      return null;
    }

    const scale = Array.from({ length: stepCount }, (_, index) => {
      const multiplier = index + 1;
      const px = step * multiplier;
      const rem = px / fontSize;

      return {
        name: `${prefix}-${multiplier}`,
        multiplier,
        px,
        rem,
      };
    });

    const cssVariables = scale
      .map((item) => `--${item.name}: ${item.rem.toFixed(3)}rem; /* ${item.px}px */`)
      .join("\n");

    const tailwindSpacing = scale
      .map((item) => `  "${item.multiplier}": "${item.rem.toFixed(3)}rem",`)
      .join("\n");

    return {
      scale,
      cssVariables,
      tailwindSpacing: `spacing: {\n${tailwindSpacing}\n}`,
    };
  }, [baseStep, baseFontSize, steps, prefix]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="Spacing Scale Generator"
      description="Generate consistent spacing values in pixels and rems for UI layouts, CSS variables, and design systems."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Base step (px)"
              value={baseStep}
              setValue={setBaseStep}
            />

            <NumberInput
              label="Base font size (px)"
              value={baseFontSize}
              setValue={setBaseFontSize}
            />

            <NumberInput
              label="Number of steps"
              value={steps}
              setValue={setSteps}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Variable prefix</span>
              <input
                type="text"
                value={prefix}
                onChange={(event) =>
                  setPrefix(event.target.value.trim() || "space")
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            A 4px or 8px spacing base keeps layouts consistent across padding,
            margin, gaps, cards, sections, and components.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Spacing scale</h2>

          {results ? (
            <div className="mt-6 space-y-5">
              <div className="max-h-72 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="space-y-3">
                  {results.scale.map((item) => (
                    <div
                      key={item.name}
                      className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3 sm:grid-cols-[1fr_1fr_1fr]"
                    >
                      <p className="text-sm font-semibold text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-zinc-300">{item.px}px</p>
                      <p className="text-sm text-zinc-300">
                        {item.rem.toFixed(3)}rem
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

              <CopyBlock
                label="Tailwind-style spacing object"
                value={results.tailwindSpacing}
                onCopy={copyText}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid spacing values to generate a scale.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/spacing-scale-generator" category="design" />
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
        min="1"
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