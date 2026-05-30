type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export default function FAQ({ items }: FAQProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-white">
        Frequently Asked Questions
      </h2>

      <div className="mt-6 space-y-5">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-slate-800 bg-slate-950 p-5"
          >
            <h3 className="text-lg font-semibold text-white">
              {item.question}
            </h3>

            <p className="mt-2 leading-7 text-zinc-300">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}