"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type Course = {
  id: number;
  name: string;
  credits: string;
  gradePoints: string;
};

const gradeOptions = [
  { label: "A / 4.0", value: "4" },
  { label: "B / 3.0", value: "3" },
  { label: "C / 2.0", value: "2" },
  { label: "D / 1.0", value: "1" },
  { label: "F / 0.0", value: "0" },
];

export default function GpaCalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Course 1", credits: "3", gradePoints: "4" },
    { id: 2, name: "Course 2", credits: "3", gradePoints: "3" },
    { id: 3, name: "Course 3", credits: "3", gradePoints: "4" },
  ]);

  const results = useMemo(() => {
    const validCourses = courses
      .map((course) => ({
        credits: Number(course.credits),
        gradePoints: Number(course.gradePoints),
      }))
      .filter((course) => course.credits > 0 && course.gradePoints >= 0);

    const totalCredits = validCourses.reduce(
      (sum, course) => sum + course.credits,
      0
    );

    const totalQualityPoints = validCourses.reduce(
      (sum, course) => sum + course.credits * course.gradePoints,
      0
    );

    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    return {
      totalCredits,
      totalQualityPoints,
      gpa,
    };
  }, [courses]);

  function updateCourse(
    id: number,
    field: keyof Course,
    value: string
  ) {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  }

  function addCourse() {
    setCourses((currentCourses) => [
      ...currentCourses,
      {
        id: Date.now(),
        name: `Course ${currentCourses.length + 1}`,
        credits: "3",
        gradePoints: "4",
      },
    ]);
  }

  function removeCourse(id: number) {
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== id)
    );
  }

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="College GPA Calculator"
      description="Calculate your college GPA using course grades and credit hours on a standard 4.0 scale."
    >
      <p className="mb-6 max-w-3xl leading-7 text-zinc-300">
        Add each course, enter its credit hours, and select the grade you earned.
        The calculator weights every grade by the course credit hours, adds the
        quality points, and divides by your total attempted credits.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:grid-cols-[1.2fr_0.7fr_0.9fr_auto]"
              >
                <label className="block">
                  <span className="text-sm text-zinc-300">Course</span>
                  <input
                    type="text"
                    value={course.name}
                    onChange={(event) =>
                      updateCourse(course.id, "name", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-300"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-zinc-300">Credit hours</span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={course.credits}
                    onChange={(event) =>
                      updateCourse(course.id, "credits", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-300"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-zinc-300">Grade</span>
                  <select
                    value={course.gradePoints}
                    onChange={(event) =>
                      updateCourse(
                        course.id,
                        "gradePoints",
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-300"
                  >
                    {gradeOptions.map((grade) => (
                      <option key={grade.value} value={grade.value}>
                        {grade.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={() => removeCourse(course.id)}
                  className="self-end rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-red-300 hover:text-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addCourse}
            className="mt-5 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Add course
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This calculator uses an unweighted 4.0 scale with whole-letter
            grades. Check your school policy for plus/minus grades, weighted
            courses, repeated classes, withdrawals, and pass/fail rules.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">GPA estimate</h2>

          <div className="mt-6 space-y-4">
            <ResultRow
              label="Total credit hours"
              value={results.totalCredits.toFixed(1)}
            />
            <ResultRow
              label="Quality points"
              value={results.totalQualityPoints.toFixed(2)}
            />
            <ResultRow label="Estimated GPA" value={results.gpa.toFixed(2)} />

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
              GPA = total quality points ÷ total credit hours. A course with more
              credit hours has a larger effect on the final GPA.
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-white">
          How college GPA is calculated
        </h2>

        <div className="mt-4 space-y-3 leading-7 text-zinc-300">
          <p>
            Convert each letter grade into grade points, then multiply those
            grade points by the course credit hours. That result is the course's
            quality points.
          </p>
          <p className="font-semibold text-white">
            Course quality points = grade points × credit hours
          </p>
          <p className="font-semibold text-white">
            GPA = total quality points ÷ total credit hours
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-white">Worked example</h2>

        <div className="mt-4 space-y-3 leading-7 text-zinc-300">
          <p>
            Suppose you earn an A in a 4-credit course, a B in a 3-credit
            course, and an A in another 3-credit course.
          </p>
          <p>
            The courses produce 16, 9, and 12 quality points. That is 37 quality
            points across 10 credit hours, so the estimated GPA is
            <strong className="text-white"> 3.70</strong>.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
        <h2 className="text-xl font-bold text-white">
          Learn how credit hours affect GPA
        </h2>

        <p className="mt-3 leading-7 text-zinc-300">
          Read the college GPA guide for the formula, a step-by-step example,
          and an explanation of why higher-credit courses carry more weight.
        </p>

        <Link
          href="/blog/how-to-calculate-gpa-in-college"
          className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
        >
          Read the College GPA Guide
        </Link>
      </section>

      <RelatedTools currentHref="/gpa-calculator" category="student" />
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
