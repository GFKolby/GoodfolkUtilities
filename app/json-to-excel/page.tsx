"use client";

import { useState } from "react";

export default function Home() {
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    try {
      setLoading(true);

      const parsed = JSON.parse(jsonText);

      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: parsed,
        }),
      });

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "converted.xlsx";

      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Invalid JSON");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          GoodFolk Utilities
        </h1>

        <p className="text-zinc-400 mb-8">
          JSON → Excel Converter
        </p>

        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='[{"name":"John","role":"Developer"}]'
          className="w-full h-96 bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-sm"
        />

        <button
          onClick={handleConvert}
          disabled={loading}
          className="mt-4 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90"
        >
          {loading ? "Converting..." : "Convert to Excel"}
        </button>
      </div>
    </main>
  );
}