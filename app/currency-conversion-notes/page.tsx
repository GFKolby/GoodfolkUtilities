"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function CurrencyConversionNotesPage() {
  const [homeCurrency, setHomeCurrency] = useState("USD");
  const [localCurrency, setLocalCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState("0.92");
  const [amount, setAmount] = useState("100");
  const [dailyBudget, setDailyBudget] = useState("75");
  const [tripDays, setTripDays] = useState("7");

  const results = useMemo(() => {
    const rate = Number(exchangeRate);
    const homeAmount = Number(amount);
    const daily = Number(dailyBudget);
    const days = Number(tripDays);

    if (rate <= 0 || homeAmount < 0 || daily < 0 || days <= 0) {
      return null;
    }

    const localAmount = homeAmount * rate;
    const localDailyBudget = daily * rate;
    const homeTripBudget = daily * days;
    const localTripBudget = homeTripBudget * rate;

    const commonAmounts = [1, 5, 10, 20, 50, 100, 250, 500].map((value) => ({
      home: value,
      local: value * rate,
    }));

    const reverseAmounts = [1, 5, 10, 20, 50, 100, 250, 500].map((value) => ({
      local: value,
      home: value / rate,
    }));

    return {
      localAmount,
      localDailyBudget,
      homeTripBudget,
      localTripBudget,
      commonAmounts,
      reverseAmounts,
    };
  }, [exchangeRate, amount, dailyBudget, tripDays]);

  const notesText = useMemo(() => {
    if (!results) {
      return "";
    }

    return [
      `${homeCurrency} to ${localCurrency} conversion notes`,
      `Rate used: 1 ${homeCurrency} = ${exchangeRate} ${localCurrency}`,
      "",
      `Custom amount: ${amount} ${homeCurrency} ≈ ${results.localAmount.toFixed(
        2
      )} ${localCurrency}`,
      `Daily budget: ${dailyBudget} ${homeCurrency}/day ≈ ${results.localDailyBudget.toFixed(
        2
      )} ${localCurrency}/day`,
      `Trip budget: ${results.homeTripBudget.toFixed(
        2
      )} ${homeCurrency} ≈ ${results.localTripBudget.toFixed(2)} ${localCurrency}`,
      "",
      "Common conversions:",
      ...results.commonAmounts.map(
        (item) =>
          `${item.home} ${homeCurrency} ≈ ${item.local.toFixed(2)} ${localCurrency}`
      ),
    ].join("\n");
  }, [
    results,
    homeCurrency,
    localCurrency,
    exchangeRate,
    amount,
    dailyBudget,
  ]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Currency Conversion Notes"
      description="Convert common travel amounts using a manual exchange rate for quick budgeting abroad."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Home currency code"
              value={homeCurrency}
              setValue={setHomeCurrency}
            />

            <TextInput
              label="Local currency code"
              value={localCurrency}
              setValue={setLocalCurrency}
            />

            <NumberInput
              label={`Exchange rate: 1 ${homeCurrency || "HOME"} = ? ${
                localCurrency || "LOCAL"
              }`}
              value={exchangeRate}
              setValue={setExchangeRate}
            />

            <MoneyInput
              label={`Amount in ${homeCurrency || "home currency"}`}
              value={amount}
              setValue={setAmount}
            />

            <MoneyInput
              label={`Daily budget in ${homeCurrency || "home currency"}`}
              value={dailyBudget}
              setValue={setDailyBudget}
            />

            <NumberInput
              label="Trip days"
              value={tripDays}
              setValue={setTripDays}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Enter the exchange rate manually from your bank, travel card, or a
            trusted currency source. This tool does not fetch live rates.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Conversion notes</h2>

          {results ? (
            <div className="mt-6 space-y-5">
              <ResultRow
                label="Converted amount"
                value={`${results.localAmount.toFixed(2)} ${localCurrency}`}
              />
              <ResultRow
                label="Local daily budget"
                value={`${results.localDailyBudget.toFixed(2)} ${localCurrency}`}
              />
              <ResultRow
                label="Home trip budget"
                value={`${results.homeTripBudget.toFixed(2)} ${homeCurrency}`}
              />
              <ResultRow
                label="Local trip budget"
                value={`${results.localTripBudget.toFixed(2)} ${localCurrency}`}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <ConversionList
                  title={`${homeCurrency} to ${localCurrency}`}
                  rows={results.commonAmounts.map((item) => ({
                    left: `${item.home} ${homeCurrency}`,
                    right: `${item.local.toFixed(2)} ${localCurrency}`,
                  }))}
                />

                <ConversionList
                  title={`${localCurrency} to ${homeCurrency}`}
                  rows={results.reverseAmounts.map((item) => ({
                    left: `${item.local} ${localCurrency}`,
                    right: `${item.home.toFixed(2)} ${homeCurrency}`,
                  }))}
                />
              </div>

              <button
                type="button"
                onClick={() => copyText(notesText)}
                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
              >
                Copy conversion notes
              </button>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Real card charges may include exchange-rate spread, ATM fees,
                foreign transaction fees, or merchant conversion fees.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter a valid exchange rate, amount, and trip length to see
              conversion notes.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/currency-conversion-notes" category="travel" />
    </ToolPage>
  );
}

function TextInput({
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
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value.toUpperCase())}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
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

function ConversionList({
  title,
  rows,
}: {
  title: string;
  rows: { left: string; right: string }[];
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div
            key={`${row.left}-${row.right}`}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="text-zinc-300">{row.left}</span>
            <span className="text-right font-semibold text-white">
              {row.right}
            </span>
          </div>
        ))}
      </div>
    </div>
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