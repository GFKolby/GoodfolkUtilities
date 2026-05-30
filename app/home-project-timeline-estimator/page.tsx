"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Home Project Timeline Estimator",
    "Estimate a rough timeline for small home projects based on project type, complexity, DIY level, and schedule cushion."
  );

const projectBaseDays = {
  painting: 2,
  flooring: 3,
  tile: 5,
  landscaping: 3,
  moving: 2,
  smallRepair: 1,
  roomRefresh: 4,
  custom: 3,
};

const projectLabels = {
  painting: "Painting",
  flooring: "Flooring",
  tile: "Tile work",
  landscaping: "Landscaping",
  moving: "Moving prep",
  smallRepair: "Small repair",
  roomRefresh: "Room refresh",
  custom: "Custom project",
};

const complexityMultipliers = {
  simple: 1,
  moderate: 1.5,
  complex: 2.25,
};

const laborMultipliers = {
  pro: 0.85,
  mixed: 1,
  diy: 1.4,
};

export default function HomeProjectTimelineEstimatorPage() {
  const [projectType, setProjectType] =
    useState<keyof typeof projectBaseDays>("painting");
  const [complexity, setComplexity] =
    useState<keyof typeof complexityMultipliers>("moderate");
  const [laborType, setLaborType] =
    useState<keyof typeof laborMultipliers>("diy");
  const [hoursPerDay, setHoursPerDay] = useState("4");
  const [bufferPercent, setBufferPercent] = useState("20");

  const results = useMemo(() => {
    const dailyHours = Number(hoursPerDay);
    const buffer = Number(bufferPercent);

    if (dailyHours <= 0 || buffer < 0) {
      return null;
    }

    const baseDays = projectBaseDays[projectType];
    const adjustedDays =
      baseDays *
      complexityMultipliers[complexity] *
      laborMultipliers[laborType];

    const estimatedHours = adjustedDays * 6;
    const workingDays = Math.ceil(estimatedHours / dailyHours);
    const bufferDays = Math.ceil(workingDays * (buffer / 100));
    const totalDays = workingDays + bufferDays;

    let paceNote = "Reasonable pace";
    if (dailyHours <= 2) {
      paceNote = "Light pace";
    } else if (dailyHours >= 7) {
      paceNote = "Aggressive pace";
    }

    return {
      projectName: projectLabels[projectType],
      estimatedHours,
      workingDays,
      bufferDays,
      totalDays,
      paceNote,
    };
  }, [projectType, complexity, laborType, hoursPerDay, bufferPercent]);

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Home Project Timeline Estimator"
      description="Estimate a rough timeline for small home projects based on project type, complexity, DIY level, and schedule cushion."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Project type</span>
              <select
                value={projectType}
                onChange={(event) =>
                  setProjectType(
                    event.target.value as keyof typeof projectBaseDays
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="painting">Painting</option>
                <option value="flooring">Flooring</option>
                <option value="tile">Tile work</option>
                <option value="landscaping">Landscaping</option>
                <option value="moving">Moving prep</option>
                <option value="smallRepair">Small repair</option>
                <option value="roomRefresh">Room refresh</option>
                <option value="custom">Custom project</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Complexity</span>
              <select
                value={complexity}
                onChange={(event) =>
                  setComplexity(
                    event.target.value as keyof typeof complexityMultipliers
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="simple">Simple</option>
                <option value="moderate">Moderate</option>
                <option value="complex">Complex</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Labor style</span>
              <select
                value={laborType}
                onChange={(event) =>
                  setLaborType(
                    event.target.value as keyof typeof laborMultipliers
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="pro">Mostly pro/helped</option>
                <option value="mixed">Mixed DIY + help</option>
                <option value="diy">Mostly DIY</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">
                Hours available per day
              </span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={hoursPerDay}
                onChange={(event) => setHoursPerDay(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Buffer time (%)</span>
              <input
                type="number"
                min="0"
                value={bufferPercent}
                onChange={(event) => setBufferPercent(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This is a planning estimate, not a contractor quote. Add extra
            buffer for drying time, supply delays, bad weather, or surprise
            “why is this wall like that?” moments.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Timeline estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Project" value={results.projectName} />
              <ResultRow
                label="Estimated work time"
                value={`${results.estimatedHours.toFixed(1)} hours`}
              />
              <ResultRow
                label="Working days"
                value={`${results.workingDays}`}
              />
              <ResultRow label="Buffer days" value={`${results.bufferDays}`} />
              <ResultRow
                label="Estimated total timeline"
                value={`${results.totalDays} days`}
              />
              <ResultRow label="Pace" value={results.paceNote} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Plan for about{" "}
                <span className="font-semibold text-white">
                  {results.totalDays} days
                </span>{" "}
                from start to finish. If materials, weather, or scheduling are
                uncertain, add another cushion before promising a finish date.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid project details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/home-project-timeline-estimator"
        category="home"
      />
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