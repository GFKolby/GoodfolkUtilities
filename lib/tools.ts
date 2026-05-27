export type ToolLine = "office" | "camp" | "home";

export type Tool = {
  name: string;
  href: string;
  description: string;
  line: ToolLine;
};

export const officeTools: Tool[] = [
  {
    name: "JSON to Excel Converter",
    href: "/json-to-excel",
    description: "Convert JSON arrays into downloadable Excel files.",
    line: "office",
  },
  {
    name: "CSV Cleaner",
    href: "/csv-cleaner",
    description: "Clean headers, trim spaces, and remove duplicate CSV rows.",
    line: "office",
  },
  {
    name: "Bulk Rename Tool",
    href: "/bulk-rename-tool",
    description: "Rename multiple files and download renamed copies in a ZIP.",
    line: "office",
  },
  {
    name: "PDF Splitter",
    href: "/pdf-splitter",
    description: "Split a PDF into individual page files and download them as a ZIP.",
    line: "office",
  },
  {
    name: "Text Case Converter",
    href: "/text-case-converter",
    description: "Convert text into uppercase, lowercase, title case, snake_case, and more.",
    line: "office",
  },
  {
    name: "Word & Character Counter",
    href: "/word-character-counter",
    description: "Count words, characters, sentences, paragraphs, and reading time.",
    line: "office",
  },
  {
    name: "Password Generator",
    href: "/password-generator",
    description: "Generate strong random passwords with custom options.",
    line: "office",
  },
  {
    name: "Markdown Previewer",
    href: "/markdown-previewer",
    description: "Write Markdown and preview the formatted output instantly.",
    line: "office",
  },
  {
    name: "QR Code Generator",
    href: "/qr-code-generator",
    description: "Create a downloadable QR code from a URL or short text.",
    line: "office",
  },
  {
    name: "Unit Converter",
    href: "/unit-converter",
    description: "Convert length, weight, temperature, and volume units.",
    line: "office",
  },
];

export const campTools: Tool[] = [
  {
    name: "Camp Water Planner",
    href: "/camp-water-planner",
    description: "Estimate how much water to bring for a camping trip.",
    line: "camp",
  },
  {
    name: "Camp Battery Estimator",
    href: "/camp-battery-estimator",
    description: "Estimate battery needs for phones, lights, fans, and devices.",
    line: "camp",
  },
  {
    name: "Camp Pack Weight Planner",
    href: "/camp-pack-weight-planner",
    description: "Add gear items and estimate your total pack weight.",
    line: "camp",
  },
  {
    name: "Camp Fuel Estimator",
    href: "/camp-fuel-estimator",
    description: "Estimate stove fuel usage for meals, coffee, and boiling water.",
    line: "camp",
  },
  {
    name: "Camp Meal Planner",
    href: "/camp-meal-planner",
    description: "Estimate meals, snacks, and calories for a camping trip.",
    line: "camp",
  },
  {
    name: "Camp Weather Comfort Calculator",
    href: "/camp-weather-comfort",
    description: "Estimate camping comfort based on temperature, rain, wind, and overnight lows.",
    line: "camp",
  },
  {
    name: "Camp Checklist Generator",
    href: "/camp-checklist-generator",
    description: "Generate a camping checklist based on trip style, weather, and activities.",
    line: "camp",
  },
  {
    name: "Camp Trip Cost Calculator",
    href: "/camp-trip-cost-calculator",
    description: "Estimate campsite fees, gas, food, gear, and total trip cost.",
    line: "camp",
  },
  {
    name: "Campfire Safety Checklist",
    href: "/campfire-safety-checklist",
    description: "Generate a campfire safety checklist based on conditions and trip plans.",
    line: "camp",
  },
  { 
    name: "Tent Footprint Calculator",
    href: "/tent-footprint-calculator",
    description: "Calculate a recommended footprint size for your tent floor.",
    line: "camp",
  },
];

export const homeTools: Tool[] = [
  {
    name: "Paint Calculator",
    href: "/paint-calculator",
    description: "Estimate the amount of paint needed for your home project.",
    line: "home",
  },
  {
    name: "Room Size Calculator",
    href: "/room-size-calculator",
    description: "Calculate the square footage of a room based on dimensions.",
    line: "home",
  },
  {
    name: "Electric Cost Calculator",
    href: "/electric-cost-calculator",
    description: "Estimate daily, monthly, and yearly electricity costs from watts, usage, and electric rate.",
    line: "home",
  },
  {
    name: "Moving Box Calculator",
    href: "/moving-box-calculator",
    description: "Estimate how many moving boxes you need based on rooms, home size, and packing style.",
    line: "home",
  },
  {
    name: "Home Project Budget Calculator",
    href: "/home-project-budget-calculator",
    description: "Estimate a home project budget with materials, labor, fees, and a contingency buffer.",
    line: "home",
  },
];

export const allTools = [...officeTools, ...campTools, ...homeTools];

export function getRelatedTools(currentHref: string, line: ToolLine, limit = 3) {
  const source = line === "office" ? officeTools : line === "camp" ? campTools : homeTools;

  return source.filter((tool) => tool.href !== currentHref).slice(0, limit);
}
