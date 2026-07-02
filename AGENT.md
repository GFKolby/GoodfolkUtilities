# Goodfolk Toolbox Agent Instructions

Goodfolk Toolbox is a free tools and guides site for practical calculators, checklists, converters, and simple planning tools.

The goal is to grow organic search traffic by creating useful tools, guides, and topic clusters based on real Search Console data.

## Core strategy

Prioritize pages and topics that are already showing impressions, clicks, or promising search queries.

Do not create random tools or blog posts unless they support an active topic cluster or a clearly identified search opportunity.

The current operating model is:

1. Find demand from Search Console.
2. Pick a topic cluster.
3. Create or improve tools and guides.
4. Add internal links between related pages.
5. Update sitemap and indexes.
6. Run build checks.
7. Open a PR for human approval.

## Human role

Kolby is the product owner and editor-in-chief.

The agent may propose, draft, and implement, but major strategy changes should be approved before execution.

Examples of changes that need approval:

- Creating a new topic cluster
- Adding a new tool category
- Changing site design system
- Adding monetization
- Adding authentication
- Adding paid features
- Removing existing pages
- Rewriting the homepage

## Default blog workflow

When adding a blog post:

1. Create a route under `app/blog/[slug]/page.tsx`.
2. Create `app/blog/[slug]/layout.tsx`.
3. Export Metadata from the layout.
4. Match the existing blog post visual style.
5. Include a clear introduction.
6. Use practical headings and examples.
7. Link to the relevant Goodfolk tool.
8. Add related guide links when part of a cluster.
9. Add a brief disclaimer when the topic involves money, health, school, home costs, safety, or planning.
10. Add the post to `app/blog/page.tsx`.
11. Add the route to `app/sitemap.ts`.
12. Run `npm run build`.
13. Open a PR with a clear summary.

## Default tool workflow

When adding or improving a tool:

1. Follow the existing tool page structure.
2. Keep the tool simple, useful, and free.
3. Add helpful examples or explanations.
4. Add FAQ when appropriate.
5. Add related tools and related guides.
6. Update `lib/tools.ts` if a new tool is created.
7. Update `app/sitemap.ts`.
8. Run `npm run build`.
9. Open a PR with a clear summary.

## Content rules

- Do not invent statistics.
- Do not cite fake sources.
- Do not make unsupported claims.
- Keep writing clear, practical, and useful.
- Avoid fluff.
- Avoid keyword stuffing.
- Use natural internal links.
- Keep Goodfolk friendly, simple, and helpful.
- Prefer examples over abstract explanations.
- Keep tools free unless explicitly instructed otherwise.

## Technical rules

- Do not place Metadata exports inside client components.
- Client tool pages using `"use client"` should not export Metadata.
- For tool-specific metadata, use a route `layout.tsx`.
- Preserve the existing design style unless asked to change it.
- Do not introduce unnecessary dependencies.
- Do not make large architecture changes without approval.
- Always update sitemap when adding public routes.
- Always update index/listing pages when adding public content.

## PR expectations

Every PR should include:

- What was added or changed
- New routes created
- Files updated
- Build result
- Any assumptions made
- Any follow-up recommendations

## Current priority

The current priority is building topic clusters around pages that are already getting Search Console traction.

The first active cluster is Electricity.