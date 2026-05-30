"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Net Worth Calculator",
    "Estimate your net worth by adding up assets and subtracting debts."
  );

export default function NetWorthCalculatorPage() {
  const [cashSavings, setCashSavings] = useState("5000");
  const [investments, setInvestments] = useState("10000");
  const [retirement, setRetirement] = useState("25000");
  const [homeValue, setHomeValue] = useState("0");
  const [vehicleValue, setVehicleValue] = useState("12000");
  const [otherAssets, setOtherAssets] = useState("1000");

  const [creditCardDebt, setCreditCardDebt] = useState("2000");
  const [studentLoans, setStudentLoans] = useState("15000");
  const [autoLoans, setAutoLoans] = useState("8000");
  const [mortgage, setMortgage] = useState("0");
  const [personalLoans, setPersonalLoans] = useState("0");
  const [otherDebts, setOtherDebts] = useState("0");

  const results = useMemo(() => {
    const assets = [
      Number(cashSavings),
      Number(investments),
      Number(retirement),
      Number(homeValue),
      Number(vehicleValue),
      Number(otherAssets),
    ];

    const debts = [
      Number(creditCardDebt),
      Number(studentLoans),
      Number(autoLoans),
      Number(mortgage),
      Number(personalLoans),
      Number(otherDebts),
    ];

    if (assets.some((value) => value < 0) || debts.some((value) => value < 0)) {
      return null;
    }

    const totalAssets = assets.reduce((sum, value) => sum + value, 0);
    const totalDebts = debts.reduce((sum, value) => sum + value, 0);
    const netWorth = totalAssets - totalDebts;
    const debtToAssetPercent =
      totalAssets > 0 ? (totalDebts / totalAssets) * 100 : 0;

    let status = "Building";
    if (netWorth < 0) {
      status = "Negative net worth";
    } else if (netWorth === 0) {
      status = "Break-even";
    } else if (debtToAssetPercent <= 25) {
      status = "Strong position";
    } else if (debtToAssetPercent >= 75) {
      status = "Debt-heavy";
    }

    return {
      totalAssets,
      totalDebts,
      netWorth,
      debtToAssetPercent,
      status,
    };
  }, [
    cashSavings,
    investments,
    retirement,
    homeValue,
    vehicleValue,
    otherAssets,
    creditCardDebt,
    studentLoans,
    autoLoans,
    mortgage,
    personalLoans,
    otherDebts,
  ]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Net Worth Calculator"
      description="Estimate your net worth by adding up assets and subtracting debts."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Assets</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <MoneyInput label="Cash/checking/savings ($)" value={cashSavings} setValue={setCashSavings} />
            <MoneyInput label="Investments ($)" value={investments} setValue={setInvestments} />
            <MoneyInput label="Retirement accounts ($)" value={retirement} setValue={setRetirement} />
            <MoneyInput label="Home/property value ($)" value={homeValue} setValue={setHomeValue} />
            <MoneyInput label="Vehicle value ($)" value={vehicleValue} setValue={setVehicleValue} />
            <MoneyInput label="Other assets ($)" value={otherAssets} setValue={setOtherAssets} />
          </div>

          <h2 className="mt-8 text-xl font-semibold text-white">Debts</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <MoneyInput label="Credit card debt ($)" value={creditCardDebt} setValue={setCreditCardDebt} />
            <MoneyInput label="Student loans ($)" value={studentLoans} setValue={setStudentLoans} />
            <MoneyInput label="Auto loans ($)" value={autoLoans} setValue={setAutoLoans} />
            <MoneyInput label="Mortgage ($)" value={mortgage} setValue={setMortgage} />
            <MoneyInput label="Personal loans ($)" value={personalLoans} setValue={setPersonalLoans} />
            <MoneyInput label="Other debts ($)" value={otherDebts} setValue={setOtherDebts} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use rough current values. Net worth is a snapshot, not a final
            judgment from the spreadsheet goblin court.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Net worth estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Total assets"
                value={`$${results.totalAssets.toFixed(2)}`}
              />
              <ResultRow
                label="Total debts"
                value={`$${results.totalDebts.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated net worth"
                value={`$${results.netWorth.toFixed(2)}`}
              />
              <ResultRow
                label="Debt-to-asset ratio"
                value={`${results.debtToAssetPercent.toFixed(1)}%`}
              />
              <ResultRow label="Status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Net worth can move slowly at first. Reducing debt, building
                savings, and investing consistently can all improve the number
                over time.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid asset and debt amounts to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/net-worth-calculator" category="finance" />
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