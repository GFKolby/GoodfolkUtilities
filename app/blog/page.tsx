import Link from "next/link";

const comingSoonPosts = [
  "How to plan a trip budget without a spreadsheet",
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
            Helpful guides for everyday tools.
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Practical guides, examples, and planning tips for using free
            calculators and utilities across travel, health, business, finance,
            design, development, home, camp, office, and student life.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-bold">Latest guide</h2>

          <Link
            href="/blog/how-much-water-should-you-drink"
            className="mt-5 block rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-amber-300/60 hover:bg-slate-900"
          >
            <p className="text-sm font-semibold text-amber-300">
              Health Guide
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              How Much Water Should You Drink Per Day?
            </h3>

            <p className="mt-3 leading-7 text-zinc-300">
              Learn what affects daily water needs, including body weight,
              activity, weather, and caffeine or alcohol intake.
            </p>
          </Link>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-bold">Planned guides</h2>

          <ul className="mt-5 space-y-3 text-zinc-300">
            {comingSoonPosts.map((post) => (
              <li
                key={post}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                {post}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}