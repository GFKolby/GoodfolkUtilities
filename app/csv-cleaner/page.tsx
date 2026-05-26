"use client";

import { useState } from "react";
import Papa from "papaparse";

import ToolPage from "@/components/ToolPage";
import FilePicker from "@/components/FilePicker";

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
     <ToolPage
              line="Goodfolk Office Utilities"
              title="CSV Cleaner"
              description="Upload a CSV, clean headers, trim spaces, remove duplicate rows, and download a fresh file."
      >
        <div className="bg-slate-900 border border-zinc-800 rounded-2xl p-6">
          <FilePicker
            accept=".csv,text/csv"
            fileName={fileName === "cleaned.csv" ? undefined : fileName.replace("-cleaned.csv", ".csv")}
            onChange={(files) => {
              const file = files[0];
              if (file) handleFile(file);
            }}
          />

          {summary && (
            <div className="mt-6 bg-white text-slate-950 rounded-2xl p-6">
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
              <thead className="bg-slate-900 text-zinc-400">
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
    </ToolPage>
  );
}