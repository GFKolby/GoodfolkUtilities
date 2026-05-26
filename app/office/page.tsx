import Link from "next/link";
import ToolGrid from "@/components/ToolGrid";
import { officeTools } from "@/lib/tools";

export const metadata = {
  title: "Office Utilities",
  description:
    "Free browser-based office tools for file cleanup, text formatting, password generation, Markdown previewing, and everyday digital tasks.",
};

export default function OfficePage() {
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
            Goodfolk Office Utilities
          </p>

          <h1 className="text-5xl font-bold md:text-6xl">
            Free office tools for everyday digital messes.
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Clean up files, format text, generate passwords, preview Markdown,
            and handle small office tasks without signing up for anything.
          </p>
        </header>

        <section className="mt-12">
          <ToolGrid tools={officeTools} />
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