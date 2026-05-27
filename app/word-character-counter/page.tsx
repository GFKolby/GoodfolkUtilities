"use client";

import { useMemo, useState } from "react";

import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function WordCharacterCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();

    const words = trimmed
      ? trimmed.split(/\s+/).filter(Boolean).length
      : 0;

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter((item) => item.trim().length > 0).length
      : 0;

    const paragraphs = trimmed
      ? trimmed.split(/\n+/).filter((item) => item.trim().length > 0).length
      : 0;

    const readingMinutes = words / 225;

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingMinutes,
    };
  }, [text]);

  const statCards = [
    { label: "Words", value: stats.words.toLocaleString() },
    { label: "Characters", value: stats.characters.toLocaleString() },
    {
      label: "Characters No Spaces",
      value: stats.charactersNoSpaces.toLocaleString(),
    },
    { label: "Sentences", value: stats.sentences.toLocaleString() },
    { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
    {
      label: "Reading Time",
      value:
        stats.words === 0
          ? "0 min"
          : `${Math.max(1, Math.ceil(stats.readingMinutes))} min`,
    },
  ];

  return (
    <ToolPage
      line="Goodfolk Office Utilities"
      title="Word & Character Counter"
      description="Count words, characters, sentences, paragraphs, and estimated reading time."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Text to Count
          </span>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="h-64 w-full rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-white outline-none focus:border-amber-300"
          />
        </label>

        <button
          onClick={() => setText("")}
          disabled={!text}
          className="w-fit rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 disabled:opacity-50"
        >
          Clear Text
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-amber-300 p-6 text-slate-950"
          >
            <p className="text-sm font-semibold text-slate-700">
              {stat.label}
            </p>

            <p className="mt-2 text-4xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Handy for assignments, emails, social posts, meta descriptions, form limits,
        and tiny writing goblin math.
      </p>
      <RelatedTools currentHref="/word-character-counter" category="office" />
    </ToolPage>
  );
}