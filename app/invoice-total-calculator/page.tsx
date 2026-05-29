"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function InvoiceTotalCalculatorPage() {
  const [lineItems, setLineItems] = useState("750");
  const [discountPercent, setDiscountPercent] = useState("10");
  const [taxRate, setTaxRate] = useState("8");
  const [shippingOrFees, setShippingOrFees] = useState("25");
  const [depositPaid, setDepositPaid] = useState("100");

  const results = useMemo(() => {
    const subtotal = Number(lineItems);
    const discount = Number(discountPercent);
    const tax = Number(taxRate);
    const fees = Number(shippingOrFees);
    const deposit = Number(depositPaid);

    if (
      subtotal < 0 ||
      discount < 0 ||
      tax < 0 ||
      fees < 0 ||
      deposit < 0
    ) {
      return null;
    }

    const discountAmount = subtotal * (discount / 100);
    const taxableSubtotal = Math.max(subtotal - discountAmount, 0);
    const taxAmount = taxableSubtotal * (tax / 100);
    const invoiceTotal = taxableSubtotal + taxAmount + fees;
    const balanceDue = Math.max(invoiceTotal - deposit, 0);

    return {
      subtotal,
      discountAmount,
      taxableSubtotal,
      taxAmount,
      fees,
      invoiceTotal,
      deposit,
      balanceDue,
    };
  }, [lineItems, discountPercent, taxRate, shippingOrFees, depositPaid]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Invoice Total Calculator"
      description="Calculate invoice subtotal, discount, tax, fees, deposit, and final balance due."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Line item subtotal ($)"
              value={lineItems}
              setValue={setLineItems}
            />

            <NumberInput
              label="Discount (%)"
              value={discountPercent}
              setValue={setDiscountPercent}
            />

            <NumberInput
              label="Tax rate (%)"
              value={taxRate}
              setValue={setTaxRate}
            />

            <MoneyInput
              label="Shipping / fees ($)"
              value={shippingOrFees}
              setValue={setShippingOrFees}
            />

            <MoneyInput
              label="Deposit / amount paid ($)"
              value={depositPaid}
              setValue={setDepositPaid}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use this for quick invoice math before sending a quote, estimate, or
            final bill. Tax rules vary by location and business type.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Invoice estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Subtotal"
                value={`$${results.subtotal.toFixed(2)}`}
              />
              <ResultRow
                label="Discount"
                value={`-$${results.discountAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Taxable subtotal"
                value={`$${results.taxableSubtotal.toFixed(2)}`}
              />
              <ResultRow
                label="Tax"
                value={`$${results.taxAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Shipping / fees"
                value={`$${results.fees.toFixed(2)}`}
              />
              <ResultRow
                label="Invoice total"
                value={`$${results.invoiceTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Deposit / paid"
                value={`-$${results.deposit.toFixed(2)}`}
              />
              <ResultRow
                label="Balance due"
                value={`$${results.balanceDue.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This is a simple invoice total estimate. For actual billing,
                confirm tax rules, payment terms, discounts, and deposits.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid invoice values to calculate the total.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/invoice-total-calculator" category="business" />
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