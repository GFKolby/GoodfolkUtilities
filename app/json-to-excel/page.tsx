"use client";

import { useState } from "react";
import ToolPage from "@/components/ToolPage";

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
      <ToolPage
          line="Goodfolk Office Utilities"
          title="JSON to Excel Converter"
          description="Convert JSON data to an Excel spreadsheet."
      >
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='[{"name":"John","role":"Developer"}]'
          className="w-full h-96 bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm"
        />

        <button
          onClick={handleConvert}
          disabled={loading}
          className="mt-4 px-6 py-3 rounded-xl bg-white text-slate-950 font-semibold hover:opacity-90"
        >
          {loading ? "Converting..." : "Convert to Excel"}
        </button>
     
    </ToolPage>
  );
}