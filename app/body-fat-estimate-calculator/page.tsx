"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";
import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Body Fat Estimate Calculator",
    "Estimate body fat percentage using simple body measurements and standard formula inputs."
  );

type Sex = "male" | "female";

export default function BodyFatEstimateCalculatorPage() {
  const [sex, setSex] = useState<Sex>("male");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [neckInches, setNeckInches] = useState("16");
  const [waistInches, setWaistInches] = useState("40");
  const [hipInches, setHipInches] = useState("42");

  const results = useMemo(() => {
    const feet = Number(heightFeet);
    const inches = Number(heightInches);
    const neck = Number(neckInches);
    const waist = Number(waistInches);
    const hips = Number(hipInches);

    if (
      feet < 0 ||
      inches < 0 ||
      neck <= 0 ||
      waist <= 0 ||
      (sex === "female" && hips <= 0)
    ) {
      return null;
    }

    const height = feet * 12 + inches;

    if (height <= 0) {
      return null;
    }

    let bodyFat = 0;

    if (sex === "male") {
      const waistMinusNeck = waist - neck;

      if (waistMinusNeck <= 0) {
        return null;
      }

      bodyFat =
        86.01 * Math.log10(waistMinusNeck) -
        70.041 * Math.log10(height) +
        36.76;
    } else {
      const waistPlusHipMinusNeck = waist + hips - neck;

      if (waistPlusHipMinusNeck <= 0) {
        return null;
      }

      bodyFat =
        163.205 * Math.log10(waistPlusHipMinusNeck) -
        97.684 * Math.log10(height) -
        78.387;
    }

    const leanMassPercent = 100 - bodyFat;

    let category = "Estimate";
    if (sex === "male") {
      if (bodyFat < 6) category = "Essential fat range";
      else if (bodyFat < 14) category = "Athletic range";
      else if (bodyFat < 18) category = "Fitness range";
      else if (bodyFat < 25) category = "Average range";
      else category = "Higher range";
    } else {
      if (bodyFat < 14) category = "Essential fat range";
      else if (bodyFat < 21) category = "Athletic range";
      else if (bodyFat < 25) category = "Fitness range";
      else if (bodyFat < 32) category = "Average range";
      else category = "Higher range";
    }

    return {
      height,
      bodyFat,
      leanMassPercent,
      category,
    };
  }, [sex, heightFeet, heightInches, neckInches, waistInches, hipInches]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Body Fat Estimate Calculator"
      description="Estimate body fat percentage using simple body measurements and standard formula inputs."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Sex</span>
              <select
                value={sex}
                onChange={(event) => setSex(event.target.value as Sex)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>

            <NumberInput
              label="Height feet"
              value={heightFeet}
              setValue={setHeightFeet}
            />

            <NumberInput
              label="Height inches"
              value={heightInches}
              setValue={setHeightInches}
            />

            <NumberInput
              label="Neck circumference (in)"
              value={neckInches}
              setValue={setNeckInches}
            />

            <NumberInput
              label="Waist circumference (in)"
              value={waistInches}
              setValue={setWaistInches}
            />

            {sex === "female" && (
              <NumberInput
                label="Hip circumference (in)"
                value={hipInches}
                setValue={setHipInches}
              />
            )}
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Measure consistently and avoid pulling the tape too tight. This is a
            rough estimate based on circumference measurements, not a clinical
            body composition test.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Body fat estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Estimated body fat"
                value={`${results.bodyFat.toFixed(1)}%`}
              />
              <ResultRow
                label="Estimated lean mass percentage"
                value={`${results.leanMassPercent.toFixed(1)}%`}
              />
              <ResultRow label="Category" value={results.category} />
              <ResultRow
                label="Height"
                value={`${results.height.toFixed(0)} inches`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical advice.
                Body fat estimates from measurements can vary based on technique,
                hydration, body shape, and formula limitations.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid measurements to estimate body fat percentage.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/body-fat-estimate-calculator"
        category="health"
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
        step="0.1"
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