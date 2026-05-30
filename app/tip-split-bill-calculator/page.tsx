"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function TipSplitBillCalculatorPage() {
  const [billAmount, setBillAmount] = useState("80");
  const [tipPercent, setTipPercent] = useState("20");
  const [peopleCount, setPeopleCount] = useState("4");
  const [taxAmount, setTaxAmount] = useState("0");
  const [roundUp, setRoundUp] = useState("no");

  const results = useMemo(() => {
    const bill = Number(billAmount);
    const tip = Number(tipPercent);
    const people = Number(peopleCount);
    const tax = Number(taxAmount);

    if (bill < 0 || tip < 0 || people <= 0 || tax < 0) {
      return null;
    }

    const subtotalWithTax = bill + tax;
    const tipAmount = subtotalWithTax * (tip / 100);
    const totalBill = subtotalWithTax + tipAmount;
    const rawPerPerson = totalBill / people;
    const perPerson = roundUp === "yes" ? Math.ceil(rawPerPerson) : rawPerPerson;
    const roundedTotal = perPerson * people;
    const extraFromRounding = Math.max(roundedTotal - totalBill, 0);

    return {
      subtotalWithTax,
      tipAmount,
      totalBill,
      perPerson,
      roundedTotal,
      extraFromRounding,
    };
  }, [billAmount, tipPercent, peopleCount, taxAmount, roundUp]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Tip & Split Bill Calculator"
      description="Calculate the tip, final bill total, and per-person amount when splitting a check."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Bill amount before tip ($)"
              value={billAmount}
              setValue={setBillAmount}
            />

            <NumberInput
              label="Tip percentage (%)"
              value={tipPercent}
              setValue={setTipPercent}
            />

            <NumberInput
              label="Number of people"
              value={peopleCount}
              setValue={setPeopleCount}
            />

            <MoneyInput
              label="Tax or extra fees ($)"
              value={taxAmount}
              setValue={setTaxAmount}
            />

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">
                Round each person up to nearest dollar?
              </span>
              <select
                value={roundUp}
                onChange={(event) => setRoundUp(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use the tax/fees field if the receipt separates tax from the
            pre-tip subtotal. Rounding up can make group splits easier.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Split estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Subtotal with tax/fees"
                value={`$${results.subtotalWithTax.toFixed(2)}`}
              />
              <ResultRow
                label="Tip amount"
                value={`$${results.tipAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Total bill"
                value={`$${results.totalBill.toFixed(2)}`}
              />
              <ResultRow
                label="Each person pays"
                value={`$${results.perPerson.toFixed(2)}`}
              />
              <ResultRow
                label="Total collected"
                value={`$${results.roundedTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Extra from rounding"
                value={`$${results.extraFromRounding.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                For uneven orders, this gives a quick equal split. For exact
                item-by-item splitting, may the receipt goblin have mercy.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid bill details to see your split.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/tip-split-bill-calculator"
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