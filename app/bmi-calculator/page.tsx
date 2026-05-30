"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import FAQ from "@/components/FAQ";

export default function BmiCalculatorPage() {
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [weightPounds, setWeightPounds] = useState("180");

  const results = useMemo(() => {
    const feet = Number(heightFeet);
    const inches = Number(heightInches);
    const pounds = Number(weightPounds);

    if (feet < 0 || inches < 0 || pounds <= 0) {
      return null;
    }

    const totalInches = feet * 12 + inches;

    if (totalInches <= 0) {
      return null;
    }

    const bmi = (pounds / (totalInches * totalInches)) * 703;

    let category = "Normal weight";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obesity range";
    }

    const healthyLow = (18.5 * totalInches * totalInches) / 703;
    const healthyHigh = (24.9 * totalInches * totalInches) / 703;

    return {
      totalInches,
      bmi,
      category,
      healthyLow,
      healthyHigh,
    };
  }, [heightFeet, heightInches, weightPounds]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="BMI Calculator"
      description="Calculate body mass index from height and weight and see the standard BMI category."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
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
              label="Weight (lb)"
              value={weightPounds}
              setValue={setWeightPounds}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            BMI is a simple screening estimate based on height and weight. It
            does not measure body fat, muscle, fitness, health conditions, or
            individual medical risk.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">BMI estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="BMI" value={results.bmi.toFixed(1)} />
              <ResultRow label="Category" value={results.category} />
              <ResultRow
                label="Height"
                value={`${results.totalInches.toFixed(0)} inches`}
              />
              <ResultRow
                label="Standard normal BMI weight range"
                value={`${results.healthyLow.toFixed(0)}–${results.healthyHigh.toFixed(0)} lb`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical advice.
                Talk with a qualified health professional for personal health
                guidance.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid height and weight values to calculate BMI.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/bmi-calculator" category="health" />
      <FAQ
  items={[
    {
      question: "What is BMI?",
      answer:
        "BMI stands for body mass index. It is a simple estimate based on height and weight that is commonly used as a general screening tool.",
    },
    {
      question: "How is BMI calculated?",
      answer:
        "BMI is calculated by comparing body weight to height. This calculator uses the standard U.S. formula for pounds and inches.",
    },
    {
      question: "Is BMI always accurate?",
      answer:
        "BMI does not directly measure body fat, muscle, fitness level, or medical risk. It is useful as a general estimate, but it should not replace professional health guidance.",
    },
  ]}
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