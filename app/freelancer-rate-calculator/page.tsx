"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function FreelancerRateCalculatorPage() {
  const [targetIncome, setTargetIncome] = useState("80000");
  const [expenses, setExpenses] = useState("12000");
  const [taxPercent, setTaxPercent] = useState("25");
  const [vacationWeeks, setVacationWeeks] = useState("4");
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState("24");
  const [projectHours, setProjectHours] = useState("20");
  const [profitBuffer, setProfitBuffer] = useState("15");

  const results = useMemo(() => {
    const income = Number(targetIncome);
    const yearlyExpenses = Number(expenses);
    const tax = Number(taxPercent);
    const vacation = Number(vacationWeeks);
    const billableHours = Number(billableHoursPerWeek);
    const estimatedProjectHours = Number(projectHours);
    const buffer = Number(profitBuffer);

    if (
      income <= 0 ||
      yearlyExpenses < 0 ||
      tax < 0 ||
      vacation < 0 ||
      vacation >= 52 ||
      billableHours <= 0 ||
      estimatedProjectHours <= 0 ||
      buffer < 0
    ) {
      return null;
    }

    const workingWeeks = 52 - vacation;
    const annualBillableHours = workingWeeks * billableHours;
    const baseNeed = income + yearlyExpenses;
    const taxReserve = baseNeed * (tax / 100);
    const bufferAmount = baseNeed * (buffer / 100);
    const annualRevenueTarget = baseNeed + taxReserve + bufferAmount;
    const hourlyRate = annualRevenueTarget / annualBillableHours;
    const dailyRate = hourlyRate * 8;
    const weeklyRate = hourlyRate * billableHours;
    const projectRate = hourlyRate * estimatedProjectHours;

    return {
      workingWeeks,
      annualBillableHours,
      baseNeed,
      taxReserve,
      bufferAmount,
      annualRevenueTarget,
      hourlyRate,
      dailyRate,
      weeklyRate,
      projectRate,
    };
  }, [
    targetIncome,
    expenses,
    taxPercent,
    vacationWeeks,
    billableHoursPerWeek,
    projectHours,
    profitBuffer,
  ]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Freelancer Rate Calculator"
      description="Estimate freelance hourly, daily, weekly, and project rates from income goals, expenses, taxes, and billable time."
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
              value={expenses}
              setValue={setExpenses}
            />

            <NumberInput
              label="Tax reserve (%)"
              value={taxPercent}
              setValue={setTaxPercent}
            />

            <NumberInput
              label="Vacation / non-working weeks"
              value={vacationWeeks}
              setValue={setVacationWeeks}
            />

            <NumberInput
              label="Billable hours per week"
              value={billableHoursPerWeek}
              setValue={setBillableHoursPerWeek}
            />

            <NumberInput
              label="Estimated project hours"
              value={projectHours}
              setValue={setProjectHours}
            />

            <NumberInput
              label="Profit buffer (%)"
              value={profitBuffer}
              setValue={setProfitBuffer}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Freelance rates need to cover more than salary. Include taxes,
            software, admin time, unpaid gaps, equipment, and business risk.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Freelance rate estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Working weeks"
                value={`${results.workingWeeks.toFixed(1)}`}
              />
              <ResultRow
                label="Annual billable hours"
                value={`${results.annualBillableHours.toFixed(0)} hrs`}
              />
              <ResultRow
                label="Income + expenses"
                value={`$${results.baseNeed.toFixed(2)}`}
              />
              <ResultRow
                label="Tax reserve"
                value={`$${results.taxReserve.toFixed(2)}`}
              />
              <ResultRow
                label="Profit buffer"
                value={`$${results.bufferAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Revenue target"
                value={`$${results.annualRevenueTarget.toFixed(2)}`}
              />
              <ResultRow
                label="Hourly rate"
                value={`$${results.hourlyRate.toFixed(2)}/hr`}
              />
              <ResultRow
                label="Daily rate"
                value={`$${results.dailyRate.toFixed(2)}/day`}
              />
              <ResultRow
                label="Weekly billable target"
                value={`$${results.weeklyRate.toFixed(2)}/week`}
              />
              <ResultRow
                label="Estimated project rate"
                value={`$${results.projectRate.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This estimate is a starting point. Strong positioning,
                specialized skills, urgency, and client value may justify a
                higher project price than a pure hourly calculation.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid freelance rate details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/freelancer-rate-calculator"
        category="business"
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
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}