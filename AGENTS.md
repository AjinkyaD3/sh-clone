# Secure House Migration Rules

Before starting any task or making any architectural decisions on this project, you MUST use the `view_file` tool to read the following files in the `/migration-log/` folder:
1. `PROGRESS.md` (read the TOP entry first - it has the current session's "Resume here" list of exactly what to do next)
2. `PLAN.md` (to know the current phase and order of operations)
3. `DECISIONS.md` (to ensure you follow the exact styling and component strategies)
4. `MISTAKES-AND-PATCHES.md` (to avoid repeating known technical gotchas)

Never start a large batch conversion without piloting on 3-5 pages first and visually verifying the output.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
