"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function GradeNeededCalculatorPage() {
  const [currentGrade, setCurrentGrade] = useState("85");
  const [targetGrade, setTargetGrade] = useState("90");
  const [remainingWeight, setRemainingWeight] = useState("30");

  const results = useMemo(() => {
    const current = Number(currentGrade);
    const target = Number(targetGrade);
    const remaining = Number(remainingWeight);

    if (
      current < 0 ||
      current > 100 ||
      target < 0 ||
      target > 100 ||
      remaining <= 0 ||
      remaining > 100
    ) {
      return null;
    }

    const completedWeight = 100 - remaining;
    const currentContribution = current * (completedWeight / 100);
    const neededOnRemaining =
      (target - currentContribution) / (remaining / 100);

    let status = "Possible";
    if (neededOnRemaining > 100) {
      status = "Above 100% needed";
    } else if (neededOnRemaining <= 0) {
      status = "Already secured";
    } else if (neededOnRemaining >= 90) {
      status = "High score needed";
    } else if (neededOnRemaining < 60) {
      status = "Comfortable";
    }

    const projectedWithZero = currentContribution;
    const projectedWithHundred = currentContribution + remaining;

    return {
      completedWeight,
      currentContribution,
      neededOnRemaining,
      projectedWithZero,
      projectedWithHundred,
      status,
    };
  }, [currentGrade, targetGrade, remainingWeight]);

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Grade Needed Calculator"
      description="Calculate what grade you need on a final exam or remaining assignment to hit your target course grade."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Current course grade (%)"
              value={currentGrade}
              setValue={setCurrentGrade}
            />

            <NumberInput
              label="Target course grade (%)"
              value={targetGrade}
              setValue={setTargetGrade}
            />

            <NumberInput
              label="Remaining grade weight (%)"
              value={remainingWeight}
              setValue={setRemainingWeight}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use the remaining weight for your final exam, final project, or all
            remaining coursework combined. Check your syllabus for the exact
            percentage. Syllabus goblin is annoyingly powerful.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Grade estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Completed weight"
                value={`${results.completedWeight.toFixed(1)}%`}
              />
              <ResultRow
                label="Current contribution"
                value={`${results.currentContribution.toFixed(2)} points`}
              />
              <ResultRow
                label="Needed on remaining work"
                value={`${results.neededOnRemaining.toFixed(2)}%`}
              />
              <ResultRow
                label="Best possible final grade"
                value={`${results.projectedWithHundred.toFixed(2)}%`}
              />
              <ResultRow
                label="If remaining work is 0%"
                value={`${results.projectedWithZero.toFixed(2)}%`}
              />
              <ResultRow label="Status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                {results.neededOnRemaining > 100
                  ? "Your target may not be reachable with the remaining weight unless extra credit or grade adjustments are available."
                  : results.neededOnRemaining <= 0
                    ? "Your current grade is already enough to meet the target based on the remaining weight."
                    : `You need about ${results.neededOnRemaining.toFixed(
                        2
                      )}% on the remaining work to reach your target.`}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid grade details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/grade-needed-calculator" category="student" />
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
        max="100"
        step="0.01"
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