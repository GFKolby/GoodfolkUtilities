import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          ← Back to all tools
        </Link>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">
          <p className="mb-3 font-medium text-amber-300">
            Support Goodfolk Tools
          </p>

          <h1 className="text-5xl font-bold tracking-tight">
            Keep the toolbox free.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Goodfolk Tools is a collection of free browser-based utilities for
            office work, file cleanup, text formatting, and camping planning.
            If one of these tools saved you time, helped with a task, or made
            your day a little easier, you can support the project.
          </p>

          <div className="mt-8">
            <a
              href="https://ko-fi.com/goodfolkdigital"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-xl bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Support Goodfolk
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="font-semibold text-white">More tools</p>
            <p className="mt-2 text-sm text-zinc-400">
              Support helps fund time spent building and improving new utilities.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="font-semibold text-white">No forced accounts</p>
            <p className="mt-2 text-sm text-zinc-400">
              The goal is to keep tools simple, fast, and easy to use without signups.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="font-semibold text-white">Less clutter</p>
            <p className="mt-2 text-sm text-zinc-400">
              Support makes it easier to avoid stuffing the site with annoying ads.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
          <h2 className="text-2xl font-semibold text-white">
            What happens next?
          </h2>

          <p className="mt-3 text-zinc-300">
            Goodfolk Tools will keep growing with practical utilities for office
            work, camping planning, and everyday digital chores. Support is
            optional, but every bit helps keep the tiny tool shed alive.
          </p>
        </section>

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