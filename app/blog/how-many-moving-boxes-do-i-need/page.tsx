import Link from "next/link";

export default function MovingBoxesBlogPost() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          ← Back to Blog
        </Link>

        <header className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Home Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How Many Moving Boxes Do I Need?
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            One of the most common moving mistakes is buying too few boxes.
            Running out of boxes halfway through packing creates stress,
            delays, and usually an emergency trip to the store. Fortunately,
            you can make a pretty good estimate before packing begins.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            What affects the number of boxes?
          </h2>

          <p className="leading-8">
            The biggest factors are the size of your home, the number of
            people living there, and how much stuff you own. Two homes with
            the same square footage can require very different numbers of
            boxes depending on how long the occupants have lived there and
            how much they have accumulated.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Apartment vs. house
          </h2>

          <p className="leading-8">
            Smaller apartments often require fewer boxes, while larger homes
            typically need more because of additional storage areas, closets,
            garages, and attics. Storage spaces tend to contain far more items
            than most people expect.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Declutter before packing
          </h2>

          <p className="leading-8">
            One of the easiest ways to reduce moving costs is to get rid of
            items you no longer use before packing. Donating, selling, or
            recycling unwanted belongings means fewer boxes to buy, move,
            unpack, and store later.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Room-by-room estimates
          </h2>

          <p className="leading-8">
            Kitchens often require the most boxes because of dishes, cookware,
            pantry items, and small appliances. Bedrooms usually require fewer
            boxes, while offices, garages, and storage rooms can vary widely
            depending on what is stored there.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Estimate your moving boxes
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Moving Box Calculator to estimate how many boxes
              you may need before your move.
            </p>

            <Link
              href="/moving-box-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Moving Box Calculator
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Common moving box mistakes
          </h2>

          <p className="leading-8">
            Many people underestimate the number of boxes needed, wait until
            the last minute to buy supplies, or use boxes that are too large
            for heavy items. Books, dishes, and tools are usually better in
            smaller boxes that are easier to carry safely.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Bottom line
          </h2>

          <p className="leading-8">
            Planning ahead can make moving day much smoother. A simple box
            estimate helps you budget for supplies, avoid last-minute trips,
            and reduce packing stress.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            Actual box needs vary based on household size, storage areas,
            furniture, and personal belongings. This guide is intended for
            planning and estimation purposes only.
          </div>
        </section>
      </article>
    </main>
  );
}