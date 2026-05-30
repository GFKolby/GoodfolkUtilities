"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Wallpaper Calculator",
    "Estimate wallpaper rolls and material cost for an accent wall, room, or small home project."
  );

export default function WallpaperCalculatorPage() {
  const [wallWidth, setWallWidth] = useState("12");
  const [wallHeight, setWallHeight] = useState("8");
  const [wallCount, setWallCount] = useState("1");
  const [rollCoverage, setRollCoverage] = useState("30");
  const [patternWaste, setPatternWaste] = useState("10");
  const [openingsArea, setOpeningsArea] = useState("0");
  const [costPerRoll, setCostPerRoll] = useState("35");

  const results = useMemo(() => {
    const width = Number(wallWidth);
    const height = Number(wallHeight);
    const walls = Number(wallCount);
    const coverage = Number(rollCoverage);
    const waste = Number(patternWaste);
    const openings = Number(openingsArea);
    const rollCost = Number(costPerRoll);

    if (
      width <= 0 ||
      height <= 0 ||
      walls <= 0 ||
      coverage <= 0 ||
      waste < 0 ||
      openings < 0 ||
      rollCost < 0
    ) {
      return null;
    }

    const grossArea = width * height * walls;
    const netArea = Math.max(grossArea - openings, 0);
    const wasteArea = netArea * (waste / 100);
    const totalArea = netArea + wasteArea;
    const rollsNeeded = Math.ceil(totalArea / coverage);
    const estimatedCost = rollsNeeded * rollCost;

    return {
      grossArea,
      netArea,
      wasteArea,
      totalArea,
      rollsNeeded,
      estimatedCost,
    };
  }, [
    wallWidth,
    wallHeight,
    wallCount,
    rollCoverage,
    patternWaste,
    openingsArea,
    costPerRoll,
  ]);

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Wallpaper Calculator"
      description="Estimate wallpaper rolls and material cost for an accent wall, room, or small home project."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Wall width (ft)</span>
              <input
                type="number"
                min="0"
                value={wallWidth}
                onChange={(event) => setWallWidth(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Wall height (ft)</span>
              <input
                type="number"
                min="0"
                value={wallHeight}
                onChange={(event) => setWallHeight(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Number of walls</span>
              <input
                type="number"
                min="1"
                value={wallCount}
                onChange={(event) => setWallCount(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">
                Roll coverage (sq ft)
              </span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={rollCoverage}
                onChange={(event) => setRollCoverage(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">
                Pattern/waste allowance (%)
              </span>
              <input
                type="number"
                min="0"
                value={patternWaste}
                onChange={(event) => setPatternWaste(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">
                Door/window area to subtract (sq ft)
              </span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={openingsArea}
                onChange={(event) => setOpeningsArea(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Cost per roll ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={costPerRoll}
                onChange={(event) => setCostPerRoll(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use 0–5% waste for simple solid wallpaper, 10–15% for small pattern
            repeats, and 15–25% for large patterns or tricky cuts.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Gross wall area"
                value={`${results.grossArea.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Net wall area"
                value={`${results.netArea.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Pattern/waste allowance"
                value={`${results.wasteArea.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Total wallpaper coverage"
                value={`${results.totalArea.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Rolls needed"
                value={`${results.rollsNeeded}`}
              />
              <ResultRow
                label="Estimated material cost"
                value={`$${results.estimatedCost.toFixed(2)}`}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid wall and roll details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/wallpaper-calculator" category="home" />
    </ToolPage>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}