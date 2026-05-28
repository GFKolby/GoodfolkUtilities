"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function AssignmentPlannerPage() {
  const today = new Date().toISOString().split("T")[0];

  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 7);
  const defaultDueDateString = defaultDueDate.toISOString().split("T")[0];

  const [assignmentName, setAssignmentName] = useState("Research paper");
  const [dueDate, setDueDate] = useState(defaultDueDateString);
  const [estimatedHours, setEstimatedHours] = useState("8");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [bufferDays, setBufferDays] = useState("1");

  const results = useMemo(() => {
    const hours = Number(estimatedHours);
    const daysPerWeek = Number(workDaysPerWeek);
    const buffer = Number(bufferDays);

    if (hours <= 0 || daysPerWeek <= 0 || daysPerWeek > 7 || buffer < 0) {
      return null;
    }

    const start = new Date(today + "T00:00:00");
    const due = new Date(dueDate + "T00:00:00");

    if (Number.isNaN(due.getTime()) || due < start) {
      return null;
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const calendarDaysUntilDue =
      Math.floor((due.getTime() - start.getTime()) / millisecondsPerDay) + 1;

    const usableCalendarDays = Math.max(calendarDaysUntilDue - buffer, 1);
    const estimatedWorkDays = Math.max(
      Math.floor((usableCalendarDays / 7) * daysPerWeek),
      1
    );

    const hoursPerWorkDay = hours / estimatedWorkDays;
    const minutesPerWorkDay = hoursPerWorkDay * 60;

    let pace = "Manageable";
    if (hoursPerWorkDay > 3) {
      pace = "Heavy";
    } else if (hoursPerWorkDay > 1.5) {
      pace = "Moderate";
    } else if (hoursPerWorkDay <= 0.75) {
      pace = "Light";
    }

    return {
      calendarDaysUntilDue,
      usableCalendarDays,
      estimatedWorkDays,
      hoursPerWorkDay,
      minutesPerWorkDay,
      pace,
    };
  }, [today, dueDate, estimatedHours, workDaysPerWeek, bufferDays]);

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Assignment Planner"
      description="Break an assignment into daily work sessions based on due date, estimated effort, and available study days."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Assignment name</span>
              <input
                type="text"
                value={assignmentName}
                onChange={(event) => setAssignmentName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Due date</span>
              <input
                type="date"
                value={dueDate}
                min={today}
                onChange={(event) => setDueDate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <NumberInput
              label="Estimated total hours"
              value={estimatedHours}
              setValue={setEstimatedHours}
            />

            <NumberInput
              label="Study/work days per week"
              value={workDaysPerWeek}
              setValue={setWorkDaysPerWeek}
            />

            <NumberInput
              label="Buffer days before due date"
              value={bufferDays}
              setValue={setBufferDays}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Add buffer days so you are not submitting work at 11:58 PM while the
            deadline goblin breathes on your neck.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Assignment plan</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Assignment" value={assignmentName || "Untitled"} />
              <ResultRow
                label="Calendar days until due"
                value={`${results.calendarDaysUntilDue}`}
              />
              <ResultRow
                label="Usable planning days"
                value={`${results.usableCalendarDays}`}
              />
              <ResultRow
                label="Estimated work days"
                value={`${results.estimatedWorkDays}`}
              />
              <ResultRow
                label="Work per study day"
                value={`${results.hoursPerWorkDay.toFixed(2)} hours`}
              />
              <ResultRow
                label="Minutes per study day"
                value={`${Math.ceil(results.minutesPerWorkDay)} minutes`}
              />
              <ResultRow label="Pace" value={results.pace} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Aim for about{" "}
                <span className="font-semibold text-white">
                  {results.hoursPerWorkDay.toFixed(2)} hours
                </span>{" "}
                per study day. Start with outlining or setup first so the work
                has somewhere to land.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter a valid due date and assignment details to see your plan.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/assignment-planner" category="student" />
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