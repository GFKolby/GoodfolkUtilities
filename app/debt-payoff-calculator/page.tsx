"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function DebtPayoffCalculatorPage() {
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("18");
  const [monthlyPayment, setMonthlyPayment] = useState("250");
  const [extraPayment, setExtraPayment] = useState("0");

  const results = useMemo(() => {
    const startingBalance = Number(balance);
    const annualRate = Number(apr);
    const basePayment = Number(monthlyPayment);
    const extra = Number(extraPayment);

    if (
      startingBalance <= 0 ||
      annualRate < 0 ||
      basePayment <= 0 ||
      extra < 0
    ) {
      return null;
    }

    const payment = basePayment + extra;
    const monthlyRate = annualRate / 100 / 12;
    let currentBalance = startingBalance;
    let months = 0;
    let totalInterest = 0;
    let totalPaid = 0;

    while (currentBalance > 0 && months < 1200) {
      const interest = currentBalance * monthlyRate;

      if (payment <= interest && monthlyRate > 0) {
        return {
          impossible: true,
          payment,
          monthlyInterest: interest,
        };
      }

      const principalPayment = Math.min(payment - interest, currentBalance);
      currentBalance -= principalPayment;
      totalInterest += interest;
      totalPaid += principalPayment + interest;
      months += 1;
    }

    const years = Math.floor(months / 12);
    const leftoverMonths = months % 12;

    return {
      impossible: false,
      payment,
      months,
      years,
      leftoverMonths,
      totalInterest,
      totalPaid,
    };
  }, [balance, apr, monthlyPayment, extraPayment]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Debt Payoff Calculator"
      description="Estimate how long it may take to pay off a debt based on balance, APR, regular payment, and extra monthly payment."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Current balance ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={balance}
                onChange={(event) => setBalance(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">APR (%)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={apr}
                onChange={(event) => setApr(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">
                Monthly payment ($)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={monthlyPayment}
                onChange={(event) => setMonthlyPayment(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">
                Extra monthly payment ($)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={extraPayment}
                onChange={(event) => setExtraPayment(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This is a simple payoff estimate. Actual results can vary based on
            fees, billing dates, changing rates, and payment timing.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Payoff estimate</h2>

          {results ? (
            results.impossible ? (
              <div className="mt-6 rounded-xl border border-red-400/30 bg-slate-950 p-4 text-zinc-300">
                Your payment may not be enough to reduce the balance because
                the monthly interest is about{" "}
                <span className="font-semibold text-white">
                  ${results.monthlyInterest.toFixed(2)}
                </span>
                . Increase the payment above the monthly interest to make
                progress.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <ResultRow
                  label="Total monthly payment"
                  value={`$${results.payment.toFixed(2)}`}
                />
                <ResultRow label="Months to payoff" value={`${results.months}`} />
                <ResultRow
                  label="Estimated timeline"
                  value={`${results.years} years, ${results.leftoverMonths} months`}
                />
                <ResultRow
                  label="Estimated interest paid"
                  value={`$${results.totalInterest.toFixed(2)}`}
                />
                <ResultRow
                  label="Estimated total paid"
                  value={`$${results.totalPaid.toFixed(2)}`}
                />
              </div>
            )
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid debt details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/debt-payoff-calculator" category="finance" />
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