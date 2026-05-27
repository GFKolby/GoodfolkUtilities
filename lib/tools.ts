export type ToolCategorySlug =
  | "office"
  | "camp"
  | "home"
  | "finance"
  | "student"
  | "developer"
  | "travel";

export type ToolCategory = {
  slug: ToolCategorySlug;
  title: string;
  description: string;
  href: string;
  toolCount: number;
};

export type ToolItem = {
  slug: string;
  title: string;
  description: string;
  href: string;
  category: ToolCategorySlug;
};

export const categories: ToolCategory[] = [
  {
    slug: "office",
    title: "Office Utilities",
    description:
      "Free tools for work, data cleanup, documents, and daily operations.",
    href: "/office",
    toolCount: 10,
  },
  {
    slug: "camp",
    title: "Camp Utilities",
    description:
      "Free camping tools for packing, water planning, gear weight, and trip prep.",
    href: "/camp",
    toolCount: 10,
  },
  {
    slug: "home",
    title: "Home Utilities",
    description:
      "Free home utilities for paint planning, room sizes, electricity costs, moving boxes, and project budgets.",
    href: "/home",
    toolCount: 10,
  },
  {
    slug: "finance",
    title: "Finance Utilities",
    description:
      "Free finance tools for budgeting, savings goals, debt payoff, subscriptions, and income planning.",
    href: "/finance",
    toolCount: 3,
  },
];

export const officeTools: ToolItem[] = [
  {
    slug: "json-to-excel",
    title: "JSON to Excel Converter",
    href: "/json-to-excel",
    description: "Convert JSON arrays into downloadable Excel files.",
    category: "office",
  },
  {
    slug: "csv-cleaner",
    title: "CSV Cleaner",
    href: "/csv-cleaner",
    description: "Clean headers, trim spaces, and remove duplicate CSV rows.",
    category: "office",
  },
  {
    slug: "bulk-rename-tool",
    title: "Bulk Rename Tool",
    href: "/bulk-rename-tool",
    description: "Rename multiple files and download renamed copies in a ZIP.",
    category: "office",
  },
  {
    slug: "pdf-splitter",
    title: "PDF Splitter",
    href: "/pdf-splitter",
    description:
      "Split a PDF into individual page files and download them as a ZIP.",
    category: "office",
  },
  {
    slug: "text-case-converter",
    title: "Text Case Converter",
    href: "/text-case-converter",
    description:
      "Convert text into uppercase, lowercase, title case, snake_case, and more.",
    category: "office",
  },
  {
    slug: "word-character-counter",
    title: "Word & Character Counter",
    href: "/word-character-counter",
    description:
      "Count words, characters, sentences, paragraphs, and reading time.",
    category: "office",
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    href: "/password-generator",
    description: "Generate strong random passwords with custom options.",
    category: "office",
  },
  {
    slug: "markdown-previewer",
    title: "Markdown Previewer",
    href: "/markdown-previewer",
    description: "Write Markdown and preview the formatted output instantly.",
    category: "office",
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    href: "/qr-code-generator",
    description: "Create a downloadable QR code from a URL or short text.",
    category: "office",
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    href: "/unit-converter",
    description: "Convert length, weight, temperature, and volume units.",
    category: "office",
  },
];

export const campTools: ToolItem[] = [
  {
    slug: "camp-water-planner",
    title: "Camp Water Planner",
    href: "/camp-water-planner",
    description: "Estimate how much water to bring for a camping trip.",
    category: "camp",
  },
  {
    slug: "camp-battery-estimator",
    title: "Camp Battery Estimator",
    href: "/camp-battery-estimator",
    description: "Estimate battery needs for phones, lights, fans, and devices.",
    category: "camp",
  },
  {
    slug: "camp-pack-weight-planner",
    title: "Camp Pack Weight Planner",
    href: "/camp-pack-weight-planner",
    description: "Add gear items and estimate your total pack weight.",
    category: "camp",
  },
  {
    slug: "camp-fuel-estimator",
    title: "Camp Fuel Estimator",
    href: "/camp-fuel-estimator",
    description:
      "Estimate stove fuel usage for meals, coffee, and boiling water.",
    category: "camp",
  },
  {
    slug: "camp-meal-planner",
    title: "Camp Meal Planner",
    href: "/camp-meal-planner",
    description: "Estimate meals, snacks, and calories for a camping trip.",
    category: "camp",
  },
  {
    slug: "camp-weather-comfort",
    title: "Camp Weather Comfort Calculator",
    href: "/camp-weather-comfort",
    description:
      "Estimate camping comfort based on temperature, rain, wind, and overnight lows.",
    category: "camp",
  },
  {
    slug: "camp-checklist-generator",
    title: "Camp Checklist Generator",
    href: "/camp-checklist-generator",
    description:
      "Generate a camping checklist based on trip style, weather, and activities.",
    category: "camp",
  },
  {
    slug: "camp-trip-cost-calculator",
    title: "Camp Trip Cost Calculator",
    href: "/camp-trip-cost-calculator",
    description:
      "Estimate campsite fees, gas, food, gear, and total trip cost.",
    category: "camp",
  },
  {
    slug: "campfire-safety-checklist",
    title: "Campfire Safety Checklist",
    href: "/campfire-safety-checklist",
    description:
      "Generate a campfire safety checklist based on conditions and trip plans.",
    category: "camp",
  },
  {
    slug: "tent-footprint-calculator",
    title: "Tent Footprint Calculator",
    href: "/tent-footprint-calculator",
    description: "Calculate a recommended footprint size for your tent floor.",
    category: "camp",
  },
];

