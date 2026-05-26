"use client";

import { useMemo, useState } from "react";

export default function CampBatteryEstimator() {
  const [batteryWh, setBatteryWh] = useState(200);
  const [nights, setNights] = useState(2);
  const [phoneCharges, setPhoneCharges] = useState(1);
  const [fanWatts, setFanWatts] = useState(5);
  const [fanHours, setFanHours] = useState(8);
  const [lightWatts, setLightWatts] = useState(3);
  const [lightHours, setLightHours] = useState(4);
  const [extraWhPerDay, setExtraWhPerDay] = useState(0);

  const results = useMemo(() => {
    const phoneWh = phoneCharges * 15 * nights;
    const fanWh = fanWatts * fanHours * nights;
    const lightWh = lightWatts * lightHours * nights;
    const extraWh = extraWhPerDay * nights;

    const rawNeed = phoneWh + fanWh + lightWh + extraWh;
    const safetyBuffer = rawNeed * 0.2;
    const totalNeed = rawNeed + safetyBuffer;
    const remaining = batteryWh - totalNeed;

    return {
      phoneWh,
      fanWh,
      lightWh,
      extraWh,
      safetyBuffer,
      totalNeed,
      remaining,
      percentUsed: (totalNeed / batteryWh) * 100,
    };
  }, [
    batteryWh,
    nights,
    phoneCharges,
    fanWatts,
    fanHours,
    lightWatts,
    lightHours,
    extraWhPerDay,
  ]);

  const status =
    results.remaining >= 0
      ? "You’re good ✅"
      : "Bring more power ⚠️";

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-zinc-400 mb-2">Goodfolk Camp Utilities</p>

        <h1 className="text-4xl font-bold mb-4">
          Camp Battery Estimator
        </h1>

        <p className="text-zinc-400 mb-8">
          Estimate whether your battery bank or power station can handle your camping trip.
        </p>

        <div className="grid gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              Battery Capacity (Wh)
            </span>
            <input
              type="number"
              min="1"
              value={batteryWh}
              onChange={(e) => setBatteryWh(Number(e.target.value))}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            />
          </label>

          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              Trip Nights
            </span>
            <input
              type="number"
              min="1"
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            />
          </label>

          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              Phone Charges Per Day
            </span>
            <input
              type="number"
              min="0"
              step="0.5"
              value={phoneCharges}
              onChange={(e) => setPhoneCharges(Number(e.target.value))}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              <span className="block mb-2 text-sm text-zinc-400">
                Fan Watts
              </span>
              <input
                type="number"
                min="0"
                value={fanWatts}
                onChange={(e) => setFanWatts(Number(e.target.value))}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
              />
            </label>

            <label>
              <span className="block mb-2 text-sm text-zinc-400">
                Fan Hours Per Night
              </span>
              <input
                type="number"
                min="0"
                value={fanHours}
                onChange={(e) => setFanHours(Number(e.target.value))}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              <span className="block mb-2 text-sm text-zinc-400">
                Light Watts
              </span>
              <input
                type="number"
                min="0"
                value={lightWatts}
                onChange={(e) => setLightWatts(Number(e.target.value))}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
              />
            </label>

            <label>
              <span className="block mb-2 text-sm text-zinc-400">
                Light Hours Per Night
              </span>
              <input
                type="number"
                min="0"
                value={lightHours}
                onChange={(e) => setLightHours(Number(e.target.value))}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
              />
            </label>
          </div>

          <label>
            <span className="block mb-2 text-sm text-zinc-400">
              Extra Device Usage (Wh per day)
            </span>
            <input
              type="number"
              min="0"
              value={extraWhPerDay}
              onChange={(e) => setExtraWhPerDay(Number(e.target.value))}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            />
          </label>
        </div>

        <div className="mt-8 bg-white text-black rounded-2xl p-6">
          <p className="text-sm font-semibold text-zinc-600">
            Result
          </p>

          <p className="text-4xl font-bold mt-2">
            {status}
          </p>

          <p className="text-zinc-700 mt-3">
            Estimated need:{" "}
            <strong>{results.totalNeed.toFixed(2)} Wh</strong>
          </p>

          <p className="text-zinc-700">
            Battery remaining:{" "}
            <strong>{results.remaining.toFixed(2)} Wh</strong>
          </p>

          <p className="text-zinc-700">
            Battery used:{" "}
            <strong>{results.percentUsed.toFixed(2)}%</strong>
          </p>
        </div>

        <div className="mt-6 text-sm text-zinc-400">
          <p>Breakdown:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Phone: {results.phoneWh.toFixed(2)} Wh</li>
            <li>Fan: {results.fanWh.toFixed(2)} Wh</li>
            <li>Light: {results.lightWh.toFixed(2)} Wh</li>
            <li>Extra devices: {results.extraWh.toFixed(2)} Wh</li>
            <li>Safety buffer: {results.safetyBuffer.toFixed(2)} Wh</li>
          </ul>
        </div>

        <p className="text-zinc-500 text-sm mt-6">
          This is an estimate. Cold weather, battery age, inverter losses, and high-power devices can reduce real-world runtime.
        </p>
      </div>
    </main>
  );
}