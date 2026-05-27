import Link from "next/link";
import type { ToolItem } from "@/lib/tools";

type ToolCardProps = {
  tool: ToolItem;
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-600 hover:bg-zinc-900"
    >
      <h2 className="text-lg font-semibold text-zinc-100">{tool.title}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {tool.description}
      </p>
    </Link>
  );
}