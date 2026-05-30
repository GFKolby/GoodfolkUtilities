"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Flight Layover Calculator",
    "Estimate whether your flight layover gives enough time for customs, bags, terminal changes, and airport size."
  );

type FlightType = "domestic" | "international";
type AirportSize = "small" | "medium" | "large";
type YesNo = "yes" | "no";

export default function FlightLayoverCalculatorPage() {
  const [layoverMinutes, setLayoverMinutes] = useState("120");
  const [flightType, setFlightType] = useState<FlightType>("international");
  const [airportSize, setAirportSize] = useState<AirportSize>("large");
  const [checkedBags, setCheckedBags] = useState<YesNo>("no");
  const [customs, setCustoms] = useState<YesNo>("yes");
  const [terminalChange, setTerminalChange] = useState<YesNo>("yes");
  const [sameAirline, setSameAirline] = useState<YesNo>("yes");

  const results = useMemo(() => {
    const available = Number(layoverMinutes);

    if (available <= 0) {
      return null;
    }

    let recommended = flightType === "international" ? 120 : 60;

    if (airportSize === "medium") {
      recommended += 15;
    }

    if (airportSize === "large") {
      recommended += 30;
    }

    if (checkedBags === "yes") {
      recommended += 30;
    }

    if (customs === "yes") {
      recommended += 45;
    }

    if (terminalChange === "yes") {
      recommended += 25;
    }

    if (sameAirline === "no") {
      recommended += 30;
    }

    const buffer = available - recommended;

    let status = "Comfortable";
    if (buffer < 0) {
      status = "Risky";
    } else if (buffer < 30) {
      status = "Tight";
    } else if (buffer >= 90) {
      status = "Very comfortable";
    }

    let recommendation =
      "This layover looks workable, but always check the airport layout and airline guidance.";
    if (status === "Risky") {
      recommendation =
        "This layover may be too short, especially if there are delays, customs, bags, or terminal changes.";
    } else if (status === "Tight") {
      recommendation =
        "This layover might work, but there is not much room for delays or long lines.";
    } else if (status === "Very comfortable") {
      recommendation =
        "This layover should give you extra breathing room for delays, food, restrooms, and gate changes.";
    }

    return {
      available,
      recommended,
      buffer,
      status,
      recommendation,
    };
  }, [
    layoverMinutes,
    flightType,
    airportSize,
    checkedBags,
    customs,
    terminalChange,
    sameAirline,
  ]);

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Flight Layover Calculator"
      description="Estimate whether your flight layover gives enough time for customs, bags, terminal changes, and airport size."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Layover time (minutes)"
              value={layoverMinutes}
              setValue={setLayoverMinutes}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Connection type</span>
              <select
                value={flightType}
                onChange={(event) =>
                  setFlightType(event.target.value as FlightType)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Airport size</span>
              <select
                value={airportSize}
                onChange={(event) =>
                  setAirportSize(event.target.value as AirportSize)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large / major hub</option>
              </select>
            </label>

            <SelectInput
              label="Checked bags involved?"
              value={checkedBags}
              setValue={setCheckedBags}
            />

            <SelectInput
              label="Customs or immigration?"
              value={customs}
              setValue={setCustoms}
            />

            <SelectInput
              label="Terminal change?"
              value={terminalChange}
              setValue={setTerminalChange}
            />

            <SelectInput
              label="Same airline or partner?"
              value={sameAirline}
              setValue={setSameAirline}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This is a planning estimate. Airport layout, airline rules, security
            lines, boarding cutoffs, delays, and passport control can all change
            the real connection time needed.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Layover estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Available layover time"
                value={`${results.available} minutes`}
              />
              <ResultRow
                label="Recommended minimum"
                value={`${results.recommended} minutes`}
              />
              <ResultRow
                label="Time buffer"
                value={`${results.buffer} minutes`}
              />
              <ResultRow label="Status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                {results.recommendation}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                For international connections, check whether you must collect
                bags, recheck bags, clear immigration, or go through security
                again before your next flight.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter a valid layover time to see the estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/flight-layover-calculator" category="travel" />
    </ToolPage>
  );
}

function SelectInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: YesNo;
  setValue: (value: YesNo) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <select
        value={value}
        onChange={(event) => setValue(event.target.value as YesNo)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </label>
  );
}

function NumberInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <input
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}