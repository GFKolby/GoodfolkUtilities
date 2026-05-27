import Link from "next/link";
import type { ToolItem } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

type CategoryPageProps = {
  title: string;
  description: string;
  tools: ToolItem[];
};

export default function CategoryPage({
  title,
  description,
  tools,
}: CategoryPageProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="text-sm text-zinc-400 transition hover:text-zinc-100"
        >
          ← Back to all tools
        </Link>

        <section className="mt-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
            Goodfolk Toolbox
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            {description}
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </section>
      </div>
    </main>
  );
}