## Stainless Steel (`/doors/profile-doors/stainless-steel`)
- [ ] No changes needed — matches live site.

## Unico Slim Line (`/doors/profile-doors/unico-slim-line`)
- [ ] No changes needed — matches live site.

## Door Styles (hub) (`/door-styles`)
- [ ] No changes needed — matches live site.

## Edwardian Doors (`/door-styles/edwardian-doors`)
- [ ] Browser tab / SEO title is generic "Secure House" instead of the live site's "Edwardian doors - Secure House". This is the already-known missing-metadata gap (no `title`/`description` export in this page's `page.tsx` at all) — needs real title + meta description copy from the client, same as the French Doors page. Visible body content otherwise matches the live site exactly, including the FAQ-less structure.

## French Doors (`/door-styles/french-doors`)
- [ ] Browser tab / SEO title is generic "Secure House" instead of the live site's "French doors - Secure House". Same known missing-metadata gap as Edwardian Doors — needs real title + meta description copy from the client. Visible body content otherwise matches the live site exactly.

## Georgian Doors (`/door-styles/georgian-doors`)
- [ ] No changes needed — matches live site exactly, including the FAQ section and title tag (confirms the earlier metadata fix is working correctly).

## Victorian Doors (`/door-styles/victorian-doors`)
- [ ] No changes needed — matches live site exactly, including the FAQ section and title tag (confirms the earlier metadata fix is working correctly).

## Garage Doors (hub) (`/garage-doors`)
- [ ] No changes needed — matches live site exactly, including the FAQ section.

## Sectional Garage Doors (`/garage-doors/sectional-garage-doors`)
- [ ] **Real discrepancy found.** Our `/new/` page has a block of 4 product cards (Security sectional garage doors London: R40 Sectional / TL Sectional / SHD Side Hinged Doors / SSD Side Sliding Doors) that appears **twice in a row**, and this block does not appear anywhere in the current live WordPress page's text at all. This section was deliberately restored in an earlier migration session (see `migration-log/PROGRESS.md`, "Completed (continued, 4)" — it was reportedly missing from the original scrape and was manually re-added from the live site at that time). Two possible causes, needs investigation: (1) the live WordPress site has since removed this section, meaning our restored content is now stale and should probably be removed to match current live content, or (2) it's a real duplication bug in our page (the block rendering twice) independent of whether it should exist at all. Worth a manual look at both the current live page in a full browser (in case it's a slider/carousel that text-extraction missed) and at `app/new/garage-doors/sectional-garage-doors/page.tsx` to see why the block appears twice.

## Side Hinged Garage Doors (`/garage-doors/side-hinged-garage-doors`)
- [ ] No changes needed — matches live site exactly, including the FAQ section.

## Sliding Garage Doors (`/garage-doors/sliding-garage-doors`)
- [ ] No changes needed — matches live site exactly.
