import Link from "next/link";

export default function ReadElectricBillBlogPost() {
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
            How To Read Your Electric Bill
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            An electric bill can look like a wall of rates, dates, and fees.
            The useful parts are simpler: how much electricity you used, what
            you paid for each unit, and which other charges were added. Here is
            how to find those numbers and use them to understand your total.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            Start with the billing summary
          </h2>

          <p className="leading-8">
            The summary usually shows your previous balance, payments,
            current charges, amount due, and due date. Check this section first
            so you can separate this month&apos;s electricity charges from an
            unpaid balance, credit, deposit, or late fee.
          </p>

          <p className="leading-8">
            Also find the billing period. A bill covering 33 days will often be
            higher than one covering 28 days even if your daily habits stayed
            the same. Comparing average daily use gives you a fairer picture
            than comparing totals alone.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Find your electricity usage in kWh
          </h2>

          <p className="leading-8">
            Electricity use is measured in kilowatt-hours, abbreviated kWh.
            Your bill should list the total kWh used during the billing period.
            It may also show a chart comparing recent months or the same month
            last year.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="font-semibold text-white">Simple example</p>
            <p className="mt-3 leading-7">
              If the previous meter reading was 18,400 and the current reading
              is 19,150, the difference is 750 kWh. Your utility may show that
              math directly instead of asking you to calculate it.
            </p>
          </div>

          <p className="leading-8">
            Look for a note saying whether the reading is actual or estimated.
            An estimated reading can be corrected on a later bill after the
            utility receives an actual meter reading, which may make that later
            total unusually high or low.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Locate your electricity rate
          </h2>

          <p className="leading-8">
            The rate is the price charged for electricity. It may appear as a
            single price per kWh, or your bill may split it into supply and
            delivery charges. Some plans also use different rates based on the
            season, time of day, or amount of electricity used.
          </p>

          <p className="leading-8">
            When charges are split, dividing only the supply charge by your kWh
            usage will not reveal the full cost. For a practical all-in rate,
            subtract unrelated items such as an old balance or late fee from
            the current total, then divide the remaining electricity charges by
            the kWh used.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="font-semibold text-white">All-in rate example</p>
            <p className="mt-3 leading-7">
              If current electricity charges are $135 and usage is 750 kWh,
              the all-in cost is $135 ÷ 750 = $0.18 per kWh. This number can
              be more useful for planning than the supply rate by itself.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Understand the other charges
          </h2>

          <p className="leading-8">
            The names vary by utility, but an electric bill may include several
            kinds of charges:
          </p>

          <ul className="list-disc space-y-3 pl-6 leading-7">
            <li>
              <strong className="text-white">Supply or generation:</strong> the
              cost of producing or purchasing the electricity you used.
            </li>
            <li>
              <strong className="text-white">Delivery or distribution:</strong>{" "}
              the cost of moving electricity through the grid to your home.
            </li>
            <li>
              <strong className="text-white">Customer or service charge:</strong>{" "}
              a fixed fee that may apply even when usage is low.
            </li>
            <li>
              <strong className="text-white">Taxes and riders:</strong> local
              taxes, regulatory charges, or program-specific adjustments.
            </li>
            <li>
              <strong className="text-white">Demand charge:</strong> a fee
              based on your highest short period of power use, most commonly on
              business bills but sometimes found on residential rate plans.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white">
            Compare bills without getting misled
          </h2>

          <p className="leading-8">
            Compare kWh usage, billing days, average kWh per day, and the all-in
            rate. A higher total can come from using more electricity, paying a
            higher rate, having a longer billing period, or carrying an extra
            fee. Looking at those pieces separately tells you what actually
            changed.
          </p>

          <p className="leading-8">
            Weather matters too. Heating and cooling can change usage sharply,
            so comparing the same season from year to year is often more useful
            than comparing winter with spring.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Turn your bill details into a cost estimate
            </h2>

            <p className="mt-3 leading-7">
              Once you find your rate, use the Goodfolk Electricity Cost
              Calculator to estimate what an appliance costs to run by its
              wattage and daily use.
            </p>

            <Link
              href="/electric-cost-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Electricity Cost Calculator
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Related Electricity Guides
          </h2>

          <ul className="space-y-3">
            <li>
              <Link
                href="/blog/how-much-does-electricity-cost-per-month"
                className="font-semibold text-amber-300 hover:text-amber-200"
              >
                How Much Does Electricity Cost Per Month?
              </Link>
            </li>
            <li>
              <Link
                href="/blog/what-uses-the-most-electricity-in-a-home"
                className="font-semibold text-amber-300 hover:text-amber-200"
              >
                What Uses The Most Electricity In A Home?
              </Link>
            </li>
            <li>
              <Link
                href="/blog/why-is-my-electric-bill-so-high"
                className="font-semibold text-amber-300 hover:text-amber-200"
              >
                Why Is My Electric Bill So High?
              </Link>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white">Bottom line</h2>

          <p className="leading-8">
            To read your electric bill, identify the billing period, kWh used,
            rate structure, and added fees. Compare daily usage and your all-in
            rate over time. Those two numbers make it much easier to tell
            whether a higher bill came from your habits, the weather, your
            utility&apos;s prices, or a one-time charge.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for general planning only. Electric rates, bill
            formats, fees, meter practices, and taxes vary by utility and
            location. Contact your utility if a charge or reading is unclear.
          </div>
        </section>
      </article>
    </main>
  );
}
