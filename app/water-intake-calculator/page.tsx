"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import FAQ from "@/components/FAQ";

type Weather = "cool" | "mild" | "hot";

export default function WaterIntakeCalculatorPage() {
  const [weightPounds, setWeightPounds] = useState("200");
  const [activityMinutes, setActivityMinutes] = useState("30");
  const [weather, setWeather] = useState<Weather>("mild");
  const [caffeineAlcoholServings, setCaffeineAlcoholServings] = useState("1");

  const results = useMemo(() => {
    const weight = Number(weightPounds);
    const activity = Number(activityMinutes);
    const servings = Number(caffeineAlcoholServings);

    if (weight <= 0 || activity < 0 || servings < 0) {
      return null;
    }

    const baseOunces = weight * 0.5;
    const activityOunces = (activity / 30) * 12;
    const weatherOunces =
      weather === "hot" ? 16 : weather === "mild" ? 8 : 0;
    const caffeineAdjustment = servings * 8;

    const totalOunces =
      baseOunces + activityOunces + weatherOunces + caffeineAdjustment;
    const cups = totalOunces / 8;
    const liters = totalOunces * 0.0295735;

    return {
      baseOunces,
      activityOunces,
      weatherOunces,
      caffeineAdjustment,
      totalOunces,
      cups,
      liters,
    };
  }, [weightPounds, activityMinutes, weather, caffeineAlcoholServings]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Water Intake Calculator"
      description="Estimate daily water intake based on weight, activity, weather, and caffeine or alcohol intake."
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
              label="Activity minutes per day"
              value={activityMinutes}
              setValue={setActivityMinutes}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Weather / environment</span>
              <select
                value={weather}
                onChange={(event) => setWeather(event.target.value as Weather)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="cool">Cool / indoor</option>
                <option value="mild">Mild</option>
                <option value="hot">Hot / humid</option>
              </select>
            </label>

            <NumberInput
              label="Caffeine/alcohol servings"
              value={caffeineAlcoholServings}
              setValue={setCaffeineAlcoholServings}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This is a general hydration estimate. Needs vary based on sweat rate,
            climate, medications, medical conditions, pregnancy, and diet.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Water intake estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Base estimate"
                value={`${results.baseOunces.toFixed(0)} oz`}
              />
              <ResultRow
                label="Activity adjustment"
                value={`${results.activityOunces.toFixed(0)} oz`}
              />
              <ResultRow
                label="Weather adjustment"
                value={`${results.weatherOunces.toFixed(0)} oz`}
              />
              <ResultRow
                label="Caffeine/alcohol adjustment"
                value={`${results.caffeineAdjustment.toFixed(0)} oz`}
              />
              <ResultRow
                label="Estimated total"
                value={`${results.totalOunces.toFixed(0)} oz/day`}
              />
              <ResultRow
                label="Cups"
                value={`${results.cups.toFixed(1)} cups/day`}
              />
              <ResultRow
                label="Liters"
                value={`${results.liters.toFixed(2)} L/day`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical advice.
                Drink more during heavy sweating, heat, illness, or long outdoor
                activity, and follow medical guidance if you have fluid
                restrictions.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid hydration details to estimate daily water intake.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/water-intake-calculator" category="health" />
      <FAQ
        items={[
          {
            question: "How much water should I drink daily?",
            answer:
              "A common general recommendation is about 8 cups (64 oz) per day, but individual needs vary widely based on weight, activity, climate, and health conditions.",
          },
          {
            question: "Can I drink too much water?",
            answer:
              "Yes, excessive water intake can lead to a dangerous condition called hyponatremia. It's important to listen to your body's thirst signals and adjust intake based on your circumstances.",
          },
          {
            question: "Does coffee or alcohol count towards hydration?",
            answer:
              "Caffeinated and alcoholic beverages can have a mild diuretic effect, which is why this calculator adds extra water needs for each serving. However, they still contribute to overall fluid intake.",
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