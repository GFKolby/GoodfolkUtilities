"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Travel Day Cost Calculator",
    "Estimate the cost of a single travel day from meals, transit, rideshares, activities, shopping, and buffer."
  );

export default function TravelDayCostCalculatorPage() {
  const [travelers, setTravelers] = useState("1");
  const [breakfast, setBreakfast] = useState("10");
  const [lunch, setLunch] = useState("18");
  const [dinner, setDinner] = useState("30");
  const [snacksCoffee, setSnacksCoffee] = useState("12");
  const [localTransit, setLocalTransit] = useState("20");
  const [rideshareTaxi, setRideshareTaxi] = useState("25");
  const [activities, setActivities] = useState("40");
  const [shoppingMisc, setShoppingMisc] = useState("20");
  const [bufferPercent, setBufferPercent] = useState("15");

  const results = useMemo(() => {
    const people = Number(travelers);
    const breakfastCost = Number(breakfast);
    const lunchCost = Number(lunch);
    const dinnerCost = Number(dinner);
    const snackCost = Number(snacksCoffee);
    const transitCost = Number(localTransit);
    const rideshareCost = Number(rideshareTaxi);
    const activityCost = Number(activities);
    const miscCost = Number(shoppingMisc);
    const buffer = Number(bufferPercent);

    if (
      people <= 0 ||
      breakfastCost < 0 ||
      lunchCost < 0 ||
      dinnerCost < 0 ||
      snackCost < 0 ||
      transitCost < 0 ||
      rideshareCost < 0 ||
      activityCost < 0 ||
      miscCost < 0 ||
      buffer < 0
    ) {
      return null;
    }

    const foodPerPerson = breakfastCost + lunchCost + dinnerCost + snackCost;
    const foodTotal = foodPerPerson * people;
    const transportTotal = transitCost + rideshareCost;
    const subtotal = foodTotal + transportTotal + activityCost + miscCost;
    const bufferAmount = subtotal * (buffer / 100);
    const totalDayCost = subtotal + bufferAmount;
    const costPerPerson = totalDayCost / people;

    return {
      foodPerPerson,
      foodTotal,
      transportTotal,
      activityCost,
      miscCost,
      subtotal,
      bufferAmount,
      totalDayCost,
      costPerPerson,
    };
  }, [
    travelers,
    breakfast,
    lunch,
    dinner,
    snacksCoffee,
    localTransit,
    rideshareTaxi,
    activities,
    shoppingMisc,
    bufferPercent,
  ]);

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Travel Day Cost Calculator"
      description="Estimate the cost of a single travel day from meals, transit, rideshares, activities, shopping, and buffer."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Travelers"
              value={travelers}
              setValue={setTravelers}
            />

            <MoneyInput label="Breakfast per person ($)" value={breakfast} setValue={setBreakfast} />
            <MoneyInput label="Lunch per person ($)" value={lunch} setValue={setLunch} />
            <MoneyInput label="Dinner per person ($)" value={dinner} setValue={setDinner} />
            <MoneyInput label="Snacks / coffee per person ($)" value={snacksCoffee} setValue={setSnacksCoffee} />
            <MoneyInput label="Local transit total ($)" value={localTransit} setValue={setLocalTransit} />
            <MoneyInput label="Rideshare / taxi total ($)" value={rideshareTaxi} setValue={setRideshareTaxi} />
            <MoneyInput label="Activities / tickets total ($)" value={activities} setValue={setActivities} />
            <MoneyInput label="Shopping / misc total ($)" value={shoppingMisc} setValue={setShoppingMisc} />
            <NumberInput label="Buffer (%)" value={bufferPercent} setValue={setBufferPercent} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use this for one full day in a city, park, beach town, or travel
            stop. It helps compare cheap days, splurge days, and “oops we took
            three Ubers” days.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Daily cost estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Food per person"
                value={`$${results.foodPerPerson.toFixed(2)}`}
              />
              <ResultRow
                label="Food total"
                value={`$${results.foodTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Transportation total"
                value={`$${results.transportTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Activities"
                value={`$${results.activityCost.toFixed(2)}`}
              />
              <ResultRow
                label="Shopping / misc"
                value={`$${results.miscCost.toFixed(2)}`}
              />
              <ResultRow
                label="Subtotal"
                value={`$${results.subtotal.toFixed(2)}`}
              />
              <ResultRow
                label="Buffer"
                value={`$${results.bufferAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated day total"
                value={`$${results.totalDayCost.toFixed(2)}`}
              />
              <ResultRow
                label="Cost per person"
                value={`$${results.costPerPerson.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Use a few versions of this: budget day, normal day, and splurge
                day. Then mix those into your full trip budget.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid daily travel costs to see the estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/travel-day-cost-calculator"
        category="travel"
      />
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