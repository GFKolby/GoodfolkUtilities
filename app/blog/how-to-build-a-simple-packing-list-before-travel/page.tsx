import Link from "next/link";

export default function BlogPostPage() {
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
            Travel Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How to Build a Simple Packing List Before Travel
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Learn how to build a practical packing list based on trip length, weather, destination type, laundry access, and travel style.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <p className="leading-8">A good packing list starts with the trip, not the suitcase. Before choosing what to pack, think about how many days you will be away, the weather, your activities, and whether laundry is available.</p>

          <p className="leading-8">Start with clothing basics: shirts, pants or shorts, underwear, socks, sleepwear, and a travel outfit. For longer trips, laundry access can reduce how much you need to carry.</p>

          <p className="leading-8">Next, add toiletries and medication. Keep these simple but complete: toothbrush, toothpaste, deodorant, skincare, hair care, prescriptions, and a small first aid backup.</p>

          <p className="leading-8">Then add tech and documents. Chargers, power banks, headphones, ID, travel confirmations, cards, and insurance information are easy to forget because they are small.</p>

          <p className="leading-8">Finally, add destination-specific items. Beach trips may need sunscreen and sandals. Outdoor trips may need bug spray and trail shoes. Business trips may need nicer outfits and work gear.</p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Try the free calculator
            </h2>

            <p className="mt-3 leading-7">
              Use this Goodfolk Toolbox calculator to make the planning step faster.
            </p>

            <Link
              href="/packing-list-generator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Packing List Generator
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This guide is for general planning and educational use. Always check details for your specific situation before making financial, health, travel, or business decisions.
          </div>
        </section>
      </article>
    </main>
  );
}
