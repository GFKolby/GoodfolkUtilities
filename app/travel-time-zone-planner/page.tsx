"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function TravelTimeZonePlannerPage() {
  const [homeOffset, setHomeOffset] = useState("-5");
  const [destinationOffset, setDestinationOffset] = useState("1");
  const [homeWakeTime, setHomeWakeTime] = useState("07:00");
  const [homeSleepTime, setHomeSleepTime] = useState("23:00");
  const [arrivalTime, setArrivalTime] = useState("14:00");

  const results = useMemo(() => {
    const home = Number(homeOffset);
    const destination = Number(destinationOffset);

    if (
      Number.isNaN(home) ||
      Number.isNaN(destination) ||
      home < -12 ||
      home > 14 ||
      destination < -12 ||
      destination > 14
    ) {
      return null;
    }

    const timeDifference = destination - home;
    const direction =
      timeDifference > 0 ? "ahead" : timeDifference < 0 ? "behind" : "same";

    const convertTime = (time: string, offsetDifference: number) => {
      const [hours, minutes] = time.split(":").map(Number);

      if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return null;
      }

      const totalMinutes = hours * 60 + minutes + offsetDifference * 60;
      const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
      const convertedHours = Math.floor(normalizedMinutes / 60);
      const convertedMinutes = normalizedMinutes % 60;

      return `${convertedHours.toString().padStart(2, "0")}:${convertedMinutes
        .toString()
        .padStart(2, "0")}`;
    };

    const destinationWakeTime = convertTime(homeWakeTime, timeDifference);
    const destinationSleepTime = convertTime(homeSleepTime, timeDifference);
    const homeEquivalentArrival = convertTime(arrivalTime, -timeDifference);

    if (!destinationWakeTime || !destinationSleepTime || !homeEquivalentArrival) {
      return null;
    }

    let adjustmentNote = "No major time adjustment needed.";
    const absoluteDifference = Math.abs(timeDifference);

    if (absoluteDifference >= 6) {
      adjustmentNote =
        "Major time shift. Start adjusting sleep, light exposure, and meal timing a few days before travel if possible.";
    } else if (absoluteDifference >= 3) {
      adjustmentNote =
        "Moderate time shift. Try shifting bedtime and wake time gradually before departure.";
    } else if (absoluteDifference >= 1) {
      adjustmentNote =
        "Small time shift. You may only need a light adjustment after arrival.";
    }

    let arrivalAdvice =
      "Try to follow the destination schedule as soon as practical after arrival.";

    const [arrivalHour] = arrivalTime.split(":").map(Number);

    if (arrivalHour < 10) {
      arrivalAdvice =
        "Morning arrival: get daylight early, avoid a long nap, and aim for a normal local bedtime.";
    } else if (arrivalHour >= 18) {
      arrivalAdvice =
        "Evening arrival: eat light, settle in, and try to sleep on destination time.";
    } else {
      arrivalAdvice =
        "Afternoon arrival: get sunlight, stay active, and avoid sleeping until local evening if possible.";
    }

    return {
      timeDifference,
      direction,
      absoluteDifference,
      destinationWakeTime,
      destinationSleepTime,
      homeEquivalentArrival,
      adjustmentNote,
      arrivalAdvice,
    };
  }, [
    homeOffset,
    destinationOffset,
    homeWakeTime,
    homeSleepTime,
    arrivalTime,
  ]);

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Travel Time Zone Planner"
      description="Compare home and destination time zones, estimate jet lag direction, and plan arrival adjustment."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Home UTC offset"
              value={homeOffset}
              setValue={setHomeOffset}
            />

            <NumberInput
              label="Destination UTC offset"
              value={destinationOffset}
              setValue={setDestinationOffset}
            />

            <TimeInput
              label="Usual home wake time"
              value={homeWakeTime}
              setValue={setHomeWakeTime}
            />

            <TimeInput
              label="Usual home sleep time"
              value={homeSleepTime}
              setValue={setHomeSleepTime}
            />

            <TimeInput
              label="Destination arrival time"
              value={arrivalTime}
              setValue={setArrivalTime}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Use UTC offsets like -5 for Eastern Standard Time, -4 for Eastern
            Daylight Time, 0 for London in winter, 1 for Paris/Amsterdam in
            winter, and 2 for Paris/Amsterdam in summer.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Time zone plan</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Time difference"
                value={
                  results.timeDifference === 0
                    ? "Same time zone"
                    : `${Math.abs(results.timeDifference)} hours ${results.direction}`
                }
              />
              <ResultRow
                label="Your wake time at destination"
                value={results.destinationWakeTime}
              />
              <ResultRow
                label="Your sleep time at destination"
                value={results.destinationSleepTime}
              />
              <ResultRow
                label="Arrival time in home body clock"
                value={results.homeEquivalentArrival}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                {results.adjustmentNote}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                {results.arrivalAdvice}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid UTC offsets and times to create your time zone plan.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/travel-time-zone-planner" category="travel" />
    </ToolPage>
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
        min="-12"
        max="14"
        step="0.5"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}

function TimeInput({
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
        type="time"
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