"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function HomeProjectBudgetCalculator() {
  const [materials, setMaterials] = useState(500);
  const [labor, setLabor] = useState(800);
  const [tools, setTools] = useState(100);
  const [permitsOrFees, setPermitsOrFees] = useState(50);
  const [delivery, setDelivery] = useState(75);
  const [contingencyPercent, setContingencyPercent] = useState(15);

  const results = useMemo(() => {
    const subtotal = materials + labor + tools + permitsOrFees + delivery;
    const contingency = subtotal * (contingencyPercent / 100);
    const total = subtotal + contingency;

    return {
      subtotal,
      contingency,
      total,
    };
  }, [
    materials,
    labor,
    tools,
    permitsOrFees,
    delivery,
    contingencyPercent,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Home Project Budget Calculator"
      description="Estimate a home project budget with materials, labor, tools, permits, delivery, and a contingency buffer."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Materials
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={materials}
              onChange={(e) => setMaterials(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Labor
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={labor}
              onChange={(e) => setLabor(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Tools / Rentals
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={tools}
              onChange={(e) => setTools(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Permits / Fees
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={permitsOrFees}
              onChange={(e) => setPermitsOrFees(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Delivery / Hauling
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={delivery}
              onChange={(e) => setDelivery(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Contingency Buffer %
          </span>
          <input
            type="number"
            min="0"
            step="1"
            value={contingencyPercent}
            onChange={(e) => setContingencyPercent(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Estimated Project Budget
        </p>

        <p className="mt-2 text-5xl font-bold">
          {money(results.total)}
        </p>

        <p className="mt-3 text-slate-800">
          Includes a{" "}
          <strong>{money(results.contingency)}</strong> contingency buffer.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="font-semibold text-white">Budget Breakdown</p>

        <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
          <p>
            Materials: <strong>{money(materials)}</strong>
          </p>
          <p>
            Labor: <strong>{money(labor)}</strong>
          </p>
          <p>
            Tools / rentals: <strong>{money(tools)}</strong>
          </p>
          <p>
            Permits / fees: <strong>{money(permitsOrFees)}</strong>
          </p>
          <p>
            Delivery / hauling: <strong>{money(delivery)}</strong>
          </p>
          <p>
            Subtotal: <strong>{money(results.subtotal)}</strong>
          </p>
          <p>
            Contingency: <strong>{money(results.contingency)}</strong>
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This is a planning estimate. Real project costs can change based on
        contractor pricing, materials, local fees, delays, surprises, and the
        ancient renovation goblin hiding behind the drywall.
      </p>

      <RelatedTools
        currentHref="/home-project-budget-calculator"
        line="home"
      />
    </ToolPage>
  );
}