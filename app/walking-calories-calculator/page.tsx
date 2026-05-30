"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Walking Calories Calculator",
    "Estimate calories burned while walking based on weight, distance, pace, and incline."
  );

export default function WalkingCaloriesCalculatorPage() {
  const [weightPounds, setWeightPounds] = useState("200");
  const [distanceMiles, setDistanceMiles] = useState("2");
  const [walkingMinutes, setWalkingMinutes] = useState("40");
  const [inclineLevel, setInclineLevel] = useState("0");

  const results = useMemo(() => {
    const weight = Number(weightPounds);
    const distance = Number(distanceMiles);
    const minutes = Number(walkingMinutes);
    const incline = Number(inclineLevel);

    if (weight <= 0 || distance <= 0 || minutes <= 0 || incline < 0) {
      return null;
    }

    const hours = minutes / 60;
    const paceMinutesPerMile = minutes / distance;
    const speedMph = distance / hours;

    let met = 3.3;

    if (speedMph >= 4) {
      met = 5;
    } else if (speedMph >= 3.5) {
      met = 4.3;
    } else if (speedMph >= 3) {
      met = 3.8;
    } else if (speedMph < 2.5) {
      met = 2.8;
    }

    const inclineBonus = incline * 0.08;
    const adjustedMet = met + inclineBonus;
    const weightKg = weight * 0.453592;
    const caloriesBurned = adjustedMet * weightKg * hours;

    return {
      speedMph,
      paceMinutesPerMile,
      adjustedMet,
      caloriesBurned,
      caloriesPerMile: caloriesBurned / distance,
      caloriesPerMinute: caloriesBurned / minutes,
    };
  }, [weightPounds, distanceMiles, walkingMinutes, inclineLevel]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Walking Calories Calculator"
      description="Estimate calories burned while walking based on weight, distance, pace, and incline."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Weight (lb)"
              value={weightPounds}
              setValue={setWeightPounds}
            />

            <NumberInput
              label="Distance (miles)"
              value={distanceMiles}
              setValue={setDistanceMiles}
            />

            <NumberInput
              label="Walking time (minutes)"
              value={walkingMinutes}
              setValue={setWalkingMinutes}
            />

            <NumberInput
              label="Incline / hill effort level"
              value={inclineLevel}
              setValue={setInclineLevel}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Incline level is a simple effort adjustment. Use 0 for flat walking,
            1–3 for mild hills, and higher values for tougher uphill routes.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Walking estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Estimated calories burned"
                value={`${results.caloriesBurned.toFixed(0)} cal`}
              />
              <ResultRow
                label="Walking speed"
                value={`${results.speedMph.toFixed(2)} mph`}
              />
              <ResultRow
                label="Pace"
                value={`${results.paceMinutesPerMile.toFixed(1)} min/mi`}
              />
              <ResultRow
                label="Calories per mile"
                value={`${results.caloriesPerMile.toFixed(0)} cal/mi`}
              />
              <ResultRow
                label="Calories per minute"
                value={`${results.caloriesPerMinute.toFixed(1)} cal/min`}
              />
              <ResultRow
                label="Estimated MET level"
                value={results.adjustedMet.toFixed(1)}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical advice.
                Calorie burn varies by fitness level, stride, terrain, weather,
                heart rate, and body composition.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid walking details to estimate calories burned.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/walking-calories-calculator"
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