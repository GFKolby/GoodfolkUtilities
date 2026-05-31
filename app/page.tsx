import Link from "next/link";
import { officeTools, campTools, homeTools, financeTools, studentTools,designTools, developerTools, travelTools, businessTools, healthTools } from "@/lib/tools";
import type { ToolItem } from "@/lib/tools";
import SearchBar from "@/components/SearchBar";

const popularTools = [
  ...healthTools.filter((tool) =>
    ["bmi-calculator", "calorie-calculator", "water-intake-calculator"].includes(
      tool.slug
    )
  ),
  ...businessTools.filter((tool) =>
    ["profit-margin-calculator", "sales-tax-calculator", "invoice-total-calculator"].includes(
      tool.slug
    )
  ),
  ...travelTools.filter((tool) =>
    ["trip-budget-calculator", "road-trip-gas-calculator"].includes(tool.slug)
  ),
  ...designTools.filter((tool) =>
    ["color-palette-generator"].includes(tool.slug)
  ),
  ...developerTools.filter((tool) =>
    ["json-formatter"].includes(tool.slug)
  ),
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
  tools: ToolItem[];
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
                <h3 className="text-2xl font-semibold">{tool.title}</h3>
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
              Goodfolk Toolbox
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-300">
              Small, sharp browser-based tools for everyday good folk.
            </p>
          </div>

          {/* <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sm text-zinc-300">
            <p className="font-semibold text-white">Current toolbox</p>
            <p className="mt-2">
              {officeTools.length} office tools · {campTools.length} camp tools
            </p>
          </div> */}

           <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 text-sm text-zinc-300">
  <p className="font-semibold text-white">Goodfolk Toolbox is free.</p>
  <p className="mt-2">
    If these tools saved you time, you can support the toolbox and help keep new tools coming.
  </p>

  <Link
  href="/support"
  className="mt-4 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
>
  Support Goodfolk
</Link>
</div>

 
        </header>
        <SearchBar />

<section className="mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/30 sm:p-8">
  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
    Goodfolk Toolbox
  </p>

  <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
    Free Online Tools & Calculators
  </h2>

  <p className="mt-4 text-base leading-8 text-zinc-300 sm:text-lg">
    Goodfolk Toolbox offers{" "}
    <span className="font-semibold text-white">100 free online tools</span>{" "}
    for business, finance, travel, health, development, design, camping,
    students, and everyday life. No signup required.
  </p>
</section>

<section className="mt-10 grid gap-5 md:grid-cols-3">
  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <p className="font-semibold text-white">100 Free Tools</p>
    <p className="mt-2 text-sm text-zinc-400">
      Calculators and helpers for office, camp, home, finance, student, design, developer, travel, business and health needs.
    </p>
  </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <p className="font-semibold text-white">10 Categories</p>
    <p className="mt-2 text-sm text-zinc-400">
      Office, camp, home, finance, student, design, developer, travel, business and health.
    </p>
  </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <p className="font-semibold text-white">No Signup Required</p>
    <p className="mt-2 text-sm text-zinc-400">
      All tools are free to use with no account or email required. Just click and use.
    </p>
  </div>
</section>

<section className="mt-12">
  <div className="mb-6">
    <p className="mb-2 text-sm font-semibold text-amber-300">
      Popular Tools
    </p>

    <h2 className="text-3xl font-bold">
      Start with the tools people are most likely to need.
    </h2>

    <p className="mt-2 max-w-2xl text-zinc-400">
      A quick shortcut to useful calculators for health, business, travel,
      design, and development.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
    {popularTools.map((tool) => (
      <Link
        key={tool.href}
        href={tool.href}
        className="group block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">{tool.title}</h3>
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

 <div className="mb-6" gap-5>
    <p className="mb-2 text-sm font-semibold text-amber-300">
      Tool Categories
    </p>

    <h2 className="text-3xl font-bold">
      Browse tools by category to find what you need.
    </h2>

    <p className="mt-2 max-w-2xl text-zinc-400">
      Explore tools for office, camp, home, finance, student, design, developer, travel, business and health needs.
    </p>
  </div>
  
<div className="mt-10 grid gap-5 md:grid-cols-2">
  <Link
    href="/office"
    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
  >
    <p className="text-sm font-semibold text-amber-300">
      Office Utilities
    </p>
    <h2 className="mt-2 text-2xl font-bold">Browse office tools</h2>
    <p className="mt-2 text-zinc-400">
      File cleanup, text formatting, passwords, Markdown, and everyday digital tasks.
    </p>
  </Link>

  <Link
    href="/camp"
    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
  >
    <p className="text-sm font-semibold text-amber-300">
      Camp Utilities
    </p>
    <h2 className="mt-2 text-2xl font-bold">Browse camp tools</h2>
    <p className="mt-2 text-zinc-400">
      Water, power, meals, fuel, weather, checklist, packing, and trip costs.
    </p>
  </Link>
  <Link
    href="/home"
    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
  >
    <p className="text-sm font-semibold text-amber-300">
      Home Utilities
    </p>
    <h2 className="mt-2 text-2xl font-bold">Browse home tools</h2>
    <p className="mt-2 text-zinc-400">
      Calculators and planners for common home projects and tasks.
    </p>
  </Link>
  <Link
  href="/finance"
  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
>
  <p className="text-sm font-semibold text-amber-300">
    Finance Utilities
  </p>
  <h2 className="mt-2 text-2xl font-bold">Browse finance tools</h2>
  <p className="mt-2 text-zinc-400">
    Budgeting, savings goals, debt payoff, subscriptions, and income planning.
  </p>
</Link>
<Link
  href="/student"
  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
>
  <p className="text-sm font-semibold text-amber-300">
    Student Utilities
  </p>
  <h2 className="mt-2 text-2xl font-bold">Browse student tools</h2>
  <p className="mt-2 text-zinc-400">
    Grades, GPA, study planning, assignments, writing, and semester workload.
  </p>
</Link>
<Link
  href="/design"
  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
>
  <p className="text-sm font-semibold text-amber-300">
    Design Utilities
  </p>
  <h2 className="mt-2 text-2xl font-bold">Browse design tools</h2>
  <p className="mt-2 text-zinc-400">
    Colors, contrast, gradients, shadows, spacing, typography, and layout helpers.
  </p>
</Link>
<Link
  href="/developer"
  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
>
  <p className="text-sm font-semibold text-amber-300">
    Developer Utilities
  </p>
  <h2 className="mt-2 text-2xl font-bold">Browse developer tools</h2>
  <p className="mt-2 text-zinc-400">
    Colors, JSON, encoding, timestamps, IDs, CSS, regex, and coding helpers.
  </p>
</Link>
<Link
  href="/travel"
  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
>
  <p className="text-sm font-semibold text-amber-300">
    Travel Utilities
  </p>
  <h2 className="mt-2 text-2xl font-bold">Browse travel tools</h2>
  <p className="mt-2 text-zinc-400">
    Trip budgets, packing, hotels, gas, layovers, attractions, and travel planning.
  </p>
</Link>
<Link
  href="/business"
  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
>
  <p className="text-sm font-semibold text-amber-300">
    Business Utilities
  </p>
  <h2 className="mt-2 text-2xl font-bold">Browse business tools</h2>
  <p className="mt-2 text-zinc-400">
    Pricing, profit margins, invoices, break-even points, meetings, startup costs, and small business planning.
  </p>
</Link>
<Link 
  href="/health"
  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
>
  <p className="text-sm font-semibold text-amber-300">
    Health Utilities
  </p>
  <h2 className="mt-2 text-2xl font-bold">Browse health tools</h2>
  <p className="mt-2 text-zinc-400">
    BMI, calories, water intake, protein, walking, macros, sleep, heart rate zones, and weight planning.
  </p>
</Link>
</div>
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

        <ToolSection
          eyebrow="Home Utilities"
          title="Useful tools for around the house."
          description="Handy calculators and planners for common home projects and tasks."
          tools={homeTools}
        />

        <ToolSection
          eyebrow="Finance Utilities"
          title="Plan money moves without spreadsheet chaos."
          description="Simple calculators for savings goals, budgets, debt payoff, subscriptions, and everyday financial planning."
          tools={financeTools}
        />

        <ToolSection
          eyebrow="Student Utilities"
          title="Plan schoolwork without academic chaos."
          description="Simple tools for grades, GPA, study planning, assignments, writing, and semester workload."
          tools={studentTools}
        />

        <ToolSection
          eyebrow="Design Utilities"
          title="Useful UI helpers for color, spacing, and visual polish."
          description="Quick tools for colors, contrast, gradients, shadows, spacing, typography, and layout decisions."
          tools={designTools}
        />

       <ToolSection
          eyebrow="Developer Utilities"
          title="Tiny tools for everyday coding tasks."
          description="Quick browser-based utilities for colors, JSON, encoders, timestamps, IDs, CSS, regex, and developer cleanup work."
          tools={developerTools}
        />

        <ToolSection
          eyebrow="Travel Utilities"
          title="Plan trips without spreadsheet turbulence."
          description="Simple tools for trip budgets, hotels, gas, packing, layovers, attractions, and travel planning."
          tools={travelTools}
        />

        <ToolSection
          eyebrow="Business Utilities"
          title="Simple tools for pricing, profit, and planning."
          description="Free calculators for margins, invoices, break-even points, meetings, startup costs, and small business decisions."
          tools={businessTools}
        />

        <ToolSection
          eyebrow="Health Utilities"
          title="Plan health goals without spreadsheet chaos."
          description="Simple calculators for BMI, calories, water intake, protein, walking, macros, sleep, heart rate zones, and weight planning."
          tools={healthTools}
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
          <Link href="/privacy" className="text-zinc-400 hover:text-amber-300">
            | Privacy |
          </Link>
          <Link href="/about" className="text-zinc-400 hover:text-amber-300">
             About
          </Link>
        </footer>
      </div>
    </main>
  );
}