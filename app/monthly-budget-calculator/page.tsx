"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function MonthlyBudgetCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState("4000");
  const [housing, setHousing] = useState("1200");
  const [utilities, setUtilities] = useState("250");
  const [food, setFood] = useState("500");
  const [transportation, setTransportation] = useState("400");
  const [debtPayments, setDebtPayments] = useState("300");
  const [subscriptions, setSubscriptions] = useState("100");
  const [savingsGoal, setSavingsGoal] = useState("400");
  const [otherExpenses, setOtherExpenses] = useState("250");

  const results = useMemo(() => {
    const income = Number(monthlyIncome);
    const housingCost = Number(housing);
    const utilityCost = Number(utilities);
    const foodCost = Number(food);
    const transportationCost = Number(transportation);
    const debtCost = Number(debtPayments);
    const subscriptionCost = Number(subscriptions);
    const savings = Number(savingsGoal);
    const other = Number(otherExpenses);

    if (
      income <= 0 ||
      housingCost < 0 ||
      utilityCost < 0 ||
      foodCost < 0 ||
      transportationCost < 0 ||
      debtCost < 0 ||
      subscriptionCost < 0 ||
      savings < 0 ||
      other < 0
    ) {
      return null;
    }

    const totalExpenses =
      housingCost +
      utilityCost +
      foodCost +
      transportationCost +
      debtCost +
      subscriptionCost +
      savings +
      other;

    const leftover = income - totalExpenses;
    const expensePercent = (totalExpenses / income) * 100;
    const savingsPercent = (savings / income) * 100;

    let status = "Balanced";
    if (leftover < 0) {
      status = "Over budget";
    } else if (leftover < income * 0.05) {
      status = "Tight";
    } else if (leftover >= income * 0.15) {
      status = "Flexible";
    }

    return {
      income,
      totalExpenses,
      leftover,
      expensePercent,
      savingsPercent,
      status,
    };
  }, [
    monthlyIncome,
    housing,
    utilities,
    food,
    transportation,
    debtPayments,
    subscriptions,
    savingsGoal,
    otherExpenses,
  ]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Monthly Budget Calculator"
      description="Build a quick monthly budget estimate from income, bills, savings, debt payments, and everyday expenses."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput label="Monthly income ($)" value={monthlyIncome} setValue={setMonthlyIncome} />
            <MoneyInput label="Housing ($)" value={housing} setValue={setHousing} />
            <MoneyInput label="Utilities ($)" value={utilities} setValue={setUtilities} />
            <MoneyInput label="Food ($)" value={food} setValue={setFood} />
            <MoneyInput label="Transportation ($)" value={transportation} setValue={setTransportation} />
            <MoneyInput label="Debt payments ($)" value={debtPayments} setValue={setDebtPayments} />
            <MoneyInput label="Subscriptions ($)" value={subscriptions} setValue={setSubscriptions} />
            <MoneyInput label="Savings goal ($)" value={savingsGoal} setValue={setSavingsGoal} />
            <MoneyInput label="Other expenses ($)" value={otherExpenses} setValue={setOtherExpenses} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This is a simple planning tool. Use it to spot pressure points,
            compare scenarios, and keep the budget goblin from chewing the wires.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Budget estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Monthly income" value={`$${results.income.toFixed(2)}`} />
              <ResultRow label="Total planned outflow" value={`$${results.totalExpenses.toFixed(2)}`} />
              <ResultRow label="Leftover money" value={`$${results.leftover.toFixed(2)}`} />
              <ResultRow label="Outflow percentage" value={`${results.expensePercent.toFixed(1)}%`} />
              <ResultRow label="Savings percentage" value={`${results.savingsPercent.toFixed(1)}%`} />
              <ResultRow label="Budget status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                {results.leftover < 0
                  ? "Your planned expenses are higher than your income. Try reducing flexible categories or lowering the savings target temporarily."
                  : "Your budget leaves money unassigned. You could use that for extra debt payoff, savings, sinking funds, or breathing room."}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid budget details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/monthly-budget-calculator" category="finance" />
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

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}