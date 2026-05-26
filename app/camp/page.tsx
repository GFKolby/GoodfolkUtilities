import Link from "next/link";
import ToolGrid from "@/components/ToolGrid";
import { campTools } from "@/lib/tools";

export const metadata = {
  title: "Camp Utilities",
  description:
    "Free camping planning tools for water, battery power, pack weight, stove fuel, meals, weather comfort, checklists, and trip costs.",
};

export default function CampPage() {
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
            Goodfolk Camp Utilities
          </p>

          <h1 className="text-5xl font-bold md:text-6xl">
            Free camping tools for planning before you leave home.
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Estimate water, power, fuel, meals, pack weight, weather comfort,
            checklists, and total trip costs for your next camping trip.
          </p>
        </header>

        <section className="mt-12">
          <ToolGrid tools={campTools} />
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