"use client";

type FilePickerProps = {
  label?: string;
  accept?: string;
  multiple?: boolean;
  fileName?: string;
  fileCount?: number;
  onChange: (files: File[]) => void;
};

export default function FilePicker({
  label = "Choose file",
  accept,
  multiple = false,
  fileName,
  fileCount = 0,
  onChange,
}: FilePickerProps) {
  const displayText =
    fileCount > 1
      ? `${fileCount} files selected`
      : fileName || "No file selected";

  return (
    <label className="block">
      <span className="sr-only">{label}</span>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center">
        <span className="inline-flex w-fit cursor-pointer rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">
          {label}
        </span>

        <span className="text-sm text-zinc-300 sm:pl-2">
          {displayText}
        </span>
      </div>

      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files ?? []);
          onChange(selectedFiles);
        }}
      />
    </label>
  );
}