"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Profit Margin Calculator",
    "Calculate profit, profit margin, markup, and total cost from revenue and expenses."
  );

export default function ProfitMarginCalculatorPage() {
  const [revenue, setRevenue] = useState("1000");
  const [costOfGoods, setCostOfGoods] = useState("400");
  const [laborCost, setLaborCost] = useState("150");
  const [overheadCost, setOverheadCost] = useState("100");
  const [otherCosts, setOtherCosts] = useState("50");

  const results = useMemo(() => {
    const totalRevenue = Number(revenue);
    const cogs = Number(costOfGoods);
    const labor = Number(laborCost);
    const overhead = Number(overheadCost);
    const other = Number(otherCosts);

    if (
      totalRevenue <= 0 ||
      cogs < 0 ||
      labor < 0 ||
      overhead < 0 ||
      other < 0
    ) {
      return null;
    }

    const totalCosts = cogs + labor + overhead + other;
    const profit = totalRevenue - totalCosts;
    const profitMargin = (profit / totalRevenue) * 100;
    const costPercent = (totalCosts / totalRevenue) * 100;
    const markup = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

    let status = "Healthy";
    if (profit < 0) {
      status = "Losing money";
    } else if (profitMargin < 10) {
      status = "Thin margin";
    } else if (profitMargin >= 30) {
      status = "Strong margin";
    }

    return {
      totalRevenue,
      totalCosts,
      profit,
      profitMargin,
      costPercent,
      markup,
      status,
    };
  }, [revenue, costOfGoods, laborCost, overheadCost, otherCosts]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Profit Margin Calculator"
      description="Calculate profit, profit margin, markup, and total cost from revenue and expenses."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput label="Revenue ($)" value={revenue} setValue={setRevenue} />
            <MoneyInput label="Cost of goods/services ($)" value={costOfGoods} setValue={setCostOfGoods} />
            <MoneyInput label="Labor cost ($)" value={laborCost} setValue={setLaborCost} />
            <MoneyInput label="Overhead cost ($)" value={overheadCost} setValue={setOverheadCost} />
            <MoneyInput label="Other costs ($)" value={otherCosts} setValue={setOtherCosts} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use this to estimate whether a product, service, project, or client
            job is actually profitable after direct and indirect costs.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Margin estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Revenue" value={`$${results.totalRevenue.toFixed(2)}`} />
              <ResultRow label="Total costs" value={`$${results.totalCosts.toFixed(2)}`} />
              <ResultRow label="Profit" value={`$${results.profit.toFixed(2)}`} />
              <ResultRow label="Profit margin" value={`${results.profitMargin.toFixed(2)}%`} />
              <ResultRow label="Cost percentage" value={`${results.costPercent.toFixed(2)}%`} />
              <ResultRow label="Markup" value={`${results.markup.toFixed(2)}%`} />
              <ResultRow label="Status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Profit margin shows profit as a percentage of revenue. Markup
                shows profit as a percentage of cost.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid revenue and cost values to calculate margin.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/profit-margin-calculator" category="business" />
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