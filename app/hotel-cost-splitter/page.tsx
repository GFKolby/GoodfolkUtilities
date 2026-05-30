"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Hotel Cost Splitter",
    "Split hotel or Airbnb costs across people and nights, including taxes, fees, parking, cleaning, and buffer."
  );

export default function HotelCostSplitterPage() {
  const [nightlyRate, setNightlyRate] = useState("150");
  const [nights, setNights] = useState("4");
  const [people, setPeople] = useState("3");
  const [taxesAndFees, setTaxesAndFees] = useState("120");
  const [cleaningFee, setCleaningFee] = useState("75");
  const [parkingOrResortFees, setParkingOrResortFees] = useState("40");
  const [extraBuffer, setExtraBuffer] = useState("10");

  const results = useMemo(() => {
    const rate = Number(nightlyRate);
    const nightCount = Number(nights);
    const personCount = Number(people);
    const taxes = Number(taxesAndFees);
    const cleaning = Number(cleaningFee);
    const parking = Number(parkingOrResortFees);
    const bufferPercent = Number(extraBuffer);

    if (
      rate < 0 ||
      nightCount <= 0 ||
      personCount <= 0 ||
      taxes < 0 ||
      cleaning < 0 ||
      parking < 0 ||
      bufferPercent < 0
    ) {
      return null;
    }

    const roomSubtotal = rate * nightCount;
    const feesTotal = taxes + cleaning + parking;
    const subtotal = roomSubtotal + feesTotal;
    const bufferAmount = subtotal * (bufferPercent / 100);
    const grandTotal = subtotal + bufferAmount;
    const costPerPerson = grandTotal / personCount;
    const costPerPersonPerNight = costPerPerson / nightCount;
    const costPerNightAllIn = grandTotal / nightCount;

    return {
      roomSubtotal,
      feesTotal,
      subtotal,
      bufferAmount,
      grandTotal,
      costPerPerson,
      costPerPersonPerNight,
      costPerNightAllIn,
    };
  }, [
    nightlyRate,
    nights,
    people,
    taxesAndFees,
    cleaningFee,
    parkingOrResortFees,
    extraBuffer,
  ]);

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Hotel Cost Splitter"
      description="Split hotel or Airbnb costs across people and nights, including taxes, fees, parking, cleaning, and buffer."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Nightly rate ($)"
              value={nightlyRate}
              setValue={setNightlyRate}
            />

            <NumberInput
              label="Number of nights"
              value={nights}
              setValue={setNights}
            />

            <NumberInput
              label="Number of people"
              value={people}
              setValue={setPeople}
            />

            <MoneyInput
              label="Taxes and booking fees ($)"
              value={taxesAndFees}
              setValue={setTaxesAndFees}
            />

            <MoneyInput
              label="Cleaning fee ($)"
              value={cleaningFee}
              setValue={setCleaningFee}
            />

            <MoneyInput
              label="Parking/resort fees ($)"
              value={parkingOrResortFees}
              setValue={setParkingOrResortFees}
            />

            <NumberInput
              label="Extra buffer (%)"
              value={extraBuffer}
              setValue={setExtraBuffer}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use the buffer for small fees, rounding, supplies, deposits, or
            group-trip “who bought the paper towels?” moments.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Split estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Room subtotal"
                value={`$${results.roomSubtotal.toFixed(2)}`}
              />
              <ResultRow
                label="Fees total"
                value={`$${results.feesTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Subtotal"
                value={`$${results.subtotal.toFixed(2)}`}
              />
              <ResultRow
                label="Buffer"
                value={`$${results.bufferAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Grand total"
                value={`$${results.grandTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Cost per person"
                value={`$${results.costPerPerson.toFixed(2)}`}
              />
              <ResultRow
                label="Per person per night"
                value={`$${results.costPerPersonPerNight.toFixed(2)}`}
              />
              <ResultRow
                label="All-in cost per night"
                value={`$${results.costPerNightAllIn.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This assumes an even split. If someone has a private room, extra
                guest, or different stay length, use this as the baseline and
                adjust manually.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid hotel and group details to see the split.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/hotel-cost-splitter" category="travel" />
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
        step="1"
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