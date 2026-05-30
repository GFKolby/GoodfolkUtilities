"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function FlooringCalculatorPage() {
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");
  const [wastePercent, setWastePercent] = useState("10");
  const [costPerSqFt, setCostPerSqFt] = useState("2.50");
  const [sqFtPerBox, setSqFtPerBox] = useState("20");

  const results = useMemo(() => {
    const roomLength = Number(length);
    const roomWidth = Number(width);
    const waste = Number(wastePercent);
    const cost = Number(costPerSqFt);
    const boxCoverage = Number(sqFtPerBox);

    if (
      roomLength <= 0 ||
      roomWidth <= 0 ||
      waste < 0 ||
      cost < 0 ||
      boxCoverage <= 0
    ) {
      return null;
    }

    const roomArea = roomLength * roomWidth;
    const wasteArea = roomArea * (waste / 100);
    const totalArea = roomArea + wasteArea;
    const boxesNeeded = Math.ceil(totalArea / boxCoverage);
    const estimatedCost = totalArea * cost;

    return {
      roomArea,
      wasteArea,
      totalArea,
      boxesNeeded,
      estimatedCost,
    };
  }, [length, width, wastePercent, costPerSqFt, sqFtPerBox]);

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Flooring Calculator"
      description="Estimate how much flooring you need, including waste allowance, box count, and material cost."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Room length (ft)</span>
              <input
                type="number"
                min="0"
                value={length}
                onChange={(event) => setLength(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Room width (ft)</span>
              <input
                type="number"
                min="0"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
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
              <span className="text-sm text-zinc-300">Cost per sq ft ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={costPerSqFt}
                onChange={(event) => setCostPerSqFt(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Sq ft per box</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={sqFtPerBox}
                onChange={(event) => setSqFtPerBox(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Room area"
                value={`${results.roomArea.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Waste allowance"
                value={`${results.wasteArea.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Total flooring needed"
                value={`${results.totalArea.toFixed(2)} sq ft`}
              />
              <ResultRow
                label="Boxes needed"
                value={`${results.boxesNeeded}`}
              />
              <ResultRow
                label="Estimated material cost"
                value={`$${results.estimatedCost.toFixed(2)}`}
              />
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid room and product details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/flooring-calculator" category="home" />
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