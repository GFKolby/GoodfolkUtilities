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
            Business Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How to Calculate Profit Margin and Markup
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Learn the difference between profit margin and markup, and how to use both when pricing products, services, or freelance work.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <p className="leading-8">Profit margin and markup are related, but they are not the same thing. Mixing them up can make your pricing look better than it really is.</p>

          <p className="leading-8">Profit margin compares profit to revenue. If you sell something for $100 and keep $30 after costs, your profit margin is 30%.</p>

          <p className="leading-8">Markup compares profit to cost. If something costs $70 and you sell it for $100, the markup is about 42.9% because the $30 profit is compared to the $70 cost.</p>

          <p className="leading-8">For business planning, margin is often better for understanding how profitable a sale is. Markup is useful when setting a selling price from a known cost.</p>

          <p className="leading-8">Good pricing should include direct costs, labor, overhead, taxes, fees, and a cushion for profit. If your margin is too thin, one surprise expense can wipe out the profit.</p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Try the free calculator
            </h2>

            <p className="mt-3 leading-7">
              Use this Goodfolk Toolbox calculator to make the planning step faster.
            </p>

            <Link
              href="/profit-margin-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Profit Margin Calculator
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
