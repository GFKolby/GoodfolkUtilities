"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";

export default function CampWeatherComfort() {
  const [temperature, setTemperature] = useState(65);
  const [rainChance, setRainChance] = useState(20);
  const [windMph, setWindMph] = useState(5);
  const [humidity, setHumidity] = useState(50);
  const [nightTemp, setNightTemp] = useState(50);

  const results = useMemo(() => {
    let score = 100;
    const notes: string[] = [];

    if (temperature < 45) {
      score -= 20;
      notes.push("Cold daytime temps. Bring warm layers.");
    } else if (temperature > 88) {
      score -= 20;
      notes.push("Hot daytime temps. Plan shade, extra water, and lighter activity.");
    }

    if (nightTemp < 40) {
      score -= 25;
      notes.push("Cold overnight temps. Bring a warmer sleep system.");
    } else if (nightTemp < 50) {
      score -= 12;
      notes.push("Cool overnight temps. Pack extra sleep layers.");
    }

    if (rainChance >= 60) {
      score -= 25;
      notes.push("High rain chance. Bring rain gear, dry bags, and a solid shelter setup.");
    } else if (rainChance >= 30) {
      score -= 10;
      notes.push("Some rain risk. Pack a rain jacket and keep gear covered.");
    }

    if (windMph >= 20) {
      score -= 20;
      notes.push("Windy conditions. Stake your shelter well and protect your stove area.");
    } else if (windMph >= 12) {
      score -= 10;
      notes.push("Moderate wind. Bring extra stakes or guy lines if needed.");
    }

    if (humidity >= 75 && temperature >= 75) {
      score -= 15;
      notes.push("Humid and warm. Expect sticky sleep conditions and slower drying gear.");
    }

    const finalScore = Math.max(0, Math.min(100, score));

    let rating = "Great camping weather ✅";

    if (finalScore < 80) rating = "Pretty good, with a few cautions";
    if (finalScore < 60) rating = "Manageable, but prepare well";
    if (finalScore < 40) rating = "Rough conditions ⚠️";

    if (notes.length === 0) {
      notes.push("Conditions look comfortable. Still pack basic rain and warmth backup.");
    }

    return {
      score: finalScore,
      rating,
      notes,
    };
  }, [temperature, rainChance, windMph, humidity, nightTemp]);

  return (
    <ToolPage
      line="Goodfolk Camp Utilities"
      title="Camp Weather Comfort Calculator"
      description="Estimate how comfortable your camping weather may feel based on temperature, rain, wind, humidity, and overnight lows."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Daytime Temperature °F
          </span>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Overnight Low °F
          </span>
          <input
            type="number"
            value={nightTemp}
            onChange={(e) => setNightTemp(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Rain Chance %
          </span>
          <input
            type="number"
            min="0"
            max="100"
            value={rainChance}
            onChange={(e) => setRainChance(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Wind Speed mph
          </span>
          <input
            type="number"
            min="0"
            value={windMph}
            onChange={(e) => setWindMph(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Humidity %
          </span>
          <input
            type="number"
            min="0"
            max="100"
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Comfort Score
        </p>

        <p className="mt-2 text-5xl font-bold">{results.score}/100</p>

        <p className="mt-3 text-lg font-semibold">{results.rating}</p>

        <div className="mt-5 space-y-2 text-slate-800">
          {results.notes.map((note) => (
            <p key={note}>• {note}</p>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This is a planning estimate. Always check the local forecast before leaving and pack backup layers like a responsible little trail goblin.
      </p>
    </ToolPage>
  );
}