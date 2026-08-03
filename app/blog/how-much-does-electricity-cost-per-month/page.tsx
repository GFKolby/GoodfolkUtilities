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
            Your monthly electricity cost depends on how many kilowatt-hours
            you use and the rate your utility charges per kWh. The fastest way
            to estimate a device or appliance cost is to enter its wattage,
            daily run time, and electricity rate into the Goodfolk calculator.
          </p>

          <Link
            href="/electric-cost-calculator"
            className="mt-6 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Estimate Your Electricity Cost
          </Link>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            What determines your monthly electric bill?
          </h2>

          <p className="leading-8">
            Your bill is mainly shaped by electricity usage, your price per kWh,
            the length of the billing period, and any fixed utility fees. Homes
            that rely heavily on air conditioning, electric heat, water heating,
            or older appliances often use more power.
          </p>

          <p className="leading-8">
            If your total seems unexpectedly high, compare the billing period,
            kWh usage, and rate with your previous bill. Our guide on{" "}
            <Link
              href="/blog/why-is-my-electric-bill-so-high"
              className="font-semibold text-amber-300 hover:text-amber-200"
            >
              why your electric bill may be high
            </Link>{" "}
            walks through the most common causes.
          </p>

          <h2 className="text-2xl font-bold text-white">
            How to estimate electricity cost
          </h2>

          <p className="leading-8">
            A simple estimate starts with four values:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Appliance wattage</li>
            <li>Hours used each day</li>
            <li>Days used each month</li>
            <li>Your electricity rate per kWh</li>
          </ul>

          <p className="leading-8">
            Convert watts to kilowatts by dividing by 1,000. Then multiply by
            the hours used, days used, and your rate per kWh.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">Worked example</h2>

            <p className="mt-3 leading-7">
              A 100-watt device used for 8 hours a day over 30 days consumes 24
              kWh. At $0.16 per kWh, the estimated monthly cost is $3.84.
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Calculation: 100 ÷ 1,000 × 8 × 30 × $0.16 = $3.84
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white">
            What uses the most electricity?
          </h2>

          <p className="leading-8">
            Heating and cooling systems are often the largest energy users in a
            home. Water heaters, clothes dryers, ovens, refrigerators, gaming
            systems, computers, and televisions can also add meaningful costs,
            especially when they run for long periods.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Calculate a device or appliance cost
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Electricity Cost Calculator as an electric bill
              estimator for individual appliances and devices. Enter the
              wattage, run time, days used, and your utility rate to see daily,
              monthly, and yearly estimates.
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
            Start with the equipment that uses the most power or runs the
            longest. Adjust thermostat settings, replace dirty air filters, use
            LED bulbs, reduce unnecessary dryer use, and unplug devices that do
            not need to stay powered.
          </p>

          <p className="leading-8">
            Small changes matter, but the largest savings usually come from
            heating, cooling, water heating, and inefficient appliances.
          </p>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            Monthly electricity cost comes down to usage and price per kWh.
            Check your bill for both numbers, estimate the appliances you use
            most, and compare those estimates with your actual monthly total.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for educational and planning purposes only. Actual
            electricity costs vary based on your utility provider, rates,
            location, weather, billing period, fees, and energy usage.
          </div>
        </section>
      </article>
    </main>
  );
}
