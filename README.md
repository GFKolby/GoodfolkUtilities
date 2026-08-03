# Goodfolk Toolbox

Small, sharp browser-based tools for everyday good folk.

Goodfolk Toolbox is a growing collection of free utilities for work, home, school, travel, finance, development, design, health, business, and camping. The site is built around fast, focused tools that solve one practical problem at a time without requiring an account.

## Live Site

[tools.goodfolkdigital.com](https://tools.goodfolkdigital.com)

## What’s Included

The toolbox currently includes more than 100 browser-based utilities across 10 categories:

- Office Utilities
- Camp Utilities
- Home Utilities
- Finance Utilities
- Student Utilities
- Design Utilities
- Developer Utilities
- Travel Utilities
- Business Utilities
- Health Utilities

Examples include calculators, planners, converters, generators, estimators, formatting tools, and lightweight file utilities.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel Analytics
- Vercel deployment

Selected tools also use libraries such as JSZip, Papa Parse, PDF-Lib, QRCode, and SheetJS.

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/GFKolby/GoodfolkUtilities.git
cd GoodfolkUtilities
npm install
```

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other available commands:

```bash
npm run lint
npm run build
npm run start
```

## Project Structure

```text
app/
  blog/                 SEO-focused practical guides
  [tool-route]/         Individual tool pages and metadata layouts
  page.tsx              Main toolbox homepage
  sitemap.ts            Generated sitemap

components/
  CategoryPage.tsx      Shared category-page layout
  RelatedTools.tsx      Related-tool links
  SearchBar.tsx         Toolbox search
  ToolPage.tsx          Shared tool-page layout
  FAQ.tsx               Reusable FAQ component

lib/
  tools.ts              Category and tool definitions
  seo.ts                Shared metadata helpers
```

The repository also includes internal project guidance:

```text
AGENT.md
BLOG_STYLE_GUIDE.md
CLUSTER_RULES.md
CONTENT_ROADMAP.md
PR_CHECKLIST.md
```

## Adding a New Tool

1. Add the tool definition to the correct category array in `lib/tools.ts`.
2. Create the route at `app/<tool-slug>/page.tsx`.
3. Use the shared `ToolPage` component for the page shell.
4. Add `RelatedTools` using the correct category slug.
5. Create `app/<tool-slug>/layout.tsx` for metadata when the page is a client component.
6. Confirm the route is included through the existing sitemap setup.
7. Run lint and test the tool locally before committing.

Tool pages should be useful before they are clever. Keep inputs clear, explain the result, include sensible defaults, and avoid unnecessary complexity.

## SEO and Content Clusters

Goodfolk Toolbox pairs selected tools with practical guides that answer related search questions.

A typical content cluster contains:

- one useful calculator or utility
- one or more closely related guides
- early links from each guide to the tool
- links from the tool back to the guides
- clear formulas, worked examples, or usage explanations

Current priority clusters include electricity costs, moving boxes, and college GPA.

The goal is not to publish large amounts of generic content. Each guide should support a real tool, answer a focused question, and help the reader complete a task.

## Current Focus

The current growth sequence is:

```text
Tools → Analytics → SEO → Traffic → Identify winners → Plus → Pro
```

The immediate focus is improving existing pages, strengthening internal links, and measuring search performance before expanding into paid tiers.

## Repository Workflow

Development work happens in the personal fork:

```text
GFKolby/GoodfolkUtilities
```

Production lives in the Good Folk Digital organization repository:

```text
Good-Folk-Digital/GoodfolkUtilities
```

The working process is:

1. Make and review changes in the personal fork.
2. Group related work into a clear milestone.
3. Open a pull request from `GFKolby/main` to `Good-Folk-Digital/main`.
4. Review the diff and deployment checks before merging.

## Deployment

The production site is deployed through Vercel. Changes merged into the production repository should be checked for successful deployment and basic route functionality.

## Project Direction

Goodfolk Toolbox is intended to become a durable library of practical utilities rather than a collection of novelty pages. New tools, guides, and paid features should be driven by real usage, search data, and repeated user needs.
