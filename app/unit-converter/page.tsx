"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Unit Converter",
    "Convert between different units of measurement."
  );

type Category = "length" | "weight" | "temperature" | "volume";

const units = {
  length: [
    { label: "Inches", value: "in" },
    { label: "Feet", value: "ft" },
    { label: "Yards", value: "yd" },
    { label: "Miles", value: "mi" },
    { label: "Millimeters", value: "mm" },
    { label: "Centimeters", value: "cm" },
    { label: "Meters", value: "m" },
    { label: "Kilometers", value: "km" },
  ],
  weight: [
    { label: "Ounces", value: "oz" },
    { label: "Pounds", value: "lb" },
    { label: "Grams", value: "g" },
    { label: "Kilograms", value: "kg" },
  ],
  temperature: [
    { label: "Fahrenheit", value: "f" },
    { label: "Celsius", value: "c" },
    { label: "Kelvin", value: "k" },
  ],
  volume: [
    { label: "Teaspoons", value: "tsp" },
    { label: "Tablespoons", value: "tbsp" },
    { label: "Fluid Ounces", value: "floz" },
    { label: "Cups", value: "cup" },
    { label: "Pints", value: "pt" },
    { label: "Quarts", value: "qt" },
    { label: "Gallons", value: "gal" },
    { label: "Milliliters", value: "ml" },
    { label: "Liters", value: "l" },
  ],
} as const;

const lengthToMeters: Record<string, number> = {
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
};

const weightToGrams: Record<string, number> = {
  oz: 28.349523125,
  lb: 453.59237,
  g: 1,
  kg: 1000,
};

const volumeToLiters: Record<string, number> = {
  tsp: 0.00492892,
  tbsp: 0.0147868,
  floz: 0.0295735,
  cup: 0.236588,
  pt: 0.473176,
  qt: 0.946353,
  gal: 3.78541,
  ml: 0.001,
  l: 1,
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [amount, setAmount] = useState(1);
  const [fromUnit, setFromUnit] = useState("ft");
  const [toUnit, setToUnit] = useState("m");

  const currentUnits = units[category];

  const convertTemperature = (value: number, from: string, to: string) => {
    let celsius = value;

    if (from === "f") celsius = (value - 32) * (5 / 9);
    if (from === "k") celsius = value - 273.15;

    if (to === "f") return celsius * (9 / 5) + 32;
    if (to === "k") return celsius + 273.15;

    return celsius;
  };

  const result = useMemo(() => {
    if (Number.isNaN(amount)) return 0;

    if (category === "temperature") {
      return convertTemperature(amount, fromUnit, toUnit);
    }

    if (category === "length") {
      const meters = amount * lengthToMeters[fromUnit];
      return meters / lengthToMeters[toUnit];
    }

    if (category === "weight") {
      const grams = amount * weightToGrams[fromUnit];
      return grams / weightToGrams[toUnit];
    }

    const liters = amount * volumeToLiters[fromUnit];
    return liters / volumeToLiters[toUnit];
  }, [amount, category, fromUnit, toUnit]);

  const handleCategoryChange = (nextCategory: Category) => {
    setCategory(nextCategory);

    if (nextCategory === "length") {
      setFromUnit("ft");
      setToUnit("m");
    }

    if (nextCategory === "weight") {
      setFromUnit("lb");
      setToUnit("kg");
    }

    if (nextCategory === "temperature") {
      setFromUnit("f");
      setToUnit("c");
    }

    if (nextCategory === "volume") {
      setFromUnit("cup");
      setToUnit("ml");
    }
  };

  const fromLabel =
    currentUnits.find((unit) => unit.value === fromUnit)?.label ?? fromUnit;

  const toLabel =
    currentUnits.find((unit) => unit.value === toUnit)?.label ?? toUnit;

  return (
    <ToolPage
      line="Goodfolk Office Utilities"
      title="Unit Converter"
      description="Convert common length, weight, temperature, and volume units in your browser."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Conversion Type
          </span>

          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as Category)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
            <option value="volume">Volume</option>
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Amount
          </span>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              From
            </span>

            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            >
              {currentUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              To
            </span>

            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
            >
              {currentUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Converted Result
        </p>

        <p className="mt-2 break-words text-5xl font-bold">
          {result.toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })}
        </p>

        <p className="mt-3 text-slate-800">
          {amount} {fromLabel} ={" "}
          <strong>
            {result.toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}{" "}
            {toLabel}
          </strong>
        </p>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Useful for quick office math, recipes, travel notes, project planning,
        and “wait, how many ounces is that?” moments.
      </p>

      <RelatedTools currentHref="/unit-converter" category="office" />
    </ToolPage>
  );
}