import Link from "next/link";

export default function HomeElectricityBlogPost() {
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
            What Uses The Most Electricity In A Home?
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            If your electric bill feels higher than expected, a few appliances
            and systems are usually responsible for most of the cost. Knowing
            what uses the most electricity can help you decide where to focus
            first.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            Heating and cooling
          </h2>

          <p className="leading-8">
            Heating and cooling often use the most electricity in a home. Air
            conditioners, heat pumps, electric furnaces, and space heaters can
            run for hours at a time, especially during very hot or cold weather.
          </p>

          <h2 className="text-2xl font-bold text-white">Water heaters</h2>

          <p className="leading-8">
            Electric water heaters can also be major energy users. Showers,
            laundry, dishwashing, and general hot water use can all add to the
            monthly power bill.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Clothes dryers and kitchen appliances
          </h2>

          <p className="leading-8">
            Clothes dryers, ovens, stovetops, microwaves, dishwashers, and
            refrigerators can all contribute to household electricity usage.
            Some run briefly but use a lot of power, while others run quietly in
            the background every day.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Electronics and standby power
          </h2>

          <p className="leading-8">
            TVs, computers, gaming systems, chargers, routers, and smart home
            devices may not use as much electricity individually, but together
            they can add up. Devices that stay plugged in all day can still draw
            small amounts of power.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Estimate your electricity costs
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Electricity Cost Calculator to estimate how much
              appliances and devices may cost based on wattage, run time, and
              electricity rate.
            </p>

            <Link
              href="/electric-cost-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Electricity Cost Calculator
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            How to reduce electric usage
          </h2>

          <p className="leading-8">
            Start with the biggest systems first. Adjusting thermostat settings,
            sealing drafts, cleaning filters, using fans wisely, and reducing
            electric heat usage can make a noticeable difference.
          </p>

          <p className="leading-8">
            For smaller devices, consider LED bulbs, smart power strips, shorter
            dryer cycles, full dishwasher loads, and unplugging items that do
            not need to stay powered.
          </p>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            The biggest electricity users are usually heating, cooling, water
            heating, laundry, kitchen appliances, and always-on electronics. If
            you want to lower your bill, focus on the devices that run the
            longest or use the most power.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for general household planning only. Actual energy
            use depends on your appliances, home size, climate, utility rates,
            habits, and local conditions.
          </div>
        </section>
      </article>
    </main>
  );
}