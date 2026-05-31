import Link from "next/link";

export default function WaterIntakeBlogPost() {
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
            Health Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How Much Water Should You Drink Per Day?
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Daily water needs vary from person to person. Your body size,
            activity level, climate, sweat rate, diet, and caffeine or alcohol
            intake can all affect how much water you may need.
          </p>
        </header>

        <section className="mt-10 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white">
            A simple starting point
          </h2>

          <p className="leading-8">
            A common everyday estimate is to start with about half your body
            weight in ounces of water per day. For example, a 180-pound person
            might use 90 ounces as a rough starting point.
          </p>

          <p className="leading-8">
            That number is not perfect, but it gives you a simple baseline. From
            there, you can adjust based on exercise, heat, humidity, caffeine,
            alcohol, illness, or personal guidance from a health professional.
          </p>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Try the free calculator
            </h2>

            <p className="mt-3 leading-7">
              Use the Goodfolk Water Intake Calculator to estimate daily water
              intake based on weight, activity, weather, and caffeine or alcohol
              servings.
            </p>

            <Link
              href="/water-intake-calculator"
              className="mt-5 inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Open Water Intake Calculator
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white">
            What affects water needs?
          </h2>

          <h3 className="text-xl font-semibold text-white">Body weight</h3>
          <p className="leading-8">
            Larger bodies generally need more total fluid than smaller bodies.
            That is why many quick hydration estimates start with body weight
            before adding adjustments for lifestyle and environment.
          </p>

          <h3 className="text-xl font-semibold text-white">Activity level</h3>
          <p className="leading-8">
            Exercise increases sweat and breathing losses. Walking, running,
            strength training, hiking, outdoor work, and long travel days can
            all increase fluid needs.
          </p>

          <h3 className="text-xl font-semibold text-white">Weather</h3>
          <p className="leading-8">
            Hot, humid, or dry conditions can increase how much water you lose.
            If you are sweating heavily or spending hours outside, you may need
            more than your usual daily amount.
          </p>

          <h3 className="text-xl font-semibold text-white">
            Caffeine and alcohol
          </h3>
          <p className="leading-8">
            Coffee, tea, energy drinks, and alcohol can affect hydration habits.
            You do not always need to avoid them, but it can help to add extra
            water when those drinks are part of your day.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Signs you may need more fluid
          </h2>

          <p className="leading-8">
            Thirst, darker urine, dry mouth, headache, fatigue, dizziness, and
            reduced sweating during heat or exercise can be signs that you may
            need more fluids. Severe symptoms or ongoing concerns should be
            handled with medical guidance.
          </p>

          <h2 className="text-2xl font-bold text-white">
            Bottom line
          </h2>

          <p className="leading-8">
            Start with a simple estimate, adjust for your day, and pay attention
            to how you feel. Your ideal water intake may change depending on
            weather, activity, travel, illness, and routine.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-zinc-300">
            This article is for general wellness planning only and is not
            medical advice. If you have kidney disease, heart failure, fluid
            restrictions, pregnancy, medication concerns, or ongoing symptoms,
            ask a qualified health professional for personal guidance.
          </div>
        </section>
      </article>
    </main>
  );
}