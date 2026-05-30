"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Sleep Calculator",
    "Estimate bedtime or wake-up time using sleep cycles, time to fall asleep, and desired rest."
  );

function addMinutesToTime(time: string, minutesToAdd: number) {
  const [hours, minutes] = time.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
  const newHours = Math.floor(normalizedMinutes / 60);
  const newMinutes = normalizedMinutes % 60;

  return `${newHours.toString().padStart(2, "0")}:${newMinutes
    .toString()
    .padStart(2, "0")}`;
}

export default function SleepCalculatorPage() {
  const [mode, setMode] = useState<"wakeUp" | "bedtime">("wakeUp");
  const [targetTime, setTargetTime] = useState("06:30");
  const [sleepCycles, setSleepCycles] = useState("5");
  const [fallAsleepMinutes, setFallAsleepMinutes] = useState("15");

  const results = useMemo(() => {
    const cycles = Number(sleepCycles);
    const fallAsleep = Number(fallAsleepMinutes);

    if (cycles <= 0 || fallAsleep < 0) {
      return null;
    }

    const sleepMinutes = cycles * 90;
    const totalRestWindow = sleepMinutes + fallAsleep;

    const calculatedTime =
      mode === "wakeUp"
        ? addMinutesToTime(targetTime, -totalRestWindow)
        : addMinutesToTime(targetTime, totalRestWindow);

    const alternateOptions =
      mode === "wakeUp"
        ? [4, 5, 6].map((cycleCount) => ({
            cycles: cycleCount,
            time: addMinutesToTime(targetTime, -(cycleCount * 90 + fallAsleep)),
          }))
        : [4, 5, 6].map((cycleCount) => ({
            cycles: cycleCount,
            time: addMinutesToTime(targetTime, cycleCount * 90 + fallAsleep),
          }));

    if (!calculatedTime) {
      return null;
    }

    return {
      sleepMinutes,
      totalRestWindow,
      calculatedTime,
      alternateOptions,
    };
  }, [mode, targetTime, sleepCycles, fallAsleepMinutes]);

  return (
    <ToolPage
      line="Goodfolk Health Utilities"
      title="Sleep Calculator"
      description="Estimate bedtime or wake-up time using sleep cycles, time to fall asleep, and desired rest."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Calculator mode</span>
              <select
                value={mode}
                onChange={(event) =>
                  setMode(event.target.value as "wakeUp" | "bedtime")
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="wakeUp">I know my wake-up time</option>
                <option value="bedtime">I know my bedtime</option>
              </select>
            </label>

            <TimeInput
              label={mode === "wakeUp" ? "Wake-up time" : "Bedtime"}
              value={targetTime}
              setValue={setTargetTime}
            />

            <NumberInput
              label="Sleep cycles"
              value={sleepCycles}
              setValue={setSleepCycles}
            />

            <NumberInput
              label="Time to fall asleep (minutes)"
              value={fallAsleepMinutes}
              setValue={setFallAsleepMinutes}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            A common sleep cycle estimate is about 90 minutes. Many adults aim
            for 4–6 cycles, depending on sleep needs and schedule.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Sleep estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label={mode === "wakeUp" ? "Suggested bedtime" : "Estimated wake-up time"}
                value={results.calculatedTime}
              />
              <ResultRow
                label="Sleep time"
                value={`${(results.sleepMinutes / 60).toFixed(1)} hours`}
              />
              <ResultRow
                label="Total rest window"
                value={`${results.totalRestWindow} minutes`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h3 className="font-semibold text-white">Other options</h3>
                <div className="mt-3 space-y-2">
                  {results.alternateOptions.map((option) => (
                    <div
                      key={`${option.cycles}-${option.time}`}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-zinc-300">
                        {option.cycles} cycles
                      </span>
                      <span className="font-semibold text-white">
                        {option.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This tool is for general planning only and is not medical
                advice. Sleep needs vary by person, age, stress, health,
                schedule, medication, and sleep quality.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid sleep details to calculate a sleep schedule.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/sleep-calculator" category="health" />
    </ToolPage>
  );
}

function TimeInput({
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
        type="time"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
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