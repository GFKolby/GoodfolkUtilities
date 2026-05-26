"use client";

import { useMemo, useState } from "react";

import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function PasswordGenerator() {
  const [length, setLength] = useState(18);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const characterPool = useMemo(() => {
    let pool = "";

    if (includeUppercase) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) pool += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) pool += "0123456789";
    if (includeSymbols) pool += "!@#$%^&*()-_=+[]{};:,.?/";

    return pool;
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const strengthLabel = useMemo(() => {
    let score = 0;

    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (includeUppercase && includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score <= 2) return "Basic";
    if (score <= 4) return "Strong";
    return "Very strong";
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  const generatePassword = () => {
    if (!characterPool) {
      setPassword("");
      return;
    }

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    const nextPassword = Array.from(randomValues)
      .map((value) => characterPool[value % characterPool.length])
      .join("");

    setPassword(nextPassword);
    setCopied(false);
  };

  const copyPassword = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <ToolPage
      line="Goodfolk Office Utilities"
      title="Password Generator"
      description="Generate a strong random password with custom length, numbers, symbols, and letter options."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Password Length
          </span>

          <input
            type="number"
            min="6"
            max="128"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <div className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm text-zinc-400">Character Options</p>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Uppercase letters
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Lowercase letters
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Symbols
          </label>
        </div>

        <button
          onClick={generatePassword}
          disabled={!characterPool}
          className="w-fit rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 disabled:opacity-50"
        >
          Generate Password
        </button>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Generated Password
        </p>

        <div className="mt-3 rounded-xl border border-amber-400 bg-amber-50 p-4 font-mono text-sm break-all">
          {password || "Click generate to create a password."}
        </div>

        <p className="mt-4 text-slate-800">
          Strength: <strong>{strengthLabel}</strong>
        </p>

        <button
          onClick={copyPassword}
          disabled={!password}
          className="mt-5 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy Password"}
        </button>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Passwords are generated in your browser. Nothing is sent or saved.
      </p>
      <RelatedTools currentHref="/password-generator" line="office" />
    </ToolPage>
  );
}