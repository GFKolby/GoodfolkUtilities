"use client";

import { useMemo, useState } from "react";

import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Camp Water Planner",
    "Estimate how much water to bring for a camping trip."
  );

export default function CampWaterPlanner() {
  const [people, setPeople] = useState(1);
  const [days, setDays] = useState(2);
  const [hotWeather, setHotWeather] = useState(false);
  const [cooking, setCooking] = useState(true);
  const [hiking, setHiking] = useState("light");

  const gallons = useMemo(() => {
    let perPersonPerDay = 1;

    if (hotWeather) perPersonPerDay += 0.5;
    if (cooking) perPersonPerDay += 0.25;
    if (hiking === "light") perPersonPerDay += 0.25;
    if (hiking === "moderate") perPersonPerDay += 0.5;
    if (hiking === "heavy") perPersonPerDay += 1;

    return people * days * perPersonPerDay;
  }, [people, days, hotWeather, cooking, hiking]);

  const liters = gallons * 3.78541;

  return (
    <ToolPage
  line="Goodfolk Camp Utilities"
  title="Camp Water Planner"
  description="Estimate how much water to bring for a camping trip."
>
        <div className="grid gap-5 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              People
            </span>
            <input
              type="number"
              min="1"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3"
            />
          </label>

          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              Days
            </span>
            <input
              type="number"
              min="1"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3"
            />
          </label>

          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              Hiking Level
            </span>
            <select
              value={hiking}
              onChange={(e) => setHiking(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3"
            >
              <option value="none">None</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="heavy">Heavy</option>
            </select>
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={hotWeather}
              onChange={(e) => setHotWeather(e.target.checked)}
            />
            Hot weather
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={cooking}
              onChange={(e) => setCooking(e.target.checked)}
            />
            Cooking with water
          </label>
        </div>

        <div className="mt-8 bg-amber-300 text-slate-950 rounded-2xl p-6">
          <p className="text-sm font-semibold">
            Recommended Water
          </p>

          <p className="text-5xl font-bold mt-2">
            {gallons.toFixed(2)} gal
          </p>

          <p className="text-slate-700 mt-2">
            About {liters.toFixed(2)} liters total.
          </p>
        </div>

        <p className="text-zinc-500 text-sm mt-6">
          This is a planning estimate. Bring extra water when temperatures are high,
          when hiking heavily, or when camping somewhere without reliable water access.
        </p>
        <RelatedTools currentHref="/camp-water-planner" category="camp" />
      </ToolPage>
  );
}