import Link from "next/link";

const tools = [
  {
    name: "JSON to Excel Converter",
    href: "/json-to-excel",
    line: "Office Utilities",
    description: "Convert JSON arrays into downloadable Excel files.",
  },
  {
    name: "CSV Cleaner",
    href: "/csv-cleaner",
    line: "Office Utilities",
    description: "Clean headers, trim spaces, and remove duplicate CSV rows.",
  },
  {
    name: "Bulk Rename Tool",
    href: "/bulk-rename-tool",
    line: "Office Utilities",
    description: "Rename multiple files and download renamed copies in a ZIP.",
  },
  {
    name: "PDF Splitter",
    href: "/pdf-splitter",
    line: "Office Utilities",
    description: "Split a PDF into individual page files and download them as a ZIP.",
  },
  {
    name: "Text Case Converter",
    href: "/text-case-converter",
    line: "Office Utilities",
    description: "Convert text into uppercase, lowercase, title case, kebab-case, snake_case, and camelCase.",
  },
  {
    name: "Camp Water Planner",
    href: "/camp-water-planner",
    line: "Camp Utilities",
    description: "Estimate how much water to bring for a camping trip.",
  },
  {
    name: "Camp Battery Estimator",
    href: "/camp-battery-estimator",
    line: "Camp Utilities",
    description: "Estimate battery needs for phones, lights, fans, and devices.",
  },
  {
    name: "Camp Pack Weight Planner",
    href: "/camp-pack-weight-planner",
    line: "Camp Utilities",
    description: "Add gear items and estimate your total pack weight.",
  },
  {
    name: "Camp Fuel Estimator",
    href: "/camp-fuel-estimator",
    line: "Camp Utilities",
    description: "Estimate camping stove fuel usage for meals, coffee, and boiling water.",
  },
  {
    name: "Camp Meal Planner",
    href: "/camp-meal-planner",
    line: "Camp Utilities",
    description: "Estimate meals, snacks, and calories for a camping trip.",
  },
];

export default function Home() {
  return (
    
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <a
          href="https://goodfolkdigital.com"
          className="text-amber-300 hover:text-amber-200"
        >
          Goodfolk Digital
        </a>

        <h1 className="text-5xl font-bold mb-4">
            Goodfolk Tools
        </h1>

        <p className="text-zinc-300 mb-10 max-w-2xl">
            Small, sharp tools for everyday good folks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800 transition"
            >
              <p className="text-sm text-amber-300 mb-2">{tool.line}</p>
              <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
              <p className="text-zinc-400">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <footer className="mt-16 text-sm text-zinc-500">
  © {new Date().getFullYear()} Goodfolk Digital. Built for good folks.
</footer>
    </main>
  );
}