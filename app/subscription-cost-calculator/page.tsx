"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function SubscriptionCostCalculatorPage() {
  const [streaming, setStreaming] = useState("45");
  const [music, setMusic] = useState("12");
  const [apps, setApps] = useState("25");
  const [software, setSoftware] = useState("30");
  const [memberships, setMemberships] = useState("40");
  const [other, setOther] = useState("20");
  const [cancelAmount, setCancelAmount] = useState("25");

  const results = useMemo(() => {
    const values = [
      Number(streaming),
      Number(music),
      Number(apps),
      Number(software),
      Number(memberships),
      Number(other),
    ];

    const plannedCancel = Number(cancelAmount);

    if (values.some((value) => value < 0) || plannedCancel < 0) {
      return null;
    }

    const monthlyTotal = values.reduce((sum, value) => sum + value, 0);
    const yearlyTotal = monthlyTotal * 12;
    const monthlyAfterCancel = Math.max(monthlyTotal - plannedCancel, 0);
    const yearlyAfterCancel = monthlyAfterCancel * 12;
    const yearlySavings = yearlyTotal - yearlyAfterCancel;

    let status = "Manageable";
    if (monthlyTotal >= 250) {
      status = "High";
    } else if (monthlyTotal >= 100) {
      status = "Worth reviewing";
    } else if (monthlyTotal <= 50) {
      status = "Light";
    }

    return {
      monthlyTotal,
      yearlyTotal,
      monthlyAfterCancel,
      yearlyAfterCancel,
      yearlySavings,
      status,
    };
  }, [streaming, music, apps, software, memberships, other, cancelAmount]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Subscription Cost Calculator"
      description="Estimate how much your subscriptions cost per month and year, plus how much you could save by canceling unused services."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput label="Streaming/video ($/mo)" value={streaming} setValue={setStreaming} />
            <MoneyInput label="Music/audio ($/mo)" value={music} setValue={setMusic} />
            <MoneyInput label="Apps/mobile ($/mo)" value={apps} setValue={setApps} />
            <MoneyInput label="Software/cloud ($/mo)" value={software} setValue={setSoftware} />
            <MoneyInput label="Memberships ($/mo)" value={memberships} setValue={setMemberships} />
            <MoneyInput label="Other subscriptions ($/mo)" value={other} setValue={setOther} />
            <MoneyInput
              label="Amount you may cancel ($/mo)"
              value={cancelAmount}
              setValue={setCancelAmount}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Add up recurring services like streaming, apps, software, memberships,
            cloud storage, and anything else quietly nibbling at your budget.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Subscription estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Monthly subscription total"
                value={`$${results.monthlyTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Yearly subscription total"
                value={`$${results.yearlyTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Monthly after cancellations"
                value={`$${results.monthlyAfterCancel.toFixed(2)}`}
              />
              <ResultRow
                label="Yearly after cancellations"
                value={`$${results.yearlyAfterCancel.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated yearly savings"
                value={`$${results.yearlySavings.toFixed(2)}`}
              />
              <ResultRow label="Subscription status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Subscriptions feel small monthly, but the yearly number tells the
                truth. Review anything you forgot you were paying for.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid subscription amounts to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/subscription-cost-calculator"
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

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}