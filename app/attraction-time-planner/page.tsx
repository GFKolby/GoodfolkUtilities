"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function AttractionTimePlannerPage() {
  const [dayStart, setDayStart] = useState("09:00");
  const [dayEnd, setDayEnd] = useState("18:00");
  const [attractions, setAttractions] = useState("4");
  const [visitMinutes, setVisitMinutes] = useState("90");
  const [transitMinutes, setTransitMinutes] = useState("25");
  const [mealBreakMinutes, setMealBreakMinutes] = useState("60");
  const [extraBufferMinutes, setExtraBufferMinutes] = useState("45");

  const results = useMemo(() => {
    const attractionCount = Number(attractions);
    const visit = Number(visitMinutes);
    const transit = Number(transitMinutes);
    const meals = Number(mealBreakMinutes);
    const buffer = Number(extraBufferMinutes);

    if (
      attractionCount <= 0 ||
      visit <= 0 ||
      transit < 0 ||
      meals < 0 ||
      buffer < 0
    ) {
      return null;
    }

    const [startHour, startMinute] = dayStart.split(":").map(Number);
    const [endHour, endMinute] = dayEnd.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    if (
      Number.isNaN(startTotalMinutes) ||
      Number.isNaN(endTotalMinutes) ||
      endTotalMinutes <= startTotalMinutes
    ) {
      return null;
    }

    const availableMinutes = endTotalMinutes - startTotalMinutes;
    const transitBlocks = Math.max(attractionCount - 1, 0);
    const plannedMinutes =
      attractionCount * visit + transitBlocks * transit + meals + buffer;

    const remainingMinutes = availableMinutes - plannedMinutes;

    const minutesPerAttractionWithTransit = visit + transit;
    const maxAttractions = Math.max(
      Math.floor((availableMinutes - meals - buffer + transit) / minutesPerAttractionWithTransit),
      0
    );

    let status = "Comfortable";
    if (remainingMinutes < 0) {
      status = "Overpacked";
    } else if (remainingMinutes < 45) {
      status = "Tight";
    } else if (remainingMinutes >= 120) {
      status = "Relaxed";
    }

    const hours = Math.floor(plannedMinutes / 60);
    const minutes = plannedMinutes % 60;

    return {
      availableMinutes,
      plannedMinutes,
      remainingMinutes,
      maxAttractions,
      status,
      hours,
      minutes,
    };
  }, [
    dayStart,
    dayEnd,
    attractions,
    visitMinutes,
    transitMinutes,
    mealBreakMinutes,
    extraBufferMinutes,
  ]);

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Attraction Time Planner"
      description="Estimate how many attractions fit into a travel day using visit time, transit time, meals, and buffer."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <TimeInput label="Day start time" value={dayStart} setValue={setDayStart} />
            <TimeInput label="Day end time" value={dayEnd} setValue={setDayEnd} />

            <NumberInput
              label="Number of attractions"
              value={attractions}
              setValue={setAttractions}
            />

            <NumberInput
              label="Average visit time (minutes)"
              value={visitMinutes}
              setValue={setVisitMinutes}
            />

            <NumberInput
              label="Transit time between stops (minutes)"
              value={transitMinutes}
              setValue={setTransitMinutes}
            />

            <NumberInput
              label="Meal/rest break time (minutes)"
              value={mealBreakMinutes}
              setValue={setMealBreakMinutes}
            />

            <NumberInput
              label="Extra buffer time (minutes)"
              value={extraBufferMinutes}
              setValue={setExtraBufferMinutes}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use buffer for photos, lines, bathrooms, wrong turns, shopping,
            transit delays, and “wait, this place is cooler than expected”
            moments.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Day plan estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Available day time"
                value={`${Math.floor(results.availableMinutes / 60)} hr ${
                  results.availableMinutes % 60
                } min`}
              />
              <ResultRow
                label="Planned activity time"
                value={`${results.hours} hr ${results.minutes} min`}
              />
              <ResultRow
                label="Remaining time"
                value={`${results.remainingMinutes} minutes`}
              />
              <ResultRow
                label="Estimated max attractions"
                value={`${results.maxAttractions}`}
              />
              <ResultRow label="Status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                {results.status === "Overpacked"
                  ? "This day is probably too packed. Remove a stop, shorten visits, or extend your day."
                  : results.status === "Tight"
                    ? "This day can work, but there is not much breathing room for delays."
                    : "This plan has enough room to feel realistic instead of sprinting between stops."}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid day times and attraction details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/attraction-time-planner" category="travel" />
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