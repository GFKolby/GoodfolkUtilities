"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type SourceType = "website" | "book" | "article" | "video";
type CitationStyle = "mla" | "apa";

function formatAuthorMLA(author: string) {
  const trimmed = author.trim();

  if (!trimmed) {
    return "";
  }

  const parts = trimmed.split(/\s+/);

  if (parts.length === 1) {
    return trimmed;
  }

  const lastName = parts[parts.length - 1];
  const firstNames = parts.slice(0, -1).join(" ");

  return `${lastName}, ${firstNames}`;
}

function formatAuthorAPA(author: string) {
  const trimmed = author.trim();

  if (!trimmed) {
    return "";
  }

  const parts = trimmed.split(/\s+/);

  if (parts.length === 1) {
    return trimmed;
  }

  const lastName = parts[parts.length - 1];
  const initials = parts
    .slice(0, -1)
    .map((name) => `${name.charAt(0).toUpperCase()}.`)
    .join(" ");

  return `${lastName}, ${initials}`;
}

function cleanDate(date: string) {
  return date.trim() || "n.d.";
}

function formatCitation({
  sourceType,
  style,
  author,
  title,
  container,
  publisher,
  date,
  url,
}: {
  sourceType: SourceType;
  style: CitationStyle;
  author: string;
  title: string;
  container: string;
  publisher: string;
  date: string;
  url: string;
}) {
  const safeTitle = title.trim() || "Untitled";
  const safeContainer = container.trim();
  const safePublisher = publisher.trim();
  const safeDate = cleanDate(date);
  const safeUrl = url.trim();

  if (style === "mla") {
    const mlaAuthor = formatAuthorMLA(author);
    const authorPart = mlaAuthor ? `${mlaAuthor}. ` : "";

    if (sourceType === "book") {
      return `${authorPart}${safeTitle}. ${safePublisher || "Publisher"}, ${safeDate}.`;
    }

    if (sourceType === "article") {
      return `${authorPart}"${safeTitle}." ${safeContainer || "Publication"}, ${safeDate}${safeUrl ? `, ${safeUrl}` : ""}.`;
    }

    if (sourceType === "video") {
      return `${authorPart}"${safeTitle}." ${safeContainer || "Video platform"}, ${safePublisher ? `${safePublisher}, ` : ""}${safeDate}${safeUrl ? `, ${safeUrl}` : ""}.`;
    }

    return `${authorPart}"${safeTitle}." ${safeContainer || "Website"}, ${safePublisher ? `${safePublisher}, ` : ""}${safeDate}${safeUrl ? `, ${safeUrl}` : ""}.`;
  }

  const apaAuthor = formatAuthorAPA(author);
  const authorPart = apaAuthor ? `${apaAuthor} ` : "";
  const datePart = `(${safeDate}).`;

  if (sourceType === "book") {
    return `${authorPart}${datePart} ${safeTitle}. ${safePublisher || "Publisher"}.`;
  }

  if (sourceType === "article") {
    return `${authorPart}${datePart} ${safeTitle}. ${safeContainer || "Publication"}.${safeUrl ? ` ${safeUrl}` : ""}`;
  }

  if (sourceType === "video") {
    return `${authorPart}${datePart} ${safeTitle} [Video]. ${safeContainer || "Video platform"}.${safeUrl ? ` ${safeUrl}` : ""}`;
  }

  return `${authorPart}${datePart} ${safeTitle}. ${safeContainer || "Website"}.${safeUrl ? ` ${safeUrl}` : ""}`;
}

export default function CitationHelperPage() {
  const [sourceType, setSourceType] = useState<SourceType>("website");
  const [style, setStyle] = useState<CitationStyle>("mla");
  const [author, setAuthor] = useState("Jane Smith");
  const [title, setTitle] = useState("Understanding Student Success");
  const [container, setContainer] = useState("Example Journal");
  const [publisher, setPublisher] = useState("Example Publisher");
  const [date, setDate] = useState("2026");
  const [url, setUrl] = useState("https://example.com/article");

  const citation = useMemo(
    () =>
      formatCitation({
        sourceType,
        style,
        author,
        title,
        container,
        publisher,
        date,
        url,
      }),
    [sourceType, style, author, title, container, publisher, date, url]
  );

  async function copyCitation() {
    await navigator.clipboard.writeText(citation);
  }

  return (
    <ToolPage
      line="Goodfolk Student Utilities"
      title="Citation Helper"
      description="Format a simple MLA or APA-style citation for common student sources."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Citation style</span>
              <select
                value={style}
                onChange={(event) =>
                  setStyle(event.target.value as CitationStyle)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="mla">MLA-style</option>
                <option value="apa">APA-style</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Source type</span>
              <select
                value={sourceType}
                onChange={(event) =>
                  setSourceType(event.target.value as SourceType)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="website">Website</option>
                <option value="book">Book</option>
                <option value="article">Article</option>
                <option value="video">Video</option>
              </select>
            </label>

            <TextInput label="Author" value={author} setValue={setAuthor} />
            <TextInput label="Title" value={title} setValue={setTitle} />
            <TextInput
              label="Website, journal, platform, or container"
              value={container}
              setValue={setContainer}
            />
            <TextInput
              label="Publisher or organization"
              value={publisher}
              setValue={setPublisher}
            />
            <TextInput
              label="Year or date"
              value={date}
              setValue={setDate}
            />
            <TextInput label="URL" value={url} setValue={setUrl} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This helper creates a simple citation draft. Always compare against
            your instructor&apos;s required style guide because citation goblins
            are picky little creatures.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Citation draft</h2>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-7 text-zinc-200">
            {citation}
          </div>

          <button
            type="button"
            onClick={copyCitation}
            className="mt-5 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Copy citation
          </button>

          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
            Use this as a starting point, then verify punctuation, italics,
            capitalization, hanging indent, access date rules, and any special
            requirements from your class.
          </div>
        </section>
      </div>

      <RelatedTools currentHref="/citation-helper" category="student" />
    </ToolPage>
  );
}

function TextInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}