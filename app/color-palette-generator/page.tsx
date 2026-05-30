"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type PaletteStyle = "tints" | "complementary" | "analogous" | "random";

type PaletteColor = {
  hex: string;
  locked: boolean;
};

function normalizeHex(input: string) {
  const cleaned = input.trim().replace("#", "");

  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return `#${cleaned
      .split("")
      .map((char) => char + char)
      .join("")
      .toUpperCase()}`;
  }

  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return `#${cleaned.toUpperCase()}`;
  }

  return null;
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex);

  if (!normalized) {
    return null;
  }

  const value = normalized.replace("#", "");

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((value) =>
      Math.max(0, Math.min(255, Math.round(value)))
        .toString(16)
        .padStart(2, "0")
    )
    .join("")
    .toUpperCase()}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return {
      h: 0,
      s: 0,
      l: Math.round(lightness * 100),
    };
  }

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let hue = 0;

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  hue /= 6;

  return {
    h: Math.round(hue * 360),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  const hue = (((h % 360) + 360) % 360) / 360;
  const saturation = Math.max(0, Math.min(100, s)) / 100;
  const lightness = Math.max(0, Math.min(100, l)) / 100;

  if (saturation === 0) {
    const gray = lightness * 255;
    return { r: gray, g: gray, b: gray };
  }

  const hueToRgb = (p: number, q: number, t: number) => {
    let value = t;

    if (value < 0) value += 1;
    if (value > 1) value -= 1;
    if (value < 1 / 6) return p + (q - p) * 6 * value;
    if (value < 1 / 2) return q;
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;

    return p;
  };

  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;

  return {
    r: hueToRgb(p, q, hue + 1 / 3) * 255,
    g: hueToRgb(p, q, hue) * 255,
    b: hueToRgb(p, q, hue - 1 / 3) * 255,
  };
}

function hslToHex(h: number, s: number, l: number) {
  const rgb = hslToRgb(h, s, l);

  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function getRandomHex() {
  return rgbToHex(
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  );
}

function generateColors(baseHex: string, style: PaletteStyle) {
  const rgb = hexToRgb(baseHex);

  if (!rgb) {
    return ["#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE", "#1E3A8A"];
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  if (style === "random") {
    return [normalizeHex(baseHex) ?? "#3B82F6", getRandomHex(), getRandomHex(), getRandomHex(), getRandomHex()];
  }

  if (style === "complementary") {
    const complementHue = (hsl.h + 180) % 360;

    return [
      hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 22, 12)),
      hslToHex(hsl.h, hsl.s, hsl.l),
      hslToHex(hsl.h, Math.max(hsl.s - 15, 10), Math.min(hsl.l + 22, 92)),
      hslToHex(complementHue, hsl.s, hsl.l),
      hslToHex(complementHue, Math.max(hsl.s - 10, 10), Math.min(hsl.l + 18, 88)),
    ];
  }

  if (style === "analogous") {
    return [
      hslToHex(hsl.h - 40, hsl.s, hsl.l),
      hslToHex(hsl.h - 20, hsl.s, Math.min(hsl.l + 6, 92)),
      hslToHex(hsl.h, hsl.s, hsl.l),
      hslToHex(hsl.h + 20, hsl.s, Math.min(hsl.l + 6, 92)),
      hslToHex(hsl.h + 40, hsl.s, hsl.l),
    ];
  }

  return [
    hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 28, 8)),
    hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 12, 12)),
    hslToHex(hsl.h, hsl.s, hsl.l),
    hslToHex(hsl.h, Math.max(hsl.s - 8, 8), Math.min(hsl.l + 18, 92)),
    hslToHex(hsl.h, Math.max(hsl.s - 18, 8), Math.min(hsl.l + 34, 96)),
  ];
}

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [paletteStyle, setPaletteStyle] = useState<PaletteStyle>("tints");
  const [palette, setPalette] = useState<PaletteColor[]>([
    { hex: "#1E3A8A", locked: false },
    { hex: "#2563EB", locked: false },
    { hex: "#3B82F6", locked: false },
    { hex: "#93C5FD", locked: false },
    { hex: "#DBEAFE", locked: false },
  ]);

  const normalizedBase = normalizeHex(baseColor);

  const cssVariables = useMemo(
    () =>
      palette
        .map((color, index) => `--palette-${index + 1}: ${color.hex};`)
        .join("\n"),
    [palette]
  );

  function generatePalette() {
    const colors = generateColors(normalizedBase ?? "#3B82F6", paletteStyle);

    setPalette((currentPalette) =>
      currentPalette.map((color, index) =>
        color.locked ? color : { ...color, hex: colors[index] }
      )
    );
  }

  function toggleLock(index: number) {
    setPalette((currentPalette) =>
      currentPalette.map((color, colorIndex) =>
        colorIndex === index ? { ...color, locked: !color.locked } : color
      )
    );
  }

  function updateColor(index: number, value: string) {
    const normalized = normalizeHex(value);

    setPalette((currentPalette) =>
      currentPalette.map((color, colorIndex) =>
        colorIndex === index && normalized
          ? { ...color, hex: normalized }
          : color
      )
    );
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Design Utilities"
      title="Color Palette Generator"
      description="Generate color palettes, lock favorite colors, regenerate unlocked colors, and copy HEX values or CSS variables."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Base color</span>

              <div className="mt-2 flex gap-3">
                <input
                  type="color"
                  value={normalizedBase ?? "#3B82F6"}
                  onChange={(event) => setBaseColor(event.target.value)}
                  className="h-12 w-14 rounded-lg border border-slate-700 bg-slate-950"
                />

                <input
                  type="text"
                  value={baseColor}
                  onChange={(event) => setBaseColor(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Palette style</span>
              <select
                value={paletteStyle}
                onChange={(event) =>
                  setPaletteStyle(event.target.value as PaletteStyle)
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="tints">Tints & shades</option>
                <option value="complementary">Complementary</option>
                <option value="analogous">Analogous</option>
                <option value="random">Random mix</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={generatePalette}
            className="mt-5 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Generate palette
          </button>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Locked colors stay in place when you generate again. Use this to
            keep colors you like while exploring the rest of the palette.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
            <div className="grid grid-cols-5">
              {palette.map((color, index) => (
                <div
                  key={`${color.hex}-${index}`}
                  className="h-24"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Palette colors</h2>

          <div className="mt-6 space-y-4">
            {palette.map((color, index) => (
              <div
                key={`${color.hex}-control-${index}`}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(event) => updateColor(index, event.target.value)}
                      className="h-11 w-12 rounded-lg border border-slate-700 bg-slate-950"
                    />

                    <div>
                      <p className="text-sm text-zinc-400">
                        Color {index + 1}
                      </p>
                      <code className="text-sm font-semibold text-white">
                        {color.hex}
                      </code>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleLock(index)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
                    >
                      {color.locked ? "Unlock" : "Lock"}
                    </button>

                    <button
                      type="button"
                      onClick={() => copyText(color.hex)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-semibold text-white">CSS variables</p>
              <pre className="mt-3 whitespace-pre-wrap text-sm text-zinc-300">
                {cssVariables}
              </pre>

              <button
                type="button"
                onClick={() => copyText(cssVariables)}
                className="mt-4 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
              >
                Copy CSS variables
              </button>
            </div>
          </div>
        </section>
      </div>

      <RelatedTools currentHref="/color-palette-generator" category="design" />
    </ToolPage>
  );
}