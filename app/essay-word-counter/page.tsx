"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Essay Word Counter",
    "Count words, characters, sentences, paragraphs, reading time, and progress toward an essay word target."
  );

export default function EssayWordCounterPage() {
  const [text, setText] = useState(
    "Paste or type your essay draft here. The counter will estimate words, characters, sentences, paragraphs, and progress toward your target."
  );
  const [targetWords, setTargetWords] = useState("1000");

  const results = useMemo(() => {
    const trimmedText = text.trim();
    const target = Number(targetWords);

    const words = trimmedText
      ? trimmedText.split(/\s+/).filter((word) => word.length > 0)
      : [];

    const sentences = trimmedText
      ? trimmedText
          .split(/[.!?]+/)
          .map((sentence) => sentence.trim())
          .filter(Boolean)
      : [];

    const paragraphs = trimmedText
      ? trimmedText
          .split(/\n+/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
      : [];

    const wordCount = words.length;
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, "").length;
    const sentenceCount = sentences.length;
    const paragraphCount = paragraphs.length;
    const readingMinutes = wordCount / 200;
    const progressPercent =
      target > 0 ? Math.min((wordCount / target) * 100, 999) : 0;
    const wordsRemaining = target > 0 ? Math.max(target - wordCount, 0) : 0;
    const wordsOver = target > 0 ? Math.max(wordCount - target, 0) : 0;

    let status = "Keep writing";
    if (target <= 0) {
      status = "No target set";
    } else if (wordCount >= target) {
      status = "Target reached";
    } else if (wordCount >= target * 0.75) {
      status = "Almost there";
    } else if (wordCount >= target * 0.5) {
      status = "Halfway-ish";
    }

    return {
      wordCount,
      characterCount,
      characterCountNoSpaces,
      sentenceCount,
      paragraphCount,
      readingMinutes,
      progressPercent,
      wordsRemaining,
      wordsOver,
      status,
    };
  }, [text, targetWords]);

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Essay Word Counter"
      description="Count words, characters, sentences, paragraphs, reading time, and progress toward an essay word target."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block">
            <span className="text-sm text-zinc-300">Essay text</span>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={14}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label className="mt-4 block max-w-xs">
            <span className="text-sm text-zinc-300">Target word count</span>
            <input
              type="number"
              min="0"
              step="1"
              value={targetWords}
              onChange={(event) => setTargetWords(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <button
            type="button"
            onClick={() => setText("")}
            className="mt-5 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
          >
            Clear text
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Counts are estimates based on spacing and punctuation. The essay
            goblin accepts no responsibility for professor-specific formatting
            rules.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Essay stats</h2>

          <div className="mt-6 space-y-4">
            <ResultRow label="Words" value={`${results.wordCount}`} />
            <ResultRow
              label="Characters"
              value={`${results.characterCount}`}
            />
            <ResultRow
              label="Characters without spaces"
              value={`${results.characterCountNoSpaces}`}
            />
            <ResultRow
              label="Sentences"
              value={`${results.sentenceCount}`}
            />
            <ResultRow
              label="Paragraphs"
              value={`${results.paragraphCount}`}
            />
            <ResultRow
              label="Estimated reading time"
              value={`${Math.max(1, Math.ceil(results.readingMinutes))} min`}
            />
            <ResultRow
              label="Target progress"
              value={`${results.progressPercent.toFixed(1)}%`}
            />
            <ResultRow
              label="Words remaining"
              value={`${results.wordsRemaining}`}
            />
            <ResultRow label="Words over target" value={`${results.wordsOver}`} />
            <ResultRow label="Status" value={results.status} />

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
              {results.wordsRemaining > 0
                ? `You need about ${results.wordsRemaining} more words to reach your target.`
                : results.wordsOver > 0
                  ? `You are about ${results.wordsOver} words over your target. Time to trim the fluff goblin.`
                  : "Set a word target and start typing to track progress."}
            </div>
          </div>
        </section>
      </div>

      <RelatedTools currentHref="/essay-word-counter" category="student" />
    </ToolPage>
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