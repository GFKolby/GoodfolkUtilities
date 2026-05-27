"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function EmergencyFundCalculatorPage() {
  const [housing, setHousing] = useState("1200");
  const [utilities, setUtilities] = useState("250");
  const [food, setFood] = useState("500");
  const [transportation, setTransportation] = useState("400");
  const [insurance, setInsurance] = useState("250");
  const [debtMinimums, setDebtMinimums] = useState("300");
  const [otherEssentials, setOtherEssentials] = useState("200");
  const [monthsCovered, setMonthsCovered] = useState("6");
  const [currentSavings, setCurrentSavings] = useState("1000");

  const results = useMemo(() => {
    const values = [
      Number(housing),
      Number(utilities),
      Number(food),
      Number(transportation),
      Number(insurance),
      Number(debtMinimums),
      Number(otherEssentials),
    ];

    const months = Number(monthsCovered);
    const current = Number(currentSavings);

    if (
      values.some((value) => value < 0) ||
      months <= 0 ||
      current < 0
    ) {
      return null;
    }

    const monthlyEssentials = values.reduce((sum, value) => sum + value, 0);
    const targetFund = monthlyEssentials * months;
    const remaining = Math.max(targetFund - current, 0);
    const coverageNow =
      monthlyEssentials > 0 ? current / monthlyEssentials : 0;

    let status = "Needs work";
    if (coverageNow >= months) {
      status = "Funded";
    } else if (coverageNow >= months / 2) {
      status = "In progress";
    }

    return {
      monthlyEssentials,
      targetFund,
      remaining,
      coverageNow,
      status,
    };
  }, [
    housing,
    utilities,
    food,
    transportation,
    insurance,
    debtMinimums,
    otherEssentials,
    monthsCovered,
    currentSavings,
  ]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Emergency Fund Calculator"
      description="Estimate your emergency savings target based on essential monthly expenses and the number of months you want covered."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput label="Housing ($/mo)" value={housing} setValue={setHousing} />
            <MoneyInput label="Utilities ($/mo)" value={utilities} setValue={setUtilities} />
            <MoneyInput label="Food ($/mo)" value={food} setValue={setFood} />
            <MoneyInput label="Transportation ($/mo)" value={transportation} setValue={setTransportation} />
            <MoneyInput label="Insurance/medical ($/mo)" value={insurance} setValue={setInsurance} />
            <MoneyInput label="Debt minimums ($/mo)" value={debtMinimums} setValue={setDebtMinimums} />
            <MoneyInput label="Other essentials ($/mo)" value={otherEssentials} setValue={setOtherEssentials} />
            <NumberInput label="Months of coverage" value={monthsCovered} setValue={setMonthsCovered} />
            <MoneyInput label="Current emergency savings ($)" value={currentSavings} setValue={setCurrentSavings} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Focus on essential expenses: housing, food, utilities, transportation,
            insurance, minimum debt payments, and true must-haves. The emergency
            goblin does not need your streaming bundle included.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Emergency fund estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Monthly essentials"
                value={`$${results.monthlyEssentials.toFixed(2)}`}
              />
              <ResultRow
                label="Target emergency fund"
                value={`$${results.targetFund.toFixed(2)}`}
              />
              <ResultRow
                label="Current coverage"
                value={`${results.coverageNow.toFixed(1)} months`}
              />
              <ResultRow
                label="Amount still needed"
                value={`$${results.remaining.toFixed(2)}`}
              />
              <ResultRow label="Status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                A common target is 3–6 months of essential expenses. Use a
                higher target if your income is irregular or your job situation
                feels less stable.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid emergency fund details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/emergency-fund-calculator"
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
        step="0.5"
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