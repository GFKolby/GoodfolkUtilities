"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Target Weight Planner",
    "Estimate a target weight timeline based on current weight, goal weight, and weekly change."
  );

export default function TargetWeightPlannerPage() {
  const [currentWeight, setCurrentWeight] = useState("250");
  const [targetWeight, setTargetWeight] = useState("220");
  const [weeklyChange, setWeeklyChange] = useState("1.5");

  const results = useMemo(() => {
    const current = Number(currentWeight);
    const target = Number(targetWeight);
    const change = Number(weeklyChange);

    if (current <= 0 || target <= 0 || change <= 0) {
      return null;
    }

    const difference = Math.abs(current - target);
    const weeksNeeded = difference / change;
    const monthsNeeded = weeksNeeded / 4.345;
    const direction = target < current ? "loss" : "gain";

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + Math.ceil(weeksNeeded * 7));

    return {
      difference,
      weeksNeeded,
      monthsNeeded,
      direction,
      targetDate,
    };
  }, [currentWeight, targetWeight, weeklyChange]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Target Weight Planner"
      description="Estimate a target weight timeline based on current weight, goal weight, and weekly change."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Current weight (lb)"
              value={currentWeight}
              setValue={setCurrentWeight}
            />

            <NumberInput
              label="Target weight (lb)"
              value={targetWeight}
              setValue={setTargetWeight}
            />

            <NumberInput
              label="Weekly change goal (lb/week)"
              value={weeklyChange}
              setValue={setWeeklyChange}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use a realistic weekly change. Faster is not always better, and
            sustainable habits matter more than chasing a date.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Weight goal estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Goal direction"
                value={results.direction === "loss" ? "Weight loss" : "Weight gain"}
              />
              <ResultRow
                label="Total change"
                value={`${results.difference.toFixed(1)} lb`}
              />
              <ResultRow
                label="Estimated timeline"
                value={`${results.weeksNeeded.toFixed(1)} weeks`}
              />
              <ResultRow
                label="Estimated months"
                value={`${results.monthsNeeded.toFixed(1)} months`}
              />
              <ResultRow
                label="Estimated target date"
                value={results.targetDate.toLocaleDateString()}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical
                advice. Weight change can vary week to week due to water,
                digestion, training, sleep, stress, and health factors.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid weight and weekly change values to estimate your
              timeline.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/target-weight-planner" category="health" />
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