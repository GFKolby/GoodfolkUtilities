"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

const electricityGuides = [
  {
    href: "/blog/how-much-does-electricity-cost-per-month",
    title: "How Much Does Electricity Cost Per Month?",
    description:
      "Understand what affects a household electric bill and how monthly costs are estimated.",
  },
  {
    href: "/blog/what-uses-the-most-electricity-in-a-home",
    title: "What Uses The Most Electricity In A Home?",
    description:
      "See which appliances and home systems are likely to have the biggest effect on usage.",
  },
  {
    href: "/blog/why-is-my-electric-bill-so-high",
    title: "Why Is My Electric Bill So High?",
    description:
      "Work through common reasons an electric bill increases and what to check first.",
  },
  {
    href: "/blog/how-to-read-your-electric-bill",
    title: "How To Read Your Electric Bill",
    description:
      "Find the kWh usage, rate, billing period, meter details, and fees on your bill.",
  },
];

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

      <section className="mt-10">
        <p className="text-sm font-semibold text-amber-300">
          Learn More About Electricity Costs
        </p>

        <p className="mt-2 max-w-2xl text-zinc-400">
          Use these practical guides to understand your bill, compare usage,
          and find the biggest electricity costs around your home.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {electricityGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-amber-300/60 hover:bg-slate-800"
            >
              <h2 className="font-semibold text-white">{guide.title}</h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {guide.description}
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-amber-300 transition group-hover:translate-x-1">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <RelatedTools currentHref="/electric-cost-calculator" category="home" />
    </ToolPage>
  );
}
