"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function CampfireSafetyChecklist() {
  const [fireRing, setFireRing] = useState(true);
  const [windy, setWindy] = useState(false);
  const [dryConditions, setDryConditions] = useState(false);
  const [cookingFire, setCookingFire] = useState(false);
  const [kidsOrPets, setKidsOrPets] = useState(false);
  const [overnightFire, setOvernightFire] = useState(false);

  const checklist = useMemo(() => {
    const beforeLighting = [
      "Check campground rules and local fire restrictions.",
      "Confirm fires are allowed today.",
      "Keep water nearby before lighting the fire.",
      "Clear leaves, pine needles, paper, and loose debris from the fire area.",
      "Use small kindling first instead of dumping on too much fuel.",
    ];

    const whileBurning = [
      "Keep the fire small and controlled.",
      "Never leave the fire unattended.",
      "Keep chairs, tents, bags, and gear away from flames and sparks.",
      "Avoid burning trash, plastic, cans, or food packaging.",
    ];

    const beforeLeaving = [
      "Let wood burn down to ash when possible.",
      "Pour water over the fire slowly.",
      "Stir ashes and embers thoroughly.",
      "Add more water and stir again.",
      "Make sure ashes are cool before leaving or going to sleep.",
    ];

    if (!fireRing) {
      beforeLighting.push(
        "Use an established fire area if available.",
        "Avoid building a fire directly on fragile ground or vegetation."
      );
    }

    if (windy) {
      beforeLighting.push("Consider skipping the fire if wind is strong or gusty.");
      whileBurning.push("Watch for blowing sparks and shifting smoke.");
      beforeLeaving.push("Double-check nearby ground for escaped embers.");
    }

    if (dryConditions) {
      beforeLighting.push(
        "Be extra cautious in dry conditions.",
        "Avoid lighting a fire near dry grass, brush, or low branches."
      );
      whileBurning.push("Keep the fire smaller than usual during dry conditions.");
    }

    if (cookingFire) {
      whileBurning.push(
        "Use stable cookware and avoid leaning over flames.",
        "Keep food packaging away from the fire."
      );
      beforeLeaving.push("Dispose of food scraps properly after cooking.");
    }

    if (kidsOrPets) {
      whileBurning.push(
        "Create a clear safety boundary around the fire.",
        "Keep kids and pets supervised near the fire at all times."
      );
    }

    if (overnightFire) {
      beforeLeaving.push(
        "Do not leave a fire burning overnight.",
        "Fully extinguish the fire before sleeping."
      );
    }

    return {
      beforeLighting,
      whileBurning,
      beforeLeaving,
      total:
        beforeLighting.length + whileBurning.length + beforeLeaving.length,
    };
  }, [
    fireRing,
    windy,
    dryConditions,
    cookingFire,
    kidsOrPets,
    overnightFire,
  ]);

  const copyChecklist = async () => {
    const text = [
      "Campfire Safety Checklist",
      "",
      "Before lighting:",
      ...checklist.beforeLighting.map((item) => `☐ ${item}`),
      "",
      "While burning:",
      ...checklist.whileBurning.map((item) => `☐ ${item}`),
      "",
      "Before leaving or sleeping:",
      ...checklist.beforeLeaving.map((item) => `☐ ${item}`),
    ].join("\n");

    await navigator.clipboard.writeText(text);
  };

  return (
    <ToolPage
      line="Goodfolk Camp Utilities"
      title="Campfire Safety Checklist"
      description="Generate a practical campfire safety checklist based on fire ring access, wind, dry conditions, cooking, kids, pets, and overnight plans."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm text-zinc-400">Campfire Conditions</p>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={fireRing}
              onChange={(e) => setFireRing(e.target.checked)}
            />
            Using a campground fire ring
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={windy}
              onChange={(e) => setWindy(e.target.checked)}
            />
            Windy conditions
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={dryConditions}
              onChange={(e) => setDryConditions(e.target.checked)}
            />
            Dry conditions
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={cookingFire}
              onChange={(e) => setCookingFire(e.target.checked)}
            />
            Cooking over the fire
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={kidsOrPets}
              onChange={(e) => setKidsOrPets(e.target.checked)}
            />
            Kids or pets nearby
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={overnightFire}
              onChange={(e) => setOvernightFire(e.target.checked)}
            />
            Fire may be active late at night
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Generated Checklist
        </p>

        <p className="mt-2 text-5xl font-bold">
          {checklist.total} items
        </p>

        <button
          onClick={copyChecklist}
          className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Copy Checklist
        </button>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <ChecklistColumn title="Before lighting" items={checklist.beforeLighting} />
        <ChecklistColumn title="While burning" items={checklist.whileBurning} />
        <ChecklistColumn title="Before leaving or sleeping" items={checklist.beforeLeaving} />
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This checklist is a planning helper. Always follow campground rules,
        local burn bans, posted warnings, and ranger guidance.
      </p>

      <RelatedTools currentHref="/campfire-safety-checklist" line="camp" />
    </ToolPage>
  );
}

function ChecklistColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-zinc-300">
            <span className="text-amber-300">☐</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}