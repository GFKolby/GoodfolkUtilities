import Link from "next/link";
import { getRelatedTools, ToolLine } from "@/lib/tools";

type Props = {
  currentHref: string;
  line: ToolLine;
};

export default function RelatedTools({
  currentHref,
  line,
}: Props) {
  const tools = getRelatedTools(currentHref, line);

  return (
    <section className="mt-10">
      <p className="mb-4 text-sm font-semibold text-amber-300">
        Related tools
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-amber-300/60 hover:bg-slate-800"
          >
            <h3 className="font-semibold text-white">
              {tool.name}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}