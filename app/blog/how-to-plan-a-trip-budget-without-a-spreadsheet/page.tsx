import Link from "next/link";

export default function BlogPostPage() {
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
            Travel Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How to Plan a Trip Budget Without a Spreadsheet
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Learn how to estimate trip costs for transportation, lodging, food, activities, and daily spending without building a spreadsheet.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <p className="leading-8">A simple trip budget starts with categories, not complicated formulas. The goal is to estimate the major costs first, then add a buffer for the travel gremlins that always show up.</p>

          <p className="leading-8">Start with transportation. Include flights, train tickets, rental cars, gas, parking, rideshares, public transit, and airport transfers. Then add lodging, food, activities, shopping, and emergency money.</p>

          <p className="leading-8">Lodging is usually one of the biggest trip costs. Multiply your nightly rate by the number of nights, then add taxes, booking fees, cleaning fees, and resort fees if they apply.</p>

          <p className="leading-8">Food can be estimated by day. Pick a realistic daily food amount based on your travel style, then multiply it by the number of days and travelers.</p>

          <p className="leading-8">Finally, add a buffer. A 10–20% buffer can help cover baggage fees, extra taxis, snacks, tips, weather changes, or activities you decide to add later.</p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Try the free calculator
            </h2>

            <p className="mt-3 leading-7">
              Use this Goodfolk Toolbox calculator to make the planning step faster.
            </p>

            <Link
              href="/trip-budget-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Trip Budget Calculator
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for general planning and educational use. Always check details for your specific situation before making financial, health, travel, or business decisions.
          </div>
        </section>
      </article>
    </main>
  );
}
