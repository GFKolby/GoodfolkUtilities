import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Learn about Goodfolk Tools, a free collection of practical browser-based utilities by Goodfolk Digital.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          ← Back to all tools
        </Link>

        <header className="border-b border-slate-800 pb-10">
          <p className="mb-2 font-medium text-amber-300">Goodfolk Tools</p>

          <h1 className="text-5xl font-bold md:text-6xl">
            Small tools for practical folks.
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Goodfolk Tools is a growing collection of simple browser-based
            utilities for office work, file cleanup, text formatting, and
            camping planning.
          </p>
        </header>

        <section className="mt-10 space-y-8 text-zinc-300">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Why this exists
            </h2>
            <p className="mt-3 leading-7">
              A lot of everyday tasks do not need a full app, an account, a
              subscription, or a complicated dashboard. Sometimes you just need
              to clean a CSV, split a PDF, estimate water for a camping trip, or
              generate a quick checklist.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              What Goodfolk Tools is for
            </h2>
            <p className="mt-3 leading-7">
              The goal is to build small, sharp tools that solve one problem at
              a time. Each utility is designed to be quick, practical, and easy
              to use without unnecessary clutter.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Built by Goodfolk Digital
            </h2>
            <p className="mt-3 leading-7">
              Goodfolk Digital is a small software workshop focused on useful
              tools, lightweight automations, and practical digital systems.
            </p>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/office"
            className="rounded-xl bg-amber-300 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Browse office tools
          </Link>

          <Link
            href="/camp"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-zinc-200 transition hover:bg-slate-900"
          >
            Browse camp tools
          </Link>
        </div>

        <footer className="mt-16 border-t border-slate-800 pt-8 text-sm text-zinc-500">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://goodfolkdigital.com"
            className="text-zinc-400 hover:text-amber-300"
          >
            Goodfolk Digital
          </a>
          . Built for good folks.
        </footer>
      </div>
    </main>
  );
}