# Detailed Mistakes, Root Causes, and Patches (Chronological)

This file exists so we do NOT repeat the same mistakes. Read this before starting any new large-scale change.

## 1. Initial strategy debate: full rebuild vs fast repackage
- An external tool ("Antigravity"/"anti-gravity") recommended a full from-scratch React rebuild with clean components immediately.
- Correct call made instead: fast repackage first (raw HTML wrapped in dangerouslySetInnerHTML) to hit a hard deadline, with proper componentization explicitly deferred as a LATER phase — this is the "strangler fig" / incremental migration pattern, not a shortcut to be ashamed of.
- LESSON: matching engineering effort to actual deadline constraints is correct; premature full rebuilds under time pressure cause more harm than good. But the deferred "proper" work must actually get scheduled and done later — don't let "later" become "never."

## 2. Lazy-load images/videos appeared broken after migration
- Symptom: images and background videos appeared completely blank/missing after raw HTML was wrapped in Next.js.
- Root cause: the original Avada theme's lazy-loading system stores real image URLs in data-src/data-srcset/data-bg attributes and swaps them into src/srcset/style via jQuery on page load. Since that jQuery never runs in the Next.js static site, browsers only ever saw the placeholder attributes.
- Patch: script to rename data-src→src, data-srcset→srcset, and convert data-bg="url" into inline style="background-image:url(...)" directly in the HTML at migration time, so no JS execution is needed.
- LESSON: whenever migrating a theme-driven WordPress site, ALWAYS check for lazy-load attribute patterns before assuming missing images are a path/asset problem.

