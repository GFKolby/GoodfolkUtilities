"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Road Trip Gas Calculator",
    "Estimate road trip fuel cost from distance, MPG, gas price, and one-way or round-trip travel."
  );

export default function RoadTripGasCalculatorPage() {
  const [distance, setDistance] = useState("500");
  const [mpg, setMpg] = useState("25");
  const [gasPrice, setGasPrice] = useState("3.25");
  const [tripType, setTripType] = useState<"oneWay" | "roundTrip">("roundTrip");
  const [bufferPercent, setBufferPercent] = useState("10");

  const results = useMemo(() => {
    const oneWayDistance = Number(distance);
    const milesPerGallon = Number(mpg);
    const pricePerGallon = Number(gasPrice);
    const buffer = Number(bufferPercent);

    if (
      oneWayDistance <= 0 ||
      milesPerGallon <= 0 ||
      pricePerGallon < 0 ||
      buffer < 0
    ) {
      return null;
    }

    const totalMiles =
      tripType === "roundTrip" ? oneWayDistance * 2 : oneWayDistance;

    const gallonsNeeded = totalMiles / milesPerGallon;
    const fuelCost = gallonsNeeded * pricePerGallon;
    const bufferAmount = fuelCost * (buffer / 100);
    const totalFuelCost = fuelCost + bufferAmount;
    const costPerMile = totalFuelCost / totalMiles;

    return {
      totalMiles,
      gallonsNeeded,
      fuelCost,
      bufferAmount,
      totalFuelCost,
      costPerMile,
    };
  }, [distance, mpg, gasPrice, tripType, bufferPercent]);

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Road Trip Gas Calculator"
      description="Estimate road trip fuel cost from distance, MPG, gas price, and one-way or round-trip travel."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="One-way distance (miles)"
              value={distance}
              setValue={setDistance}
            />

            <NumberInput label="Vehicle MPG" value={mpg} setValue={setMpg} />

            <MoneyInput
              label="Gas price per gallon ($)"
              value={gasPrice}
              setValue={setGasPrice}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Trip type</span>
              <select
                value={tripType}
                onChange={(event) =>
                  setTripType(event.target.value as "oneWay" | "roundTrip")
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="oneWay">One-way</option>
                <option value="roundTrip">Round trip</option>
              </select>
            </label>

            <NumberInput
              label="Fuel buffer (%)"
              value={bufferPercent}
              setValue={setBufferPercent}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Add a fuel buffer for detours, idling, traffic, mountain driving, or
            city miles that reduce real-world MPG.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Fuel estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Total miles"
                value={`${results.totalMiles.toFixed(1)} mi`}
              />
              <ResultRow
                label="Gallons needed"
                value={`${results.gallonsNeeded.toFixed(2)} gal`}
              />
              <ResultRow
                label="Fuel cost before buffer"
                value={`$${results.fuelCost.toFixed(2)}`}
              />
              <ResultRow
                label="Buffer amount"
                value={`$${results.bufferAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated fuel cost"
                value={`$${results.totalFuelCost.toFixed(2)}`}
              />
              <ResultRow
                label="Cost per mile"
                value={`$${results.costPerMile.toFixed(3)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Real fuel cost can change with gas prices, terrain, traffic,
                speed, cargo weight, and vehicle condition.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid trip and vehicle details to see your fuel estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/road-trip-gas-calculator" category="travel" />
    </ToolPage>
  );
}

function MoneyInput({
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
        step="0.01"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
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
        step="0.01"
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