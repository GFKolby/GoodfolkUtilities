"use client";

import { useMemo, useState } from "react";

import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Camp Checklist Generator",
    "Generate a simple camping checklist based on your trip style, weather, cooking plans, and activities."
  );

export default function CampChecklistGenerator() {
  const [nights, setNights] = useState(2);
  const [campingStyle, setCampingStyle] = useState("car");
  const [cooking, setCooking] = useState(true);
  const [rain, setRain] = useState(false);
  const [coldWeather, setColdWeather] = useState(false);
  const [hiking, setHiking] = useState(true);
  const [pets, setPets] = useState(false);

  const checklist = useMemo(() => {
    const items = [
      "Tent or shelter",
      "Sleeping bag or quilt",
      "Sleeping pad or cot",
      "Pillow",
      "Camp chair",
      "Headlamp or flashlight",
      "Extra batteries or power bank",
      "Water bottles or water storage",
      "First aid kit",
      "Toiletries",
      "Trash bags",
      "Bug protection",
      "Sunscreen",
      "Personal medications",
      "Camp clothes",
      "Sleep clothes",
      "Extra socks",
      "Phone charger",
      "ID / wallet / keys",
    ];

    if (campingStyle === "backpacking") {
      items.push(
        "Backpack",
        "Trekking poles",
        "Water filter",
        "Bear bag or bear canister",
        "Lightweight towel",
        "Trail snacks"
      );
    }

    if (cooking) {
      items.push(
        "Stove or cook system",
        "Fuel",
        "Lighter or matches",
        "Cook pot",
        "Mug",
        "Utensils",
        "Food",
        "Coffee or drink mix",
        "Dish towel or wipes"
      );
    }

    if (rain) {
      items.push(
        "Rain jacket",
        "Pack cover or dry bags",
        "Extra tarp or footprint",
        "Backup dry clothes"
      );
    }

    if (coldWeather) {
      items.push(
        "Warm hat",
        "Gloves",
        "Base layers",
        "Insulated jacket",
        "Warm sleep socks"
      );
    }

    if (hiking) {
      items.push(
        "Hiking shoes or boots",
        "Trail map",
        "Navigation app or GPS",
        "Electrolytes",
        "Small daypack"
      );
    }

    if (pets) {
      items.push(
        "Pet food",
        "Pet water bowl",
        "Leash",
        "Pet waste bags",
        "Pet blanket or bed"
      );
    }

    if (nights >= 3) {
      items.push(
        "Extra underwear",
        "Extra food buffer",
        "Extra water buffer",
        "Backup power"
      );
    }

    return Array.from(new Set(items)).sort();
  }, [nights, campingStyle, cooking, rain, coldWeather, hiking, pets]);

  const copyChecklist = async () => {
    const text = checklist.map((item) => `☐ ${item}`).join("\n");
    await navigator.clipboard.writeText(text);
  };

  return (
    <ToolPage
      line="Goodfolk Camp Utilities"
      title="Camp Checklist Generator"
      description="Generate a simple camping checklist based on your trip style, weather, cooking plans, and activities."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Trip Nights
          </span>

          <input
            type="number"
            min="1"
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Camping Style
          </span>

          <select
            value={campingStyle}
            onChange={(e) => setCampingStyle(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          >
            <option value="car">Car Camping</option>
            <option value="backpacking">Backpacking</option>
          </select>
        </label>

        <div className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm text-zinc-400">Trip Options</p>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={cooking}
              onChange={(e) => setCooking(e.target.checked)}
            />
            Cooking at camp
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={rain}
              onChange={(e) => setRain(e.target.checked)}
            />
            Rain possible
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={coldWeather}
              onChange={(e) => setColdWeather(e.target.checked)}
            />
            Cold weather
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hiking}
              onChange={(e) => setHiking(e.target.checked)}
            />
            Hiking
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
            />
            Bringing pets
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Generated Checklist
        </p>

        <p className="mt-2 text-5xl font-bold">
          {checklist.length} items
        </p>

        <button
          onClick={copyChecklist}
          className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Copy Checklist
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <ul className="grid gap-3 sm:grid-cols-2">
          {checklist.map((item) => (
            <li key={item} className="flex gap-3 text-zinc-200">
              <span className="text-amber-300">☐</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This is a starter checklist. Add location-specific items like permits,
        bear storage, fire restrictions, or campground reservation details.
      </p>
      <RelatedTools currentHref="/camp-checklist-generator" category="camp" />
    </ToolPage>
  );
}