"use client";

import { useState } from "react";
import Papa from "papaparse";

type Row = Record<string, string>;

export default function CsvCleaner() {
  const [rows, setRows] = useState<Row[]>([]);
  const [fileName, setFileName] = useState("cleaned.csv");
  const [summary, setSummary] = useState("");

  const cleanHeader = (header: string) =>
    header.trim().toLowerCase().replace(/\s+/g, "_");

  const cleanValue = (value: unknown) =>
    String(value ?? "").trim();

  const handleFile = (file: File) => {
    setFileName(file.name.replace(".csv", "-cleaned.csv"));

    Papa.parse<Row>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const cleaned = result.data.map((row) => {
          const next: Row = {};

          Object.entries(row).forEach(([key, value]) => {
            next[cleanHeader(key)] = cleanValue(value);
          });

          return next;
        });

        const unique = Array.from(
          new Map(
            cleaned.map((row) => [JSON.stringify(row), row])
          ).values()
        );

        setRows(unique);
        setSummary(
          `Cleaned ${cleaned.length} rows. Removed ${
            cleaned.length - unique.length
          } duplicate rows.`
        );
      },
    });
  };

  const downloadCsv = () => {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-zinc-400 mb-2">Goodfolk Office Utilities</p>

        <h1 className="text-4xl font-bold mb-4">CSV Cleaner</h1>

        <p className="text-zinc-400 mb-8">
          Upload a CSV, clean headers, trim spaces, remove duplicate rows, and download a fresh file.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="block w-full text-sm text-zinc-300"
          />

          {summary && (
            <div className="mt-6 bg-white text-black rounded-2xl p-6">
              <p className="font-semibold">Result</p>
              <p className="text-zinc-700 mt-2">{summary}</p>

              <button
                onClick={downloadCsv}
                className="mt-5 rounded-xl bg-black text-white font-semibold px-5 py-3 hover:opacity-90"
              >
                Download Cleaned CSV
              </button>
            </div>
          )}
        </div>

        {rows.length > 0 && (
          <div className="mt-8 overflow-auto border border-zinc-800 rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 text-zinc-400">
                <tr>
                  {Object.keys(rows[0]).map((key) => (
                    <th key={key} className="text-left p-3">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.slice(0, 10).map((row, index) => (
                  <tr key={index} className="border-t border-zinc-800">
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} className="p-3">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-zinc-500 text-sm mt-6">
          Preview shows the first 10 rows only. Your full cleaned CSV will be included in the download.
        </p>
      </div>
    </main>
  );
}