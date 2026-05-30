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
            Design Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How to Choose Colors for a Small Website or Brand
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Learn a simple way to choose brand or website colors using a base color, contrast, palette balance, and reusable CSS values.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <p className="leading-8">Choosing colors for a small website or brand does not need to become a full design crisis. Start with one base color that fits the feeling you want: calm, bold, friendly, premium, playful, or practical.</p>

          <p className="leading-8">After choosing a base color, build a small palette around it. A useful starting set is one primary color, one darker shade, one lighter shade, one neutral background, and one accent color.</p>

          <p className="leading-8">Contrast matters more than vibes. Text needs to be readable against the background. Buttons need to stand out. Important actions should not blend into the page.</p>

          <p className="leading-8">Keep the palette small at first. Too many colors can make a website feel messy. A clean palette with consistent usage usually looks more professional than a rainbow toolbox situation.</p>

          <p className="leading-8">Once you find colors you like, save the HEX values or CSS variables so you can reuse them consistently across buttons, cards, links, backgrounds, and headings.</p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Try the free calculator
            </h2>

            <p className="mt-3 leading-7">
              Use this Goodfolk Toolbox calculator to make the planning step faster.
            </p>

            <Link
              href="/color-palette-generator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Color Palette Generator
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
