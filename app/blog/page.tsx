import Link from "next/link";

const posts = [
  {
    href: "/blog/how-much-water-should-you-drink",
    category: "Health Guide",
    title: "How Much Water Should You Drink Per Day?",
    description:
      "Learn what affects daily water needs, including body weight, activity, weather, and caffeine or alcohol intake.",
  },
  {
    href:  "/blog/how-much-does-electricity-cost-per-month",
    category: "Home",
    title: "How Much Does Electricity Cost Per Month?", 
    description:
      "Calculate your average monthly electricity cost based on your home's square footage, number of occupants, and energy efficiency.",
  },
  {
    href: "/blog/how-to-plan-a-trip-budget-without-a-spreadsheet",
    category: "Travel Guide",
    title: "How to Plan a Trip Budget Without a Spreadsheet",
    description:
      "Learn how to estimate transportation, lodging, food, activities, and travel buffers without building a spreadsheet.",
  },
  {
    href: "/blog/how-to-calculate-profit-margin-and-markup",
    category: "Business Guide",
    title: "How to Calculate Profit Margin and Markup",
    description:
      "Understand the difference between profit margin and markup so your pricing math does not get weird.",
  },
  {
    href: "/blog/how-to-build-a-simple-packing-list-before-travel",
    category: "Travel Guide",
    title: "How to Build a Simple Packing List Before Travel",
    description:
      "Build a practical packing list based on trip length, weather, destination type, laundry access, and travel style.",
  },
  {
    href: "/blog/how-to-choose-colors-for-a-small-website-or-brand",
    category: "Design Guide",
    title: "How to Choose Colors for a Small Website or Brand",
    description:
      "Use a base color, contrast, palette balance, and reusable CSS values to choose better website colors.",
  },
  {
  href: "/blog/how-many-moving-boxes-do-i-need",
  category: "Home Guide",
  title: "How Many Moving Boxes Do I Need?",
  description:
    "Estimate how many moving boxes you need based on home size, room count, and belongings before your next move.",
},
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          ← Back to Goodfolk Toolbox
        </Link>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Goodfolk Toolbox Blog
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Helpful guides for everyday tools.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            Practical guides, examples, and planning tips for using free
            calculators and utilities across travel, health, business, finance,
            design, development, home, camp, office, and student life.
          </p>
        </section>

        <section className="mt-8">
          <div className="mb-6">
            <p className="text-sm font-semibold text-amber-300">
              Latest Guides
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Read a guide, then use the tool.
            </h2>

            <p className="mt-2 max-w-2xl text-zinc-400">
              Each guide is written to explain the idea, show a simple example,
              and point you toward the matching Goodfolk Toolbox calculator.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-300/60 hover:bg-slate-800"
              >
                <p className="text-sm font-semibold text-amber-300">
                  {post.category}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {post.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-300">
                  {post.description}
                </p>

                <span className="mt-5 inline-block font-semibold text-amber-300 transition group-hover:translate-x-1">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}