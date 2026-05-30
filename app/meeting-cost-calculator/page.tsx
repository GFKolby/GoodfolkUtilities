"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Meeting Cost Calculator",
    "Estimate the real cost of a meeting based on attendee count, hourly rate, duration, prep time, and follow-up time."
  );

export default function MeetingCostCalculatorPage() {
  const [attendees, setAttendees] = useState("6");
  const [averageHourlyRate, setAverageHourlyRate] = useState("45");
  const [meetingMinutes, setMeetingMinutes] = useState("60");
  const [prepMinutesPerPerson, setPrepMinutesPerPerson] = useState("15");
  const [followUpMinutesPerPerson, setFollowUpMinutesPerPerson] = useState("10");
  const [meetingsPerMonth, setMeetingsPerMonth] = useState("4");

  const results = useMemo(() => {
    const attendeeCount = Number(attendees);
    const hourlyRate = Number(averageHourlyRate);
    const duration = Number(meetingMinutes);
    const prep = Number(prepMinutesPerPerson);
    const followUp = Number(followUpMinutesPerPerson);
    const monthlyMeetings = Number(meetingsPerMonth);

    if (
      attendeeCount <= 0 ||
      hourlyRate < 0 ||
      duration <= 0 ||
      prep < 0 ||
      followUp < 0 ||
      monthlyMeetings < 0
    ) {
      return null;
    }

    const meetingHours = duration / 60;
    const prepHours = prep / 60;
    const followUpHours = followUp / 60;
    const totalHoursPerPerson = meetingHours + prepHours + followUpHours;
    const totalPeopleHours = totalHoursPerPerson * attendeeCount;
    const meetingCost = totalPeopleHours * hourlyRate;
    const monthlyCost = meetingCost * monthlyMeetings;
    const yearlyCost = monthlyCost * 12;

    return {
      meetingHours,
      totalHoursPerPerson,
      totalPeopleHours,
      meetingCost,
      monthlyCost,
      yearlyCost,
    };
  }, [
    attendees,
    averageHourlyRate,
    meetingMinutes,
    prepMinutesPerPerson,
    followUpMinutesPerPerson,
    meetingsPerMonth,
  ]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Meeting Cost Calculator"
      description="Estimate the real cost of a meeting based on attendee count, hourly rate, duration, prep time, and follow-up time."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Number of attendees"
              value={attendees}
              setValue={setAttendees}
            />

            <MoneyInput
              label="Average hourly rate ($)"
              value={averageHourlyRate}
              setValue={setAverageHourlyRate}
            />

            <NumberInput
              label="Meeting duration (minutes)"
              value={meetingMinutes}
              setValue={setMeetingMinutes}
            />

            <NumberInput
              label="Prep time per person (minutes)"
              value={prepMinutesPerPerson}
              setValue={setPrepMinutesPerPerson}
            />

            <NumberInput
              label="Follow-up time per person (minutes)"
              value={followUpMinutesPerPerson}
              setValue={setFollowUpMinutesPerPerson}
            />

            <NumberInput
              label="Meetings per month"
              value={meetingsPerMonth}
              setValue={setMeetingsPerMonth}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            A meeting costs more than the calendar block. Prep, follow-up, and
            attendee time all count toward the real business cost.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Meeting cost estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Meeting duration"
                value={`${results.meetingHours.toFixed(2)} hrs`}
              />
              <ResultRow
                label="Time per person"
                value={`${results.totalHoursPerPerson.toFixed(2)} hrs`}
              />
              <ResultRow
                label="Total people-hours"
                value={`${results.totalPeopleHours.toFixed(2)} hrs`}
              />
              <ResultRow
                label="Cost per meeting"
                value={`$${results.meetingCost.toFixed(2)}`}
              />
              <ResultRow
                label="Monthly meeting cost"
                value={`$${results.monthlyCost.toFixed(2)}`}
              />
              <ResultRow
                label="Yearly meeting cost"
                value={`$${results.yearlyCost.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Use this to decide whether a meeting should be shorter, smaller,
                asynchronous, or replaced by a clear written update.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid meeting details to estimate meeting cost.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/meeting-cost-calculator" category="business" />
    </ToolPage>
  );
}

function MoneyInput({
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
        step="0.01"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
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