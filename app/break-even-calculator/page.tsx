"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Break-Even Calculator",
    "Calculate how many units or sales you need to cover fixed and variable costs."
  );

export default function BreakEvenCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState("2000");
  const [pricePerUnit, setPricePerUnit] = useState("50");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("20");
  const [targetProfit, setTargetProfit] = useState("1000");

  const results = useMemo(() => {
    const fixed = Number(fixedCosts);
    const price = Number(pricePerUnit);
    const variable = Number(variableCostPerUnit);
    const target = Number(targetProfit);

    if (fixed < 0 || price <= 0 || variable < 0 || target < 0) {
      return null;
    }

    const contributionMargin = price - variable;

    if (contributionMargin <= 0) {
      return {
        possible: false as const,
        contributionMargin,
      };
    }

    const breakEvenUnits = Math.ceil(fixed / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * price;
    const unitsForTargetProfit = Math.ceil((fixed + target) / contributionMargin);
    const revenueForTargetProfit = unitsForTargetProfit * price;
    const contributionMarginPercent = (contributionMargin / price) * 100;

    return {
      possible: true as const,
      contributionMargin,
      contributionMarginPercent,
      breakEvenUnits,
      breakEvenRevenue,
      unitsForTargetProfit,
      revenueForTargetProfit,
    };
  }, [fixedCosts, pricePerUnit, variableCostPerUnit, targetProfit]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Break-Even Calculator"
      description="Calculate how many units or sales you need to cover fixed and variable costs."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Fixed costs ($)"
              value={fixedCosts}
              setValue={setFixedCosts}
            />

            <MoneyInput
              label="Selling price per unit ($)"
              value={pricePerUnit}
              setValue={setPricePerUnit}
            />

            <MoneyInput
              label="Variable cost per unit ($)"
              value={variableCostPerUnit}
              setValue={setVariableCostPerUnit}
            />

            <MoneyInput
              label="Target profit ($)"
              value={targetProfit}
              setValue={setTargetProfit}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Fixed costs stay mostly the same regardless of sales. Variable costs
            increase with each unit sold.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Break-even estimate</h2>

          {results ? (
            results.possible ? (
              <div className="mt-6 space-y-4">
                <ResultRow
                  label="Contribution margin per unit"
                  value={`$${results.contributionMargin.toFixed(2)}`}
                />
                <ResultRow
                  label="Contribution margin %"
                  value={`${results.contributionMarginPercent.toFixed(2)}%`}
                />
                <ResultRow
                  label="Break-even units"
                  value={`${results.breakEvenUnits}`}
                />
                <ResultRow
                  label="Break-even revenue"
                  value={`$${results.breakEvenRevenue.toFixed(2)}`}
                />
                <ResultRow
                  label="Units for target profit"
                  value={`${results.unitsForTargetProfit}`}
                />
                <ResultRow
                  label="Revenue for target profit"
                  value={`$${results.revenueForTargetProfit.toFixed(2)}`}
                />

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                  Break-even happens when total contribution margin covers your
                  fixed costs. After that point, each additional sale contributes
                  toward profit.
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-red-400/30 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Your selling price must be higher than your variable cost per
                unit to break even. Current contribution margin is{" "}
                <span className="font-semibold text-white">
                  ${results.contributionMargin.toFixed(2)}
                </span>
                .
              </div>
            )
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid break-even values to calculate units and revenue.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/break-even-calculator" category="business" />
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
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}