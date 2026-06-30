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
            If your electric bill suddenly increases, you're not alone. Weather,
            appliance usage, and even small daily habits can have a significant
            impact on your monthly energy costs.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            1. Heating and air conditioning
          </h2>

          <p className="leading-8">
            HVAC systems are usually the largest source of electricity usage in
            a home. During extreme temperatures, your system may run much longer
            than usual, increasing your bill.
          </p>

          <h2 className="text-2xl font-bold text-white">2. Seasonal weather</h2>

          <p className="leading-8">
            Hot summers and cold winters naturally increase electricity
            consumption. Even if your habits haven't changed, outside
            temperatures can dramatically affect your monthly bill.
          </p>

          <h2 className="text-2xl font-bold text-white">3. Older appliances</h2>

          <p className="leading-8">
            Older refrigerators, water heaters, air conditioners, and dryers
            often use considerably more electricity than newer energy-efficient
            models.
          </p>

          <h2 className="text-2xl font-bold text-white">4. Standby power</h2>

          <p className="leading-8">
            Electronics, chargers, televisions, gaming systems, and networking
            equipment continue using small amounts of electricity even when they
            appear to be turned off.
          </p>

          <h2 className="text-2xl font-bold text-white">
            5. Utility rate increases
          </h2>

          <p className="leading-8">
            Sometimes your usage hasn't changed at all. Instead, your utility
            provider has increased electricity rates, fuel charges, or service
            fees.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Estimate your electricity costs
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Electricity Cost Calculator to estimate how much
              your appliances cost to operate and identify where your energy
              bill may be increasing.
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
            Improving insulation, replacing air filters, lowering water heater
            temperatures, switching to LED lighting, and upgrading inefficient
            appliances can all reduce monthly electricity usage over time.
          </p>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            Most high electric bills are caused by increased usage, seasonal
            weather, inefficient appliances, or higher utility rates.
            Understanding where electricity is being used is the first step
            toward reducing your monthly costs.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for educational purposes only. Electricity usage and
            utility rates vary by home, location, climate, and energy provider.
          </div>
        </section>
      </article>
    </main>
  );
}
