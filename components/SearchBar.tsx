"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { allTools } from "@/lib/tools";

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
          tool.description.toLowerCase().includes(search)
      )
      .slice(0, 12);
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <input
        type="text"
        placeholder="Search tools..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none focus:border-amber-300"
      />

      {results.length > 0 && (
        <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          {results.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="block border-b border-slate-800 p-4 hover:bg-slate-800"
            >
              <div className="font-semibold text-white">
                {tool.title}
              </div>

              <div className="mt-1 text-sm text-zinc-400">
                {tool.description}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}