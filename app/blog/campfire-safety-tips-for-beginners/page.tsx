import Link from "next/link";

export default function CampfireSafetyBlogPost() {
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
            Camping Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Campfire Safety Tips for Beginners
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            A campfire can be one of the best parts of camping, but it also
            carries real risks. Following a few basic safety practices helps
            protect you, your campsite, and the surrounding environment.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            Build fires only where they're allowed
          </h2>

          <p className="leading-8">
            Before lighting a fire, check local fire restrictions and campground
            rules. During dry conditions, campfires may be prohibited because of
            wildfire risk.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Use an established fire ring
          </h2>

          <p className="leading-8">
            Whenever possible, use an existing fire ring or designated fire pit.
            These areas are designed to help contain flames and reduce the risk
            of spreading embers.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Keep your fire manageable
          </h2>

          <p className="leading-8">
            A campfire doesn't need to be large. Smaller fires are easier to
            control, produce plenty of heat for cooking or relaxing, and use
            less firewood.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Never leave a fire unattended
          </h2>

          <p className="leading-8">
            Even a small breeze can cause sparks to travel. If everyone is
            leaving the campsite or going to sleep, the fire should be
            completely extinguished first.
          </p>

          <h2 className="text-2xl font-bold text-white">Keep water nearby</h2>

          <p className="leading-8">
            Always have water, sand, or a shovel within reach before starting a
            fire. Being prepared allows you to react quickly if conditions
            change unexpectedly.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Run through a quick safety checklist
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Campfire Safety Checklist before lighting your
              next fire to make sure you've covered the essentials.
            </p>

            <Link
              href="/campfire-safety-checklist"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Campfire Safety Checklist
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Extinguish the fire completely
          </h2>

          <p className="leading-8">
            Pour water over the fire, stir the ashes, and continue adding water
            until everything is cool to the touch. A fire isn't considered out
            until there is no remaining heat.
          </p>

          <h2 className="text-2xl font-bold text-white">Leave no trace</h2>

          <p className="leading-8">
            Respect the campsite by leaving it cleaner than you found it. Pack
            out trash, avoid burning plastics or food waste, and leave the fire
            area ready for the next camper.
          </p>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            Most campfire accidents are preventable. Choosing the right
            location, keeping the fire small, supervising it at all times, and
            extinguishing it completely are the best ways to enjoy a safe
            camping experience.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            Always follow local fire regulations and campground rules. Fire
            restrictions can change quickly due to weather and wildfire
            conditions.
          </div>
        </section>
      </article>
    </main>
  );
}
