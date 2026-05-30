"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type Flashcard = {
  front: string;
  back: string;
};

function parseFlashcards(input: string): Flashcard[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.includes("::")) {
        const [front, ...backParts] = line.split("::");
        return {
          front: front.trim(),
          back: backParts.join("::").trim(),
        };
      }

      if (line.includes("-")) {
        const [front, ...backParts] = line.split("-");
        return {
          front: front.trim(),
          back: backParts.join("-").trim(),
        };
      }

      return {
        front: line,
        back: "",
      };
    })
    .filter((card) => card.front.length > 0);
}

export default function FlashcardFormatterPage() {
  const [notes, setNotes] = useState(
    "Primary key :: A field that uniquely identifies each row in a table\nForeign key :: A field that links one table to another\nSQL :: Structured Query Language"
  );
  const [separator, setSeparator] = useState("tab");

  const flashcards = useMemo(() => parseFlashcards(notes), [notes]);

  const exportText = useMemo(() => {
    const joiner = separator === "comma" ? "," : "\t";

    return flashcards
      .map((card) => `${card.front}${joiner}${card.back}`)
      .join("\n");
  }, [flashcards, separator]);

  async function copyCards() {
    await navigator.clipboard.writeText(exportText);
  }

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Flashcard Formatter"
      description="Turn simple notes into question-and-answer flashcards you can copy into a study app or spreadsheet."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block">
            <span className="text-sm text-zinc-300">Notes</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={12}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <label className="mt-4 block max-w-sm">
            <span className="text-sm text-zinc-300">Copy format</span>
            <select
              value={separator}
              onChange={(event) => setSeparator(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
            >
              <option value="tab">Tab-separated</option>
              <option value="comma">Comma-separated</option>
            </select>
          </label>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Put one card per line. Use <span className="text-zinc-200">::</span>{" "}
            between the front and back, like{" "}
            <span className="text-zinc-200">Term :: Definition</span>. A dash
            also works if you are moving fast and the study goblin is chasing
            you.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Flashcards</h2>

          <div className="mt-6 space-y-4">
            <ResultRow label="Cards found" value={`${flashcards.length}`} />

            <div className="max-h-72 space-y-3 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
              {flashcards.length > 0 ? (
                flashcards.map((card, index) => (
                  <div
                    key={`${card.front}-${index}`}
                    className="rounded-lg border border-slate-800 bg-slate-900 p-3"
                  >
                    <p className="text-sm font-semibold text-white">
                      {index + 1}. {card.front}
                    </p>
                    <p className="mt-2 text-sm text-zinc-300">
                      {card.back || "No answer/definition added"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-300">
                  Add notes to generate flashcards.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={copyCards}
              className="rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Copy formatted cards
            </button>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
              Tab-separated format usually works best for spreadsheets and many
              flashcard import tools.
            </div>
          </div>
        </section>
      </div>

      <RelatedTools currentHref="/flashcard-formatter" category="student" />
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