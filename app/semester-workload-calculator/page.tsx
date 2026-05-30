"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function SemesterWorkloadCalculatorPage() {
  const [creditHours, setCreditHours] = useState("12");
  const [studyHoursPerCredit, setStudyHoursPerCredit] = useState("2");
  const [assignmentHours, setAssignmentHours] = useState("6");
  const [commuteHours, setCommuteHours] = useState("2");
  const [workHours, setWorkHours] = useState("20");
  const [personalBufferHours, setPersonalBufferHours] = useState("5");

  const results = useMemo(() => {
    const credits = Number(creditHours);
    const studyPerCredit = Number(studyHoursPerCredit);
    const assignments = Number(assignmentHours);
    const commute = Number(commuteHours);
    const work = Number(workHours);
    const buffer = Number(personalBufferHours);

    if (
      credits < 0 ||
      studyPerCredit < 0 ||
      assignments < 0 ||
      commute < 0 ||
      work < 0 ||
      buffer < 0
    ) {
      return null;
    }

    const classHours = credits;
    const studyHours = credits * studyPerCredit;
    const schoolHours = classHours + studyHours + assignments + commute;
    const totalCommittedHours = schoolHours + work + buffer;
    const dailyAverage = totalCommittedHours / 7;
    const remainingWeeklyHours = Math.max(168 - totalCommittedHours, 0);

    let status = "Manageable";
    if (totalCommittedHours >= 80) {
      status = "Very heavy";
    } else if (totalCommittedHours >= 65) {
      status = "Heavy";
    } else if (totalCommittedHours <= 40) {
      status = "Light";
    }

    return {
      classHours,
      studyHours,
      assignments,
      commute,
      schoolHours,
      work,
      buffer,
      totalCommittedHours,
      dailyAverage,
      remainingWeeklyHours,
      status,
    };
  }, [
    creditHours,
    studyHoursPerCredit,
    assignmentHours,
    commuteHours,
    workHours,
    personalBufferHours,
  ]);

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Semester Workload Calculator"
      description="Estimate your weekly workload for a semester using credit hours, study time, assignments, work, and life commitments."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Credit hours"
              value={creditHours}
              setValue={setCreditHours}
            />

            <NumberInput
              label="Study hours per credit"
              value={studyHoursPerCredit}
              setValue={setStudyHoursPerCredit}
            />

            <NumberInput
              label="Assignment/project hours per week"
              value={assignmentHours}
              setValue={setAssignmentHours}
            />

            <NumberInput
              label="Commute/campus time per week"
              value={commuteHours}
              setValue={setCommuteHours}
            />

            <NumberInput
              label="Work hours per week"
              value={workHours}
              setValue={setWorkHours}
            />

            <NumberInput
              label="Personal buffer hours per week"
              value={personalBufferHours}
              setValue={setPersonalBufferHours}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            A common planning rule is 2–3 study hours per credit hour, but real
            workload depends on the class, professor, assignments, and your
            personal chaos goblin schedule.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Workload estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Class time"
                value={`${results.classHours.toFixed(1)} hrs/week`}
              />
              <ResultRow
                label="Study time"
                value={`${results.studyHours.toFixed(1)} hrs/week`}
              />
              <ResultRow
                label="Assignment/project time"
                value={`${results.assignments.toFixed(1)} hrs/week`}
              />
              <ResultRow
                label="Commute/campus time"
                value={`${results.commute.toFixed(1)} hrs/week`}
              />
              <ResultRow
                label="Total school time"
                value={`${results.schoolHours.toFixed(1)} hrs/week`}
              />
              <ResultRow
                label="Work time"
                value={`${results.work.toFixed(1)} hrs/week`}
              />
              <ResultRow
                label="Personal buffer"
                value={`${results.buffer.toFixed(1)} hrs/week`}
              />
              <ResultRow
                label="Total committed time"
                value={`${results.totalCommittedHours.toFixed(1)} hrs/week`}
              />
              <ResultRow
                label="Average per day"
                value={`${results.dailyAverage.toFixed(1)} hrs/day`}
              />
              <ResultRow
                label="Unassigned weekly time"
                value={`${results.remainingWeeklyHours.toFixed(1)} hrs/week`}
              />
              <ResultRow label="Status" value={results.status} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                If this looks heavy, consider reducing classes, lowering outside
                commitments, or planning fixed study blocks before the semester
                starts.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid workload details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/semester-workload-calculator"
        category="student"
      />
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
        step="0.5"
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