"use client";

import { useMemo, useState } from "react";

import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function CampFuelEstimator() {
  const [people, setPeople] = useState(1);
  const [days, setDays] = useState(2);
  const [boilsPerDay, setBoilsPerDay] = useState(3);
  const [coldWeather, setColdWeather] = useState(false);
  const [windyConditions, setWindyConditions] = useState(false);

  const results = useMemo(() => {
    let fuelPerBoil = 7;

    if (coldWeather) fuelPerBoil += 2;
    if (windyConditions) fuelPerBoil += 3;

    const totalBoils = people * days * boilsPerDay;

    const totalFuel = totalBoils * fuelPerBoil;

    const smallCanisters = Math.ceil(totalFuel / 100);
    const mediumCanisters = Math.ceil(totalFuel / 230);

    return {
      totalBoils,
      totalFuel,
      smallCanisters,
      mediumCanisters,
    };
  }, [
    people,
    days,
    boilsPerDay,
    coldWeather,
    windyConditions,
  ]);

  return (
     <ToolPage
         line="Goodfolk Camp Utilities"
         title="Camp Battery Estimator"
         description="Estimate how much battery capacity you need for a camping trip."
    >

        <div className="grid gap-5 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <label>
            <span className="block mb-2 text-sm text-amber-300">
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
            <span className="block mb-2 text-sm text-amber-300">
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
            <span className="block mb-2 text-sm text-amber-300">
              Boils Per Person Per Day
            </span>

            <input
              type="number"
              min="1"
              value={boilsPerDay}
              onChange={(e) => setBoilsPerDay(Number(e.target.value))}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3"
            />
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={coldWeather}
              onChange={(e) => setColdWeather(e.target.checked)}
            />

            Cold Weather
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={windyConditions}
              onChange={(e) => setWindyConditions(e.target.checked)}
            />

            Windy Conditions
          </label>
        </div>

        <div className="mt-8 bg-amber-300 text-slate-900 rounded-2xl p-6">
          <p className="text-sm font-semibold text-zinc-600">
            Estimated Fuel Usage
          </p>

          <p className="text-5xl font-bold mt-2">
            {results.totalFuel.toFixed(0)} g
          </p>

          <div className="mt-4 space-y-2 text-zinc-700">
            <p>
              Total boils:{" "}
              <strong>{results.totalBoils}</strong>
            </p>

            <p>
              100g canisters needed:{" "}
              <strong>{results.smallCanisters}</strong>
            </p>

            <p>
              230g canisters needed:{" "}
              <strong>{results.mediumCanisters}</strong>
            </p>
          </div>
        </div>

        <p className="text-white text-sm mt-6">
          Estimates assume average backpacking stove efficiency. Wind, altitude,
          and stove type can significantly affect real-world fuel usage.
        </p>
        <RelatedTools currentHref="/camp-fuel-estimator" line="camp" />
    </ToolPage>
  );
}