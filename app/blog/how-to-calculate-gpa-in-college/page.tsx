import Link from "next/link";

export default function GpaBlogPost() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          ← Back to Blog
        </Link>

        <header className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Student Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How To Calculate GPA In College
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            To calculate your college GPA, multiply each course&apos;s grade
            points by its credit hours, add the quality points from every
            course, and divide that total by the number of credit hours.
          </p>

          <Link
            href="/gpa-calculator"
            className="mt-6 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Calculate Your College GPA
          </Link>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            The college GPA formula
          </h2>

          <p className="leading-8">
            College GPA is weighted by credit hours, so it is not simply the
            average of your letter grades. A course worth more credits has a
            larger effect on your GPA.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="font-semibold text-white">
              Grade points × credit hours = quality points
            </p>
            <p className="mt-3 font-semibold text-white">
              Total quality points ÷ total credit hours = GPA
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Example GPA calculation
          </h2>

          <p className="leading-8">
            Suppose you take three courses: a 4-credit course with an A, a
            3-credit course with a B, and a 3-credit course with an A.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>A in a 4-credit course: 4.0 × 4 = 16 quality points</li>
            <li>B in a 3-credit course: 3.0 × 3 = 9 quality points</li>
            <li>A in a 3-credit course: 4.0 × 3 = 12 quality points</li>
          </ul>

          <p className="leading-8">
            Those courses produce 37 quality points across 10 credit hours.
            Divide 37 by 10, and the semester GPA is{" "}
            <strong className="text-white">3.70</strong>.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Why credit hours matter
          </h2>

          <p className="leading-8">
            A 4-credit course affects your GPA more than a 1-credit course. For
            example, earning an A in a 4-credit course adds 16 quality points,
            while an A in a 1-credit course adds only 4. This is why higher-credit
            courses can move your GPA more noticeably.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Convert letter grades to grade points
          </h2>

          <p className="leading-8">
            On a basic unweighted 4.0 scale, an A is worth 4.0 points, a B is
            worth 3.0, a C is worth 2.0, a D is worth 1.0, and an F is worth 0.
            Schools may use different values for plus and minus grades.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Enter your courses and calculate the result
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk College GPA Calculator to enter each course,
              credit-hour value, and grade. The tool totals your quality points
              and calculates the weighted GPA automatically.
            </p>

            <Link
              href="/gpa-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open College GPA Calculator
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Semester GPA versus cumulative GPA
          </h2>

          <p className="leading-8">
            A semester GPA uses only the courses taken during one term. A
            cumulative GPA uses all GPA-eligible courses and credit hours
            included by your school. The same quality-points formula applies,
            but cumulative calculations require your full academic record.
          </p>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            Multiply each grade-point value by the course&apos;s credit hours,
            total the resulting quality points, and divide by total credit
            hours. That produces a credit-weighted college GPA rather than a
            simple average of letter grades.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for general academic planning only. GPA rules can vary
            by school, program, grading scale, repeated courses, withdrawals,
            pass/fail classes, and transfer-credit policies.
          </div>
        </section>
      </article>
    </main>
  );
}
