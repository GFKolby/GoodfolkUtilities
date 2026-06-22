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
            College GPA is usually calculated using grades, credit hours, and
            quality points. Once you understand the basic formula, it becomes
            much easier to estimate your semester GPA or see how future grades
            may affect your cumulative GPA.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            What does GPA mean?
          </h2>

          <p className="leading-8">
            GPA stands for grade point average. It is a number that represents
            your academic performance across classes. Most colleges use a 4.0
            scale where an A is usually worth 4 points, a B is worth 3 points,
            a C is worth 2 points, and so on.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Why credit hours matter
          </h2>

          <p className="leading-8">
            College GPA is weighted by credit hours. A 4-credit class affects
            your GPA more than a 1-credit class because it carries more academic
            weight. That means your final grade in a larger class can move your
            GPA more than a smaller elective.
          </p>

          <h2 className="text-2xl font-bold text-white">
            The basic GPA formula
          </h2>

          <p className="leading-8">
            To calculate GPA, multiply each course grade point by the number of
            credit hours for that course. Then add those quality points together
            and divide by the total number of credit hours.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Grade points × credit hours = quality points</li>
            <li>Total quality points ÷ total credit hours = GPA</li>
          </ul>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Calculate your GPA faster
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk GPA Calculator to estimate your semester GPA
              from grades and credit hours.
            </p>

            <Link
              href="/gpa-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open GPA Calculator
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Example GPA calculation
          </h2>

          <p className="leading-8">
            Suppose you take three classes: a 4-credit class with an A, a
            3-credit class with a B, and a 3-credit class with an A. The quality
            points would be 16, 9, and 12. That gives you 37 total quality
            points across 10 credit hours.
          </p>

          <p className="leading-8">
            Divide 37 by 10 and your GPA would be 3.7 for that set of classes.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Bottom line
          </h2>

          <p className="leading-8">
            GPA is not just an average of letter grades. Credit hours matter,
            and larger classes have a bigger impact. Once you know your grade
            points and credit hours, GPA becomes much easier to estimate.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for general academic planning only. GPA rules can vary
            by school, program, grading scale, repeated courses, withdrawals,
            and transfer credit policies.
          </div>
        </section>
      </article>
    </main>
  );
}