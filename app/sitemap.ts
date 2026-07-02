import type { MetadataRoute } from "next";
import { allTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tools.goodfolkdigital.com";

  const staticRoutes = [
    "",
    "/office",
    "/camp",
    "/home",
    "/finance",
    "/student",
    "/design",
    "/developer",
    "/travel",
    "/business",
    "/health",
    "/support",
    "/privacy",
    "/about",
    "/blog",
    "/blog/how-to-read-your-electric-bill",
    "/blog/how-much-water-should-you-drink",
    "/blog/how-much-does-electricity-cost-per-month",
    "/blog/how-to-plan-a-trip-budget-without-a-spreadsheet",
    "/blog/how-to-calculate-profit-margin-and-markup",
    "/blog/how-to-build-a-simple-packing-list-before-travel",
    "/blog/how-to-choose-colors-for-a-small-website-or-brand",
    "/blog/how-many-moving-boxes-do-i-need",
    "/blog/how-to-calculate-gpa-in-college",
    "/blog/what-uses-the-most-electricity-in-a-home",
    "/blog/campfire-safety-tips-for-beginners",
    "/blog/why-is-my-electric-bill-so-high",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),

    ...allTools.map((tool) => ({
      url: `${baseUrl}${tool.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
