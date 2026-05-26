"use client";

import { useMemo, useState } from "react";
import JSZip from "jszip";

type RenameMode = "prefix" | "suffix" | "replace" | "numbered";

export default function BulkRenameTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<RenameMode>("prefix");
  const [text, setText] = useState("goodfolk-");
  const [findText, setFindText] = useState("");
  const [loading, setLoading] = useState(false);

  const getExtension = (name: string) => {
    const dot = name.lastIndexOf(".");
    return dot === -1 ? "" : name.slice(dot);
  };

  const getBaseName = (name: string) => {
    const dot = name.lastIndexOf(".");
    return dot === -1 ? name : name.slice(0, dot);
  };

  const renamedFiles = useMemo(() => {
    return files.map((file, index) => {
      const extension = getExtension(file.name);
      const baseName = getBaseName(file.name);

      let newName = file.name;

      if (mode === "prefix") {
        newName = `${text}${file.name}`;
      }

      if (mode === "suffix") {
        newName = `${baseName}${text}${extension}`;
      }

      if (mode === "replace") {
        newName = `${baseName.replaceAll(findText, text)}${extension}`;
      }

      if (mode === "numbered") {
        const number = String(index + 1).padStart(3, "0");
        newName = `${text}${number}${extension}`;
      }

      return {
        file,
        oldName: file.name,
        newName,
      };
    });
  }, [files, mode, text, findText]);

  const downloadZip = async () => {
    if (renamedFiles.length === 0) return;

    setLoading(true);

    try {
      const zip = new JSZip();

      renamedFiles.forEach(({ file, newName }) => {
        zip.file(newName, file);
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "renamed-files.zip";
      a.click();

      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-zinc-400 mb-2">Goodfolk Office Utilities</p>

        <h1 className="text-4xl font-bold mb-4">Bulk Rename Tool</h1>

        <p className="text-zinc-400 mb-8">
          Rename multiple files with prefixes, suffixes, replacement text, or numbered names.
        </p>

        <div className="grid gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <input
            type="file"
            multiple
            onChange={(e) => {
              const selected = Array.from(e.target.files ?? []);
              setFiles(selected);
            }}
            className="block w-full text-sm text-zinc-300"
          />

          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              Rename Mode
            </span>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as RenameMode)}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            >
              <option value="prefix">Add Prefix</option>
              <option value="suffix">Add Suffix</option>
              <option value="replace">Find & Replace</option>
              <option value="numbered">Numbered Names</option>
            </select>
          </label>

          {mode === "replace" && (
            <label>
              <span className="block mb-2 text-sm text-zinc-400">
                Find Text
              </span>

              <input
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                placeholder="old-text"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
              />
            </label>
          )}

          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              {mode === "numbered" ? "Base Name" : "Text"}
            </span>

            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="goodfolk-"
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            />
          </label>

          <button
            onClick={downloadZip}
            disabled={renamedFiles.length === 0 || loading}
            className="rounded-xl bg-white text-black font-semibold p-3 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Building ZIP..." : "Download Renamed Files"}
          </button>
        </div>

        {renamedFiles.length > 0 && (
          <div className="mt-8 overflow-hidden border border-zinc-800 rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 text-zinc-400">
                <tr>
                  <th className="text-left p-3">Original Name</th>
                  <th className="text-left p-3">New Name</th>
                </tr>
              </thead>

              <tbody>
                {renamedFiles.map((item, index) => (
                  <tr key={`${item.oldName}-${index}`} className="border-t border-zinc-800">
                    <td className="p-3 text-zinc-400">{item.oldName}</td>
                    <td className="p-3">{item.newName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-zinc-500 text-sm mt-6">
          Your files stay in your browser. The renamed copies are packaged into a ZIP for download.
        </p>
      </div>
    </main>
  );
}