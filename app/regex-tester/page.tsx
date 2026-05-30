"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type RegexMatch = {
  match: string;
  index: number;
  groups: string[];
};

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [sampleText, setSampleText] = useState(
    "Contact support@goodfolkdigital.com or hello@example.com for more info."
  );

  const results = useMemo(() => {
    try {
      const safeFlags = flags.includes("g") ? flags : `${flags}g`;
      const regex = new RegExp(pattern, safeFlags);
      const matches: RegexMatch[] = [];

      let match: RegExpExecArray | null;

      while ((match = regex.exec(sampleText)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });

        if (match[0] === "") {
          regex.lastIndex += 1;
        }
      }

      return {
        valid: true as const,
        matches,
        matchCount: matches.length,
        expression: `/${pattern}/${safeFlags}`,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid regular expression.";

      return {
        valid: false as const,
        error: message,
      };
    }
  }, [pattern, flags, sampleText]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="Regex Tester"
      description="Test regular expressions against sample text and inspect matches, indexes, groups, and flags."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-[1fr_0.4fr]">
            <label className="block">
              <span className="text-sm text-zinc-300">Pattern</span>
              <input
                type="text"
                value={pattern}
                onChange={(event) => setPattern(event.target.value)}
                spellCheck={false}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Flags</span>
              <input
                type="text"
                value={flags}
                onChange={(event) => setFlags(event.target.value)}
                spellCheck={false}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-sm text-zinc-300">Sample text</span>
            <textarea
              value={sampleText}
              onChange={(event) => setSampleText(event.target.value)}
              rows={14}
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
            />
          </label>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            The global flag is added automatically for match listing. Use flags
            like <code className="text-zinc-200">i</code> for case-insensitive,{" "}
            <code className="text-zinc-200">m</code> for multiline, and{" "}
            <code className="text-zinc-200">s</code> for dot-all matching.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Regex results</h2>

          {results.valid ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Expression" value={results.expression} />
              <ResultRow label="Matches found" value={`${results.matchCount}`} />

              <button
                type="button"
                onClick={() => copyText(results.expression)}
                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
              >
                Copy expression
              </button>

              <div className="max-h-96 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                {results.matches.length > 0 ? (
                  <div className="space-y-3">
                    {results.matches.map((item, index) => (
                      <div
                        key={`${item.match}-${item.index}-${index}`}
                        className="rounded-lg border border-slate-800 bg-slate-900 p-3"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <code className="break-all text-sm text-white">
                            {item.match}
                          </code>
                          <span className="text-xs text-zinc-400">
                            Index {item.index}
                          </span>
                        </div>

                        {item.groups.length > 0 && (
                          <div className="mt-3 text-sm text-zinc-300">
                            <p className="font-semibold text-zinc-200">
                              Groups
                            </p>
                            <ul className="mt-2 list-inside list-disc space-y-1">
                              {item.groups.map((group, groupIndex) => (
                                <li key={`${group}-${groupIndex}`}>
                                  Group {groupIndex + 1}:{" "}
                                  <code>{group || "(empty)"}</code>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-300">
                    No matches found for this pattern.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-red-400/30 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
              <p className="font-semibold text-red-200">Invalid regex</p>
              <p className="mt-2">{results.error}</p>
            </div>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/regex-tester" category="developer" />
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