"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Startup Cost Calculator",
    "Estimate startup costs from setup, equipment, software, inventory, marketing, and operating runway."
  );

export default function StartupCostCalculatorPage() {
  const [legalSetup, setLegalSetup] = useState("500");
  const [equipment, setEquipment] = useState("2500");
  const [software, setSoftware] = useState("1200");
  const [inventory, setInventory] = useState("3000");
  const [brandingWebsite, setBrandingWebsite] = useState("1500");
  const [marketingLaunch, setMarketingLaunch] = useState("1000");
  const [monthlyOperatingCosts, setMonthlyOperatingCosts] = useState("2500");
  const [runwayMonths, setRunwayMonths] = useState("6");
  const [bufferPercent, setBufferPercent] = useState("15");

  const results = useMemo(() => {
    const legal = Number(legalSetup);
    const gear = Number(equipment);
    const tools = Number(software);
    const stock = Number(inventory);
    const brand = Number(brandingWebsite);
    const marketing = Number(marketingLaunch);
    const monthly = Number(monthlyOperatingCosts);
    const runway = Number(runwayMonths);
    const buffer = Number(bufferPercent);

    if (
      legal < 0 ||
      gear < 0 ||
      tools < 0 ||
      stock < 0 ||
      brand < 0 ||
      marketing < 0 ||
      monthly < 0 ||
      runway < 0 ||
      buffer < 0
    ) {
      return null;
    }

    const oneTimeCosts = legal + gear + tools + stock + brand + marketing;
    const runwayCost = monthly * runway;
    const subtotal = oneTimeCosts + runwayCost;
    const bufferAmount = subtotal * (buffer / 100);
    const totalStartupCost = subtotal + bufferAmount;

    return {
      legal,
      gear,
      tools,
      stock,
      brand,
      marketing,
      monthly,
      runway,
      oneTimeCosts,
      runwayCost,
      subtotal,
      bufferAmount,
      totalStartupCost,
    };
  }, [
    legalSetup,
    equipment,
    software,
    inventory,
    brandingWebsite,
    marketingLaunch,
    monthlyOperatingCosts,
    runwayMonths,
    bufferPercent,
  ]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Startup Cost Calculator"
      description="Estimate startup costs from setup, equipment, software, inventory, marketing, and operating runway."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Legal / registration setup ($)"
              value={legalSetup}
              setValue={setLegalSetup}
            />

            <MoneyInput
              label="Equipment / hardware ($)"
              value={equipment}
              setValue={setEquipment}
            />

            <MoneyInput
              label="Software / tools ($)"
              value={software}
              setValue={setSoftware}
            />

            <MoneyInput
              label="Initial inventory / supplies ($)"
              value={inventory}
              setValue={setInventory}
            />

            <MoneyInput
              label="Branding / website ($)"
              value={brandingWebsite}
              setValue={setBrandingWebsite}
            />

            <MoneyInput
              label="Launch marketing ($)"
              value={marketingLaunch}
              setValue={setMarketingLaunch}
            />

            <MoneyInput
              label="Monthly operating costs ($)"
              value={monthlyOperatingCosts}
              setValue={setMonthlyOperatingCosts}
            />

            <NumberInput
              label="Runway months"
              value={runwayMonths}
              setValue={setRunwayMonths}
            />

            <NumberInput
              label="Buffer (%)"
              value={bufferPercent}
              setValue={setBufferPercent}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use runway months to estimate how much cash you may need before the
            business reliably pays for itself.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Startup cost estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Legal / setup" value={`$${results.legal.toFixed(2)}`} />
              <ResultRow label="Equipment" value={`$${results.gear.toFixed(2)}`} />
              <ResultRow label="Software" value={`$${results.tools.toFixed(2)}`} />
              <ResultRow label="Inventory / supplies" value={`$${results.stock.toFixed(2)}`} />
              <ResultRow label="Branding / website" value={`$${results.brand.toFixed(2)}`} />
              <ResultRow label="Launch marketing" value={`$${results.marketing.toFixed(2)}`} />
              <ResultRow
                label="One-time startup costs"
                value={`$${results.oneTimeCosts.toFixed(2)}`}
              />
              <ResultRow
                label={`${results.runway.toFixed(1)} months operating runway`}
                value={`$${results.runwayCost.toFixed(2)}`}
              />
              <ResultRow label="Subtotal" value={`$${results.subtotal.toFixed(2)}`} />
              <ResultRow label="Buffer" value={`$${results.bufferAmount.toFixed(2)}`} />
              <ResultRow
                label="Estimated startup cost"
                value={`$${results.totalStartupCost.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This is a planning estimate. Real startup costs depend on your
                business type, location, licensing needs, suppliers, and how much
                runway you want before revenue is steady.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid startup cost values to see the estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/startup-cost-calculator" category="business" />
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
        step="0.5"
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