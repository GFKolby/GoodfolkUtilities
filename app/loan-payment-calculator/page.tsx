"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Loan Payment Calculator",
    "Estimate a loan payment based on amount, APR, term length, and optional extra monthly payment."
  );

export default function LoanPaymentCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("15000");
  const [apr, setApr] = useState("8");
  const [termYears, setTermYears] = useState("5");
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState("0");

  const results = useMemo(() => {
    const principal = Number(loanAmount);
    const annualRate = Number(apr);
    const years = Number(termYears);
    const extra = Number(extraMonthlyPayment);

    if (principal <= 0 || annualRate < 0 || years <= 0 || extra < 0) {
      return null;
    }

    const months = Math.round(years * 12);
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment = principal / months;

    if (monthlyRate > 0) {
      monthlyPayment =
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    }

    const scheduledTotalPaid = monthlyPayment * months;
    const scheduledInterest = scheduledTotalPaid - principal;

    let balance = principal;
    let acceleratedMonths = 0;
    let acceleratedInterest = 0;
    const acceleratedPayment = monthlyPayment + extra;

    while (balance > 0 && acceleratedMonths < 1200) {
      const interest = balance * monthlyRate;
      const principalPayment = Math.min(
        acceleratedPayment - interest,
        balance
      );

      if (principalPayment <= 0) {
        return {
          impossible: true as const,
          monthlyPayment,
          acceleratedPayment,
          monthlyInterest: interest,
        };
      }

      balance -= principalPayment;
      acceleratedInterest += interest;
      acceleratedMonths += 1;
    }

    const monthsSaved = Math.max(months - acceleratedMonths, 0);
    const interestSaved = Math.max(scheduledInterest - acceleratedInterest, 0);

    return {
      impossible: false as const,
      months,
      monthlyPayment,
      scheduledTotalPaid,
      scheduledInterest,
      acceleratedPayment,
      acceleratedMonths,
      acceleratedInterest,
      monthsSaved,
      interestSaved,
    };
  }, [loanAmount, apr, termYears, extraMonthlyPayment]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Loan Payment Calculator"
      description="Estimate a loan payment based on amount, APR, term length, and optional extra monthly payment."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Loan amount ($)"
              value={loanAmount}
              setValue={setLoanAmount}
            />

            <NumberInput label="APR (%)" value={apr} setValue={setApr} />

            <NumberInput
              label="Loan term (years)"
              value={termYears}
              setValue={setTermYears}
            />

            <MoneyInput
              label="Extra monthly payment ($)"
              value={extraMonthlyPayment}
              setValue={setExtraMonthlyPayment}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This estimate assumes a fixed APR and regular monthly payments. It
            does not include taxes, fees, insurance, or lender-specific terms.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Loan estimate</h2>

          {results ? (
            results.impossible ? (
              <div className="mt-6 rounded-xl border border-red-400/30 bg-slate-950 p-4 text-zinc-300">
                The payment may not be enough to cover monthly interest. Monthly
                interest is about{" "}
                <span className="font-semibold text-white">
                  ${(results.monthlyInterest ?? 0).toFixed(2)}
                </span>
                .
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <ResultRow
                  label="Estimated monthly payment"
                  value={`$${results.monthlyPayment.toFixed(2)}`}
                />
                <ResultRow
                  label="Scheduled loan term"
                  value={`${results.months} months`}
                />
                <ResultRow
                  label="Scheduled total interest"
                  value={`$${results.scheduledInterest.toFixed(2)}`}
                />
                <ResultRow
                  label="Scheduled total paid"
                  value={`$${results.scheduledTotalPaid.toFixed(2)}`}
                />
                <ResultRow
                  label="Payment with extra"
                  value={`$${results.acceleratedPayment.toFixed(2)}`}
                />
                <ResultRow
                  label="Payoff with extra"
                  value={`${results.acceleratedMonths} months`}
                />
                <ResultRow
                  label="Months saved"
                  value={`${results.monthsSaved}`}
                />
                <ResultRow
                  label="Interest saved"
                  value={`$${results.interestSaved.toFixed(2)}`}
                />

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                  Extra payments can reduce interest and shorten the payoff
                  timeline. Check whether your lender allows extra principal
                  payments without penalties.
                </div>
              </div>
            )
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid loan details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/loan-payment-calculator" category="finance" />
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