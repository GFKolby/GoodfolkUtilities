"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { allTools } from "@/lib/tools";

const popularSearches = [
  "BMI",
  "Calories",
  "Water Intake",
  "Profit Margin",
  "Sales Tax",
  "Invoice",
  "Trip Budget",
  "Color Palette",
  "JSON Formatter",
  "Camping Checklist",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const search = query.toLowerCase();

    return allTools
      .filter(
        (tool) =>
          tool.title.toLowerCase().includes(search) ||
          tool.description.toLowerCase().includes(search) ||
          tool.category.toLowerCase().includes(search)
      )
      .slice(0, 12);
  }, [query]);

  return (
    <section className="mx-auto mt-10 w-full max-w-3xl">
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>

      <input
        id="tool-search"
        type="text"
        placeholder="Search tools..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-300"
      />

      <div className="mt-4">
        <p className="text-sm font-semibold text-zinc-300">Popular searches</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              type="button"
              onClick={() => setQuery(search)}
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {query.trim() && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          {results.length > 0 ? (
            results.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="block border-b border-slate-800 p-4 transition last:border-b-0 hover:bg-slate-800"
              >
                <div className="font-semibold text-white">{tool.title}</div>

                <div className="mt-1 text-sm text-zinc-400">
                  {tool.description}
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-zinc-400">
              No tools found. Try searching for budget, health, color, tax, or travel.
            </p>
          )}
        </div>
      )}
    </section>
  );
}