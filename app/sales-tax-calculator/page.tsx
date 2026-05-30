"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import FAQ from "@/components/FAQ";

export default function SalesTaxCalculatorPage() {
  const [price, setPrice] = useState("100");
  const [taxRate, setTaxRate] = useState("8");
  const [mode, setMode] = useState<"addTax" | "includedTax">("addTax");

  const results = useMemo(() => {
    const amount = Number(price);
    const rate = Number(taxRate);

    if (amount < 0 || rate < 0) {
      return null;
    }

    if (mode === "includedTax") {
      const preTaxPrice = amount / (1 + rate / 100);
      const taxAmount = amount - preTaxPrice;

      return {
        preTaxPrice,
        taxAmount,
        finalTotal: amount,
        effectiveRate: rate,
      };
    }

    const taxAmount = amount * (rate / 100);
    const finalTotal = amount + taxAmount;

    return {
      preTaxPrice: amount,
      taxAmount,
      finalTotal,
      effectiveRate: rate,
    };
  }, [price, taxRate, mode]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Sales Tax Calculator"
      description="Calculate sales tax, pre-tax price, final total, and tax amount from a tax rate."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label={mode === "addTax" ? "Pre-tax price ($)" : "Final total with tax ($)"}
              value={price}
              setValue={setPrice}
            />

            <NumberInput
              label="Sales tax rate (%)"
              value={taxRate}
              setValue={setTaxRate}
            />

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Calculation mode</span>
              <select
                value={mode}
                onChange={(event) =>
                  setMode(event.target.value as "addTax" | "includedTax")
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="addTax">Add tax to pre-tax price</option>
                <option value="includedTax">Find tax inside final total</option>
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use this to estimate tax on products, invoices, retail purchases, or
            to back out the pre-tax price from a tax-included total.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Sales tax estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Pre-tax price"
                value={`$${results.preTaxPrice.toFixed(2)}`}
              />
              <ResultRow
                label="Tax rate"
                value={`${results.effectiveRate.toFixed(2)}%`}
              />
              <ResultRow
                label="Sales tax"
                value={`$${results.taxAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Final total"
                value={`$${results.finalTotal.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Sales tax rules vary by location, product type, exemptions, and
                business requirements. Use this as a quick estimate, not tax
                advice.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter a valid price and tax rate to calculate sales tax.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/sales-tax-calculator" category="business" />
      <FAQ
        items={[
          {
            question: "What is sales tax?",
            answer:
              "Sales tax is a percentage-based tax applied to the sale of goods and services. It is typically collected by the seller and passed on to the government.",
          },
          {
            question: "How do I calculate sales tax?",
            answer:
              "To calculate sales tax, multiply the pre-tax price by the tax rate (as a decimal). For example, $100 with an 8% tax rate would be $100 x 0.08 = $8 in sales tax.",
          },
          {
            question: "What does it mean to back out sales tax?",
            answer:
              "Backing out sales tax means calculating the pre-tax price from a total that already includes tax. This is done by dividing the total by (1 + tax rate as a decimal). For example, $108 with an 8% tax rate would be $108 / 1.08 ≈ $100 pre-tax price.",
          },
        ]}
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