## 3. Asset path rewriting missed several URL variants
- Symptom: many images continued loading from the LIVE site (secure-house.co.uk) instead of local assets, or were still 404ing after local rewriting.
- Root cause: the regex used to rewrite wp-content URLs only handled some variants (e.g. absolute https://domain/wp-content/) and missed others: protocol-relative (//domain/wp-content/), bare relative (wp-content/...), and query-string-suffixed filenames.
- Patch: iteratively broadened the regex across several rounds until a full grep-verification (search for any remaining "secure-house.co.uk" + "wp-content" combination) returned zero matches — this "grep to zero" verification step should be standard for any global find/replace across many files, not just done once and assumed complete.
- LESSON: when writing a global path-rewrite regex, enumerate ALL known URL variants up front (absolute with/without www, protocol-relative, relative, with/without query strings) rather than fixing them one at a time as bugs are reported.

## 4. Special characters in scraped filenames broke asset copying
- Symptom: some images physically failed to copy from the backup to the Next.js project; some copy commands crashed on Windows.
- Root cause: the HTTrack scraper encoded special characters (like "?") from original query-string URLs directly into local filenames using unicode escape sequences, sometimes producing filenames exceeding Windows' 260-character path limit.
- Patch: used the \\?\ long-path-bypass syntax on Windows, and wrote a cleanup script to strip the unicode-encoded junk from filenames during copy.
- LESSON: scraper tools can produce filesystem-hostile filenames; always sanity-check filenames for illegal/oversized characters before bulk-copying scraped assets, especially on Windows.

## 5. A subset of images were WordPress auto-generated thumbnail sizes that were never scraped
- Symptom: after fixing path rewriting, ~850 images still 404'd. Investigation showed the HTML requested dimension-suffixed thumbnail filenames (e.g. image-400x599.jpg) that don't exist on disk — only the base/full-size image was ever downloaded by the scraper.
- Patch: wrote a script to detect this pattern (requested filename minus its -WIDTHxHEIGHT suffix matches an existing base file) and physically copy/duplicate the base image to the missing thumbnail filename.
- LESSON: WordPress generates many resized copies of every uploaded image; a site scraper will often only capture the sizes actually referenced on scraped pages, missing srcset variants. Always check for this specific failure signature (filename pattern with dimension suffix) rather than assuming all 404s share one root cause.

## 6. A duplicated path segment bug recurred multiple times across different batches
- Symptom: certain images repeatedly 404'd with a URL containing a doubled path segment, e.g. .../al_opt_content/IMAGE/secure-house.co.uk/legacy-assets/... (should have been a single clean /legacy-assets/... path).
- Root cause: a WordPress image-optimization plugin (al_opt_content) had ALREADY rewritten some image URLs into a nested "optimizer cache" path BEFORE our own rewrite script ran, so our rewrite script's find/replace pattern matched against an already-modified URL, producing a doubled/nested result.
- Patch: had to specifically detect and collapse this doubled pattern in a follow-up fix, applied repeatedly across new batches of pages as they were built, since each new page-building script reintroduced the same unhandled case.
- LESSON: any newly-written page-building/URL-rewriting script needs to inherit ALL previously-discovered edge cases (this one included) — don't let each new batch script start from a naive/simpler version of the rewrite logic and rediscover old bugs.

## 7. Copyright/attribution-safe content handling was maintained throughout, but "spam vs legitimate" filtering required MULTIPLE passes, not one
- First pass: filtered spam links using an obvious keyword blocklist (casino, bet, kasyno, etc.) — this caught the majority.
- Later, entire new PAGES (not just links) were discovered that were spam-injected articles (e.g. gambling blog posts with innocent-sounding slugs that happened to match legitimate industry keywords like "home" or "security" in a keyword-based filter).
- Patch: had to add a SECOND layer of verification — actually reading each candidate page's title/body text, not just filtering by URL keywords — before deciding to migrate it.
- LESSON: keyword-based URL filtering alone is insufficient for detecting spam/hacked content; always verify actual page CONTENT (title + body text sample) for any page whose legitimacy is uncertain, especially when the source site is known to have been compromised.

## 8. Large binary files (video) broke git pushes multiple times, in multiple ways
- First failure: GitHub's 100MB single-file limit rejected a push containing a 244MB video, requiring Git LFS setup.
- Second failure: after LFS setup, the regular git push (non-LFS objects) failed with "unable to rewind rpc post data" — fixed by increasing http.postBuffer.
- Third failure: push then failed with HTTP 408 (timeout) over HTTPS — root cause was an unstable network connection combined with a large payload, not a git configuration issue.
- Final fix: switched from HTTPS remote to SSH remote entirely, which succeeded reliably on retry.
- LESSON: when pushing large binaries fails, systematically rule out (in order): file size limit → LFS needed; buffer size → increase http.postBuffer; network stability → retry, and if still failing, switch HTTPS→SSH since SSH is generally more robust for large/long-running git transfers.

## 9. A "site inaccessible" scare was actually a stale local dev server, not a code bug
- Symptom: after a batch of changes, the site appeared completely broken/blank in the browser.
- Root cause: a background npm run start process (serving an old build) was still holding the same port a fresh npm run dev was trying to use, causing a collision and serving stale/broken output.
- Patch: killed all node processes on the relevant ports (3000, 3001) and started a single fresh dev server.
- LESSON: "the whole site suddenly doesn't load" is not automatically a code regression — always check for port collisions / duplicate running dev servers FIRST, before deep-diving into recent code changes as the cause.

## 10. Committing was not happening consistently during rapid iteration, creating real risk of data loss
- During a long session of rapid prompt-fix-verify cycles, work was being saved to disk but NOT committed to git for an extended period. When a later step needed to check git history for a specific file, it appeared "missing" — causing a genuine scare that hours of work had been lost.
- The files were NEVER actually lost (disk saves are separate from git commits), but the lack of regular committing made this impossible to quickly verify, and wasted significant time.
- LESSON: commit to git after every meaningfully complete, verified change — not just at the end of a long session. "I'll commit later" during rapid iteration is a real risk, not just a style preference.

## 11. "Build passes" was repeatedly mistaken for "the fix actually works"
- Multiple times throughout this project, a fix was reported as complete based solely on `npm run build` exiting with code 0, without an actual visual/functional check — and the fix later turned out to be incomplete, absent, or to have introduced a new regression (invisible text, duplicate menu, missing images).
- LESSON: `npm run build` passing only proves the code COMPILES. It proves nothing about whether the intended visual or functional change actually happened. Every fix claim must be paired with an explicit visual check (screenshot, manual click-through) or a concrete before/after count/measurement — never accept "build passed" alone as proof of a fix.

## 12. Large batch scripts should always be piloted on a small sample first
- Every time a script was run across all ~100-190 files in one shot without piloting first, at least one edge case was missed and had to be patched afterward in a second pass (see items 3, 5, 6 above).
- LESSON: for any new large-batch transformation, ALWAYS run it on 3-5 representative files first, manually verify the output, THEN scale to the full batch. This is now a hard rule for Phase A onward (see PLAN.md).

## 13. A hidden (off-screen) black-hat SEO spam injection survived all prior spam-cleanup passes because it produced zero visible symptoms
- Symptom: none visible — the homepage (`app/content.html`) looked and rendered completely normally. This was found only via a deliberate proactive audit (checking for `<script>` tags, external domains, and inline obfuscation patterns), not because anything appeared broken.
- Root cause: the injected content was a `<div class="sfb-anchor" style="position:fixed;...z-index:-9999;">` wrapper containing a `<style>` block plus a nested `<div id="sfb-block-...">` pushed off-screen via `left:-9000px !important`. Because the text was never visible on screen, it was invisible to every prior spam-removal pass in item 7 above (which relied on visually/keyword-scanning rendered pages and URL slugs) — this variant hides via CSS positioning, not via a fake page or an obvious spam link in visible content.
- The hidden text itself was steroid/PED affiliate spam ("Bodybuilding School... Best steroid vendor - comprar anabolizantes") with outbound links, classic negative-SEO link-injection: invisible to visitors, crawlable by search engines.
- It was confined to a single file (`app/content.html`, the homepage) — a repo-wide grep for the class name, the id prefix, and two of the spam page's exact link domains/phrases confirmed zero other occurrences across all 193 `content.html` files.
- Patch: deleted the entire 17-line wrapper (anchor div + style block + spam content div) as one atomic, brace-balanced removal; confirmed with `npm run build` (0 errors, all 199 routes still generate) and by grepping the compiled `.next/server/app/index.html` output for the same markers (0 matches) plus confirming adjacent legitimate content (hero heading, video testimonial) still rendered.
- LESSON: "spam content" cleanup on a hacked/compromised site must explicitly include a pass for CSS-hidden content (`display:none`, `visibility:hidden`, `text-indent:-9999px`, `opacity:0`, off-screen `position` with large negative `left`/`top`, `clip:rect(0)`) with actual text extracted from matching elements — not just visible-page/URL-slug scanning (item 7) or `<script>`-tag/external-domain scanning. A compromised site can carry multiple independent injection techniques simultaneously, and clearing one (spam pages/links) does not imply the others (hidden CSS text) are also gone. This should be a standing checklist item any time "spam removed" is claimed for a migrated hacked site (see PROGRESS.md item "190+ pages migrated, spam removed, verified" — that claim predates this finding and was incomplete).

## 14. Item 2's data-bg lazy-load fix had never been applied to `<span>` elements or to elements carrying a `data-bg-small` responsive-background attribute
- Symptom: during a 30-page content/image audit, 14 pages still had visibly blank backgrounds even though most pages had already been through the item-2 `data-bg`→`style` conversion pass.
- Root cause: the original conversion script only ever matched `<div>` tags with a plain `data-bg`/`data-bg-url` pair. Two edge cases slipped through: (a) Fusion Builder sometimes puts the lazy-bg attributes on a `<span class="fusion-column-inner-bg-image">` instead of a `<div>`, and (b) some columns carry a `data-bg-small` attribute (a separate image for small viewports) alongside `data-bg`/`data-bg-url`, with attribute order varying between elements.
- Patch: broadened the conversion regex to match both `<div>` and `<span>`, made it tolerant of attribute order/extra attributes, and added `data-bg-small` localization as its own step.
- LESSON: same lesson as item 6 — a fix written against one observed HTML shape will miss sibling shapes the theme also generates. When re-running an established "known pattern" fix on new pages, re-verify the fix's regex/matcher against a fresh sample from each new page rather than assuming the old matcher's coverage was complete.

## 15. Windows' 260-character path limit breaks `git add`/`git commit`, not just file copies
- Symptom: after downloading two scraped images with very long original WordPress filenames (~180+ characters) to fill gaps from item 5, `git add` failed with "Filename too long" even though the files existed on disk and were readable.
- Root cause: item 4 already documented this limit breaking scraper *copy* operations (fixed there with the `\\?\` long-path prefix for file I/O), but `git.exe` on Windows hits the same 260-char `MAX_PATH` ceiling independently for its own working-tree operations, and that is not something `\\?\`-prefixed Python file I/O can work around — git itself has to be able to open the path.
- Patch: renamed the two offending files to short, still-descriptive filenames and updated their single `content.html` reference each, rather than reconfiguring git (`core.longpaths`) — repo-wide git config changes are out of bounds for an assistant/agent to make unilaterally.
- LESSON: a long scraped filename that merely exceeds Windows' path limit during a file copy will resurface as a *second*, separate failure at `git add` time even after the file-copy workaround succeeds. Treat "file exists on disk" and "git can track this path on Windows" as two different things to verify, and prefer shortening the filename over touching git configuration.

## 16. The PRODUCTS mega-menu portal rendered as a normal, visible block on every page when closed, not just when open
- Symptom: user reported "something wrong with the footer" on every page. Visually the real Footer.tsx content looked fine, but there was extra, oddly-placed text (submenu items like "FUEGO FIRE", "Explore door styles", the mega-menu's contact row) appearing right after it, and every page was ~480px taller than its real content.
- Root cause: the full-screen mega-menu panel is rendered via `createPortal(..., document.body)` in Header.tsx. Its wrapper div only ever got a `className="mobile-menu-active"` (which supplies `position:fixed`, full-screen sizing, and the taupe background) when the menu was open. When closed, the wrapper had `className=""` — no positioning, no background, but also **no `display:none`** — so it rendered as an ordinary, fully-visible, full-width ~480px block at the very end of `<body>`, after the Footer, on every single route (since Header is shared via layout.tsx).
- Found by directly comparing the live site vs localhost footer in the browser (per user's explicit instruction to use the browser, not just fetch text): scrolling to the bottom of any localhost page showed this extra block; the live site did not have it.
- Patch: added `style={menuOpen ? undefined : { display: 'none' }}` to the portal wrapper so it's only ever visible while the menu is actually open.
- LESSON: a portal rendered unconditionally into `document.body` needs an explicit hidden/closed state, not just a positive "active" state. CSS classes that only add styling when a condition is true leave the element in a plain, unstyled — but still visible and still taking up layout space — state when the condition is false. This is a different failure mode from the earlier stacking-context bug (see components/Header.tsx history): that one made the menu invisible when it should show; this one made it visible when it should hide.
