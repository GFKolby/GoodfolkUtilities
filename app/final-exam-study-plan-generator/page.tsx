"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata =
  createToolMetadata(
    "Final Exam Study Plan Generator",
    "Create a simple day-by-day final exam study plan based on exam date, topics, available study time, and review days."
  );

export default function FinalExamStudyPlanGeneratorPage() {
  const today = new Date().toISOString().split("T")[0];

  const defaultExamDate = new Date();
  defaultExamDate.setDate(defaultExamDate.getDate() + 14);
  const defaultExamDateString = defaultExamDate.toISOString().split("T")[0];

  const [courseName, setCourseName] = useState("SQL Fundamentals");
  const [examDate, setExamDate] = useState(defaultExamDateString);
  const [topics, setTopics] = useState(
    "Joins\nSubqueries\nViews\nStored procedures\nNormalization\nIndexes"
  );
  const [studyHoursPerDay, setStudyHoursPerDay] = useState("1.5");
  const [reviewDays, setReviewDays] = useState("2");

  const results = useMemo(() => {
    const dailyHours = Number(studyHoursPerDay);
    const finalReviewDays = Number(reviewDays);

    if (dailyHours <= 0 || finalReviewDays < 0) {
      return null;
    }

    const start = new Date(today + "T00:00:00");
    const exam = new Date(examDate + "T00:00:00");

    if (Number.isNaN(exam.getTime()) || exam < start) {
      return null;
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const totalDaysUntilExam =
      Math.floor((exam.getTime() - start.getTime()) / millisecondsPerDay) + 1;

    const topicList = topics
      .split("\n")
      .map((topic) => topic.trim())
      .filter(Boolean);

    if (topicList.length === 0) {
      return null;
    }

    const studyDays = Math.max(totalDaysUntilExam - finalReviewDays, 1);
    const totalStudyHours = totalDaysUntilExam * dailyHours;
    const hoursPerTopic = (studyDays * dailyHours) / topicList.length;

    const plan = Array.from({ length: totalDaysUntilExam }, (_, index) => {
      const dayNumber = index + 1;

      if (index >= studyDays) {
        return {
          day: dayNumber,
          focus: "Review",
          task:
            "Review notes, redo missed questions, summarize weak areas, and make a final quick-reference sheet.",
        };
      }

      const topicIndex = index % topicList.length;
      const topic = topicList[topicIndex];

      return {
        day: dayNumber,
        focus: topic,
        task: `Study ${topic}, make notes, and practice sample questions.`,
      };
    });

    let pace = "Manageable";
    if (dailyHours >= 3 || hoursPerTopic < 1) {
      pace = "Intense";
    } else if (dailyHours <= 1 && topicList.length > studyDays) {
      pace = "Tight";
    } else if (dailyHours <= 1) {
      pace = "Light";
    }

    return {
      totalDaysUntilExam,
      topicCount: topicList.length,
      studyDays,
      finalReviewDays,
      totalStudyHours,
      hoursPerTopic,
      pace,
      plan,
    };
  }, [today, examDate, topics, studyHoursPerDay, reviewDays]);

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Final Exam Study Plan Generator"
      description="Create a simple day-by-day final exam study plan based on exam date, topics, available study time, and review days."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">Course or exam name</span>
              <input
                type="text"
                value={courseName}
                onChange={(event) => setCourseName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Exam date</span>
              <input
                type="date"
                value={examDate}
                min={today}
                onChange={(event) => setExamDate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>

            <NumberInput
              label="Study hours per day"
              value={studyHoursPerDay}
              setValue={setStudyHoursPerDay}
            />

            <NumberInput
              label="Final review days"
              value={reviewDays}
              setValue={setReviewDays}
            />

            <label className="block sm:col-span-2">
              <span className="text-sm text-zinc-300">
                Topics, one per line
              </span>
              <textarea
                value={topics}
                onChange={(event) => setTopics(event.target.value)}
                rows={8}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              />
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Add topics from your syllabus, study guide, or missed quiz areas.
            The final exam goblin fears a plan with review days.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Study plan</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Course" value={courseName || "Untitled exam"} />
              <ResultRow
                label="Days until exam"
                value={`${results.totalDaysUntilExam}`}
              />
              <ResultRow
                label="Topics"
                value={`${results.topicCount}`}
              />
              <ResultRow
                label="Study days"
                value={`${results.studyDays}`}
              />
              <ResultRow
                label="Review days"
                value={`${results.finalReviewDays}`}
              />
              <ResultRow
                label="Total planned study time"
                value={`${results.totalStudyHours.toFixed(1)} hours`}
              />
              <ResultRow
                label="Estimated time per topic"
                value={`${results.hoursPerTopic.toFixed(1)} hours`}
              />
              <ResultRow label="Pace" value={results.pace} />

              <div className="max-h-96 space-y-3 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                {results.plan.map((item) => (
                  <div
                    key={`${item.day}-${item.focus}`}
                    className="rounded-lg border border-slate-800 bg-slate-900 p-3"
                  >
                    <p className="text-sm font-semibold text-white">
                      Day {item.day}: {item.focus}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      {item.task}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                Use this as a rough plan. Spend extra time on weak topics, old
                quiz misses, professor hints, and anything that keeps appearing
                in homework.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter a valid exam date, topics, and study time to generate a
              study plan.
            </p>
          )}
        </section>
      </div>

      <RelatedTools
        currentHref="/final-exam-study-plan-generator"
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