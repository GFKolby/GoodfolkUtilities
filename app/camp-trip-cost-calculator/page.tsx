"use client";

import { useMemo, useState } from "react";

import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function CampTripCostCalculator() {
  const [nights, setNights] = useState(2);
  const [campsiteCostPerNight, setCampsiteCostPerNight] = useState(35);
  const [milesRoundTrip, setMilesRoundTrip] = useState(120);
  const [mpg, setMpg] = useState(25);
  const [gasPrice, setGasPrice] = useState(3.25);
  const [foodCostPerDay, setFoodCostPerDay] = useState(20);
  const [people, setPeople] = useState(1);
  const [fees, setFees] = useState(10);
  const [gearCost, setGearCost] = useState(0);

  const results = useMemo(() => {
    const days = nights + 1;

    const campsiteTotal = nights * campsiteCostPerNight;
    const fuelGallons = mpg > 0 ? milesRoundTrip / mpg : 0;
    const fuelTotal = fuelGallons * gasPrice;
    const foodTotal = foodCostPerDay * days * people;
    const tripTotal = campsiteTotal + fuelTotal + foodTotal + fees + gearCost;
    const perPerson = people > 0 ? tripTotal / people : tripTotal;
    const perNight = nights > 0 ? tripTotal / nights : tripTotal;

    return {
      days,
      campsiteTotal,
      fuelGallons,
      fuelTotal,
      foodTotal,
      tripTotal,
      perPerson,
      perNight,
    };
  }, [
    nights,
    campsiteCostPerNight,
    milesRoundTrip,
    mpg,
    gasPrice,
    foodCostPerDay,
    people,
    fees,
    gearCost,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <ToolPage
      line="Goodfolk Camp Utilities"
      title="Camp Trip Cost Calculator"
      description="Estimate the total cost of a camping trip, including campsite fees, gas, food, gear, and extra fees."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Trip Nights
            </span>
            <input
              type="number"
              min="1"
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              People
            </span>
            <input
              type="number"
              min="1"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Campsite Cost Per Night
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={campsiteCostPerNight}
              onChange={(e) => setCampsiteCostPerNight(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Food Cost Per Person Per Day
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={foodCostPerDay}
              onChange={(e) => setFoodCostPerDay(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Round Trip Miles
            </span>
            <input
              type="number"
              min="0"
              value={milesRoundTrip}
              onChange={(e) => setMilesRoundTrip(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Vehicle MPG
            </span>
            <input
              type="number"
              min="1"
              value={mpg}
              onChange={(e) => setMpg(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Gas Price Per Gallon
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={gasPrice}
              onChange={(e) => setGasPrice(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Extra Fees / Parking / Permits
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={fees}
              onChange={(e) => setFees(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              New Gear / Supplies
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={gearCost}
              onChange={(e) => setGearCost(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Estimated Trip Cost
        </p>

        <p className="mt-2 text-5xl font-bold">
          {money(results.tripTotal)}
        </p>

        <div className="mt-4 space-y-2 text-slate-800">
          <p>
            Per person: <strong>{money(results.perPerson)}</strong>
          </p>
          <p>
            Per night: <strong>{money(results.perNight)}</strong>
          </p>
          <p>
            Trip length:{" "}
            <strong>
              {results.days} days / {nights} nights
            </strong>
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="font-semibold text-white">Cost Breakdown</p>

        <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
          <p>
            Campsite: <strong>{money(results.campsiteTotal)}</strong>
          </p>
          <p>
            Gas: <strong>{money(results.fuelTotal)}</strong>
          </p>
          <p>
            Food: <strong>{money(results.foodTotal)}</strong>
          </p>
          <p>
            Fees: <strong>{money(fees)}</strong>
          </p>
          <p>
            Gear/Supplies: <strong>{money(gearCost)}</strong>
          </p>
          <p>
            Fuel needed:{" "}
            <strong>{results.fuelGallons.toFixed(2)} gallons</strong>
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This is a planning estimate. Add a buffer for firewood, snacks, forgotten
        supplies, and the classic “I need one more camp gadget” situation.
      </p>
      <RelatedTools currentHref="/camp-trip-cost-calculator" line="camp" />
    </ToolPage>
  );
}