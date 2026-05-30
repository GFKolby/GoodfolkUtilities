"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

function getLocalDateTimeValue(date: Date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

export default function TimestampConverterPage() {
  const now = new Date();

  const [timestamp, setTimestamp] = useState(
    Math.floor(now.getTime() / 1000).toString()
  );
  const [timestampUnit, setTimestampUnit] = useState<"seconds" | "milliseconds">(
    "seconds"
  );
  const [dateTime, setDateTime] = useState(getLocalDateTimeValue(now));

  const timestampResults = useMemo(() => {
    const rawTimestamp = Number(timestamp);

    if (Number.isNaN(rawTimestamp) || rawTimestamp < 0) {
      return null;
    }

    const milliseconds =
      timestampUnit === "seconds" ? rawTimestamp * 1000 : rawTimestamp;

    const date = new Date(milliseconds);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return {
      utc: date.toUTCString(),
      iso: date.toISOString(),
      local: date.toLocaleString(),
      unixSeconds: Math.floor(date.getTime() / 1000),
      unixMilliseconds: date.getTime(),
    };
  }, [timestamp, timestampUnit]);

  const dateResults = useMemo(() => {
    const date = new Date(dateTime);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return {
      utc: date.toUTCString(),
      iso: date.toISOString(),
      local: date.toLocaleString(),
      unixSeconds: Math.floor(date.getTime() / 1000),
      unixMilliseconds: date.getTime(),
    };
  }, [dateTime]);

  function useCurrentTime() {
    const current = new Date();

    setTimestamp(Math.floor(current.getTime() / 1000).toString());
    setTimestampUnit("seconds");
    setDateTime(getLocalDateTimeValue(current));
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Developer Utilities"
      title="Timestamp Converter"
      description="Convert Unix timestamps to readable dates and convert dates back to Unix time."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Timestamp to date
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Unix timestamp</span>
              <input
                type="number"
                min="0"
                step="1"
                value={timestamp}
                onChange={(event) => setTimestamp(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Timestamp unit</span>
              <select
                value={timestampUnit}
                onChange={(event) =>
                  setTimestampUnit(
                    event.target.value as "seconds" | "milliseconds"
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="seconds">Seconds</option>
                <option value="milliseconds">Milliseconds</option>
              </select>
            </label>
          </div>

          <h2 className="mt-8 text-xl font-semibold text-white">
            Date to timestamp
          </h2>

          <label className="mt-4 block">
            <span className="text-sm text-zinc-300">Local date and time</span>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(event) => setDateTime(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
            />
          </label>

          <button
            type="button"
            onClick={useCurrentTime}
            className="mt-5 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Use current time
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Unix timestamps are commonly used in APIs, logs, databases, and
            backend systems. Seconds and milliseconds are both common, so check
            which one your system expects.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Converted values</h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Timestamp result
              </h3>

              {timestampResults ? (
                <div className="mt-4 space-y-4">
                  <CopyRow label="Local time" value={timestampResults.local} onCopy={copyText} />
                  <CopyRow label="UTC" value={timestampResults.utc} onCopy={copyText} />
                  <CopyRow label="ISO" value={timestampResults.iso} onCopy={copyText} />
                  <CopyRow
                    label="Unix seconds"
                    value={`${timestampResults.unixSeconds}`}
                    onCopy={copyText}
                  />
                  <CopyRow
                    label="Unix milliseconds"
                    value={`${timestampResults.unixMilliseconds}`}
                    onCopy={copyText}
                  />
                </div>
              ) : (
                <p className="mt-3 text-sm text-zinc-300">
                  Enter a valid timestamp to convert.
                </p>
              )}
            </div>

            <div className="border-t border-slate-800 pt-6">
              <h3 className="text-lg font-semibold text-white">Date result</h3>

              {dateResults ? (
                <div className="mt-4 space-y-4">
                  <CopyRow label="Local time" value={dateResults.local} onCopy={copyText} />
                  <CopyRow label="UTC" value={dateResults.utc} onCopy={copyText} />
                  <CopyRow label="ISO" value={dateResults.iso} onCopy={copyText} />
                  <CopyRow
                    label="Unix seconds"
                    value={`${dateResults.unixSeconds}`}
                    onCopy={copyText}
                  />
                  <CopyRow
                    label="Unix milliseconds"
                    value={`${dateResults.unixMilliseconds}`}
                    onCopy={copyText}
                  />
                </div>
              ) : (
                <p className="mt-3 text-sm text-zinc-300">
                  Enter a valid date to convert.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      <RelatedTools currentHref="/timestamp-converter" category="developer" />
    </ToolPage>
  );
}

function CopyRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-zinc-400">{label}</p>
        <code className="mt-1 block break-all text-sm text-white">{value}</code>
      </div>

      <button
        type="button"
        onClick={() => onCopy(value)}
        className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
      >
        Copy
      </button>
    </div>
  );
}