"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Electric Cost Calculator",
    "Estimate how much it costs to run a device based on watts, hours used, days per month, and your electric rate."
  );

export default function ElectricCostCalculator() {
  const [watts, setWatts] = useState(100);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [ratePerKwh, setRatePerKwh] = useState(0.16);

  const results = useMemo(() => {
    const kwhPerDay = (watts * hoursPerDay) / 1000;
    const dailyCost = kwhPerDay * ratePerKwh;
    const monthlyKwh = kwhPerDay * daysPerMonth;
    const monthlyCost = monthlyKwh * ratePerKwh;
    const yearlyCost = dailyCost * 365;

    return {
      kwhPerDay,
      dailyCost,
      monthlyKwh,
      monthlyCost,
      yearlyCost,
    };
  }, [watts, hoursPerDay, daysPerMonth, ratePerKwh]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Electric Cost Calculator"
      description="Estimate how much it costs to run a device based on watts, hours used, days per month, and your electric rate."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Device Watts
            </span>
            <input
              type="number"
              min="0"
              value={watts}
              onChange={(e) => setWatts(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Hours Used Per Day
            </span>
            <input
              type="number"
              min="0"
              step="0.25"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Days Used Per Month
            </span>
            <input
              type="number"
              min="0"
              max="31"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Electric Rate Per kWh
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={ratePerKwh}
              onChange={(e) => setRatePerKwh(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Estimated Monthly Cost
        </p>

        <p className="mt-2 text-5xl font-bold">
          {money(results.monthlyCost)}
        </p>

        <p className="mt-3 text-slate-800">
          Estimated monthly usage:{" "}
          <strong>{results.monthlyKwh.toFixed(2)} kWh</strong>
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="font-semibold text-white">Cost Breakdown</p>

        <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
          <p>
            Daily usage: <strong>{results.kwhPerDay.toFixed(2)} kWh</strong>
          </p>
          <p>
            Daily cost: <strong>{money(results.dailyCost)}</strong>
          </p>
          <p>
            Monthly cost: <strong>{money(results.monthlyCost)}</strong>
          </p>
          <p>
            Yearly cost: <strong>{money(results.yearlyCost)}</strong>
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This is a planning estimate. Actual costs can vary based on your utility
        rate, device efficiency, standby power, and sneaky little electricity goblins.
      </p>

      <RelatedTools currentHref="/electric-cost-calculator" category="home" />
    </ToolPage>
  );
}