export const homeTools: ToolItem[] = [
  {
    slug: "paint-calculator",
    title: "Paint Calculator",
    description: "Estimate how much paint you need for a room or project.",
    href: "/paint-calculator",
    category: "home",
  },
  {
    slug: "room-size-calculator",
    title: "Room Size Calculator",
    description: "Calculate room square footage from length and width.",
    href: "/room-size-calculator",
    category: "home",
  },
  {
    slug: "electricity-cost-calculator",
    title: "Electricity Cost Calculator",
    description: "Estimate how much an appliance or device costs to run.",
    href: "/electric-cost-calculator",
    category: "home",
  },
  {
    slug: "moving-box-calculator",
    title: "Moving Box Calculator",
    description: "Estimate how many boxes you may need for a move.",
    href: "/moving-box-calculator",
    category: "home",
  },
  {
    slug: "home-project-budget-calculator",
    title: "Project Budget Calculator",
    description:
      "Plan a home project budget with materials, labor, and extra cushion.",
    href: "/home-project-budget-calculator",
    category: "home",
  },
  {
    slug: "flooring-calculator",
    title: "Flooring Calculator",
    description:
      "Estimate flooring square footage, waste allowance, boxes needed, and material cost.",
    href: "/flooring-calculator",
    category: "home",
  },
  {
    slug: "mulch-calculator",
    title: "Mulch Calculator",
    description:
      "Estimate mulch volume in cubic feet, cubic yards, and bags based on bed size and depth.",
    href: "/mulch-calculator",
    category: "home",
  },
  {
  slug: "tile-calculator",
  title: "Tile Calculator",
  description:
    "Estimate tile count, waste allowance, boxes needed, and material cost for a floor or wall.",
  href: "/tile-calculator",
  category: "home",
},
{
  slug: "wallpaper-calculator",
  title: "Wallpaper Calculator",
  description:
    "Estimate wallpaper rolls needed based on wall size, roll coverage, pattern waste, and cost.",
  href: "/wallpaper-calculator",
  category: "home",
},
{
  slug: "home-project-timeline-estimator",
  title: "Home Project Timeline Estimator",
  description:
    "Estimate a rough project timeline based on project type, complexity, DIY level, and buffer time.",
  href: "/home-project-timeline-estimator",
  category: "home",
},
];

export const financeTools: ToolItem[] = [
  {
    slug: "savings-goal-calculator",
    title: "Savings Goal Calculator",
    description:
      "Estimate how long it will take to reach a savings goal based on your starting balance and monthly contributions.",
    href: "/savings-goal-calculator",
    category: "finance",
  },
  {
    slug: "debt-payoff-calculator",
    title: "Debt Payoff Calculator",
    description:
      "Estimate how long it will take to pay off debt based on balance, APR, and monthly payment.",
    href: "/debt-payoff-calculator",
    category: "finance",
  },
  {
    slug: "monthly-budget-calculator",
    title: "Monthly Budget Calculator",
    description:
      "Estimate monthly income, expenses, savings, and leftover money with a simple budget breakdown.",
    href: "/monthly-budget-calculator",
    category: "finance",
  },
];

export const allTools: ToolItem[] = [
  ...officeTools,
  ...campTools,
  ...homeTools,
  ...financeTools
];

export function getToolsByCategory(category: ToolCategorySlug) {
  return allTools.filter((tool) => tool.category === category);
}

export function getRelatedTools(
  currentHref: string,
  category: ToolCategorySlug,
  limit = 3
) {
  return allTools
    .filter((tool) => tool.category === category && tool.href !== currentHref)
    .slice(0, limit);
}

export function getToolByHref(href: string) {
  return allTools.find((tool) => tool.href === href);
}

export function getToolBySlug(slug: string) {
  return allTools.find((tool) => tool.slug === slug);
}