"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function PaintCalculator() {
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [wallHeight, setWallHeight] = useState(8);
  const [coats, setCoats] = useState(2);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coveragePerGallon, setCoveragePerGallon] = useState(350);

  const results = useMemo(() => {
    const wallArea = 2 * (roomLength + roomWidth) * wallHeight;
    const doorArea = doors * 20;
    const windowArea = windows * 15;
    const paintableArea = Math.max(0, wallArea - doorArea - windowArea);
    const totalAreaWithCoats = paintableArea * coats;
    const gallons = coveragePerGallon > 0 ? totalAreaWithCoats / coveragePerGallon : 0;

    return {
      wallArea,
      doorArea,
      windowArea,
      paintableArea,
      totalAreaWithCoats,
      gallons,
      gallonsRounded: Math.ceil(gallons),
    };
  }, [
    roomLength,
    roomWidth,
    wallHeight,
    coats,
    doors,
    windows,
    coveragePerGallon,
  ]);

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Paint Calculator"
      description="Estimate how much paint you need based on room size, wall height, coats, doors, and windows."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Room Length (ft)
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={roomLength}
              onChange={(e) => setRoomLength(Number(e.target.value))}
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
              value={roomWidth}
              onChange={(e) => setRoomWidth(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Wall Height (ft)
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={wallHeight}
              onChange={(e) => setWallHeight(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Coats
            </span>
            <input
              type="number"
              min="1"
              value={coats}
              onChange={(e) => setCoats(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Doors
            </span>
            <input
              type="number"
              min="0"
              value={doors}
              onChange={(e) => setDoors(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Windows
            </span>
            <input
              type="number"
              min="0"
              value={windows}
              onChange={(e) => setWindows(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Sq Ft Per Gallon
            </span>
            <input
              type="number"
              min="1"
              value={coveragePerGallon}
              onChange={(e) => setCoveragePerGallon(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Estimated Paint Needed
        </p>

        <p className="mt-2 text-5xl font-bold">
          {results.gallonsRounded} gal
        </p>

        <p className="mt-3 text-slate-800">
          Exact estimate: <strong>{results.gallons.toFixed(2)} gallons</strong>
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="font-semibold text-white">Area Breakdown</p>

        <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
          <p>
            Wall area: <strong>{results.wallArea.toFixed(2)} sq ft</strong>
          </p>
          <p>
            Door deduction: <strong>{results.doorArea.toFixed(2)} sq ft</strong>
          </p>
          <p>
            Window deduction: <strong>{results.windowArea.toFixed(2)} sq ft</strong>
          </p>
          <p>
            Paintable area: <strong>{results.paintableArea.toFixed(2)} sq ft</strong>
          </p>
          <p>
            Area with coats: <strong>{results.totalAreaWithCoats.toFixed(2)} sq ft</strong>
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This is a planning estimate. Paint coverage varies by brand, wall texture,
        color change, primer use, and how aggressively the wall goblins drink paint.
      </p>

      <RelatedTools currentHref="/paint-calculator" line="home" />
    </ToolPage>
  );
}