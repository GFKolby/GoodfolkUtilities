"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Macro Calculator",
    "Estimate daily protein, carbohydrate, and fat targets from calories and macro percentages."
  );

export default function MacroCalculatorPage() {
  const [calories, setCalories] = useState("2200");
  const [proteinPercent, setProteinPercent] = useState("30");
  const [carbPercent, setCarbPercent] = useState("40");
  const [fatPercent, setFatPercent] = useState("30");
  const [mealsPerDay, setMealsPerDay] = useState("3");

  const results = useMemo(() => {
    const totalCalories = Number(calories);
    const protein = Number(proteinPercent);
    const carbs = Number(carbPercent);
    const fat = Number(fatPercent);
    const meals = Number(mealsPerDay);

    if (
      totalCalories <= 0 ||
      protein < 0 ||
      carbs < 0 ||
      fat < 0 ||
      meals <= 0
    ) {
      return null;
    }

    const totalPercent = protein + carbs + fat;

    if (totalPercent <= 0) {
      return null;
    }

    const proteinCalories = totalCalories * (protein / 100);
    const carbCalories = totalCalories * (carbs / 100);
    const fatCalories = totalCalories * (fat / 100);

    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;

    return {
      totalPercent,
      proteinCalories,
      carbCalories,
      fatCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
      proteinPerMeal: proteinGrams / meals,
      carbsPerMeal: carbGrams / meals,
      fatPerMeal: fatGrams / meals,
    };
  }, [calories, proteinPercent, carbPercent, fatPercent, mealsPerDay]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Macro Calculator"
      description="Estimate daily protein, carbohydrate, and fat targets from calories and macro percentages."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Daily calories"
              value={calories}
              setValue={setCalories}
            />

            <NumberInput
              label="Meals per day"
              value={mealsPerDay}
              setValue={setMealsPerDay}
            />

            <NumberInput
              label="Protein (%)"
              value={proteinPercent}
              setValue={setProteinPercent}
            />

            <NumberInput
              label="Carbs (%)"
              value={carbPercent}
              setValue={setCarbPercent}
            />

            <NumberInput
              label="Fat (%)"
              value={fatPercent}
              setValue={setFatPercent}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Protein and carbs have about 4 calories per gram. Fat has about 9
            calories per gram. Try to keep your macro percentages near 100%.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Macro estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Macro percentage total"
                value={`${results.totalPercent.toFixed(1)}%`}
              />
              <ResultRow
                label="Protein"
                value={`${results.proteinGrams.toFixed(0)} g/day`}
              />
              <ResultRow
                label="Carbs"
                value={`${results.carbGrams.toFixed(0)} g/day`}
              />
              <ResultRow
                label="Fat"
                value={`${results.fatGrams.toFixed(0)} g/day`}
              />
              <ResultRow
                label="Protein per meal"
                value={`${results.proteinPerMeal.toFixed(0)} g`}
              />
              <ResultRow
                label="Carbs per meal"
                value={`${results.carbsPerMeal.toFixed(0)} g`}
              />
              <ResultRow
                label="Fat per meal"
                value={`${results.fatPerMeal.toFixed(0)} g`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical
                advice. Macro needs vary based on health, training, preferences,
                medical conditions, and nutrition goals.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid calories, macro percentages, and meals to estimate
              macros.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/macro-calculator" category="health" />
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