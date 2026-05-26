"use client";

import { useMemo, useState } from "react";

import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type CaseMode =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "kebab"
  | "snake"
  | "camel";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<CaseMode>("title");
  const [copied, setCopied] = useState(false);

  const toWords = (value: string) => {
    return value
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  };

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const convertedText = useMemo(() => {
    const words = toWords(text);

    if (!text.trim()) return "";

    if (mode === "upper") {
      return text.toUpperCase();
    }

    if (mode === "lower") {
      return text.toLowerCase();
    }

    if (mode === "title") {
      return words.map(capitalize).join(" ");
    }

    if (mode === "sentence") {
      const lower = text.toLowerCase().trim();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    if (mode === "kebab") {
      return words.map((word) => word.toLowerCase()).join("-");
    }

    if (mode === "snake") {
      return words.map((word) => word.toLowerCase()).join("_");
    }

    if (mode === "camel") {
      return words
        .map((word, index) =>
          index === 0 ? word.toLowerCase() : capitalize(word)
        )
        .join("");
    }

    return text;
  }, [text, mode]);

  const copyToClipboard = async () => {
    if (!convertedText) return;

    await navigator.clipboard.writeText(convertedText);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <ToolPage
      line="Goodfolk Office Utilities"
      title="Text Case Converter"
      description="Convert text into uppercase, lowercase, title case, sentence case, kebab-case, snake_case, or camelCase."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Original Text
          </span>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="h-48 w-full rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-white outline-none focus:border-amber-300"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Convert To
          </span>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as CaseMode)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          >
            <option value="upper">UPPERCASE</option>
            <option value="lower">lowercase</option>
            <option value="title">Title Case</option>
            <option value="sentence">Sentence case</option>
            <option value="kebab">kebab-case</option>
            <option value="snake">snake_case</option>
            <option value="camel">camelCase</option>
          </select>
        </label>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">Converted Text</p>

        <textarea
          readOnly
          value={convertedText}
          placeholder="Your converted text will appear here..."
          className="mt-3 h-40 w-full rounded-xl border border-amber-400 bg-amber-50 p-4 font-mono text-sm text-slate-950 outline-none"
        />

        <button
          onClick={copyToClipboard}
          disabled={!convertedText}
          className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy Converted Text"}
        </button>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Useful for filenames, spreadsheet headers, code variables, titles, and cleaning up pasted text.
      </p>
      <RelatedTools currentHref="/text-case-converter" line="office" />
    </ToolPage>
  );
}