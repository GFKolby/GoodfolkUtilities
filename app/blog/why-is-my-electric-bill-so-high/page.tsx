import Link from "next/link";

export default function ElectricBillHighBlogPost() {
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
            Why Is My Electric Bill So High?
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            A high electric bill usually comes from increased usage, seasonal
            weather, inefficient appliances, or a higher utility rate. Start by
            comparing your current bill with the previous month and the same
            month last year, then look for changes in both kWh usage and price.
          </p>

          <p className="mt-4 leading-8 text-zinc-300">
            To estimate how much a specific appliance may be adding to your
            bill, use the{" "}
            <Link
              href="/electric-cost-calculator"
              className="font-semibold text-amber-300 hover:text-amber-200"
            >
              Goodfolk Electricity Cost Calculator
            </Link>
            . Enter the device wattage, daily run time, days used, and your
            electricity rate per kWh.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            1. Heating and air conditioning
          </h2>

          <p className="leading-8">
            HVAC systems are often among the largest electricity users in a
            home. During very hot or cold weather, your system may run much
            longer than usual, which can quickly raise monthly usage.
          </p>

          <h2 className="text-2xl font-bold text-white">2. Seasonal weather</h2>

          <p className="leading-8">
            Hot summers and cold winters naturally increase electricity
            consumption. Even when your daily habits feel unchanged, outdoor
            temperatures can cause heating, cooling, fans, dehumidifiers, or
            space heaters to run more often.
          </p>

          <h2 className="text-2xl font-bold text-white">3. Older appliances</h2>

          <p className="leading-8">
            Older refrigerators, water heaters, air conditioners, and dryers
            may use more electricity than newer or well-maintained models. A
            failing appliance can also run longer than normal without being
            immediately obvious.
          </p>

          <h2 className="text-2xl font-bold text-white">4. Standby power</h2>

          <p className="leading-8">
            Televisions, gaming systems, chargers, computers, and networking
            equipment can continue drawing small amounts of power while plugged
            in. One device may not matter much, but several always-on devices can
            add to the total.
          </p>

          <h2 className="text-2xl font-bold text-white">
            5. Utility rate increases
          </h2>

          <p className="leading-8">
            Sometimes usage stays similar while the bill rises. Check the rate
            per kWh, fuel charges, delivery charges, taxes, and service fees on
            both bills. Our guide to{" "}
            <Link
              href="/blog/how-much-does-electricity-cost-per-month"
              className="font-semibold text-amber-300 hover:text-amber-200"
            >
              how much electricity costs per month
            </Link>{" "}
            explains how usage and rates work together.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Compare usage before blaming one appliance
          </h2>

          <p className="leading-8">
            First compare the number of billing days and total kWh used. A longer
            billing period can make a bill look unusually high, and a rate
            increase can raise the total even when usage barely changes. If kWh
            usage increased, think through what ran longer during that period.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Check the cost of a suspected appliance
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Electricity Cost Calculator to estimate the
              daily, monthly, and yearly cost of running a device. It can help
              you compare likely contributors before making an expensive repair
              or replacement decision.
            </p>

            <Link
              href="/electric-cost-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Estimate Appliance Electricity Cost
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Ways to lower your electric bill
          </h2>

          <p className="leading-8">
            Start with the largest and longest-running systems. Replace clogged
            HVAC filters, adjust thermostat settings, reduce unnecessary space
            heater use, inspect weather stripping, and avoid running partial
            laundry or dishwasher loads.
          </p>

          <p className="leading-8">
            Smaller changes such as LED bulbs, smart power strips, shorter dryer
            cycles, and unplugging unused devices may also help, but they should
            not distract from major heating, cooling, and water-heating costs.
          </p>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            A high electric bill is usually easier to understand when you
            separate usage from price. Compare billing periods, kWh usage, and
            the rate per kWh first. Then estimate the devices or systems that
            may have run more than usual.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for general planning only. Electricity usage and
            utility charges vary by home, location, climate, billing period, and
            energy provider.
          </div>
        </section>
      </article>
    </main>
  );
}
