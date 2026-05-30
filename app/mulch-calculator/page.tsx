"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function MulchCalculatorPage() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("6");
  const [depth, setDepth] = useState("3");
  const [bagSize, setBagSize] = useState("2");
  const [bagCost, setBagCost] = useState("4.50");

  const results = useMemo(() => {
    const bedLength = Number(length);
    const bedWidth = Number(width);
    const mulchDepthInches = Number(depth);
    const bagCubicFeet = Number(bagSize);
    const costPerBag = Number(bagCost);

    if (
      bedLength <= 0 ||
      bedWidth <= 0 ||
      mulchDepthInches <= 0 ||
      bagCubicFeet <= 0 ||
      costPerBag < 0
    ) {
      return null;
    }

    const areaSqFt = bedLength * bedWidth;
    const depthFeet = mulchDepthInches / 12;
    const cubicFeet = areaSqFt * depthFeet;
    const cubicYards = cubicFeet / 27;
    const bagsNeeded = Math.ceil(cubicFeet / bagCubicFeet);
    const estimatedCost = bagsNeeded * costPerBag;

    return {
      areaSqFt,
      cubicFeet,
      cubicYards,
      bagsNeeded,
      estimatedCost,
    };
  }, [length, width, depth, bagSize, bagCost]);

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Mulch Calculator"
      description="Estimate how much mulch you need for a garden bed, walkway, or landscaping project."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Bed length (ft)</span>
              <input
                type="number"
                min="0"
                value={length}
                onChange={(event) => setLength(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Bed width (ft)</span>
              <input
                type="number"
                min="0"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Mulch depth (in)</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={depth}
                onChange={(event) => setDepth(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Bag size (cu ft)</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={bagSize}
                onChange={(event) => setBagSize(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Cost per bag ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={bagCost}
                onChange={(event) => setBagCost(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Common mulch depth is around 2–3 inches for refreshing beds and 3–4
            inches for new coverage.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Bed area"
                value={`${results.areaSqFt.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Mulch volume"
                value={`${results.cubicFeet.toFixed(2)} cu ft`}
              />
              <ResultRow
                label="Cubic yards"
                value={`${results.cubicYards.toFixed(2)} cu yd`}
              />
              <ResultRow
                label="Bags needed"
                value={`${results.bagsNeeded}`}
              />
              <ResultRow
                label="Estimated bag cost"
                value={`$${results.estimatedCost.toFixed(2)}`}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid bed and bag details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/mulch-calculator" category="home" />
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