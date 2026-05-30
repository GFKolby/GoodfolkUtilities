"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function TripBudgetCalculatorPage() {
  const [travelers, setTravelers] = useState("1");
  const [days, setDays] = useState("7");
  const [flights, setFlights] = useState("600");
  const [lodgingPerNight, setLodgingPerNight] = useState("120");
  const [nights, setNights] = useState("6");
  const [foodPerDay, setFoodPerDay] = useState("60");
  const [localTransport, setLocalTransport] = useState("200");
  const [activities, setActivities] = useState("250");
  const [shopping, setShopping] = useState("150");
  const [misc, setMisc] = useState("100");
  const [bufferPercent, setBufferPercent] = useState("15");

  const results = useMemo(() => {
    const travelerCount = Number(travelers);
    const tripDays = Number(days);
    const flightCost = Number(flights);
    const lodgingNightly = Number(lodgingPerNight);
    const lodgingNights = Number(nights);
    const dailyFood = Number(foodPerDay);
    const transport = Number(localTransport);
    const activityCost = Number(activities);
    const shoppingCost = Number(shopping);
    const miscCost = Number(misc);
    const buffer = Number(bufferPercent);

    if (
      travelerCount <= 0 ||
      tripDays <= 0 ||
      flightCost < 0 ||
      lodgingNightly < 0 ||
      lodgingNights < 0 ||
      dailyFood < 0 ||
      transport < 0 ||
      activityCost < 0 ||
      shoppingCost < 0 ||
      miscCost < 0 ||
      buffer < 0
    ) {
      return null;
    }

    const transportationTotal = flightCost + transport;
    const lodgingTotal = lodgingNightly * lodgingNights;
    const foodTotal = dailyFood * tripDays * travelerCount;
    const subtotal =
      transportationTotal +
      lodgingTotal +
      foodTotal +
      activityCost +
      shoppingCost +
      miscCost;

    const bufferAmount = subtotal * (buffer / 100);
    const totalTripCost = subtotal + bufferAmount;
    const perPersonCost = totalTripCost / travelerCount;
    const perDayCost = totalTripCost / tripDays;
    const perPersonPerDay = perPersonCost / tripDays;

    return {
      transportationTotal,
      lodgingTotal,
      foodTotal,
      activityCost,
      shoppingCost,
      miscCost,
      subtotal,
      bufferAmount,
      totalTripCost,
      perPersonCost,
      perDayCost,
      perPersonPerDay,
    };
  }, [
    travelers,
    days,
    flights,
    lodgingPerNight,
    nights,
    foodPerDay,
    localTransport,
    activities,
    shopping,
    misc,
    bufferPercent,
  ]);

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Trip Budget Calculator"
      description="Estimate total trip cost from transportation, lodging, food, activities, shopping, and buffer."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Travelers" value={travelers} setValue={setTravelers} />
            <NumberInput label="Trip days" value={days} setValue={setDays} />
            <MoneyInput label="Flights / long-distance transport ($)" value={flights} setValue={setFlights} />
            <MoneyInput label="Lodging per night ($)" value={lodgingPerNight} setValue={setLodgingPerNight} />
            <NumberInput label="Lodging nights" value={nights} setValue={setNights} />
            <MoneyInput label="Food per person per day ($)" value={foodPerDay} setValue={setFoodPerDay} />
            <MoneyInput label="Local transportation ($)" value={localTransport} setValue={setLocalTransport} />
            <MoneyInput label="Activities / attractions ($)" value={activities} setValue={setActivities} />
            <MoneyInput label="Shopping / souvenirs ($)" value={shopping} setValue={setShopping} />
            <MoneyInput label="Miscellaneous ($)" value={misc} setValue={setMisc} />
            <NumberInput label="Buffer (%)" value={bufferPercent} setValue={setBufferPercent} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use the buffer for surprise fees, extra meals, taxis, baggage,
            tips, and other travel gremlins that appear when your wallet is
            relaxed.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Trip budget estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Transportation"
                value={`$${results.transportationTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Lodging"
                value={`$${results.lodgingTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Food"
                value={`$${results.foodTotal.toFixed(2)}`}
              />
              <ResultRow
                label="Activities"
                value={`$${results.activityCost.toFixed(2)}`}
              />
              <ResultRow
                label="Shopping"
                value={`$${results.shoppingCost.toFixed(2)}`}
              />
              <ResultRow
                label="Miscellaneous"
                value={`$${results.miscCost.toFixed(2)}`}
              />
              <ResultRow
                label="Subtotal"
                value={`$${results.subtotal.toFixed(2)}`}
              />
              <ResultRow
                label="Buffer"
                value={`$${results.bufferAmount.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated total"
                value={`$${results.totalTripCost.toFixed(2)}`}
              />
              <ResultRow
                label="Cost per person"
                value={`$${results.perPersonCost.toFixed(2)}`}
              />
              <ResultRow
                label="Cost per day"
                value={`$${results.perDayCost.toFixed(2)}`}
              />
              <ResultRow
                label="Per person per day"
                value={`$${results.perPersonPerDay.toFixed(2)}`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                This is a planning estimate. Update the numbers as you book
                flights, lodging, tickets, and transportation.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid trip budget details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/trip-budget-calculator" category="travel" />
    </ToolPage>
  );
}

function MoneyInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}

function NumberInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <input
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}