"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Goodfolk Notes

## Quick List

- One useful thing
- Another useful thing
- Tiny goblin productivity

**Bold text**
*Italic text*

[Visit Goodfolk Digital](https://goodfolkdigital.com)`);

  const html = useMemo(() => {
    return markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/\n/g, "<br />");
  }, [markdown]);

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
  };

  return (
    <ToolPage
      line="Goodfolk Office Utilities"
      title="Markdown Previewer"
      description="Write Markdown and preview the formatted output instantly in your browser."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label>
            <span className="mb-2 block text-sm text-zinc-400">
              Markdown
            </span>

            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="h-96 w-full rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-white outline-none focus:border-amber-300"
            />
          </label>

          <button
            onClick={copyMarkdown}
            className="mt-4 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Copy Markdown
          </button>
        </div>

        <div className="rounded-2xl bg-amber-300 p-6 text-slate-950">
          <p className="mb-3 text-sm font-semibold text-slate-700">
            Preview
          </p>

          <div
            className="prose prose-slate max-w-none rounded-xl bg-amber-50 p-5 text-slate-950"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Supports basic headings, bold, italic, links, and simple list items.
      </p>
    </ToolPage>
  );
}