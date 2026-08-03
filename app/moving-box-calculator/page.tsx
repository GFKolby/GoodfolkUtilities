"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type PackingStyle = "light" | "average" | "heavy";

export default function MovingBoxCalculator() {
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [kitchen, setKitchen] = useState(true);
  const [livingRooms, setLivingRooms] = useState(1);
  const [garageOrStorage, setGarageOrStorage] = useState(false);
  const [packingStyle, setPackingStyle] = useState<PackingStyle>("average");

  const results = useMemo(() => {
    let smallBoxes = bedrooms * 4 + bathrooms * 2 + livingRooms * 2;
    let mediumBoxes = bedrooms * 5 + bathrooms * 1 + livingRooms * 3;
    let largeBoxes = bedrooms * 2 + livingRooms * 2;
    let wardrobeBoxes = Math.ceil(bedrooms * 1.5);

    if (kitchen) {
      smallBoxes += 6;
      mediumBoxes += 4;
      largeBoxes += 1;
    }

    if (garageOrStorage) {
      smallBoxes += 4;
      mediumBoxes += 6;
      largeBoxes += 4;
    }

    const multiplier =
      packingStyle === "light" ? 0.8 : packingStyle === "heavy" ? 1.25 : 1;

    smallBoxes = Math.ceil(smallBoxes * multiplier);
    mediumBoxes = Math.ceil(mediumBoxes * multiplier);
    largeBoxes = Math.ceil(largeBoxes * multiplier);
    wardrobeBoxes = Math.ceil(wardrobeBoxes * multiplier);

    const totalBoxes =
      smallBoxes + mediumBoxes + largeBoxes + wardrobeBoxes;

    return {
      smallBoxes,
      mediumBoxes,
      largeBoxes,
      wardrobeBoxes,
      totalBoxes,
    };
  }, [
    bedrooms,
    bathrooms,
    kitchen,
    livingRooms,
    garageOrStorage,
    packingStyle,
  ]);

  return (
    <ToolPage
      line="Goodfolk Home Utilities"
      title="Moving Box Calculator"
      description="Estimate how many moving boxes you need based on bedrooms, bathrooms, common rooms, storage areas, and how heavily you pack."
    >
      <p className="mb-6 max-w-3xl leading-7 text-zinc-300">
        Enter the rooms in your home, choose your packing style, and include any
        garage, attic, basement, or storage space. The calculator estimates your
        total boxes and gives you a suggested mix of small, medium, large, and
        wardrobe boxes.
      </p>

      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Bedrooms
            </span>
            <input
              type="number"
              min="0"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Bathrooms
            </span>
            <input
              type="number"
              min="0"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Living / Common Rooms
            </span>
            <input
              type="number"
              min="0"
              value={livingRooms}
              onChange={(e) => setLivingRooms(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            />
          </label>
        </div>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Packing Style
          </span>

          <select
            value={packingStyle}
            onChange={(e) => setPackingStyle(e.target.value as PackingStyle)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          >
            <option value="light">Light / Minimal stuff</option>
            <option value="average">Average</option>
            <option value="heavy">Heavy / Lots of stuff</option>
          </select>
        </label>

        <div className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm text-zinc-400">Home Areas</p>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={kitchen}
              onChange={(e) => setKitchen(e.target.checked)}
            />
            Include kitchen
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={garageOrStorage}
              onChange={(e) => setGarageOrStorage(e.target.checked)}
            />
            Garage, attic, basement, or storage area
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Estimated Boxes Needed
        </p>

        <p className="mt-2 text-5xl font-bold">
          {results.totalBoxes} boxes
        </p>

        <p className="mt-3 text-slate-800">
          Includes small, medium, large, and wardrobe boxes.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="font-semibold text-white">Box Breakdown</p>

        <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
          <p>
            Small boxes: <strong>{results.smallBoxes}</strong>
          </p>
          <p>
            Medium boxes: <strong>{results.mediumBoxes}</strong>
          </p>
          <p>
            Large boxes: <strong>{results.largeBoxes}</strong>
          </p>
          <p>
            Wardrobe boxes: <strong>{results.wardrobeBoxes}</strong>
          </p>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-white">
          Room-by-room moving box example
        </h2>

        <div className="mt-4 space-y-3 leading-7 text-zinc-300">
          <p>
            For a two-bedroom, two-bathroom home with one living room, a kitchen,
            and an average amount of belongings, the calculator starts with a
            separate estimate for each room and then combines them into one box
            plan.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Bedrooms add clothing, linens, books, and personal items.</li>
            <li>Bathrooms add toiletries, towels, and small household items.</li>
            <li>The kitchen adds extra small and medium boxes for dishes and pantry goods.</li>
            <li>Living areas add boxes for decor, electronics, and shared items.</li>
          </ul>
          <p>
            Your actual total can be lower after decluttering or higher when
            closets and storage spaces are full. Treat the result as a starting
            point and keep a few extra small and medium boxes available.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
        <h2 className="text-xl font-bold text-white">
          Need help planning the estimate?
        </h2>

        <p className="mt-3 leading-7 text-zinc-300">
          Read our guide to how many moving boxes you may need, including the
          biggest factors that change the total and common packing mistakes.
        </p>

        <Link
          href="/blog/how-many-moving-boxes-do-i-need"
          className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
        >
          Read the Moving Box Guide
        </Link>
      </section>

      <p className="mt-6 text-sm text-zinc-500">
        This is a planning estimate. Add extra boxes for books, decorations,
        kitchen overflow, sentimental chaos, and the mysterious junk drawer
        dimension.
      </p>

      <RelatedTools currentHref="/moving-box-calculator" category="home" />
    </ToolPage>
  );
}
