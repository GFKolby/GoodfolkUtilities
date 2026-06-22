import Link from "next/link";

export default function ElectricityCostBlogPost() {
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
            How Much Does Electricity Cost Per Month?
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Electricity is one of the most common monthly household expenses.
            Whether you live in an apartment, a small home, or a larger house,
            understanding where your electric bill comes from can help you plan
            your budget and reduce unnecessary costs.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            What is a typical electric bill?
          </h2>

          <p className="leading-8">
            The average monthly electric bill varies by location, climate,
            household size, and energy habits. Homes that use electric heating
            or air conditioning often see much higher bills than homes in mild
            climates.
          </p>

          <p className="leading-8">
            Your actual bill depends on how much electricity you use and how
            much your utility company charges per kilowatt-hour (kWh).
          </p>

          <h2 className="text-2xl font-bold text-white">
            What uses the most electricity?
          </h2>

          <p className="leading-8">
            In most homes, heating and cooling systems are the largest energy
            users. Air conditioners, electric furnaces, heat pumps, and space
            heaters can dramatically increase monthly electricity costs.
          </p>

          <p className="leading-8">
            Other major contributors include water heaters, clothes dryers,
            ovens, refrigerators, gaming systems, computers, and televisions.
          </p>

          <h2 className="text-2xl font-bold text-white">
            How can you estimate electricity costs?
          </h2>

          <p className="leading-8">
            A simple estimate starts with three numbers:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Appliance wattage</li>
            <li>Hours used each day</li>
            <li>Your electricity rate per kWh</li>
          </ul>

          <p className="leading-8">
            Once you know those values, you can estimate how much a single
            appliance costs to run or how much an entire household may spend
            each month.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Estimate your electricity costs
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Electricity Cost Calculator to estimate power
              costs based on appliance usage, run time, and local electricity
              rates.
            </p>

            <Link
              href="/electric-cost-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Electricity Cost Calculator
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Ways to lower your electric bill
          </h2>

          <p className="leading-8">
            Small improvements can add up over time. Consider using LED bulbs,
            adjusting thermostat settings, improving insulation, unplugging
            unused devices, and replacing older appliances with energy-efficient
            models when possible.
          </p>

          <p className="leading-8">
            The biggest savings often come from reducing heating and cooling
            usage, since those systems typically consume the most electricity.
          </p>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            Electricity costs are largely determined by energy consumption and
            utility rates. Understanding how appliances use power can help you
            estimate bills, identify waste, and make better household budgeting
            decisions.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for educational and planning purposes only. Actual
            electricity costs will vary based on your utility provider, rates,
            location, weather, and energy usage.
          </div>
        </section>
      </article>
    </main>
  );
}