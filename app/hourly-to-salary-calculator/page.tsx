"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Hourly to Salary Calculator",
    "Convert hourly pay into weekly, monthly, and yearly income estimates, including optional overtime."
  );

export default function HourlyToSalaryCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState("25");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [overtimeHours, setOvertimeHours] = useState("0");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState("1.5");

  const results = useMemo(() => {
    const rate = Number(hourlyRate);
    const regularHours = Number(hoursPerWeek);
    const weeks = Number(weeksPerYear);
    const overtime = Number(overtimeHours);
    const multiplier = Number(overtimeMultiplier);

    if (
      rate < 0 ||
      regularHours < 0 ||
      weeks <= 0 ||
      overtime < 0 ||
      multiplier < 0
    ) {
      return null;
    }

    const weeklyRegularPay = rate * regularHours;
    const weeklyOvertimePay = rate * multiplier * overtime;
    const weeklyPay = weeklyRegularPay + weeklyOvertimePay;
    const monthlyPay = (weeklyPay * weeks) / 12;
    const yearlyPay = weeklyPay * weeks;
    const effectiveHourlyRate =
      regularHours + overtime > 0 ? weeklyPay / (regularHours + overtime) : 0;

    return {
      weeklyRegularPay,
      weeklyOvertimePay,
      weeklyPay,
      monthlyPay,
      yearlyPay,
      effectiveHourlyRate,
    };
  }, [
    hourlyRate,
    hoursPerWeek,
    weeksPerYear,
    overtimeHours,
    overtimeMultiplier,
  ]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Hourly to Salary Calculator"
      description="Convert hourly pay into weekly, monthly, and yearly income estimates, including optional overtime."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Hourly rate ($)"
              value={hourlyRate}
              setValue={setHourlyRate}
            />

            <NumberInput
              label="Regular hours per week"
              value={hoursPerWeek}
              setValue={setHoursPerWeek}
            />

            <NumberInput
              label="Paid weeks per year"
              value={weeksPerYear}
              setValue={setWeeksPerYear}
            />

            <NumberInput
              label="Overtime hours per week"
              value={overtimeHours}
              setValue={setOvertimeHours}
            />

            <NumberInput
              label="Overtime multiplier"
              value={overtimeMultiplier}
              setValue={setOvertimeMultiplier}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use 52 weeks for year-round work, or reduce paid weeks if you take
            unpaid time off. Overtime is calculated separately using the
            multiplier.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Income estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Weekly regular pay"
                value={`$${results.weeklyRegularPay.toFixed(2)}`}
              />
              <ResultRow
                label="Weekly overtime pay"
                value={`$${results.weeklyOvertimePay.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated weekly pay"
                value={`$${results.weeklyPay.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated monthly pay"
                value={`$${results.monthlyPay.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated yearly pay"
                value={`$${results.yearlyPay.toFixed(2)}`}
              />
              <ResultRow
                label="Effective hourly rate"
                value={`$${results.effectiveHourlyRate.toFixed(2)}/hr`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This is a gross income estimate before taxes, deductions,
                insurance, retirement contributions, or unpaid time off.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid income details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/hourly-to-salary-calculator"
        category="finance"
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
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}