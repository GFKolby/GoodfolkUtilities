import Link from "next/link";

const plannedPosts = [
  "How to plan a trip budget without a spreadsheet",
  "How to estimate daily calories for a realistic goal",
  "How to calculate profit margin and markup",
  "How to build a simple packing list before travel",
  "How to choose colors for a small website or brand",
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          ← Back to Goodfolk Toolbox
        </Link>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Goodfolk Toolbox Blog
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Helpful guides are coming soon.
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            The Goodfolk Toolbox blog will include practical guides, examples,
            and planning tips for using free calculators and utilities across
            travel, health, business, finance, design, development, home, camp,
            office, and student life.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-bold">Planned guides</h2>

          <ul className="mt-5 space-y-3 text-zinc-300">
            {plannedPosts.map((post) => (
              <li key={post} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                {post}
              </li>
            ))}
          </ul>
        </section>
        <Link href="/blog" className="text-zinc-400 hover:text-amber-300">
          {" "}Blog
        </Link>
      </div>
    </main>
  );
}