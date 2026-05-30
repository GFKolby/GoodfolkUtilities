"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function MarkupCalculatorPage() {
  const [cost, setCost] = useState("50");
  const [markupPercent, setMarkupPercent] = useState("40");
  const [quantity, setQuantity] = useState("1");

  const results = useMemo(() => {
    const itemCost = Number(cost);
    const markup = Number(markupPercent);
    const itemQuantity = Number(quantity);

    if (itemCost < 0 || markup < 0 || itemQuantity <= 0) {
      return null;
    }

    const markupAmount = itemCost * (markup / 100);
    const sellingPrice = itemCost + markupAmount;
    const marginPercent =
      sellingPrice > 0 ? (markupAmount / sellingPrice) * 100 : 0;

    const totalCost = itemCost * itemQuantity;
    const totalRevenue = sellingPrice * itemQuantity;
    const totalProfit = markupAmount * itemQuantity;

    return {
      itemCost,
      markupAmount,
      sellingPrice,
      marginPercent,
      totalCost,
      totalRevenue,
      totalProfit,
    };
  }, [cost, markupPercent, quantity]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Markup Calculator"
      description="Calculate selling price, markup amount, profit margin, and total profit from cost and markup percentage."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput label="Item cost ($)" value={cost} setValue={setCost} />

            <NumberInput
              label="Markup (%)"
              value={markupPercent}
              setValue={setMarkupPercent}
            />

            <NumberInput
              label="Quantity"
              value={quantity}
              setValue={setQuantity}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Markup is based on cost. Margin is based on selling price. They are
            related, but they are not the same number.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Markup estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Item cost"
                value={`$${results.itemCost.toFixed(2)}`}
              />
              <ResultRow
                label="Markup amount"
                value={`$${results.markupAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Selling price"
                value={`$${results.sellingPrice.toFixed(2)}`}
              />
              <ResultRow
                label="Profit margin"
                value={`${results.marginPercent.toFixed(2)}%`}
              />
              <ResultRow
                label="Total cost"
                value={`$${results.totalCost.toFixed(2)}`}
              />
              <ResultRow
                label="Total revenue"
                value={`$${results.totalRevenue.toFixed(2)}`}
              />
              <ResultRow
                label="Total profit"
                value={`$${results.totalProfit.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Example: a 50% markup does not mean a 50% margin. If something
                costs $100 and sells for $150, the markup is 50%, but the margin
                is 33.33%.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid cost, markup, and quantity values to calculate price.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/markup-calculator" category="business" />
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