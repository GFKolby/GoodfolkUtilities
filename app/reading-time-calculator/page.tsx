"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Reading Time Calculator",
    "Estimate how long a reading assignment may take based on word count, pages, reading speed, and note-taking time."
  );

export default function ReadingTimeCalculatorPage() {
  const [wordCount, setWordCount] = useState("3000");
  const [pages, setPages] = useState("10");
  const [readingSpeed, setReadingSpeed] = useState("200");
  const [noteTakingMinutes, setNoteTakingMinutes] = useState("15");

  const results = useMemo(() => {
    const words = Number(wordCount);
    const pageCount = Number(pages);
    const speed = Number(readingSpeed);
    const notes = Number(noteTakingMinutes);

    if (words < 0 || pageCount < 0 || speed <= 0 || notes < 0) {
      return null;
    }

    const estimatedWordsFromPages = pageCount * 300;
    const activeWordCount = words > 0 ? words : estimatedWordsFromPages;
    const readingMinutes = activeWordCount / speed;
    const totalMinutes = readingMinutes + notes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.ceil(totalMinutes % 60);

    let pace = "Moderate";
    if (speed >= 300) {
      pace = "Fast";
    } else if (speed <= 150) {
      pace = "Slow/careful";
    }

    return {
      activeWordCount,
      readingMinutes,
      totalMinutes,
      hours,
      minutes,
      pace,
    };
  }, [wordCount, pages, readingSpeed, noteTakingMinutes]);

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Reading Time Calculator"
      description="Estimate how long a reading assignment may take based on word count, pages, reading speed, and note-taking time."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Word count"
              value={wordCount}
              setValue={setWordCount}
            />

            <NumberInput
              label="Pages, if word count unknown"
              value={pages}
              setValue={setPages}
            />

            <NumberInput
              label="Reading speed, words per minute"
              value={readingSpeed}
              setValue={setReadingSpeed}
            />

            <NumberInput
              label="Note-taking/review time (minutes)"
              value={noteTakingMinutes}
              setValue={setNoteTakingMinutes}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            If you enter a word count, the calculator uses that. If word count is
            0, it estimates from pages using about 300 words per page.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Reading estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Estimated words"
                value={`${Math.round(results.activeWordCount)}`}
              />
              <ResultRow
                label="Reading time"
                value={`${Math.ceil(results.readingMinutes)} minutes`}
              />
              <ResultRow
                label="Total with notes"
                value={`${results.hours} hr ${results.minutes} min`}
              />
              <ResultRow label="Reading pace" value={results.pace} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                For dense textbooks or research articles, add extra review time.
                Academic reading goblin likes to hide in footnotes.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid reading details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/reading-time-calculator" category="student" />
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
        min="0"
        step="1"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
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