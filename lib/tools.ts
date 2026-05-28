export type ToolCategorySlug =
  | "office"
  | "camp"
  | "home"
  | "finance"
  | "student"
  | "design"
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
    toolCount: 10,
  },
  {
  slug: "student",
  title: "Student Utilities",
  description:
    "Free student tools for grades, GPA, study planning, assignments, writing, and semester workload.",
  href: "/student",
  toolCount: 10,
  },
  {
  slug: "design",
  title: "Design Utilities",
  description:
    "Free design tools for colors, contrast, gradients, shadows, spacing, typography, and UI layout.",
  href: "/design",
  toolCount: 10,
  },
  {
  slug: "developer",
  title: "Developer Utilities",
  description:
    "Free developer tools for JSON, URLs, Base64, timestamps, IDs, regex, JWTs, HTML entities, and API cleanup.",
  href: "/developer",
  toolCount: 10,
  },  
  {
  slug: "travel",
  title: "Travel Utilities",
  description:
    "Free travel tools for trip budgets, packing, hotels, gas, layovers, attractions, and travel planning.",
  href: "/travel",
  toolCount: 5,
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
  {
  slug: "subscription-cost-calculator",
  title: "Subscription Cost Calculator",
  description:
    "Estimate monthly and yearly subscription costs, including optional annual savings from canceling unused services.",
  href: "/subscription-cost-calculator",
  category: "finance",
  },
  {
  slug: "loan-payment-calculator",
  title: "Loan Payment Calculator",
  description:
    "Estimate monthly loan payments, total interest, and total repayment based on loan amount, APR, and term.",
  href: "/loan-payment-calculator",
  category: "finance",
  },
  {
  slug: "tip-split-bill-calculator",
  title: "Tip & Split Bill Calculator",
  description:
    "Calculate tip, total bill, and per-person cost when splitting a check.",
  href: "/tip-split-bill-calculator",
  category: "finance",
  },
  {
    slug: "hourly-to-salary-calculator",
    title: "Hourly to Salary Calculator",
    description:
      "Convert hourly pay to weekly, monthly, and yearly income estimates.",
    href: "/hourly-to-salary-calculator",
    category: "finance",
  },
  {
    slug: "emergency-fund-calculator",
    title: "Emergency Fund Calculator",
    description:
      "Estimate how much emergency savings you may need based on monthly expenses and target months of coverage.",
    href: "/emergency-fund-calculator",
    category: "finance",
  },
  {
    slug: "net-worth-calculator",
    title: "Net Worth Calculator",
    description:
      "Estimate your net worth by comparing total assets against total debts and liabilities.",
    href: "/net-worth-calculator",
    category: "finance",
  },
  {
    slug: "paycheck-estimator",
    title: "Paycheck Estimator",
    description:
      "Estimate take-home pay after taxes, retirement contributions, benefits, and other deductions.",
    href: "/paycheck-estimator",
    category: "finance",
  },
];

export const studentTools: ToolItem[] = [
  {
    slug: "gpa-calculator",
    title: "GPA Calculator",
    description:
      "Calculate GPA from course grades and credit hours.",
    href: "/gpa-calculator",
    category: "student",
  },
  {
  slug: "grade-needed-calculator",
  title: "Grade Needed Calculator",
  description:
    "Calculate the grade you need on a final exam or remaining assignment to reach your target course grade.",
  href: "/grade-needed-calculator",
  category: "student",
  },
  {
  slug: "assignment-planner",
  title: "Assignment Planner",
  description:
    "Break an assignment into daily work sessions based on due date, estimated hours, and available study days.",
  href: "/assignment-planner",
  category: "student",
  },
  {
  slug: "semester-workload-calculator",
  title: "Semester Workload Calculator",
  description:
    "Estimate weekly school workload based on credit hours, study time, assignments, and outside commitments.",
  href: "/semester-workload-calculator",
  category: "student",
  },
  {
  slug: "study-timer",
  title: "Study Timer",
  description:
    "Plan focused study sessions with breaks using a simple Pomodoro-style timer setup.",
  href: "/study-timer",
  category: "student",
  },
  {
  slug: "essay-word-counter",
  title: "Essay Word Counter",
  description:
    "Count words, characters, sentences, paragraphs, reading time, and progress toward an essay word target.",
  href: "/essay-word-counter",
  category: "student",
  },
  {
  slug: "citation-helper",
  title: "Citation Helper",
  description:
    "Format simple MLA and APA-style citations for websites, books, articles, and videos.",
  href: "/citation-helper",
  category: "student",
  },
  {
  slug: "reading-time-calculator",
  title: "Reading Time Calculator",
  description:
    "Estimate how long a reading assignment will take based on word count, pages, and reading speed.",
  href: "/reading-time-calculator",
  category: "student",
  },
  {
  slug: "flashcard-formatter",
  title: "Flashcard Formatter",
  description:
    "Turn notes into simple question-and-answer flashcards for studying.",
  href: "/flashcard-formatter",
  category: "student",
  },
  {
  slug: "final-exam-study-plan-generator",
  title: "Final Exam Study Plan Generator",
  description:
    "Create a simple final exam study plan based on exam date, topics, available days, and study time.",
  href: "/final-exam-study-plan-generator",
  category: "student",
},
];

