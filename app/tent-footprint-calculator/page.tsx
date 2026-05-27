"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function TentFootprintCalculator() {
  const [tentLength, setTentLength] = useState(84);
  const [tentWidth, setTentWidth] = useState(50);
  const [edgeInset, setEdgeInset] = useState(2);
  const [unit, setUnit] = useState<"in" | "ft">("in");

  const results = useMemo(() => {
    const lengthInches = unit === "ft" ? tentLength * 12 : tentLength;
    const widthInches = unit === "ft" ? tentWidth * 12 : tentWidth;

    const footprintLength = Math.max(0, lengthInches - edgeInset * 2);
    const footprintWidth = Math.max(0, widthInches - edgeInset * 2);

    const tentAreaSqFt = (lengthInches * widthInches) / 144;
    const footprintAreaSqFt = (footprintLength * footprintWidth) / 144;

    return {
      footprintLength,
      footprintWidth,
      footprintLengthFt: footprintLength / 12,
      footprintWidthFt: footprintWidth / 12,
      tentAreaSqFt,
      footprintAreaSqFt,
    };
  }, [tentLength, tentWidth, edgeInset, unit]);

  return (
    <ToolPage
      line="Goodfolk Camp Utilities"
      title="Tent Footprint Calculator"
      description="Calculate a recommended tent footprint size so your groundsheet stays slightly smaller than your tent floor."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Measurement Unit
          </span>

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as "in" | "ft")}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          >
            <option value="in">Inches</option>
            <option value="ft">Feet</option>
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Tent Floor Length
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={tentLength}
              onChange={(e) => setTentLength(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Tent Floor Width
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={tentWidth}
              onChange={(e) => setTentWidth(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Edge Inset Per Side (inches)
          </span>

          <input
            type="number"
            min="0"
            step="0.5"
            value={edgeInset}
            onChange={(e) => setEdgeInset(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Recommended Footprint Size
        </p>

        <p className="mt-2 text-5xl font-bold">
          {results.footprintLength.toFixed(1)}&quot; × {results.footprintWidth.toFixed(1)}&quot;
        </p>

        <p className="mt-3 text-slate-800">
          About{" "}
          <strong>
            {results.footprintLengthFt.toFixed(2)} ft ×{" "}
            {results.footprintWidthFt.toFixed(2)} ft
          </strong>
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="font-semibold text-white">Area Estimate</p>

        <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
          <p>
            Tent floor area:{" "}
            <strong>{results.tentAreaSqFt.toFixed(2)} sq ft</strong>
          </p>

          <p>
            Footprint area:{" "}
            <strong>{results.footprintAreaSqFt.toFixed(2)} sq ft</strong>
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        A tent footprint should usually be slightly smaller than the tent floor
        so it does not catch rainwater and funnel it underneath your shelter.
      </p>

      <RelatedTools currentHref="/tent-footprint-calculator" line="camp" />
    </ToolPage>
  );
}