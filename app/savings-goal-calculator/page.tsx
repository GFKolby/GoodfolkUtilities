"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function SavingsGoalCalculatorPage() {
  const [goalAmount, setGoalAmount] = useState("5000");
  const [currentSavings, setCurrentSavings] = useState("500");
  const [monthlyContribution, setMonthlyContribution] = useState("250");
  const [interestRate, setInterestRate] = useState("4");

  const results = useMemo(() => {
    const goal = Number(goalAmount);
    const current = Number(currentSavings);
    const monthly = Number(monthlyContribution);
    const annualRate = Number(interestRate);

    if (goal <= 0 || current < 0 || monthly <= 0 || annualRate < 0) {
      return null;
    }

    const remaining = Math.max(goal - current, 0);
    const monthlyRate = annualRate / 100 / 12;

    let balance = current;
    let months = 0;

    while (balance < goal && months < 1200) {
      balance = balance * (1 + monthlyRate) + monthly;
      months += 1;
    }

    const years = Math.floor(months / 12);
    const leftoverMonths = months % 12;
    const totalContributed = monthly * months;
    const estimatedInterest = Math.max(balance - current - totalContributed, 0);

    return {
      remaining,
      months,
      years,
      leftoverMonths,
      finalBalance: balance,
      totalContributed,
      estimatedInterest,
      alreadyReached: current >= goal,
    };
  }, [goalAmount, currentSavings, monthlyContribution, interestRate]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Savings Goal Calculator"
      description="Estimate how long it may take to reach a savings goal based on your current savings, monthly contribution, and interest rate."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Goal amount ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={goalAmount}
                onChange={(event) => setGoalAmount(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Current savings ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={currentSavings}
                onChange={(event) => setCurrentSavings(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">
                Monthly contribution ($)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={monthlyContribution}
                onChange={(event) => setMonthlyContribution(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">
                Annual interest/APY estimate (%)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={interestRate}
                onChange={(event) => setInterestRate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This is a simple planning estimate. Actual savings growth can vary
            based on account rates, timing, fees, and contribution changes.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Savings estimate</h2>

          {results ? (
            results.alreadyReached ? (
              <div className="mt-6 rounded-xl border border-emerald-400/30 bg-slate-950 p-4 text-zinc-300">
                You have already reached this savings goal. Tiny finance goblin
                is clapping politely.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <ResultRow
                  label="Amount remaining"
                  value={`$${results.remaining.toFixed(2)}`}
                />
                <ResultRow label="Months needed" value={`${results.months}`} />
                <ResultRow
                  label="Estimated timeline"
                  value={`${results.years} years, ${results.leftoverMonths} months`}
                />
                <ResultRow
                  label="Total contributed"
                  value={`$${results.totalContributed.toFixed(2)}`}
                />
                <ResultRow
                  label="Estimated interest earned"
                  value={`$${results.estimatedInterest.toFixed(2)}`}
                />
                <ResultRow
                  label="Estimated final balance"
                  value={`$${results.finalBalance.toFixed(2)}`}
                />
              </div>
            )
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid savings details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/savings-goal-calculator" category="finance" />
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