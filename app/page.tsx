import Link from "next/link";

const officeTools = [
  {
    name: "JSON to Excel Converter",
    href: "/json-to-excel",
    description: "Convert JSON arrays into downloadable Excel files.",
  },
  {
    name: "CSV Cleaner",
    href: "/csv-cleaner",
    description: "Clean headers, trim spaces, and remove duplicate CSV rows.",
  },
  {
    name: "Bulk Rename Tool",
    href: "/bulk-rename-tool",
    description: "Rename multiple files and download renamed copies in a ZIP.",
  },
  {
    name: "PDF Splitter",
    href: "/pdf-splitter",
    description: "Split a PDF into individual page files and download them as a ZIP.",
  },
  {
    name: "Text Case Converter",
    href: "/text-case-converter",
    description: "Convert text into uppercase, lowercase, title case, snake_case, and more.",
  },
  {
    name: "Word & Character Counter",
    href: "/word-character-counter",
    description: "Count words, characters, sentences, paragraphs, and reading time.",
  },
  {
    name: "Password Generator",
    href: "/password-generator",
    description: "Generate strong random passwords with custom options.",
  },
];

const campTools = [
  {
    name: "Camp Water Planner",
    href: "/camp-water-planner",
    description: "Estimate how much water to bring for a camping trip.",
  },
  {
    name: "Camp Battery Estimator",
    href: "/camp-battery-estimator",
    description: "Estimate battery needs for phones, lights, fans, and devices.",
  },
  {
    name: "Camp Pack Weight Planner",
    href: "/camp-pack-weight-planner",
    description: "Add gear items and estimate your total pack weight.",
  },
  {
    name: "Camp Fuel Estimator",
    href: "/camp-fuel-estimator",
    description: "Estimate stove fuel usage for meals, coffee, and boiling water.",
  },
  {
    name: "Camp Meal Planner",
    href: "/camp-meal-planner",
    description: "Estimate meals, snacks, and calories for a camping trip.",
  },
  {
    name: "Camp Weather Comfort Calculator",
    href: "/camp-weather-comfort",
    description: "Estimate camping comfort based on temperature, rain, wind, and overnight lows.",
  },
  {
    name: "Camp Checklist Generator",
    href: "/camp-checklist-generator",
    description: "Generate a camping checklist based on trip style, weather, and activities.",
  },
];

function ToolSection({
  title,
  eyebrow,
  description,
  tools,
}: {
  title: string;
  eyebrow: string;
  description: string;
  tools: {
    name: string;
    href: string;
    description: string;
  }[];
}) {
  return (
    <section className="mt-14">
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-amber-300">{eyebrow}</p>

        <h2 className="text-3xl font-bold">{title}</h2>

        <p className="mt-2 max-w-2xl text-zinc-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold">{tool.name}</h3>
                <p className="mt-2 text-zinc-400">{tool.description}</p>
              </div>

              <span className="shrink-0 text-amber-300 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 border-b border-slate-800 pb-10 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="https://goodfolkdigital.com"
              className="mb-2 inline-block font-medium text-amber-300 hover:text-amber-200"
            >
              Goodfolk Digital
            </a>

            <h1 className="text-5xl font-bold md:text-6xl">
              Goodfolk Tools
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-300">
              Small, sharp browser-based tools for everyday office work and camping planning.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-amber-500 p-5 text-sm text-zinc-300">
            <p className="font-semibold text-white">Current toolbox</p>
            <p className="mt-2">
              {officeTools.length} office tools · {campTools.length} camp tools
            </p>
          </div>
        </header>

        <ToolSection
          eyebrow="Office Utilities"
          title="Clean up files, text, and everyday digital messes."
          description="Quick tools for data cleanup, file handling, text formatting, and practical office workflows."
          tools={officeTools}
        />

        <ToolSection
          eyebrow="Camp Utilities"
          title="Plan smarter before you leave home."
          description="Simple camping calculators and checklists for water, food, power, weather, packing, and trip prep."
          tools={campTools}
        />

        <footer className="mt-16 border-t border-slate-800 pt-8 text-sm text-zinc-500">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://goodfolkdigital.com"
            className="text-zinc-400 hover:text-amber-300"
          >
            Goodfolk Digital
          </a>
          . Built for good folks.
        </footer>
      </div>
    </main>
  );
}