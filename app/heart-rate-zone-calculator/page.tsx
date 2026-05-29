"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

const zones = [
  { name: "Zone 1", label: "Very light", low: 50, high: 60 },
  { name: "Zone 2", label: "Light / endurance", low: 60, high: 70 },
  { name: "Zone 3", label: "Moderate", low: 70, high: 80 },
  { name: "Zone 4", label: "Hard", low: 80, high: 90 },
  { name: "Zone 5", label: "Maximum effort", low: 90, high: 100 },
];

export default function HeartRateZoneCalculatorPage() {
  const [age, setAge] = useState("35");
  const [restingHeartRate, setRestingHeartRate] = useState("70");
  const [method, setMethod] = useState<"maxHr" | "karvonen">("karvonen");

  const results = useMemo(() => {
    const userAge = Number(age);
    const resting = Number(restingHeartRate);

    if (userAge <= 0 || resting <= 0) {
      return null;
    }

    const maxHeartRate = 220 - userAge;
    const heartRateReserve = maxHeartRate - resting;

    if (maxHeartRate <= 0 || heartRateReserve <= 0) {
      return null;
    }

    const zoneResults = zones.map((zone) => {
      const low =
        method === "karvonen"
          ? resting + heartRateReserve * (zone.low / 100)
          : maxHeartRate * (zone.low / 100);

      const high =
        method === "karvonen"
          ? resting + heartRateReserve * (zone.high / 100)
          : maxHeartRate * (zone.high / 100);

      return {
        ...zone,
        lowBpm: Math.round(low),
        highBpm: Math.round(high),
      };
    });

    return {
      maxHeartRate,
      heartRateReserve,
      zoneResults,
    };
  }, [age, restingHeartRate, method]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Heart Rate Zone Calculator"
      description="Estimate training heart rate zones from age and resting heart rate."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Age" value={age} setValue={setAge} />

            <NumberInput
              label="Resting heart rate"
              value={restingHeartRate}
              setValue={setRestingHeartRate}
            />

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Calculation method</span>
              <select
                value={method}
                onChange={(event) =>
                  setMethod(event.target.value as "maxHr" | "karvonen")
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="karvonen">Karvonen method</option>
                <option value="maxHr">Percent of max heart rate</option>
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Karvonen zones use heart rate reserve and resting heart rate. Percent
            of max heart rate uses estimated max heart rate only.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Heart rate zones</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Estimated max heart rate"
                value={`${results.maxHeartRate.toFixed(0)} bpm`}
              />
              <ResultRow
                label="Heart rate reserve"
                value={`${results.heartRateReserve.toFixed(0)} bpm`}
              />

              <div className="space-y-3">
                {results.zoneResults.map((zone) => (
                  <div
                    key={zone.name}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{zone.name}</p>
                        <p className="text-sm text-zinc-400">{zone.label}</p>
                      </div>
                      <p className="text-right font-semibold text-white">
                        {zone.lowBpm}–{zone.highBpm} bpm
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general fitness planning only and is not
                medical advice. Stop exercise and seek help if you feel chest
                pain, faintness, unusual shortness of breath, or concerning
                symptoms.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid heart rate details to estimate zones.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/heart-rate-zone-calculator"
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
        step="1"
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