# Goodfolk Toolbox Blog Style Guide

Goodfolk blog posts should be practical, clear, and easy to skim.

The reader should leave with a better understanding of the topic and a clear next step using a Goodfolk tool when relevant.

## Voice

Goodfolk should sound:

- Helpful
- Plainspoken
- Practical
- Friendly
- Calm
- Not corporate
- Not overly technical

Avoid sounding like a generic SEO farm.

## Structure

Most blog posts should follow this structure:

1. Back to Blog link
2. Category label
3. H1 title
4. Short intro paragraph
5. Helpful sections with H2 headings
6. Practical examples
7. CTA linking to the relevant Goodfolk tool
8. Related guides section if part of a cluster
9. Bottom line section
10. Disclaimer when appropriate

## Formatting

Use the existing blog page style:

- `min-h-screen bg-slate-950 p-8 text-white`
- `mx-auto max-w-3xl`
- Amber accent links and CTA buttons
- `text-zinc-300` body copy
- Rounded callout boxes
- Clear H2 headings

## Metadata

Each post should have a `layout.tsx` file with Metadata.

Metadata rules:

- Import `Metadata` from `next`.
- Export a `metadata` object.
- Include a useful title.
- Include a useful description.
- Do not export Metadata from a client component.
- Blog post pages should stay consistent with the existing route pattern.

Example metadata structure:

- `title`: Clear search-friendly post title
- `description`: One sentence explaining what the post helps the reader do

## Blog content rules

Do:

- Explain the topic clearly.
- Use examples when helpful.
- Link to the most relevant Goodfolk tool.
- Link to related Goodfolk guides.
- Write for beginners.
- Use natural search language.
- Keep paragraphs readable.
- Use H2 sections that match real user questions.

Do not:

- Invent statistics.
- Overpromise results.
- Use fake citations.
- Stuff keywords unnaturally.
- Make medical, legal, financial, or safety guarantees.
- Make the post longer just to make it longer.
- Add unrelated internal links just for SEO.

## CTA pattern

Use a callout box for the main tool CTA.

The CTA should usually include:

- A short H2 explaining the next step
- One paragraph explaining why the tool helps
- A button linking to the relevant tool

CTA style should match the existing Goodfolk blog style:

- Rounded box
- Amber border/background accent
- Amber button
- Button text should be direct, such as "Open Electricity Cost Calculator"

## Related guides pattern

Use related guide sections for topic clusters.

Related guide sections should:

- Appear near the lower half of the article
- Link to other articles in the same cluster
- Use natural anchor text
- Avoid linking to unrelated topics
- Avoid repeating the exact same wording on every page

Example section title:

Related Electricity Guides

Example links:

- How Much Does Electricity Cost Per Month?
- What Uses The Most Electricity In A Home?
- Why Is My Electric Bill So High?

## Disclaimer pattern

Use a short disclaimer for topics involving:

- Money
- Health
- Safety
- Home costs
- School
- Legal-adjacent planning
- Travel planning
- Business planning

Disclaimer style should match the existing Goodfolk blog style:

- Rounded box
- Slate border
- Slate background
- Small text
- Calm wording

Example disclaimer wording:

This guide is for general planning only. Actual costs, rules, usage, and results can vary based on your situation.

## Goodfolk writing principles

Every article should answer three questions:

1. What does the reader need to understand?
2. What should they do next?
3. Which Goodfolk tool or guide helps them act on it?

## Search intent rules

Before writing, identify the likely search intent.

Examples:

- "why is my electric bill so high" = problem solving
- "how much does electricity cost per month" = cost estimate
- "how to calculate GPA" = instructional
- "how many moving boxes do I need" = planning

The article should match that intent quickly.

Do not bury the answer.

## Internal linking rules

When a post belongs to a cluster:

- Link to the primary tool.
- Link to related guides in the same cluster.
- Use descriptive anchor text.
- Keep links helpful for readers.
- Avoid excessive links.

## Length guidance

Most posts should be long enough to fully answer the question but not padded.

General target:

- Simple topics: 700-1,000 words
- Strong cluster posts: 1,000-1,500 words
- Major guides: 1,500+ words only when useful

Quality matters more than word count.

## Tone examples

Good:

- "A higher electric bill usually comes from a few common causes."
- "The easiest way to estimate this is to look at wattage, usage time, and your electricity rate."
- "Start with the biggest energy users first."

Avoid:

- "In today's fast-paced world..."
- "Unlock the power of..."
- "This comprehensive guide will revolutionize..."
- "Needless to say..."
- "It is important to note that..." unless truly needed

## Blog update checklist

Before finishing a blog post task:

- Add the route folder.
- Add `page.tsx`.
- Add `layout.tsx`.
- Add Metadata.
- Add CTA to the relevant tool.
- Add related guides if part of a cluster.
- Add disclaimer if needed.
- Update `app/blog/page.tsx`.
- Update `app/sitemap.ts`.
- Run `npm run build`.