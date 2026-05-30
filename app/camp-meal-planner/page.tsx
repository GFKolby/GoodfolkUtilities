"use client";

import { useMemo, useState } from "react";

import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function CampMealPlanner() {
  const [people, setPeople] = useState(1);
  const [days, setDays] = useState(2);
  const [breakfasts, setBreakfasts] = useState(true);
  const [lunches, setLunches] = useState(true);
  const [dinners, setDinners] = useState(true);
  const [snacksPerPersonPerDay, setSnacksPerPersonPerDay] = useState(2);
  const [caloriesPerPersonPerDay, setCaloriesPerPersonPerDay] = useState(2200);

  const results = useMemo(() => {
    const mealTypes =
      Number(breakfasts) + Number(lunches) + Number(dinners);

    const totalMeals = people * days * mealTypes;
    const totalSnacks = people * days * snacksPerPersonPerDay;
    const totalCalories = people * days * caloriesPerPersonPerDay;

    const mealsPerType = people * days;

    return {
      mealTypes,
      totalMeals,
      totalSnacks,
      totalCalories,
      breakfastsNeeded: breakfasts ? mealsPerType : 0,
      lunchesNeeded: lunches ? mealsPerType : 0,
      dinnersNeeded: dinners ? mealsPerType : 0,
    };
  }, [
    people,
    days,
    breakfasts,
    lunches,
    dinners,
    snacksPerPersonPerDay,
    caloriesPerPersonPerDay,
  ]);

  return (
    <ToolPage
      line="Goodfolk Camp Utilities"
      title="Camp Meal Planner"
      description="Estimate meals, snacks, and calories needed for a camping trip."
    >
      <div className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label>
          <span className="mb-2 block text-sm text-zinc-400">People</span>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">Days</span>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <div className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm text-zinc-400">Meals to include</p>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={breakfasts}
              onChange={(e) => setBreakfasts(e.target.checked)}
            />
            Breakfast
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={lunches}
              onChange={(e) => setLunches(e.target.checked)}
            />
            Lunch
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={dinners}
              onChange={(e) => setDinners(e.target.checked)}
            />
            Dinner
          </label>
        </div>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Snacks Per Person Per Day
          </span>
          <input
            type="number"
            min="0"
            value={snacksPerPersonPerDay}
            onChange={(e) => setSnacksPerPersonPerDay(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-zinc-400">
            Calories Per Person Per Day
          </span>
          <input
            type="number"
            min="0"
            step="100"
            value={caloriesPerPersonPerDay}
            onChange={(e) => setCaloriesPerPersonPerDay(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-amber-300"
          />
        </label>
      </div>

      <div className="mt-8 rounded-2xl bg-amber-300 p-6 text-slate-950">
        <p className="text-sm font-semibold text-slate-700">
          Estimated Food Plan
        </p>

        <p className="mt-2 text-5xl font-bold">
          {results.totalMeals} meals
        </p>

        <div className="mt-4 space-y-2 text-slate-800">
          <p>
            Breakfasts: <strong>{results.breakfastsNeeded}</strong>
          </p>
          <p>
            Lunches: <strong>{results.lunchesNeeded}</strong>
          </p>
          <p>
            Dinners: <strong>{results.dinnersNeeded}</strong>
          </p>
          <p>
            Snacks: <strong>{results.totalSnacks}</strong>
          </p>
          <p>
            Total calories:{" "}
            <strong>{results.totalCalories.toLocaleString()}</strong>
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This is a planning estimate. Add extra food for long hikes, cold weather,
        delays, or snack goblin emergencies.
      </p>
      <RelatedTools currentHref="/camp-meal-planner" category="camp" />
    </ToolPage>
  );
}