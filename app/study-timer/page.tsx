"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function StudyTimerPage() {
  const [sessionMinutes, setSessionMinutes] = useState("25");
  const [breakMinutes, setBreakMinutes] = useState("5");
  const [sessions, setSessions] = useState("4");
  const [longBreakMinutes, setLongBreakMinutes] = useState("15");

  const results = useMemo(() => {
    const focus = Number(sessionMinutes);
    const shortBreak = Number(breakMinutes);
    const sessionCount = Number(sessions);
    const longBreak = Number(longBreakMinutes);

    if (focus <= 0 || shortBreak < 0 || sessionCount <= 0 || longBreak < 0) {
      return null;
    }

    const focusTime = focus * sessionCount;
    const shortBreakCount = Math.max(sessionCount - 1, 0);
    const breakTime = shortBreak * shortBreakCount + longBreak;
    const totalTime = focusTime + breakTime;

    const totalHours = Math.floor(totalTime / 60);
    const totalMinutes = totalTime % 60;

    let intensity = "Balanced";
    if (focus >= 50 || totalTime >= 240) {
      intensity = "Heavy";
    } else if (focus <= 20 || totalTime <= 60) {
      intensity = "Light";
    }

    return {
      focusTime,
      shortBreakCount,
      breakTime,
      totalTime,
      totalHours,
      totalMinutes,
      intensity,
    };
  }, [sessionMinutes, breakMinutes, sessions, longBreakMinutes]);

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Study Timer"
      description="Plan focused study sessions with short breaks and a longer reset break."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Focus session length (minutes)"
              value={sessionMinutes}
              setValue={setSessionMinutes}
            />

            <NumberInput
              label="Short break length (minutes)"
              value={breakMinutes}
              setValue={setBreakMinutes}
            />

            <NumberInput
              label="Number of focus sessions"
              value={sessions}
              setValue={setSessions}
            />

            <NumberInput
              label="Long break/reset time (minutes)"
              value={longBreakMinutes}
              setValue={setLongBreakMinutes}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            A common setup is 25 minutes of focus, 5 minutes of break, repeated
            4 times, then a longer break. Tiny focus goblin likes clean cycles.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Study plan</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Total focus time"
                value={`${results.focusTime} minutes`}
              />
              <ResultRow
                label="Short breaks"
                value={`${results.shortBreakCount}`}
              />
              <ResultRow
                label="Total break time"
                value={`${results.breakTime} minutes`}
              />
              <ResultRow
                label="Total timer block"
                value={`${results.totalHours} hr ${results.totalMinutes} min`}
              />
              <ResultRow label="Intensity" value={results.intensity} />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Try using this block for one assignment, one chapter, or one
                review session. Keep your phone away unless it is the timer,
                because the scroll goblin is undefeated.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid timer details to see your study plan.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/study-timer" category="student" />
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