# Goodfolk Toolbox PR Checklist

Use this checklist before opening or merging a PR.

## Required for blog post PRs

- [ ] Created `app/blog/[slug]/page.tsx`
- [ ] Created `app/blog/[slug]/layout.tsx`
- [ ] Added Metadata title
- [ ] Added Metadata description
- [ ] Matched existing Goodfolk blog style
- [ ] Added CTA to relevant Goodfolk tool
- [ ] Added related guide links if part of a cluster
- [ ] Added disclaimer if needed
- [ ] Added post to `app/blog/page.tsx`
- [ ] Added route to `app/sitemap.ts`
- [ ] Ran `npm run build`
- [ ] Build passed
- [ ] PR summary includes new route
- [ ] PR summary includes files changed
- [ ] PR summary includes assumptions or follow-up notes

## Required for tool PRs

- [ ] Added or updated the tool page
- [ ] Updated `lib/tools.ts` if adding a new tool
- [ ] Added or updated route metadata
- [ ] Added clear instructions or examples
- [ ] Added related tools when appropriate
- [ ] Added related guides when appropriate
- [ ] Added FAQ when appropriate
- [ ] Updated `app/sitemap.ts`
- [ ] Ran `npm run build`
- [ ] Build passed
- [ ] PR summary includes new route or changed route
- [ ] PR summary includes assumptions or follow-up notes

## Required for cluster PRs

- [ ] Primary tool links to related guides
- [ ] Related guides link to primary tool
- [ ] Related guides link to each other where appropriate
- [ ] Anchor text is natural
- [ ] No duplicate low-value sections
- [ ] No broken links
- [ ] Sitemap is updated if new routes were added
- [ ] Build passed

## Content quality checklist

- [ ] No fake statistics
- [ ] No unsupported claims
- [ ] No keyword stuffing
- [ ] Clear intro
- [ ] Helpful H2 sections
- [ ] Practical examples where useful
- [ ] Clear bottom line
- [ ] Goodfolk tone is preserved

## Technical checklist

- [ ] No Metadata export inside client components
- [ ] No unnecessary dependencies added
- [ ] No unrelated refactors
- [ ] No major design changes unless requested
- [ ] No removed routes unless requested
- [ ] No broken imports
- [ ] Build passes locally or in CI

## PR summary template

```md
## Summary

- Added:
- Updated:
- New routes:

## Build

- `npm run build`: passed

## Notes

- Assumptions:
- Follow-up recommendations: