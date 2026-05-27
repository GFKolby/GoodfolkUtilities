import Link from "next/link";
import ToolGrid from "@/components/ToolGrid";
import { homeTools } from "@/lib/tools";

export const metadata = {
  title: "Home Utilities",
  description:
    "Free home utilities for paint planning, room size calculations, electricity costs, moving boxes, and project budgets.",
};

export default function HomeUtilitiesPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          ← Back to all tools
        </Link>

        <header className="border-b border-slate-800 pb-10">
          <p className="mb-2 font-medium text-amber-300">
            Goodfolk Home Utilities
          </p>

          <h1 className="text-5xl font-bold md:text-6xl">
            Free home tools for practical projects and planning.
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Estimate paint, room size, electricity costs, moving boxes, and
            home project budgets with simple browser-based calculators.
          </p>
        </header>

        <section className="mt-12">
          <ToolGrid tools={homeTools} />
        </section>

        <footer className="mt-16 border-t border-slate-800 pt-8 text-sm text-zinc-500">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://goodfolkdigital.com"
            className="text-zinc-400 hover:text-amber-300"
          >
            Goodfolk Digital
          </a>
          .{" "}
          <Link href="/about" className="text-zinc-400 hover:text-amber-300">
            About
          </Link>
          .{" "}
          <Link href="/privacy" className="text-zinc-400 hover:text-amber-300">
            Privacy
          </Link>
          . Built for good folks.
        </footer>
      </div>
    </main>
  );
}
