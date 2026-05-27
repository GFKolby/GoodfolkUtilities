"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function RoomSizeCalculator() {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(10);
  const [wastePercent, setWastePercent] = useState(10);
  const [costPerSqFt, setCostPerSqFt] = useState(3.5);

  const results = useMemo(() => {
    const squareFeet = length * width;
    const squareYards = squareFeet / 9;
    const perimeter = 2 * (length + width);
    const wasteMultiplier = 1 + wastePercent / 100;
    const flooringNeeded = squareFeet * wasteMultiplier;
    const estimatedCost = flooringNeeded * costPerSqFt;

    return {
      squareFeet,
      squareYards,
      perimeter,
      flooringNeeded,
      estimatedCost,
    };
  }, [length, width, wastePercent, costPerSqFt]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Room Size Calculator"
      description="Calculate room square footage, square yards, perimeter, flooring needs, and estimated flooring cost."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Room Length (ft)
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Room Width (ft)
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Flooring Waste Buffer %
            </span>
            <input
              type="number"
              min="0"
              step="1"
              value={wastePercent}
              onChange={(e) => setWastePercent(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Cost Per Sq Ft
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={costPerSqFt}
              onChange={(e) => setCostPerSqFt(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Room Area
        </p>

        <p className="mt-2 text-5xl font-bold">
          {results.squareFeet.toFixed(2)} sq ft
        </p>

        <p className="mt-3 text-slate-800">
          About <strong>{results.squareYards.toFixed(2)} sq yd</strong>
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="font-semibold text-white">Project Estimate</p>

        <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
          <p>
            Perimeter: <strong>{results.perimeter.toFixed(2)} ft</strong>
          </p>
          <p>
            Flooring with buffer:{" "}
            <strong>{results.flooringNeeded.toFixed(2)} sq ft</strong>
          </p>
          <p>
            Estimated flooring cost:{" "}
            <strong>{money(results.estimatedCost)}</strong>
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This is a planning estimate. Flooring needs can vary based on cuts,
        layout, pattern matching, thresholds, closets, and tiny renovation goblins.
      </p>

      <RelatedTools currentHref="/room-size-calculator" line="home" />
    </ToolPage>
  );
}