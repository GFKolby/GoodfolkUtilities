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
            The number of moving boxes you need depends on the number of rooms,
            storage areas, and how much you own. A room-by-room estimate is more
            useful than choosing one number based only on square footage.
          </p>

          <p className="mt-4 leading-8 text-zinc-300">
            For a quick estimate, use the{" "}
            <Link
              href="/moving-box-calculator"
              className="font-semibold text-amber-300 hover:text-amber-200"
            >
              Goodfolk Moving Box Calculator
            </Link>
            . Enter your bedrooms, bathrooms, common rooms, kitchen, storage
            areas, and packing style to get a box total and size breakdown.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            Start with a room-by-room estimate
          </h2>

          <p className="leading-8">
            Bedrooms, kitchens, living rooms, bathrooms, garages, attics, and
            storage areas all contribute differently. Kitchens often need more
            small and medium boxes, while bedrooms may need wardrobe boxes in
            addition to general packing boxes.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">
              Example: two-bedroom home
            </h2>

            <p className="mt-3 leading-7">
              A two-bedroom home with two bathrooms, one living room, a kitchen,
              and an average amount of belongings may need roughly 50 to 60
              boxes. A garage, attic, basement, or heavily packed closets can
              raise that estimate quickly.
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              A useful mix might include small boxes for books and dishes,
              medium boxes for most household items, large boxes for lightweight
              bulky items, and wardrobe boxes for hanging clothes.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white">
            What affects the number of boxes?
          </h2>

          <p className="leading-8">
            The biggest factors are the number of rooms, how long you have lived
            in the home, the amount of storage space, and whether you pack
            lightly or keep a lot of belongings. Two homes with the same square
            footage can require very different numbers of boxes.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Apartment vs. house
          </h2>

          <p className="leading-8">
            Apartments often need fewer boxes because they have fewer storage
            areas. Houses can include garages, sheds, attics, basements, linen
            closets, and utility rooms that are easy to forget during early
            planning.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Declutter before packing
          </h2>

          <p className="leading-8">
            Donating, selling, recycling, or discarding unused items reduces the
            number of boxes you need to buy, carry, transport, unpack, and store
            later. Decluttering before you calculate can produce a more useful
            estimate.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Get your moving box estimate
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Moving Box Calculator to estimate your total
              boxes and see a suggested breakdown of small, medium, large, and
              wardrobe boxes.
            </p>

            <Link
              href="/moving-box-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Calculate How Many Moving Boxes You Need
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Choose the right box sizes
          </h2>

          <p className="leading-8">
            Use small boxes for heavy items such as books, canned food, dishes,
            and tools. Medium boxes work well for most household items. Large
            boxes are better for lightweight bulky items such as bedding,
            pillows, lampshades, and towels.
          </p>

          <p className="leading-8">
            Avoid filling oversized boxes with heavy belongings. A box that is
            difficult to lift is more likely to tear, injure someone, or damage
            its contents.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Add a small buffer
          </h2>

          <p className="leading-8">
            Estimates cannot account for every closet, collection, drawer, or
            last-minute item. Keeping a few extra small and medium boxes nearby
            is usually more useful than running out in the middle of packing.
          </p>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            Estimate moving boxes by room, storage area, and packing style rather
            than relying on one generic number. Start with the calculator, then
            adjust for decluttering, collections, books, kitchen supplies, and
            hidden storage areas.
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
