"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Tile Calculator",
    "Estimate how many tiles and boxes you need for a floor, wall, backsplash, or small home project."
  );

export default function TileCalculatorPage() {
  const [areaLength, setAreaLength] = useState("10");
  const [areaWidth, setAreaWidth] = useState("8");
  const [tileLength, setTileLength] = useState("12");
  const [tileWidth, setTileWidth] = useState("12");
  const [wastePercent, setWastePercent] = useState("10");
  const [tilesPerBox, setTilesPerBox] = useState("10");
  const [costPerBox, setCostPerBox] = useState("35");

  const results = useMemo(() => {
    const projectLengthFt = Number(areaLength);
    const projectWidthFt = Number(areaWidth);
    const tileLengthIn = Number(tileLength);
    const tileWidthIn = Number(tileWidth);
    const waste = Number(wastePercent);
    const boxTileCount = Number(tilesPerBox);
    const boxCost = Number(costPerBox);

    if (
      projectLengthFt <= 0 ||
      projectWidthFt <= 0 ||
      tileLengthIn <= 0 ||
      tileWidthIn <= 0 ||
      waste < 0 ||
      boxTileCount <= 0 ||
      boxCost < 0
    ) {
      return null;
    }

    const projectAreaSqFt = projectLengthFt * projectWidthFt;
    const tileAreaSqFt = (tileLengthIn * tileWidthIn) / 144;
    const baseTileCount = Math.ceil(projectAreaSqFt / tileAreaSqFt);
    const wasteTileCount = Math.ceil(baseTileCount * (waste / 100));
    const totalTileCount = baseTileCount + wasteTileCount;
    const boxesNeeded = Math.ceil(totalTileCount / boxTileCount);
    const estimatedCost = boxesNeeded * boxCost;

    return {
      projectAreaSqFt,
      tileAreaSqFt,
      baseTileCount,
      wasteTileCount,
      totalTileCount,
      boxesNeeded,
      estimatedCost,
    };
  }, [
    areaLength,
    areaWidth,
    tileLength,
    tileWidth,
    wastePercent,
    tilesPerBox,
    costPerBox,
  ]);

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Tile Calculator"
      description="Estimate how many tiles and boxes you need for a floor, wall, backsplash, or small home project."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">
                Project length (ft)
              </span>
              <input
                type="number"
                min="0"
                value={areaLength}
                onChange={(event) => setAreaLength(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Project width (ft)</span>
              <input
                type="number"
                min="0"
                value={areaWidth}
                onChange={(event) => setAreaWidth(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Tile length (in)</span>
              <input
                type="number"
                min="0"
                value={tileLength}
                onChange={(event) => setTileLength(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Tile width (in)</span>
              <input
                type="number"
                min="0"
                value={tileWidth}
                onChange={(event) => setTileWidth(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Waste allowance (%)</span>
              <input
                type="number"
                min="0"
                value={wastePercent}
                onChange={(event) => setWastePercent(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Tiles per box</span>
              <input
                type="number"
                min="1"
                value={tilesPerBox}
                onChange={(event) => setTilesPerBox(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Cost per box ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={costPerBox}
                onChange={(event) => setCostPerBox(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            A 10% waste allowance is common for simple layouts. Use 15–20% for
            diagonal patterns, lots of cuts, or fragile tile.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Project area"
                value={`${results.projectAreaSqFt.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Tile area"
                value={`${results.tileAreaSqFt.toFixed(2)} sq ft each`}
              />
              <ResultRow
                label="Base tiles needed"
                value={`${results.baseTileCount}`}
              />
              <ResultRow
                label="Extra tiles for waste"
                value={`${results.wasteTileCount}`}
              />
              <ResultRow
                label="Total tiles needed"
                value={`${results.totalTileCount}`}
              />
              <ResultRow label="Boxes needed" value={`${results.boxesNeeded}`} />
              <ResultRow
                label="Estimated material cost"
                value={`$${results.estimatedCost.toFixed(2)}`}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid project and tile details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/tile-calculator" category="home" />
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