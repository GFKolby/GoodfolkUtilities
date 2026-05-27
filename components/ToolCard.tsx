import Link from "next/link";
import type { ToolItem } from "@/lib/tools";

type ToolCardProps = {
  tool: ToolItem;
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm transition hover:border-amber-300/60 hover:bg-slate-800"
    >
      <h2 className="text-lg font-semibold text-white">{tool.title}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-300">
        {tool.description}
      </p>
    </Link>
  );
}