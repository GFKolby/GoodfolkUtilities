"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type Goal = "general" | "weightLoss" | "muscleGain" | "active";

const goalMultipliers: Record<Goal, { label: string; low: number; high: number }> = {
  general: {
    label: "General health",
    low: 0.36,
    high: 0.5,
  },
  weightLoss: {
    label: "Weight loss / higher satiety",
    low: 0.6,
    high: 0.8,
  },
  muscleGain: {
    label: "Muscle gain / strength training",
    low: 0.7,
    high: 1,
  },
  active: {
    label: "Active lifestyle / training",
    low: 0.55,
    high: 0.8,
  },
};

export default function ProteinCalculatorPage() {
  const [weightPounds, setWeightPounds] = useState("200");
  const [goal, setGoal] = useState<Goal>("weightLoss");
  const [mealsPerDay, setMealsPerDay] = useState("3");

  const results = useMemo(() => {
    const weight = Number(weightPounds);
    const meals = Number(mealsPerDay);

    if (weight <= 0 || meals <= 0) {
      return null;
    }

    const selectedGoal = goalMultipliers[goal];
    const lowProtein = weight * selectedGoal.low;
    const highProtein = weight * selectedGoal.high;
    const midpointProtein = (lowProtein + highProtein) / 2;

    return {
      goalLabel: selectedGoal.label,
      lowProtein,
      highProtein,
      midpointProtein,
      lowPerMeal: lowProtein / meals,
      highPerMeal: highProtein / meals,
      midpointPerMeal: midpointProtein / meals,
    };
  }, [weightPounds, goal, mealsPerDay]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Protein Calculator"
      description="Estimate daily protein needs based on body weight, goal, and meals per day."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Body weight (lb)"
              value={weightPounds}
              setValue={setWeightPounds}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Goal</span>
              <select
                value={goal}
                onChange={(event) => setGoal(event.target.value as Goal)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                {Object.entries(goalMultipliers).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <NumberInput
              label="Meals per day"
              value={mealsPerDay}
              setValue={setMealsPerDay}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Protein needs vary by goal, body size, age, activity, medical
            conditions, and training plan. This is a general planning estimate.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Protein estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Goal" value={results.goalLabel} />
              <ResultRow
                label="Daily protein range"
                value={`${results.lowProtein.toFixed(0)}–${results.highProtein.toFixed(0)} g/day`}
              />
              <ResultRow
                label="Midpoint target"
                value={`${results.midpointProtein.toFixed(0)} g/day`}
              />
              <ResultRow
                label="Per-meal range"
                value={`${results.lowPerMeal.toFixed(0)}–${results.highPerMeal.toFixed(0)} g/meal`}
              />
              <ResultRow
                label="Midpoint per meal"
                value={`${results.midpointPerMeal.toFixed(0)} g/meal`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical advice.
                If you have kidney disease, pregnancy, major medical conditions,
                or special dietary needs, ask a qualified health professional.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid weight and meal details to estimate protein needs.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/protein-calculator" category="health" />
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