export const designTools: ToolItem[] = [
  {
    slug: "hex-color-converter",
    title: "HEX Color Converter",
    description:
      "Convert HEX colors to RGB and HSL, preview the color, and copy CSS-friendly values.",
    href: "/hex-color-converter",
    category: "design",
  },
  {
  slug: "color-contrast-checker",
  title: "Color Contrast Checker",
  description:
    "Check contrast between text and background colors and see basic WCAG-style pass/fail guidance.",
  href: "/color-contrast-checker",
  category: "design",
  },
  {
  slug: "color-palette-generator",
  title: "Color Palette Generator",
  description:
    "Generate color palettes from a base color, lock favorite colors, and copy HEX values or CSS variables.",
  href: "/color-palette-generator",
  category: "design",
  },
  {
  slug: "css-gradient-generator",
  title: "CSS Gradient Generator",
  description:
    "Create linear CSS gradients, preview them, and copy ready-to-use CSS.",
  href: "/css-gradient-generator",
  category: "design",
  },
  {
  slug: "box-shadow-generator",
  title: "Box Shadow Generator",
  description:
    "Create CSS box shadows, preview them, and copy ready-to-use shadow styles.",
  href: "/box-shadow-generator",
  category: "design",
  },
  {
  slug: "border-radius-previewer",
  title: "Border Radius Previewer",
  description:
    "Preview CSS border radius values on cards and buttons, then copy ready-to-use CSS.",
  href: "/border-radius-previewer",
  category: "design",
  },
  {
  slug: "spacing-scale-generator",
  title: "Spacing Scale Generator",
  description:
    "Generate consistent spacing scales in pixels and rems for UI layouts and design systems.",
  href: "/spacing-scale-generator",
  category: "design",
  },
  {
  slug: "rem-px-converter",
  title: "REM/PX Converter",
  description:
    "Convert pixels to rems and rems to pixels using a custom base font size.",
  href: "/rem-px-converter",
  category: "design",
  },
  {
  slug: "typography-scale-calculator",
  title: "Typography Scale Calculator",
  description:
    "Generate a type scale from a base font size and ratio, with pixel and rem values.",
  href: "/typography-scale-calculator",
  category: "design",
  },
  {
  slug: "image-aspect-ratio-calculator",
  title: "Image Aspect Ratio Calculator",
  description:
    "Calculate missing image dimensions, aspect ratios, and scaled sizes for UI layouts and media.",
  href: "/image-aspect-ratio-calculator",
  category: "design",
  },
];

export const developerTools: ToolItem[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description:
      "Format, validate, and minify JSON with copy-ready output.",
    href: "/json-formatter",
    category: "developer",
  },
  {
  slug: "url-encoder-decoder",
  title: "URL Encoder / Decoder",
  description:
    "Encode and decode URLs, query strings, and text for safe use in web addresses.",
  href: "/url-encoder-decoder",
  category: "developer",
  },
  {
  slug: "base64-encoder-decoder",
  title: "Base64 Encoder / Decoder",
  description:
    "Encode plain text to Base64 and decode Base64 back to readable text.",
  href: "/base64-encoder-decoder",
  category: "developer",
  },
  {
  slug: "uuid-generator",
  title: "UUID Generator",
  description:
    "Generate one or more random UUIDs and copy them for testing, mock data, or development work.",
  href: "/uuid-generator",
  category: "developer",
  },
  {
  slug: "timestamp-converter",
  title: "Timestamp Converter",
  description:
    "Convert Unix timestamps to readable dates and convert dates back to Unix time.",
  href: "/timestamp-converter",
  category: "developer",
  },
  {
  slug: "html-entity-encoder-decoder",
  title: "HTML Entity Encoder / Decoder",
  description:
    "Encode HTML special characters into entities and decode entities back to readable text.",
  href: "/html-entity-encoder-decoder",
  category: "developer",
  },
  {
  slug: "regex-tester",
  title: "Regex Tester",
  description:
    "Test regular expressions against sample text and review matches, groups, and flags.",
  href: "/regex-tester",
  category: "developer",
  },
  {
  slug: "jwt-decoder",
  title: "JWT Decoder",
  description:
    "Decode JWT headers and payloads locally in your browser for quick inspection.",
  href: "/jwt-decoder",
  category: "developer",
  },
  {
  slug: "api-response-formatter",
  title: "API Response Formatter",
  description:
    "Format API response JSON, inspect status details, and copy clean output for debugging.",
  href: "/api-response-formatter",
  category: "developer",
  },
  {
  slug: "css-unit-converter",
  title: "CSS Unit Converter",
  description:
    "Convert common CSS units like px, rem, em, vw, and vh for front-end development.",
  href: "/css-unit-converter",
  category: "developer",
  },
];

export const travelTools: ToolItem[] = [
  {
    slug: "trip-budget-calculator",
    title: "Trip Budget Calculator",
    description:
      "Estimate total trip cost from transportation, lodging, food, activities, shopping, and buffer.",
    href: "/trip-budget-calculator",
    category: "travel",
  },
  {
  slug: "road-trip-gas-calculator",
  title: "Road Trip Gas Calculator",
  description:
    "Estimate road trip fuel cost from distance, MPG, gas price, and one-way or round-trip travel.",
  href: "/road-trip-gas-calculator",
  category: "travel",
  },
  {
  slug: "hotel-cost-splitter",
  title: "Hotel Cost Splitter",
  description:
    "Split hotel or Airbnb costs across people and nights, including taxes, fees, and uneven shares.",
  href: "/hotel-cost-splitter",
  category: "travel",
  },
  {
  slug: "packing-list-generator",
  title: "Packing List Generator",
  description:
    "Generate a simple packing list based on trip length, weather, destination type, and travel style.",
  href: "/packing-list-generator",
  category: "travel",
  },
  {
  slug: "flight-layover-calculator",
  title: "Flight Layover Calculator",
  description:
    "Estimate whether a flight layover gives enough time for customs, bags, terminal changes, and airport size.",
  href: "/flight-layover-calculator",
  category: "travel",
  },
];

export const allTools: ToolItem[] = [
  ...officeTools,
  ...campTools,
  ...homeTools,
  ...financeTools,
  ...studentTools,
  ...designTools,
  ...developerTools,
  ...travelTools,
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