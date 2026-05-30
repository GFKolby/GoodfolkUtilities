"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Packing List Generator",
    "Generate a customized packing list for your trip based on destination, weather, and travel style."
  );

type WeatherType = "warm" | "cold" | "mixed" | "rainy";
type DestinationType = "city" | "beach" | "outdoors" | "business";
type TravelStyle = "light" | "standard" | "prepared";

function uniqueItems(items: string[]) {
  return Array.from(new Set(items));
}

export default function PackingListGeneratorPage() {
  const [tripDays, setTripDays] = useState("5");
  const [weather, setWeather] = useState<WeatherType>("mixed");
  const [destination, setDestination] = useState<DestinationType>("city");
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("standard");
  const [laundryAvailable, setLaundryAvailable] = useState("no");

  const results = useMemo(() => {
    const days = Number(tripDays);

    if (days <= 0 || days > 60) {
      return null;
    }

    const clothingMultiplier = laundryAvailable === "yes" ? 0.6 : 1;
    const styleBuffer =
      travelStyle === "light" ? 0 : travelStyle === "prepared" ? 2 : 1;

    const shirts = Math.max(1, Math.ceil(days * clothingMultiplier) + styleBuffer);
    const underwear = Math.max(1, Math.ceil(days * clothingMultiplier) + styleBuffer);
    const socks = Math.max(1, Math.ceil(days * clothingMultiplier) + styleBuffer);
    const pants = Math.max(1, Math.ceil(days / 3) + (travelStyle === "prepared" ? 1 : 0));

    const clothing = [
      `${shirts} shirts or tops`,
      `${pants} pants/shorts/bottoms`,
      `${underwear} underwear`,
      `${socks} pairs of socks`,
      "Sleepwear",
      "Comfortable travel outfit",
    ];

    if (weather === "warm") {
      clothing.push("Lightweight layers", "Hat or sunglasses");
    }

    if (weather === "cold") {
      clothing.push("Warm jacket", "Sweater or fleece", "Beanie/gloves", "Thermal base layer");
    }

    if (weather === "mixed") {
      clothing.push("Light jacket or hoodie", "Layering pieces");
    }

    if (weather === "rainy") {
      clothing.push("Rain jacket", "Quick-dry layer", "Compact umbrella");
    }

    if (destination === "beach") {
      clothing.push("Swimsuit", "Sandals", "Beach cover-up or towel");
    }

    if (destination === "business") {
      clothing.push("Business outfit", "Dress shoes", "Belt or accessories");
    }

    const toiletries = [
      "Toothbrush",
      "Toothpaste",
      "Deodorant",
      "Hair care items",
      "Skincare items",
      "Razor/shaving items",
      "Medications",
      "Travel-size first aid basics",
    ];

    const tech = [
      "Phone charger",
      "Power bank",
      "Headphones",
      "Charging cables",
      "Outlet adapter, if needed",
    ];

    if (travelStyle === "prepared") {
      tech.push("Backup charging cable", "Small flashlight", "Printed reservation copies");
    }

    const documents = [
      "Photo ID",
      "Cards/cash",
      "Travel confirmations",
      "Health insurance card",
    ];

    if (destination !== "city") {
      documents.push("Emergency contact info");
    }

    const extras = ["Reusable water bottle", "Snacks", "Laundry bag", "Day bag"];

    if (destination === "outdoors") {
      extras.push("Bug spray", "Sunscreen", "Trail shoes", "Navigation/map backup");
    }

    if (destination === "beach") {
      extras.push("Sunscreen", "After-sun lotion", "Waterproof phone pouch");
    }

    if (travelStyle === "light") {
      extras.push("Packable tote");
    }

    if (travelStyle === "prepared") {
      extras.push("Small repair kit", "Extra zip bags", "Backup toiletries");
    }

    return {
      days,
      clothing: uniqueItems(clothing),
      toiletries: uniqueItems(toiletries),
      tech: uniqueItems(tech),
      documents: uniqueItems(documents),
      extras: uniqueItems(extras),
    };
  }, [tripDays, weather, destination, travelStyle, laundryAvailable]);

  const listText = useMemo(() => {
    if (!results) {
      return "";
    }

    return [
      `Packing List (${results.days} days)`,
      "",
      "Clothing",
      ...results.clothing.map((item) => `- ${item}`),
      "",
      "Toiletries",
      ...results.toiletries.map((item) => `- ${item}`),
      "",
      "Tech",
      ...results.tech.map((item) => `- ${item}`),
      "",
      "Documents",
      ...results.documents.map((item) => `- ${item}`),
      "",
      "Extras",
      ...results.extras.map((item) => `- ${item}`),
    ].join("\n");
  }, [results]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Packing List Generator"
      description="Generate a simple packing list based on trip length, weather, destination type, and travel style."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Trip length (days)"
              value={tripDays}
              setValue={setTripDays}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Weather</span>
              <select
                value={weather}
                onChange={(event) => setWeather(event.target.value as WeatherType)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
                <option value="mixed">Mixed</option>
                <option value="rainy">Rainy</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Destination type</span>
              <select
                value={destination}
                onChange={(event) =>
                  setDestination(event.target.value as DestinationType)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="city">City</option>
                <option value="beach">Beach</option>
                <option value="outdoors">Outdoors</option>
                <option value="business">Business</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Travel style</span>
              <select
                value={travelStyle}
                onChange={(event) =>
                  setTravelStyle(event.target.value as TravelStyle)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="light">Light packer</option>
                <option value="standard">Standard</option>
                <option value="prepared">Extra prepared</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Laundry available?</span>
              <select
                value={laundryAvailable}
                onChange={(event) => setLaundryAvailable(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use this as a starting point and adjust for your lodging, airline
            baggage limits, personal care needs, and planned activities.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Packing list</h2>

          {results ? (
            <div className="mt-6 space-y-5">
              <ListGroup title="Clothing" items={results.clothing} />
              <ListGroup title="Toiletries" items={results.toiletries} />
              <ListGroup title="Tech" items={results.tech} />
              <ListGroup title="Documents" items={results.documents} />
              <ListGroup title="Extras" items={results.extras} />

              <button
                type="button"
                onClick={() => copyText(listText)}
                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
              >
                Copy packing list
              </button>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter a trip length between 1 and 60 days to generate a packing
              list.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/packing-list-generator" category="travel" />
    </ToolPage>
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
        min="1"
        step="1"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}

function ListGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}