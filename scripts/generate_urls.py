import os

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
routes = ["/"]

for root, dirs, files in os.walk(app_root):
    if "page.tsx" in files:
        rel = os.path.relpath(root, app_root)
        if rel != ".":
            # format for URL
            route = "/" + rel.replace('\\', '/')
            routes.append(route)

routes.sort()

# Generate markdown output
out = []
out.append("# Full Site URL Map")
out.append(f"\nTotal Pages: {len(routes)}\n")
out.append("Below is the complete list of all currently active routes in the application:\n")

for route in routes:
    out.append(f"- `localhost:3000{route}`")

with open(r"C:\Users\AJINKYA\.gemini\antigravity-ide\brain\469ff606-391d-41d5-871c-e79b9cb36f33\all_urls.md", "w", encoding="utf-8") as f:
    f.write("\n".join(out))

print(f"Generated {len(routes)} routes.")
