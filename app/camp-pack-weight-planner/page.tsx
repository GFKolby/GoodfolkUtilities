"use client";

import { useMemo, useState } from "react";

type Item = {
  id: number;
  name: string;
  weight: number;
  unit: "oz" | "lb";
  category: string;
};

export default function CampPackWeightPlanner() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Tent", weight: 4.5, unit: "lb", category: "Shelter" },
    { id: 2, name: "Sleeping Bag", weight: 3.4, unit: "lb", category: "Sleep" },
    { id: 3, name: "Water", weight: 2.2, unit: "lb", category: "Consumables" },
  ]);

  const [name, setName] = useState("");
  const [weight, setWeight] = useState(1);
  const [unit, setUnit] = useState<"oz" | "lb">("lb");
  const [category, setCategory] = useState("Gear");

  const totalPounds = useMemo(() => {
    return items.reduce((total, item) => {
      const pounds = item.unit === "oz" ? item.weight / 16 : item.weight;
      return total + pounds;
    }, 0);
  }, [items]);

  const addItem = () => {
    if (!name.trim() || weight <= 0) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        name,
        weight,
        unit,
        category,
      },
    ]);

    setName("");
    setWeight(1);
    setUnit("lb");
    setCategory("Gear");
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const status =
    totalPounds <= 20
      ? "Light and comfy ✅"
      : totalPounds <= 35
      ? "Manageable, but watch it 🎒"
      : "Heavy goblin mode ⚠️";

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-zinc-400 mb-2">Goodfolk Camp Utilities</p>

        <h1 className="text-4xl font-bold mb-4">
          Camp Pack Weight Planner
        </h1>

        <p className="text-zinc-400 mb-8">
          Add your camping gear and estimate your total pack weight.
        </p>

        <div className="grid gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            className="rounded-xl bg-zinc-950 border border-zinc-800 p-3"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              min="0"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            />

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "oz" | "lb")}
              className="rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            >
              <option value="lb">lb</option>
              <option value="oz">oz</option>
            </select>

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="rounded-xl bg-zinc-950 border border-zinc-800 p-3"
            />
          </div>

          <button
            onClick={addItem}
            className="rounded-xl bg-white text-black font-semibold p-3 hover:opacity-90"
          >
            Add Item
          </button>
        </div>

        <div className="mt-8 bg-white text-black rounded-2xl p-6">
          <p className="text-sm font-semibold text-zinc-600">
            Total Pack Weight
          </p>

          <p className="text-5xl font-bold mt-2">
            {totalPounds.toFixed(2)} lb
          </p>

          <p className="text-zinc-700 mt-3">{status}</p>
        </div>

        <div className="mt-8 overflow-hidden border border-zinc-800 rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-zinc-400">
              <tr>
                <th className="text-left p-3">Item</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Weight</th>
                <th className="p-3"></th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-zinc-800">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3 text-zinc-400">{item.category}</td>
                  <td className="p-3">
                    {item.weight.toFixed(2)} {item.unit}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-zinc-500 text-sm mt-6">
          Tip: For backpacking, remember to separate base weight from consumables like water, food, and fuel.
        </p>
      </div>
    </main>
  );
}