"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function HourlyRateCalculatorPage() {
  const [targetIncome, setTargetIncome] = useState("75000");
  const [businessExpenses, setBusinessExpenses] = useState("12000");
  const [taxPercent, setTaxPercent] = useState("25");
  const [profitPercent, setProfitPercent] = useState("10");
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState("25");
  const [weeksPerYear, setWeeksPerYear] = useState("48");

  const results = useMemo(() => {
    const income = Number(targetIncome);
    const expenses = Number(businessExpenses);
    const tax = Number(taxPercent);
    const profit = Number(profitPercent);
    const weeklyHours = Number(billableHoursPerWeek);
    const weeks = Number(weeksPerYear);

    if (
      income <= 0 ||
      expenses < 0 ||
      tax < 0 ||
      profit < 0 ||
      weeklyHours <= 0 ||
      weeks <= 0
    ) {
      return null;
    }

    const subtotalNeeded = income + expenses;
    const taxAmount = subtotalNeeded * (tax / 100);
    const profitAmount = subtotalNeeded * (profit / 100);
    const annualRevenueNeeded = subtotalNeeded + taxAmount + profitAmount;
    const annualBillableHours = weeklyHours * weeks;
    const hourlyRate = annualRevenueNeeded / annualBillableHours;
    const monthlyRevenueNeeded = annualRevenueNeeded / 12;

    return {
      subtotalNeeded,
      taxAmount,
      profitAmount,
      annualRevenueNeeded,
      annualBillableHours,
      hourlyRate,
      monthlyRevenueNeeded,
    };
  }, [
    targetIncome,
    businessExpenses,
    taxPercent,
    profitPercent,
    billableHoursPerWeek,
    weeksPerYear,
  ]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Hourly Rate Calculator"
      description="Calculate an hourly rate from salary goals, business expenses, taxes, profit, and billable hours."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Target yearly income ($)"
              value={targetIncome}
              setValue={setTargetIncome}
            />

            <MoneyInput
              label="Yearly business expenses ($)"
              value={businessExpenses}
              setValue={setBusinessExpenses}
            />

            <NumberInput
              label="Tax estimate (%)"
              value={taxPercent}
              setValue={setTaxPercent}
            />

            <NumberInput
              label="Desired profit cushion (%)"
              value={profitPercent}
              setValue={setProfitPercent}
            />

            <NumberInput
              label="Billable hours per week"
              value={billableHoursPerWeek}
              setValue={setBillableHoursPerWeek}
            />

            <NumberInput
              label="Working weeks per year"
              value={weeksPerYear}
              setValue={setWeeksPerYear}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Billable hours are the hours you can actually charge for, not every
            hour spent on admin, email, planning, sales, or bookkeeping.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Rate estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Income + expenses"
                value={`$${results.subtotalNeeded.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated tax reserve"
                value={`$${results.taxAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Profit cushion"
                value={`$${results.profitAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Revenue needed per year"
                value={`$${results.annualRevenueNeeded.toFixed(2)}`}
              />
              <ResultRow
                label="Revenue needed per month"
                value={`$${results.monthlyRevenueNeeded.toFixed(2)}`}
              />
              <ResultRow
                label="Annual billable hours"
                value={`${results.annualBillableHours.toFixed(0)} hrs`}
              />
              <ResultRow
                label="Recommended hourly rate"
                value={`$${results.hourlyRate.toFixed(2)}/hr`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This is a planning estimate. Your actual rate may also depend on
                market demand, experience, niche, client value, and project risk.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid income, expense, and billable hour details to estimate
              your rate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/hourly-rate-calculator" category="business" />
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