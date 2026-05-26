import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                {tool.name}
              </h3>

              <p className="mt-2 text-zinc-400">{tool.description}</p>
            </div>

            <span className="shrink-0 text-amber-300 transition group-hover:translate-x-1">
              →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}