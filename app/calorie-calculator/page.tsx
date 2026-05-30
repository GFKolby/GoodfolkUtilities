"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import FAQ from "@/components/FAQ";

type Sex = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";

const activityMultipliers: Record<ActivityLevel, { label: string; value: number }> = {
  sedentary: { label: "Sedentary", value: 1.2 },
  light: { label: "Light activity", value: 1.375 },
  moderate: { label: "Moderate activity", value: 1.55 },
  active: { label: "Active", value: 1.725 },
  veryActive: { label: "Very active", value: 1.9 },
};

export default function CalorieCalculatorPage() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("35");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [weightPounds, setWeightPounds] = useState("200");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");

  const results = useMemo(() => {
    const userAge = Number(age);
    const feet = Number(heightFeet);
    const inches = Number(heightInches);
    const pounds = Number(weightPounds);

    if (userAge <= 0 || feet < 0 || inches < 0 || pounds <= 0) {
      return null;
    }

    const totalInches = feet * 12 + inches;

    if (totalInches <= 0) {
      return null;
    }

    const weightKg = pounds * 0.453592;
    const heightCm = totalInches * 2.54;

    const bmr =
      sex === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * userAge + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * userAge - 161;

    const multiplier = activityMultipliers[activityLevel].value;
    const maintenanceCalories = bmr * multiplier;

    return {
      bmr,
      maintenanceCalories,
      mildLoss: maintenanceCalories - 250,
      weightLoss: maintenanceCalories - 500,
      mildGain: maintenanceCalories + 250,
      weightGain: maintenanceCalories + 500,
      activityLabel: activityMultipliers[activityLevel].label,
    };
  }, [sex, age, heightFeet, heightInches, weightPounds, activityLevel]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Calorie Calculator"
      description="Estimate daily calories for maintenance, weight loss, or weight gain based on body stats and activity level."
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

            <NumberInput label="Age" value={age} setValue={setAge} />

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

            <label className="block">
              <span className="text-sm text-zinc-300">Activity level</span>
              <select
                value={activityLevel}
                onChange={(event) =>
                  setActivityLevel(event.target.value as ActivityLevel)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                {Object.entries(activityMultipliers).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This estimate uses a common BMR formula and an activity multiplier.
            Real calorie needs can vary based on metabolism, medical conditions,
            medication, training, sleep, and body composition.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Calorie estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Estimated BMR"
                value={`${results.bmr.toFixed(0)} cal/day`}
              />
              <ResultRow label="Activity level" value={results.activityLabel} />
              <ResultRow
                label="Maintenance"
                value={`${results.maintenanceCalories.toFixed(0)} cal/day`}
              />
              <ResultRow
                label="Mild weight loss"
                value={`${Math.max(results.mildLoss, 0).toFixed(0)} cal/day`}
              />
              <ResultRow
                label="Weight loss"
                value={`${Math.max(results.weightLoss, 0).toFixed(0)} cal/day`}
              />
              <ResultRow
                label="Mild weight gain"
                value={`${results.mildGain.toFixed(0)} cal/day`}
              />
              <ResultRow
                label="Weight gain"
                value={`${results.weightGain.toFixed(0)} cal/day`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical advice.
                For personal nutrition guidance, work with a qualified health
                professional.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid body stats and activity details to estimate calories.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/calorie-calculator" category="health" />
      <FAQ
        items={[
          {
            question: "How accurate is this calorie estimate?",
            answer:
              "This estimate uses a common BMR formula and activity multiplier, but real calorie needs can vary based on metabolism, medical conditions, medication, training, sleep, and body composition. Use it as a general starting point and adjust based on your experience and goals.",
          },
          {
            question: "Can I use this to plan for weight loss or gain?",
            answer:
              "Yes, the tool provides estimates for maintenance calories as well as mild and more aggressive weight loss or gain. For sustainable changes, aim for gradual adjustments and consider working with a health professional for personalized guidance.",
          },
          {
            question: "Does this account for muscle mass or body composition?",
            answer:
              "No, this tool does not directly account for muscle mass or body composition. Two people with the same height and weight but different muscle mass may have different calorie needs. For a more personalized assessment, consider consulting with a health professional.",
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